import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { getLogs, filterLogs, clearLogs } from '../../services/logService';
import { ClipboardList, User, Search, Upload, LogIn, LogOut, Filter, RefreshCw, Trash2 } from 'lucide-react';

interface LogFilter {
  type: string;
  userId: string;
  dateFrom: string;
  dateTo: string;
}

const LogsDashboard = () => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filter, setFilter] = useState<LogFilter>({
    type: '',
    userId: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalLogs: 0,
    userCount: 0,
    todayCount: 0,
    loginCount: 0,
    uploadCount: 0,
    searchCount: 0
  });

  // Load logs on component mount
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const allLogs = getLogs();
      setLogs(allLogs);
      setFilteredLogs(allLogs);
      updateStats(allLogs);
      showNotification('success', 'Logs loaded', `${allLogs.length} log entries loaded.`);
    } catch (error) {
      showNotification('error', 'Failed to load logs', 'An error occurred while loading the logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = (logData: any[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const uniqueUsers = new Set(logData.map(log => log.userId));
    
    const todayLogs = logData.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= today;
    });
    
    const loginLogs = logData.filter(log => log.type === 'LOGIN');
    const uploadLogs = logData.filter(log => log.type === 'UPLOAD_LOCATION');
    const searchLogs = logData.filter(log => log.type === 'SEARCH_LOCATIONS');
    
    setStats({
      totalLogs: logData.length,
      userCount: uniqueUsers.size,
      todayCount: todayLogs.length,
      loginCount: loginLogs.length,
      uploadCount: uploadLogs.length,
      searchCount: searchLogs.length
    });
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      clearLogs();
      setLogs([]);
      setFilteredLogs([]);
      updateStats([]);
      showNotification('success', 'Logs cleared', 'All logs have been cleared successfully.');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = logs;
    
    if (filter.type) {
      filtered = filtered.filter(log => 
        log.type.toLowerCase().includes(filter.type.toLowerCase())
      );
    }
    
    if (filter.userId) {
      filtered = filtered.filter(log => 
        log.userId.toLowerCase().includes(filter.userId.toLowerCase())
      );
    }
    
    if (filter.dateFrom) {
      const fromDate = new Date(filter.dateFrom);
      filtered = filtered.filter(log => new Date(log.timestamp) >= fromDate);
    }
    
    if (filter.dateTo) {
      const toDate = new Date(filter.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.timestamp) <= toDate);
    }
    
    setFilteredLogs(filtered);
    showNotification('info', 'Filters applied', `Showing ${filtered.length} of ${logs.length} logs.`);
  };

  const resetFilters = () => {
    setFilter({
      type: '',
      userId: '',
      dateFrom: '',
      dateTo: ''
    });
    setFilteredLogs(logs);
    showNotification('info', 'Filters reset', 'All logs are now displayed.');
  };

  // Get log type icon
  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'LOGIN':
        return <LogIn className="h-4 w-4 text-primary" />;
      case 'LOGOUT':
        return <LogOut className="h-4 w-4 text-warning" />;
      case 'REGISTER':
        return <User className="h-4 w-4 text-success" />;
      case 'UPLOAD_LOCATION':
        return <Upload className="h-4 w-4 text-primary" />;
      case 'SEARCH_LOCATIONS':
        return <Search className="h-4 w-4 text-primary" />;
      case 'DELETE_LOCATION':
        return <Trash2 className="h-4 w-4 text-destructive" />;
      default:
        return <ClipboardList className="h-4 w-4" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="page-container fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Logs Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Monitor system activity and user actions across the EPLQ platform.
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.totalLogs}</div>
              <p className="text-xs text-muted-foreground">Total Logs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.userCount}</div>
              <p className="text-xs text-muted-foreground">Unique Users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.todayCount}</div>
              <p className="text-xs text-muted-foreground">Today's Actions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.loginCount}</div>
              <p className="text-xs text-muted-foreground">Logins</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.uploadCount}</div>
              <p className="text-xs text-muted-foreground">Data Uploads</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.searchCount}</div>
              <p className="text-xs text-muted-foreground">Searches</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filter Controls */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Log Filters
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </CardHeader>
          
          {showFilters && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="type" className="text-sm font-medium">
                    Action Type
                  </label>
                  <Input
                    id="type"
                    name="type"
                    placeholder="e.g. LOGIN, UPLOAD"
                    value={filter.type}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="userId" className="text-sm font-medium">
                    User ID
                  </label>
                  <Input
                    id="userId"
                    name="userId"
                    placeholder="User ID"
                    value={filter.userId}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="dateFrom" className="text-sm font-medium">
                    From Date
                  </label>
                  <Input
                    id="dateFrom"
                    name="dateFrom"
                    type="date"
                    value={filter.dateFrom}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="dateTo" className="text-sm font-medium">
                    To Date
                  </label>
                  <Input
                    id="dateTo"
                    name="dateTo"
                    type="date"
                    value={filter.dateTo}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Logs Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Showing {filteredLogs.length} of {logs.length} log entries
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadLogs}
                  isLoading={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearLogs}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No logs found. System activity will appear here when users interact with the platform.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-accent transition-colors">
                        <th className="h-12 px-4 text-left font-medium">Timestamp</th>
                        <th className="h-12 px-4 text-left font-medium">Action</th>
                        <th className="h-12 px-4 text-left font-medium">User ID</th>
                        <th className="h-12 px-4 text-left font-medium">Role</th>
                        <th className="h-12 px-4 text-left font-medium">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.slice().reverse().map((log, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-accent/50">
                          <td className="p-4 align-middle">{formatTimestamp(log.timestamp)}</td>
                          <td className="p-4 align-middle">
                            <span className="flex items-center">
                              {getLogTypeIcon(log.type)}
                              <span className="ml-2">{log.type}</span>
                            </span>
                          </td>
                          <td className="p-4 align-middle font-mono text-xs">{log.userId}</td>
                          <td className="p-4 align-middle">
                            <span className={`px-2 py-1 rounded-full text-xs 
                              ${log.userRole === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                              {log.userRole || 'unknown'}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="text-xs max-w-xs truncate">
                              {Object.entries(log.details).map(([key, value]) => (
                                <span key={key} className="mr-2">
                                  <span className="font-semibold">{key}:</span> {String(value)}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogsDashboard;