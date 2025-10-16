import React, { useState } from 'react';
import { TableInfo } from '../types/dataset';
import { Table, Key, Clock, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface TableCardProps {
  table: TableInfo;
}

export const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 bg-primary-50 rounded">
              <Table className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
                {table.augmented && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                    Augmented
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{table.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>{table.num_rows.toLocaleString()} rows</span>
                <span>{table.num_columns} columns</span>
              </div>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {table.primary_key && (
              <div className="flex items-start space-x-2">
                <Key className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase">Primary Key</p>
                  <p className="text-sm text-gray-900 font-mono">{table.primary_key}</p>
                </div>
              </div>
            )}
            {table.time_column && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase">Time Column</p>
                  <p className="text-sm text-gray-900 font-mono">{table.time_column}</p>
                </div>
              </div>
            )}
          </div>

          {table.foreign_keys.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <LinkIcon className="w-4 h-4 text-green-600" />
                <p className="text-xs font-semibold text-gray-700 uppercase">Foreign Keys</p>
              </div>
              <div className="space-y-1">
                {table.foreign_keys.map((fk, idx) => (
                  <div key={idx} className="text-sm text-gray-700 font-mono bg-white px-3 py-1 rounded">
                    {fk.column} → {fk.references}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Sample Columns</p>
            <div className="flex flex-wrap gap-2">
              {table.sample_columns.map((col) => (
                <span
                  key={col}
                  className="px-2 py-1 bg-white text-gray-700 text-xs font-mono rounded border border-gray-200"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
