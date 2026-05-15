'use client';

import DocumentationCenter from '@/components/DocumentationCenter';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Complete guides, tutorials, and downloadable resources for mastering numerical integration.
        </p>
      </div>
      <DocumentationCenter />
    </div>
  );
};

export default DocumentationPage;