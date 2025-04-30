import React, { useEffect, useState } from 'react';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  if (!message) return null;
  
  return (
    <div className={`mt-4 bg-white py-2 px-4 rounded-full shadow-md text-center transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-lg font-medium text-indigo-600">{message}</p>
    </div>
  );
};

export default MessageDisplay;