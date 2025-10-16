import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DatasetList } from './pages/DatasetList';
import { DatasetDetail } from './pages/DatasetDetail';
import { Module } from './pages/Module';
import { Publications } from './pages/Publications';
import { People } from './pages/People';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<DatasetList />} />
        <Route path="/datasets/:datasetId" element={<DatasetDetail />} />
        <Route path="/module" element={<Module />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </Router>
  );
}

export default App;
