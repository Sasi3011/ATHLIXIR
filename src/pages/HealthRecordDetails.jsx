import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const HealthRecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchRecordDetails();
  }, [id]);

  const fetchRecordDetails = async () => {
    try {
      const response = await axios.get(`/api/records/${id}`);
      setRecord(response.data);
    } catch (err) {
      setError('Failed to load health record details');
      console.error('Record details error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post(`/api/records/${id}/verify`);
      fetchRecordDetails();
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  const handleAnalyze = async () => {
    try {
      await axios.post(`/api/records/${id}/analyze`);
      fetchRecordDetails();
    } catch (err) {
      console.error('Analysis error:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`/api/records/${id}`);
        navigate('/dashboard');
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Record not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{record.title}</h1>
          <p className="mt-2 text-gray-600">
            Created on {new Date(record.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-4">
          {user.role === 'medical_staff' && record.verificationStatus === 'pending' && (
            <button
              onClick={handleVerify}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Verify Record
            </button>
          )}
          <button
            onClick={handleAnalyze}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            Analyze Record
          </button>
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Edit Record
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Record
          </button>
        </div>
      </div>

      {/* Verification Status */}
      <div className="mb-8">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            record.verificationStatus === 'verified'
              ? 'bg-green-100 text-green-800'
              : record.verificationStatus === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {record.verificationStatus === 'verified' ? (
            <CheckCircleIcon className="h-5 w-5 mr-2" />
          ) : record.verificationStatus === 'pending' ? (
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          ) : (
            <XCircleIcon className="h-5 w-5 mr-2" />
          )}
          {record.verificationStatus.charAt(0).toUpperCase() + record.verificationStatus.slice(1)}
        </div>
      </div>

      {/* AI Analysis */}
      {record.aiAnalysis && (
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">AI Analysis</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Authenticity Score</h4>
                <div className="mt-1">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary bg-opacity-10">
                          {record.aiAnalysis.authenticity.score}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-10">
                      <div
                        style={{ width: `${record.aiAnalysis.authenticity.score}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {record.aiAnalysis.authenticity.flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Red Flags</h4>
                  <ul className="mt-2 space-y-2">
                    {record.aiAnalysis.authenticity.flags.map((flag, index) => (
                      <li key={index} className="flex items-center text-sm text-red-600">
                        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {record.aiAnalysis.recommendations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Recommendations</h4>
                  <ul className="mt-2 space-y-2">
                    {record.aiAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Record Details</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Record Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {record.recordType}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {record.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(record.date).toLocaleDateString()}
              </dd>
            </div>

            {/* Provider Information */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Provider</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-1">
                  <p>Name: {record.provider.name}</p>
                  <p>Specialization: {record.provider.specialization}</p>
                  <p>Institution: {record.provider.institution}</p>
                  <p>Contact: {record.provider.contactInfo}</p>
                </div>
              </dd>
            </div>

            {/* Diagnosis */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-1">
                  <p>Condition: {record.diagnosis.condition}</p>
                  <p>Severity: {record.diagnosis.severity}</p>
                  <p>Notes: {record.diagnosis.notes}</p>
                </div>
              </dd>
            </div>

            {/* Treatment */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Treatment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Treatment Plan</p>
                    <p>{record.treatment.plan}</p>
                  </div>
                  <div>
                    <p className="font-medium">Duration</p>
                    <p>{record.treatment.duration}</p>
                  </div>
                  {record.treatment.medications.length > 0 && (
                    <div>
                      <p className="font-medium">Medications</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {record.treatment.medications.map((med, index) => (
                          <li key={index}>
                            {med.name} - {med.dosage} ({med.frequency})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {record.treatment.recommendations.length > 0 && (
                    <div>
                      <p className="font-medium">Recommendations</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {record.treatment.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </dd>
            </div>

            {/* Follow-up */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Follow-up</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-1">
                  <p>Required: {record.followUp.required ? 'Yes' : 'No'}</p>
                  {record.followUp.required && (
                    <>
                      <p>Date: {new Date(record.followUp.date).toLocaleDateString()}</p>
                      <p>Notes: {record.followUp.notes}</p>
                    </>
                  )}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordDetails; 