import React, { useMemo } from 'react';
import { DatasetDetail } from '../types/dataset';
import { Database, Key, Clock } from 'lucide-react';

interface ERDiagramSimpleProps {
  dataset: DatasetDetail;
}

interface TablePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ERDiagramSimple: React.FC<ERDiagramSimpleProps> = ({ dataset }) => {
  const { tablePositions, relationships } = useMemo(() => {
    const tables = dataset.tables;
    const tableCount = tables.length;

    // Calculate grid layout
    const cols = Math.ceil(Math.sqrt(tableCount * 1.5));
    const cellWidth = 220;
    const cellHeight = 180;
    const marginX = 40;
    const marginY = 40;

    const positions: Record<string, TablePosition> = {};

    tables.forEach((table, idx) => {
      const row = Math.floor(idx / cols);
      const col = idx % cols;

      positions[table.name] = {
        x: col * cellWidth + marginX,
        y: row * cellHeight + marginY,
        width: 200,
        height: 140,
      };
    });

    // Build relationships
    const rels: Array<{
      from: string;
      to: string;
      fromTable: string;
      toTable: string;
      label: string;
    }> = [];

    tables.forEach((table) => {
      if (table.foreign_keys && table.foreign_keys.length > 0) {
        table.foreign_keys.forEach((fk) => {
          const [toTable] = fk.references.split('.');
          if (positions[table.name] && positions[toTable]) {
            rels.push({
              from: table.name,
              to: toTable,
              fromTable: table.name,
              toTable: toTable,
              label: fk.column,
            });
          }
        });
      }
    });

    return { tablePositions: positions, relationships: rels };
  }, [dataset]);

  // Calculate SVG dimensions
  const maxX = Math.max(...Object.values(tablePositions).map(p => p.x + p.width)) + 40;
  const maxY = Math.max(...Object.values(tablePositions).map(p => p.y + p.height)) + 40;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Entity-Relationship Diagram</h3>
            <p className="text-sm text-gray-600 mt-1">
              Visual representation of table relationships and schema structure
            </p>
            <div className="flex gap-4 mt-2 text-xs text-gray-600">
              <span className="flex items-center">
                <Key className="w-3 h-3 mr-1 text-amber-600" /> Primary Key
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-blue-600" /> Time Column
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-700">
              {dataset.tables.length} Tables
            </div>
            <div className="text-sm font-semibold text-indigo-600">
              {relationships.length} Relationships
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 overflow-auto" style={{ maxHeight: '700px' }}>
        <svg width={maxX} height={maxY} className="mx-auto">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* Draw relationship lines */}
          {relationships.map((rel, idx) => {
            const fromPos = tablePositions[rel.from];
            const toPos = tablePositions[rel.to];

            // Calculate connection points (center right to center left)
            const fromX = fromPos.x + fromPos.width;
            const fromY = fromPos.y + fromPos.height / 2;
            const toX = toPos.x;
            const toY = toPos.y + toPos.height / 2;

            // Create orthogonal (right-angle) path
            const midX = (fromX + toX) / 2;
            const path = `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`;

            // Calculate label position (at the middle vertical segment)
            const labelX = midX;
            const labelY = (fromY + toY) / 2;

            return (
              <g key={idx}>
                {/* Orthogonal connection line */}
                <path
                  d={path}
                  stroke="#6366f1"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />

                {/* Label background */}
                <rect
                  x={labelX - 30}
                  y={labelY - 10}
                  width="60"
                  height="20"
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  rx="4"
                />

                {/* Label text */}
                <text
                  x={labelX}
                  y={labelY + 5}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="600"
                  fill="#4b5563"
                >
                  {rel.label}
                </text>
              </g>
            );
          })}

          {/* Draw tables */}
          {dataset.tables.map((table) => {
            const pos = tablePositions[table.name];
            if (!pos) return null;

            const displayColumns = table.sample_columns.slice(0, 5);

            return (
              <g key={table.name}>
                {/* Table box */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={pos.width}
                  height={pos.height}
                  fill="white"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  rx="8"
                />

                {/* Table header */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={pos.width}
                  height="32"
                  fill="#0ea5e9"
                  rx="8"
                />
                <rect
                  x={pos.x}
                  y={pos.y + 24}
                  width={pos.width}
                  height="8"
                  fill="#0ea5e9"
                />

                {/* Table name */}
                <text
                  x={pos.x + pos.width / 2}
                  y={pos.y + 20}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="white"
                >
                  {table.name}
                </text>

                {/* Row count */}
                <rect
                  x={pos.x}
                  y={pos.y + 32}
                  width={pos.width}
                  height="20"
                  fill="#f9fafb"
                />
                <text
                  x={pos.x + pos.width / 2}
                  y={pos.y + 46}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {table.num_rows.toLocaleString()} rows
                </text>

                {/* Columns */}
                {displayColumns.map((col, colIdx) => {
                  const isPrimaryKey = col === table.primary_key;
                  const isTimeCol = col === table.time_column;

                  return (
                    <g key={colIdx}>
                      {/* Column background */}
                      {colIdx % 2 === 0 && (
                        <rect
                          x={pos.x}
                          y={pos.y + 52 + colIdx * 16}
                          width={pos.width}
                          height="16"
                          fill="#f9fafb"
                        />
                      )}

                      {/* Primary key icon */}
                      {isPrimaryKey && (
                        <text
                          x={pos.x + 8}
                          y={pos.y + 64 + colIdx * 16}
                          fontSize="10"
                        >
                          🔑
                        </text>
                      )}

                      {/* Time column icon */}
                      {isTimeCol && !isPrimaryKey && (
                        <text
                          x={pos.x + 8}
                          y={pos.y + 64 + colIdx * 16}
                          fontSize="10"
                        >
                          🕐
                        </text>
                      )}

                      {/* Column name */}
                      <text
                        x={pos.x + (isPrimaryKey || isTimeCol ? 24 : 12)}
                        y={pos.y + 64 + colIdx * 16}
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight={isPrimaryKey ? "bold" : "normal"}
                        fill={isPrimaryKey ? "#d97706" : isTimeCol ? "#2563eb" : "#374151"}
                      >
                        {col.length > 20 ? col.substring(0, 18) + '...' : col}
                      </text>
                    </g>
                  );
                })}

                {/* More columns indicator */}
                {table.sample_columns.length > 5 && (
                  <text
                    x={pos.x + 12}
                    y={pos.y + 64 + 5 * 16}
                    fontSize="9"
                    fontStyle="italic"
                    fill="#9ca3af"
                  >
                    +{table.sample_columns.length - 5} more...
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
