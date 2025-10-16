import React, { useEffect, useState } from 'react';
import { DatasetSummary } from '../types/dataset';
import { loadDatasetIndex } from '../utils/datasetLoader';
import { DatasetCard } from '../components/DatasetCard';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Filter } from 'lucide-react';

export const DatasetList: React.FC = () => {
  const [datasets, setDatasets] = useState<DatasetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadDatasetIndex()
      .then((data) => {
        setDatasets(data.datasets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(datasets.map(d => d.category)))];

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredDatasets = filteredDatasets.filter(d => d.featured);
  const regularDatasets = filteredDatasets.filter(d => !d.featured);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading datasets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading datasets</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dataset</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Explore our collection of relational datasets for deep learning research and data analysis experiments.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search datasets, tags, or descriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="container mx-auto px-4 py-12">
        {featuredDatasets.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Datasets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}

        {regularDatasets.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredDatasets.length > 0 ? 'All Datasets' : 'Datasets'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}

        {filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No datasets found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
