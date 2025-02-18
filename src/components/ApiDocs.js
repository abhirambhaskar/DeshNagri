import React, { useState } from 'react';
import { Server, Copy, Check, Code } from 'lucide-react';

const ApiDocs = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/states',
      description: 'Get all states',
      curl: 'curl https://india-data.vercel.app/api/states',
      sampleResponse: {
        success: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Kerala"],
      },
      statusCodes: [
        { code: '200', description: 'Success' },
        { code: '500', description: 'Server Error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/districts/:state',
      description: 'Get districts by state',
      curl: 'curl https://india-data.vercel.app/api/districts/Kerala',
      sampleResponse: {
        success: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod"],
      },
      statusCodes: [
        { code: '200', description: 'Success' },
        { code: '404', description: 'State not found' },
        { code: '500', description: 'Server Error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/subdistricts/:state/:district',
      description: 'Get sub-districts by district',
      curl: 'curl https://india-data.vercel.app/api/subdistricts/Kerala/Alappuzha',
      sampleResponse: {
        success: ["Ambalappuzha", "Chengannur", "Karthikappally", "Mavelikkara"],
      },
      statusCodes: [
        { code: '200', description: 'Success' },
        { code: '404', description: 'State or district not found' },
        { code: '500', description: 'Server Error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/villages/:state/:district/:subdistrict',
      description: 'Get villages by sub-district',
      curl: 'curl https://india-data.vercel.app/api/villages/Kerala/Alappuzha/Mavelikkara',
      sampleResponse: {
        success: ["Bharanikkavu", "Chennithala", "Chunakkara", "Kannamangalam"],
      },
      statusCodes: [
        { code: '200', description: 'Success' },
        { code: '404', description: 'Location not found' },
        { code: '500', description: 'Server Error' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Server className="mr-2 text-blue-600" />
        API Documentation
      </h2>

      <div className="space-y-8">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-gray-600">
                    {endpoint.path}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{endpoint.description}</p>
            </div>

            {/* CURL Command */}
            <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Code size={16} className="mr-2 text-gray-400" />
                  <code>{endpoint.curl}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(endpoint.curl, index)}
                  className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* Sample Response */}
            <div className="p-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Sample Response</h4>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(endpoint.sampleResponse, null, 2)}
              </pre>
            </div>

            {/* Status Codes */}
            <div className="p-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Status Codes</h4>
              <div className="grid grid-cols-2 gap-2">
                {endpoint.statusCodes.map((status, statusIndex) => (
                  <div key={statusIndex} className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded
                      ${status.code === '200' ? 'bg-green-100 text-green-700' : 
                        status.code === '404' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {status.code}
                    </span>
                    <span className="text-sm text-gray-600">{status.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Notes */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Notes</h3>
        <ul className="list-disc pl-5 space-y-2 text-blue-800">
          <li>All endpoints return JSON responses</li>
          <li>Replace path parameters (e.g., :state) with actual values</li>
          <li>The API base URL is <code className="bg-blue-100 px-1 rounded">https://india-data.vercel.app/api</code></li>
          <li>Response headers include CORS and content-type configurations</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiDocs;