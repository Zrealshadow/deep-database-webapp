import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Database, Code, Layers, Network, TrendingUp, GitBranch, FileCode } from 'lucide-react';

export const Module: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            System Architecture & Modules
          </h1>
          <p className="text-lg text-gray-600">
            Overview of our temporal prediction framework for relational databases
          </p>
        </div>

        {/* Temporal Prediction Task Introduction */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Temporal Prediction Task Framework
              </h2>
              <p className="text-gray-700 mb-3">
                We use a general modeling approach based on <strong>temporal prediction tasks</strong>,
                where tuples are associated with timestamps. Models are trained on historical time windows
                and predict future events.
              </p>
              <div className="bg-blue-50 border-l-4 border-primary-500 p-4 my-4">
                <p className="text-gray-800 font-medium">
                  Example: Predict whether a user will churn in the next 7 days
                </p>
              </div>
              <p className="text-gray-700">
                Based on this temporal prediction framework, we can implement various task types:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                <li><strong>Tabular Prediction Tasks</strong> - e.g., Olist order delay prediction</li>
                <li><strong>Time-Series Prediction Tasks</strong> - e.g., User engagement forecasting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Layers className="w-6 h-6 text-primary-600 mr-2" />
            System Architecture Overview
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <svg width="900" height="600" viewBox="0 0 900 600" className="mx-auto">
              <defs>
                {/* Arrow marker */}
                <marker
                  id="arrowhead-blue"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#0284c7" />
                </marker>

                {/* Gradient for header */}
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Title */}
              <text x="450" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1f2937">
                Deep Database Architecture
              </text>

              {/* Layer 1: Data Layer */}
              <g>
                <rect x="50" y="60" width="800" height="80" fill="#dbeafe" stroke="#0284c7" strokeWidth="2" rx="8" />
                <text x="450" y="85" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e40af">
                  Data Layer
                </text>

                {/* Three boxes: Dataset, Database, Task */}
                <rect x="80" y="95" width="220" height="35" fill="white" stroke="#60a5fa" strokeWidth="2" rx="4" />
                <text x="190" y="118" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">
                  Dataset (Register Pattern)
                </text>

                <rect x="340" y="95" width="220" height="35" fill="white" stroke="#60a5fa" strokeWidth="2" rx="4" />
                <text x="450" y="118" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">
                  Database (Register Pattern)
                </text>

                <rect x="600" y="95" width="220" height="35" fill="white" stroke="#60a5fa" strokeWidth="2" rx="4" />
                <text x="710" y="118" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">
                  Task (Register Pattern)
                </text>
              </g>

              {/* Arrows from Data Layer to Tokenizer */}
              <path d="M 190 140 L 190 170" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <path d="M 450 140 L 450 170" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <path d="M 710 140 L 710 170" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

              {/* Layer 2: Tokenizer */}
              <g>
                <rect x="50" y="180" width="800" height="80" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="8" />
                <text x="450" y="205" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
                  Tokenizer Layer
                </text>
                <text x="450" y="225" textAnchor="middle" fontSize="12" fill="#78350f">
                  Infers from data types to encoding types
                </text>

                {/* Encoding types */}
                <g>
                  <rect x="100" y="235" width="120" height="25" fill="white" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
                  <text x="160" y="252" textAnchor="middle" fontSize="11" fill="#92400e">Numerical</text>
                </g>
                <g>
                  <rect x="240" y="235" width="120" height="25" fill="white" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
                  <text x="300" y="252" textAnchor="middle" fontSize="11" fill="#92400e">Categorical</text>
                </g>
                <g>
                  <rect x="380" y="235" width="120" height="25" fill="white" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
                  <text x="440" y="252" textAnchor="middle" fontSize="11" fill="#92400e">Text</text>
                </g>
                <g>
                  <rect x="520" y="235" width="120" height="25" fill="white" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
                  <text x="580" y="252" textAnchor="middle" fontSize="11" fill="#92400e">Timestamp</text>
                </g>
              </g>

              {/* Arrow from Tokenizer to Modeling */}
              <path d="M 450 270 L 450 310" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowhead-blue)" />

              {/* Layer 3: Modeling Layer */}
              <g>
                <rect x="50" y="320" width="800" height="100" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                <text x="450" y="345" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#5b21b6">
                  Modeling Layer
                </text>

                {/* Tabular Modeling */}
                <g>
                  <rect x="120" y="355" width="280" height="50" fill="white" stroke="#8b5cf6" strokeWidth="2" rx="6" />
                  <text x="260" y="375" textAnchor="middle" fontSize="14" fontWeight="600" fill="#5b21b6">
                    Tabular Modeling
                  </text>
                  <text x="260" y="395" textAnchor="middle" fontSize="11" fill="#6d28d9">
                    Traditional ML/DL on flattened data
                  </text>
                </g>

                {/* Graph Modeling */}
                <g>
                  <rect x="480" y="355" width="340" height="50" fill="white" stroke="#8b5cf6" strokeWidth="2" rx="6" />
                  <text x="650" y="375" textAnchor="middle" fontSize="14" fontWeight="600" fill="#5b21b6">
                    Graph Modeling
                  </text>
                  <text x="650" y="395" textAnchor="middle" fontSize="11" fill="#6d28d9">
                    Homogeneous & Heterogeneous Graphs
                  </text>
                </g>
              </g>

              {/* Arrows from Modeling to Models */}
              <path d="M 200 430 L 200 460" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <path d="M 320 430 L 320 460" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <path d="M 570 430 L 570 460" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <path d="M 730 430 L 730 460" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

              {/* Layer 4: Models */}
              <g>
                <rect x="50" y="470" width="800" height="110" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="8" />
                <text x="450" y="495" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#075985">
                  Model Implementations
                </text>

                {/* Traditional ML */}
                <g>
                  <rect x="70" y="505" width="180" height="60" fill="white" stroke="#38bdf8" strokeWidth="2" rx="4" />
                  <text x="160" y="520" textAnchor="middle" fontSize="12" fontWeight="600" fill="#075985">
                    Traditional ML
                  </text>
                  <text x="160" y="536" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    XGBoost
                  </text>
                  <text x="160" y="550" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    LightGBM / CatBoost
                  </text>
                </g>

                {/* Tabular DL */}
                <g>
                  <rect x="270" y="505" width="180" height="60" fill="white" stroke="#38bdf8" strokeWidth="2" rx="4" />
                  <text x="360" y="520" textAnchor="middle" fontSize="12" fontWeight="600" fill="#075985">
                    Tabular Deep Learning
                  </text>
                  <text x="360" y="536" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    FT-Transformer
                  </text>
                  <text x="360" y="550" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    MLP / ResNet
                  </text>
                </g>

                {/* Homogeneous GNN */}
                <g>
                  <rect x="470" y="505" width="180" height="60" fill="white" stroke="#38bdf8" strokeWidth="2" rx="4" />
                  <text x="560" y="520" textAnchor="middle" fontSize="12" fontWeight="600" fill="#075985">
                    Homogeneous GNN
                  </text>
                  <text x="560" y="536" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    Node2Vec
                  </text>
                  <text x="560" y="550" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    RandomWalk
                  </text>
                </g>

                {/* Heterogeneous GNN */}
                <g>
                  <rect x="670" y="505" width="180" height="60" fill="white" stroke="#38bdf8" strokeWidth="2" rx="4" />
                  <text x="760" y="520" textAnchor="middle" fontSize="12" fontWeight="600" fill="#075985">
                    Heterogeneous GNN
                  </text>
                  <text x="760" y="536" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    R-GCN / R-GAT / HGT
                  </text>
                  <text x="760" y="550" textAnchor="middle" fontSize="10" fill="#0c4a6e">
                    RGCN / RGAT
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        {/* Detailed Module Descriptions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Data Layer */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-start space-x-3 mb-4 flex-1">
              <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Layer</h3>
                <p className="text-gray-700 text-sm mb-2">
                  The foundation of our system uses a <strong>register pattern</strong> for extensibility and modularity.
                </p>
                <a
                  href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/utils/data/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary-700 hover:text-primary-800 font-medium mb-3"
                >
                  <FileCode className="w-3 h-3 mr-1" />
                  View Documentation
                </a>
                <ul className="space-y-2 text-sm flex-1">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Dataset:</strong>
                      <span className="text-gray-700"> Self-registering dataset classes that automatically expose themselves to the framework</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Database:</strong>
                      <span className="text-gray-700"> Database connectors and schema extractors that register themselves at import time</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Task:</strong>
                      <span className="text-gray-700"> Prediction task definitions with automatic registration for different types of tasks</span>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-gray-600 font-semibold">
                      Key Files:
                    </p>
                    <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/utils/data/database_factory.py" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-xs bg-blue-50 px-2 py-1 rounded border border-blue-300 text-blue-700 hover:bg-blue-100">
                      <FileCode className="w-3 h-3 mr-1" />
                      utils/data/database_factory.py
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tokenizer Layer */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-start space-x-3 mb-4 flex-1">
              <Code className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tokenizer Layer</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Automatically infers appropriate encoding strategies based on data types and characteristics.
                </p>
                <ul className="space-y-2 text-sm flex-1">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Numerical:</strong>
                      <span className="text-gray-700"> Standard scaling, min-max normalization, or quantile transformation</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Categorical:</strong>
                      <span className="text-gray-700"> One-hot encoding, label encoding, or embedding layers</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Text:</strong>
                      <span className="text-gray-700"> Tokenization, word embeddings, or transformer-based encodings</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Timestamp:</strong>
                      <span className="text-gray-700"> Temporal feature extraction (hour, day, week, month, cyclical encoding)</span>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-gray-600 font-semibold">
                      Key Files:
                    </p>
                    <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/utils/preprocess.py" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-xs bg-amber-50 px-2 py-1 rounded border border-amber-300 text-amber-700 hover:bg-amber-100">
                      <FileCode className="w-3 h-3 mr-1" />
                      utils/preprocess.py
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modeling Layer */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Layers className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modeling Layer</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Two complementary modeling paradigms for relational data.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <div className="flex-1">
                      <div className="mb-2">
                        <strong className="text-gray-900">Tabular Modeling:</strong>
                        <span className="text-gray-700"> Flattens relational data through feature engineering and aggregation for traditional ML/DL models</span>
                      </div>
                      <div className="space-y-3">
                        <div className="border-l-4 border-orange-400 pl-4 py-3 bg-orange-50 rounded">
                          <strong className="text-gray-900 flex items-center text-sm">
                            (DFS) Deep Feature Synthesis: Towards Automating Data Science Endeavors
                            <FileCode className="w-5 h-5 ml-2 text-orange-600" />
                          </strong>
                          <p className="text-gray-700 mt-1 text-sm">Automated feature engineering using relational primitives</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/cmd/generate_table_data.py" target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-orange-300 text-orange-700 hover:bg-orange-100">
                              <FileCode className="w-3 h-3 mr-1" />
                              cmd/generate_table_data.py
                            </a>
                            <a href="https://ieeexplore.ieee.org/document/7344858" target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-orange-300 text-orange-700 hover:bg-orange-100">
                              📄 DSAA 2015
                            </a>
                          </div>
                        </div>
                        <div className="border-l-4 border-orange-400 pl-4 py-3 bg-orange-50 rounded">
                          <strong className="text-gray-900 flex items-center text-sm">
                            (Leva) Boosting Machine Learning with Relational Embedding Data Augmentation
                            <FileCode className="w-5 h-5 ml-2 text-orange-600" />
                          </strong>
                          <p className="text-gray-700 mt-1 text-sm">Learned feature embedding using random walk and apply it in tabular</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/leva/README.md" target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-orange-300 text-orange-700 hover:bg-orange-100">
                              <FileCode className="w-3 h-3 mr-1" />
                              leva/README.md
                            </a>
                            <a href="https://dl.acm.org/doi/10.1145/3514221.3517891" target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-orange-300 text-orange-700 hover:bg-orange-100">
                              📄 SIGMOD 2022 
                            </a>
                          </div>
                        </div>
                        <div className="border-l-4 border-orange-400 pl-4 py-3 bg-orange-50 rounded">
                          <strong className="text-gray-900 flex items-center text-sm">
                            (ARDA): automatic relational data augmentation for machine learning
                            <FileCode className="w-5 h-5 ml-2 text-orange-600" />
                          </strong>
                          <p className="text-gray-700 mt-1 text-sm">Adaptive Relational Data Aggregation</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <a href="https://dl.acm.org/doi/10.14778/3397230.3397235" target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-orange-300 text-orange-700 hover:bg-orange-100">
                              📄 VLDB 2020
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900">Graph Modeling:</strong>
                      <span className="text-gray-700"> Preserves relational structure as graphs</span>
                    </div>
                  </li>
                </ul>
                <div className="mt-3 pl-4 border-l-2 border-purple-300">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Homogeneous Graph:</strong> Single node/edge type (e.g., user-user network)
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Heterogeneous Graph:</strong> Multiple node/edge types preserving database schema
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Model Implementations */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Network className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Model Implementations</h3>
                <p className="text-gray-700 text-sm mb-4">
                  State-of-the-art models for different data representations.
                </p>
                <div className="space-y-4 text-sm">
                  <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded">
                    <strong className="text-gray-900 flex items-center">
                      Traditional ML
                      <FileCode className="w-4 h-4 ml-2 text-blue-600" />
                    </strong>
                    <p className="text-gray-700 mt-1">Gradient boosting (XGBoost, LightGBM, CatBoost) for tabular data</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/base.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-blue-300 text-blue-700 hover:bg-blue-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/base.py
                      </a>
                      <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded border border-gray-300 text-gray-600">
                        <FileCode className="w-3 h-3 mr-1" />
                        XGBoost / LightGBM / CatBoost (scikit-learn API)
                      </span>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded">
                    <strong className="text-gray-900 flex items-center">
                      Tabular Deep Learning
                      <FileCode className="w-4 h-4 ml-2 text-purple-600" />
                    </strong>
                    <p className="text-gray-700 mt-1">FT-Transformer, MLP, ResNet architectures for structured data</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/base.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-purple-300 text-purple-700 hover:bg-purple-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/base.py
                      </a>
                      <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded border border-gray-300 text-gray-600">
                        <FileCode className="w-3 h-3 mr-1" />
                        FT-Transformer / MLP / ResNet (PyTorch)
                      </span>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50 rounded">
                    <strong className="text-gray-900 flex items-center">
                      Homogeneous GNN
                      <FileCode className="w-4 h-4 ml-2 text-green-600" />
                    </strong>
                    <p className="text-gray-700 mt-1">Node2Vec, RandomWalk for single-type graph representation learning</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/graphsage.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-green-300 text-green-700 hover:bg-green-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/graphsage.py
                      </a>
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/gcn.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-green-300 text-green-700 hover:bg-green-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/gcn.py
                      </a>
                      <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded border border-gray-300 text-gray-600">
                        <FileCode className="w-3 h-3 mr-1" />
                        Node2Vec / RandomWalk (PyTorch Geometric)
                      </span>
                    </div>
                  </div>
                  <div className="border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50 rounded">
                    <strong className="text-gray-900 flex items-center">
                      Heterogeneous GNN
                      <FileCode className="w-4 h-4 ml-2 text-indigo-600" />
                    </strong>
                    <p className="text-gray-700 mt-1">R-GCN, R-GAT, HGT for multi-relational graph neural networks</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/hgt.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/hgt.py
                      </a>
                      <a href="https://github.com/Zrealshadow/sharing-embedding-table/blob/main/model/gat.py" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-white px-2 py-1 rounded border border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                        <FileCode className="w-3 h-3 mr-1" />
                        model/gat.py
                      </a>
                      <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded border border-gray-300 text-gray-600">
                        <FileCode className="w-3 h-3 mr-1" />
                        R-GCN / R-GAT (PyTorch Geometric)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Implementation Philosophy */}
        <section className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-start space-x-3">
            <GitBranch className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Implementation Philosophy</h3>
              <p className="text-gray-700 mb-3">
                Our framework is built on three core principles:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary-700 mb-2">Extensibility</h4>
                  <p className="text-sm text-gray-700">
                    Register pattern allows easy addition of new datasets, tasks, and models without modifying core code
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary-700 mb-2">Modularity</h4>
                  <p className="text-sm text-gray-700">
                    Clear separation between data layer, tokenization, modeling, and model implementations
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-primary-700 mb-2">Flexibility</h4>
                  <p className="text-sm text-gray-700">
                    Support for both traditional tabular approaches and modern graph-based methods
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
