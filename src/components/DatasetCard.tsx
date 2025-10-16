import React from 'react';
import { DatasetSummary } from '../types/dataset';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { FileCode } from 'lucide-react';

interface DatasetCardProps {
  dataset: DatasetSummary;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const IconComponent = (Icons as any)[dataset.icon] || Icons.Database;

  return (
    <Link to={`/datasets/${dataset.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border-2 border-transparent hover:border-primary-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 rounded-lg">
              <IconComponent className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{dataset.name}</h3>
              <p className="text-sm text-gray-500">{dataset.category}</p>
            </div>
          </div>
          {dataset.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{dataset.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {dataset.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {dataset.code_path && (
          <div className="pt-3 border-t border-gray-200">
            <a
              href={dataset.code_path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-primary-700 hover:text-primary-800 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <FileCode className="w-4 h-4 mr-1" />
              View Implementation Code
            </a>
          </div>
        )}
      </div>
    </Link>
  );
};
