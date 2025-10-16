import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DatasetDetail as DatasetDetailType } from '../types/dataset';
import { loadDatasetDetail } from '../utils/datasetLoader';
import { TableCard } from '../components/TableCard';
import { TaskCard } from '../components/TaskCard';
import { SchemaGraph } from '../components/SchemaGraph';
import { ERDiagramSimple } from '../components/ERDiagramSimple';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  ArrowLeft,
  Database,
  Calendar,
  BarChart3,
  Table,
  Target,
  Download,
  Info,
  FileCode,
} from 'lucide-react';

export const DatasetDetail: React.FC = () => {
  const { datasetId } = useParams<{ datasetId: string }>();
  const [dataset, setDataset] = useState<DatasetDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'tasks'>('overview');

  useEffect(() => {
    if (!datasetId) return;

    loadDatasetDetail(datasetId)
      .then((data) => {
        setDataset(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [datasetId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dataset details...</p>
        </div>
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading dataset</p>
          <p className="mt-2">{error || 'Dataset not found'}</p>
          <Link to="/" className="mt-4 inline-block text-primary-600 hover:underline">
            Return to dataset list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/datasets" className="inline-flex items-center text-primary-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to datasets
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{dataset.name}</h1>
          <p className="text-xl text-primary-100 max-w-3xl">{dataset.description}</p>
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {dataset.category}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {dataset.num_tables} tables
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {dataset.tasks.length} tasks
            </span>
            {dataset.code_path && (
              <a
                href={dataset.code_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-white/90 hover:bg-white rounded-full text-sm text-primary-700 font-medium transition-colors"
              >
                <FileCode className="w-4 h-4 mr-1" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Rows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dataset.total_rows.toLocaleString()}
                </p>
              </div>
              <Database className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tables</p>
                <p className="text-2xl font-bold text-gray-900">{dataset.num_tables}</p>
              </div>
              <Table className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Prediction Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{dataset.tasks.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Coverage (days)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dataset.temporal_coverage.days.toLocaleString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Info className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schema'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Schema
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Tasks
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 pb-12">
            {/* Dataset Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dataset Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Source</p>
                  <p className="text-gray-900 font-semibold">{dataset.source}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Download URL</p>
                  <a
                    href={dataset.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline flex items-center"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Access Dataset
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Validation Timestamp</p>
                  <p className="text-gray-900 font-mono">{dataset.val_timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Test Timestamp</p>
                  <p className="text-gray-900 font-mono">{dataset.test_timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Temporal Range</p>
                  <p className="text-gray-900 font-mono">
                    {dataset.temporal_coverage.start} to {dataset.temporal_coverage.end}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {dataset.statistics && Object.keys(dataset.statistics).length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(dataset.statistics).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="text-gray-900 font-semibold mt-1">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-6 pb-12">
            <ERDiagramSimple dataset={dataset} />
            <SchemaGraph dataset={dataset} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tables</h2>
              <div className="space-y-4">
                {dataset.tables.map((table) => (
                  <TableCard key={table.name} table={table} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prediction Tasks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dataset.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
