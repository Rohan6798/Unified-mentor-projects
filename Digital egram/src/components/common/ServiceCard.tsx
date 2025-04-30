import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  id, 
  title, 
  description, 
  category, 
  imageUrl 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link 
          to={`/services/${id}`}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Apply Now
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;