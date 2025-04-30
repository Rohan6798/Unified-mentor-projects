import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Inbox, 
  Wheat, 
  Users, 
  Settings,
  CheckSquare
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const farmerLinks = [
    { 
      name: 'Dashboard', 
      path: '/farmer/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Government Schemes', 
      path: '/farmer/schemes', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'My Applications', 
      path: '/farmer/applications', 
      icon: <Inbox className="h-5 w-5" /> 
    },
    { 
      name: 'Crop Information', 
      path: '/farmer/crops', 
      icon: <Wheat className="h-5 w-5" /> 
    },
  ];

  const adminLinks = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Manage Schemes', 
      path: '/admin/schemes', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Manage Crops', 
      path: '/admin/crops', 
      icon: <Wheat className="h-5 w-5" /> 
    },
    { 
      name: 'Review Applications', 
      path: '/admin/applications', 
      icon: <CheckSquare className="h-5 w-5" /> 
    },
  ];

  const links = userRole === 'admin' ? adminLinks : farmerLinks;

  return (
    <div className="h-full bg-white shadow-sm border-r border-gray-200 py-6 px-2">
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              group flex items-center px-3 py-2 text-sm font-medium rounded-md 
              ${isActive(link.path) 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'}
            `}
          >
            <span className={`mr-3 ${isActive(link.path) ? 'text-primary-700' : 'text-gray-500 group-hover:text-primary-700'}`}>
              {link.icon}
            </span>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;