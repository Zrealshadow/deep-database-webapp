import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Database, BookOpen, Users, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <Database className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Deep Database
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-4 text-primary-100">
              Deep Learning × Database
            </p>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Exploring advanced analytics methods and cutting-edge research at the intersection of
              deep learning and database systems
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/datasets"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                Explore Datasets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/publications"
                className="inline-flex items-center px-6 py-3 bg-primary-500/50 text-white font-semibold rounded-lg hover:bg-primary-500/70 transition-colors border border-white/30"
              >
                View Publications
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research Focus
            </h2>
            <p className="text-lg text-gray-600">
              Bridging the gap between deep learning innovations and database technologies
              to enable intelligent data analytics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advanced Analytics
              </h3>
              <p className="text-gray-600">
                Developing novel machine learning techniques for complex data analysis
                and pattern discovery in large-scale databases
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Relational Learning
              </h3>
              <p className="text-gray-600">
                Leveraging graph neural networks and embedding methods to learn from
                relational data structures and multi-table databases
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Intelligent Systems
              </h3>
              <p className="text-gray-600">
                Building end-to-end systems that seamlessly integrate deep learning
                models with database operations for real-time insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Our Work
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Dataset Repository */}
            <Link
              to="/datasets"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-primary-500"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Database className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dataset Repository</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Explore our curated collection of relational datasets for research and experimentation
              </p>
              <span className="inline-flex items-center text-primary-600 font-semibold">
                Browse Datasets
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>

            {/* Publications */}
            <Link
              to="/publications"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-primary-500"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Publications</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Read our latest research papers and contributions to the field
              </p>
              <span className="inline-flex items-center text-primary-600 font-semibold">
                View Publications
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>

            {/* People */}
            <Link
              to="/people"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-primary-500"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">People</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Meet the researchers and team members driving our innovations
              </p>
              <span className="inline-flex items-center text-primary-600 font-semibold">
                Meet the Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
