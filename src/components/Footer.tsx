import React from 'react';
import { Mail, AlertCircle, Building2, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Info */}
          <div className="flex items-start space-x-3">
            <Building2 className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Project Developer</p>
              <p className="text-sm">
                Developed by{' '}
                <span className="font-semibold text-primary-400">DBSystem Research Group</span>
              </p>
              <p className="text-sm">National University of Singapore</p>
              <a
                href="https://www.comp.nus.edu.sg/~dbsystem/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 mt-1"
              >
                www.comp.nus.edu.sg/~dbsystem/
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Bug Report */}
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Report Bugs</p>
              <p className="text-sm mb-1">
                If you encounter any issues, please contact us:
              </p>
              <a
                href="mailto:lingze@comp.nus.edu.sg"
                className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300"
              >
                <Mail className="w-4 h-4 mr-1" />
                lingze@comp.nus.edu.sg
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} DBSystem Research Group, National University of Singapore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
