import React, { useMemo } from 'react';
import { DatasetDetail } from '../types/dataset';
import { GitBranch } from 'lucide-react';

interface SchemaGraphProps {
  dataset: DatasetDetail;
}

interface Relationship {
  from_table: string;
  from_column: string;
  to_table: string;
  to_column: string;
}

export const SchemaGraph: React.FC<SchemaGraphProps> = ({ dataset }) => {
  // Compute relationships from table foreign keys if not provided
  const relationships = useMemo<Relationship[]>(() => {
    if (dataset.relationships && dataset.relationships.length > 0) {
      return dataset.relationships;
    }

    // Generate relationships from table foreign keys
    const computed: Relationship[] = [];
    dataset.tables.forEach((table) => {
      if (table.foreign_keys && table.foreign_keys.length > 0) {
        table.foreign_keys.forEach((fk) => {
          const [toTable, toColumn] = fk.references.split('.');
          computed.push({
            from_table: table.name,
            from_column: fk.column,
            to_table: toTable,
            to_column: toColumn || 'id',
          });
        });
      }
    });
    return computed;
  }, [dataset]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <GitBranch className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">Schema Relationships</h2>
      </div>

      {relationships.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No relationships defined</p>
      ) : (
        <div className="space-y-2">
          {relationships.map((rel, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-semibold text-gray-900">
                    {rel.from_table}
                  </span>
                  <span className="text-gray-400">.</span>
                  <span className="font-mono text-sm text-gray-700">
                    {rel.from_column}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-8 border-t-2 border-gray-300"></div>
                <span className="text-xs">→</span>
                <div className="w-8 border-t-2 border-gray-300"></div>
              </div>
              <div className="flex-1 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <span className="font-mono text-sm font-semibold text-gray-900">
                    {rel.to_table}
                  </span>
                  <span className="text-gray-400">.</span>
                  <span className="font-mono text-sm text-gray-700">
                    {rel.to_column}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{relationships.length}</span> relationships
          connecting <span className="font-semibold">{dataset.num_tables}</span> tables
        </p>
      </div>
    </div>
  );
};
