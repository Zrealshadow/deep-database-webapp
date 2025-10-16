import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BookOpen, ExternalLink, Calendar, Users as UsersIcon } from 'lucide-react';
import { Publication } from '../types/publication';
import { loadPublications } from '../utils/publicationLoader';

const typeColors = {
  Conference: 'bg-blue-100 text-blue-800',
  Journal: 'bg-green-100 text-green-800',
  Workshop: 'bg-purple-100 text-purple-800',
  Preprint: 'bg-gray-100 text-gray-800',
};

export const Publications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPublications()
      .then((data) => {
        setPublications(data.publications);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading publications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">Error loading publications</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const groupedByYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Publications</h1>
          <p className="text-xl text-green-100 text-center max-w-3xl mx-auto">
            Research papers and contributions from the Deep Database project
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-4 -mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-600">{publications.length}</p>
              <p className="text-sm text-gray-600">Total Publications</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {publications.filter((p) => p.type === 'Conference').length}
              </p>
              <p className="text-sm text-gray-600">Conferences</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {publications.filter((p) => p.type === 'Journal').length}
              </p>
              <p className="text-sm text-gray-600">Journals</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-600">
                {publications.filter((p) => p.year === new Date().getFullYear()).length}
              </p>
              <p className="text-sm text-gray-600">This Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{year}</h2>
              <div className="space-y-6">
                {groupedByYear[year].map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <UsersIcon className="w-4 h-4 mr-2" />
                          <span>{pub.authors.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{pub.venue}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          typeColors[pub.type]
                        }`}
                      >
                        {pub.type}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{pub.abstract}</p>

                    <div className="flex flex-wrap gap-3">
                      {pub.pdf && (
                        <a
                          href={pub.pdf}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded hover:bg-primary-700 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          PDF
                        </a>
                      )}
                      {pub.code && (
                        <a
                          href={pub.code}
                          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded hover:bg-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder Message */}
        <div className="max-w-5xl mx-auto mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">
            <strong>Note:</strong> These are placeholder publications. Replace with actual research
            papers from your team.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
