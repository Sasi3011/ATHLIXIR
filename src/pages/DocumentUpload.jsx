import React, { useState, useRef } from 'react';
import { RiSearchLine, RiBellLine, RiUploadCloud2Line, RiAlertLine, RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import Layout from '../components/Layout';

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({});
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setError(null);
      setSelectedFiles(files);
      handleUpload(files);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setError(null);
      setSelectedFiles(files);
      handleUpload(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getRiskColor = (status) => {
    switch (status) {
      case 'high_risk': return 'text-red-500';
      case 'medium_risk': return 'text-orange-500';
      case 'low_risk': return 'text-yellow-500';
      case 'safe': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskIcon = (status) => {
    switch (status) {
      case 'high_risk': return <RiAlertLine className="w-5 h-5" />;
      case 'medium_risk': return <RiErrorWarningLine className="w-5 h-5" />;
      case 'low_risk': return <RiErrorWarningLine className="w-5 h-5" />;
      case 'safe': return <RiCheckLine className="w-5 h-5" />;
      default: return null;
    }
  };

  const handleUpload = async (files) => {
    try {
      setUploading(true);
      setError(null);
      
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', 'current-user-id');

      // Check server health first
      try {
        const healthCheck = await fetch('http://localhost:5000/api/health');
        if (!healthCheck.ok) {
          throw new Error('Server is not responding');
        }
      } catch (error) {
        throw new Error('Cannot connect to server. Please ensure the server is running.');
      }

      // Upload file
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      
      const newUpload = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
        uploadedAt: new Date(),
        analysis: result.data.analysis
      };

      setRecentUploads(prev => [newUpload, ...prev]);
      setAnalysisResults(prev => ({
        ...prev,
        [file.name]: result.data.analysis
      }));
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfIssue: '',
    bloodGroup: '',
    gender: '',
    hospitalName: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      dateOfIssue: '',
      bloodGroup: '',
      gender: '',
      hospitalName: '',
      agreeToTerms: false
    });
  };

  return (
    <Layout>
      <div>
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Document Upload</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <RiBellLine className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Upload Documents</h2>
                <p className="text-gray-500">Upload your medical reports, certificates, or any other important documents</p>
              </div>

              {/* Upload Box */}
              <div 
                className={`border-2 border-dashed ${error ? 'border-red-300' : 'border-gray-200'} rounded-lg p-8 text-center mb-8`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <RiUploadCloud2Line className={`w-16 h-16 mx-auto ${error ? 'text-red-400' : 'text-gray-400'} mb-4`} />
                <p className="text-gray-600 mb-2">Drag and drop your files here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <button 
                  className={`${error ? 'bg-red-400' : 'bg-yellow-400'} text-white px-6 py-2 rounded-lg hover:${error ? 'bg-red-500' : 'bg-yellow-500'}`}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Browse Files'}
                </button>
                {error && (
                  <p className="text-red-500 text-sm mt-4">{error}</p>
                )}
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max size: 10MB)
                </p>
              </div>

              {/* Recent Uploads */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
                <div className="space-y-4">
                  {recentUploads.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded-lg">
                          <RiUploadCloud2Line className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size} MB • Uploaded {formatDate(file.uploadedAt)}</p>
                          {file.analysis && (
                            <div className="mt-1 flex items-center gap-2">
                              <span className={`flex items-center gap-1 ${getRiskColor(file.analysis.status)}`}>
                                {getRiskIcon(file.analysis.status)}
                                {file.analysis.status.replace('_', ' ').toUpperCase()}
                              </span>
                              <span className="text-sm text-gray-500">
                                • Score: {(file.analysis.mlAnalysis.forgery_probability * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {file.analysis && (
                          <button 
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                            onClick={() => setSelectedAnalysis(file.analysis)}
                          >
                            View Analysis
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-800">View Document</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
                <h2 className="text-2xl font-semibold mb-2">Medical Requirements</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Full Name & Date of Issue */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Date of Issue</label>
                      <input
                        type="date"
                        name="dateOfIssue"
                        value={formData.dateOfIssue}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>

                    {/* Blood Group & Gender */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Blood Group</label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Hospital Name */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Hospital Name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="text-sm text-gray-600 font-medium">Terms and Conditions</label>
                    <div className="mt-2 flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <p className="text-sm text-gray-600">
                        I confirm the information is accurate and agree to the Terms & Conditions. I authorize AI-based verification of my uploaded medical documents for validation and fraud detection.
                      </p>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Modal */}
      {selectedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Document Analysis Results</h3>
              <button 
                onClick={() => setSelectedAnalysis(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Risk Level */}
              <div>
                <h4 className="font-medium mb-2">Risk Assessment</h4>
                <div className={`flex items-center gap-2 ${getRiskColor(selectedAnalysis.status)}`}>
                  {getRiskIcon(selectedAnalysis.status)}
                  <span className="font-medium">
                    {selectedAnalysis.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span>
                    ({(selectedAnalysis.mlAnalysis.forgery_probability * 100).toFixed(1)}% probability of forgery)
                  </span>
                </div>
              </div>

              {/* Document Quality */}
              <div>
                <h4 className="font-medium mb-2">Document Quality</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Resolution</p>
                    <p className={`font-medium ${selectedAnalysis.quality.resolution.isAdequate ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedAnalysis.quality.resolution.width} x {selectedAnalysis.quality.resolution.height}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Format</p>
                    <p className={`font-medium ${selectedAnalysis.quality.format.isSupported ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedAnalysis.quality.format.type.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Analysis */}
              <div>
                <h4 className="font-medium mb-2">Text Content Analysis</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">
                    {selectedAnalysis.textContent}
                  </pre>
                </div>
              </div>

              {/* Analysis Details */}
              <div>
                <h4 className="font-medium mb-2">Detailed Analysis</h4>
                <div className="space-y-2">
                  {Object.entries(selectedAnalysis.mlAnalysis).map(([key, value]) => (
                    key !== 'forgery_probability' && (
                      <div key={key} className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">{key.replace('_', ' ').toUpperCase()}</span>
                        <span className={value ? 'text-red-500' : 'text-green-500'}>
                          {value ? 'Issue Detected' : 'No Issues'}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {selectedAnalysis.status === 'high_risk' && (
                    <>
                      <li>Immediate verification of document authenticity required</li>
                      <li>Contact document issuer for validation</li>
                      <li>Flag for manual review by administrator</li>
                    </>
                  )}
                  {selectedAnalysis.status === 'medium_risk' && (
                    <>
                      <li>Additional verification recommended</li>
                      <li>Check document metadata and source</li>
                      <li>Compare with original if available</li>
                    </>
                  )}
                  {selectedAnalysis.status === 'low_risk' && (
                    <>
                      <li>Standard verification procedures sufficient</li>
                      <li>Monitor for pattern consistency</li>
                    </>
                  )}
                  {selectedAnalysis.status === 'safe' && (
                    <>
                      <li>Document appears authentic</li>
                      <li>No additional verification required</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {/* TODO: Implement report download */}}
                className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DocumentUpload;
