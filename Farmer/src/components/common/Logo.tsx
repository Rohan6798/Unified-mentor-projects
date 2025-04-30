import React from 'react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return <Sprout className={className} />;
};

export default Logo;