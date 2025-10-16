import React from 'react';
import { TaskInfo } from '../types/dataset';
import { Target, Award } from 'lucide-react';

interface TaskCardProps {
  task: TaskInfo;
}

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Hard': 'bg-red-100 text-red-800',
};

const taskTypeColors = {
  'Binary Classification': 'bg-blue-100 text-blue-800',
  'Regression': 'bg-purple-100 text-purple-800',
  'Multi-class Classification': 'bg-indigo-100 text-indigo-800',
  'Multi-label Classification': 'bg-pink-100 text-pink-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const difficultyColor = difficultyColors[task.difficulty as keyof typeof difficultyColors] || 'bg-gray-100 text-gray-800';
  const taskTypeColor = taskTypeColors[task.task_type as keyof typeof taskTypeColors] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-all hover:shadow-md p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-50 rounded">
            <Target className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded ${taskTypeColor}`}>
          {task.task_type}
        </span>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${difficultyColor}`}>
          {task.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded">
        <div>
          <p className="text-xs text-gray-600 uppercase">Entity Table</p>
          <p className="text-sm font-mono text-gray-900">{task.entity_table}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Target Column</p>
          <p className="text-sm font-mono text-gray-900">{task.target_col}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-xs text-gray-600">Train</p>
          <p className="text-lg font-bold text-blue-900">{task.train_size.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <p className="text-xs text-gray-600">Val</p>
          <p className="text-lg font-bold text-green-900">{task.val_size.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <p className="text-xs text-gray-600">Test</p>
          <p className="text-lg font-bold text-purple-900">{task.test_size.toLocaleString()}</p>
        </div>
      </div>

      {(task.positive_rate !== undefined || task.train_positive_rate !== undefined) && (
        <div className="mb-4 p-3 bg-amber-50 rounded">
          <p className="text-xs text-gray-700 font-semibold mb-2">Positive Class Rate</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {task.train_positive_rate !== undefined && (
              <div>
                <span className="text-gray-600">Train: </span>
                <span className="font-semibold">{(task.train_positive_rate * 100).toFixed(1)}%</span>
              </div>
            )}
            {task.val_positive_rate !== undefined && (
              <div>
                <span className="text-gray-600">Val: </span>
                <span className="font-semibold">{(task.val_positive_rate * 100).toFixed(1)}%</span>
              </div>
            )}
            {task.test_positive_rate !== undefined && (
              <div>
                <span className="text-gray-600">Test: </span>
                <span className="font-semibold">{(task.test_positive_rate * 100).toFixed(1)}%</span>
              </div>
            )}
            {task.positive_rate !== undefined && !task.train_positive_rate && (
              <div className="col-span-3">
                <span className="text-gray-600">Overall: </span>
                <span className="font-semibold">{(task.positive_rate * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-4 h-4 text-gray-600" />
          <p className="text-xs text-gray-700 font-semibold uppercase">Metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {task.metrics.map((metric) => (
            <span
              key={metric}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
