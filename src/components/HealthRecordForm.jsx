import { useState } from 'react';
import axios from 'axios';

const HealthRecordForm = ({ record, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    recordType: record?.recordType || 'injury',
    title: record?.title || '',
    description: record?.description || '',
    date: record?.date ? new Date(record.date).toISOString().split('T')[0] : '',
    provider: record?.provider || {
      name: '',
      specialization: '',
      institution: '',
      contactInfo: '',
    },
    diagnosis: record?.diagnosis || {
      condition: '',
      severity: 'mild',
      notes: '',
    },
    treatment: record?.treatment || {
      plan: '',
      duration: '',
      medications: [],
      recommendations: [],
    },
    followUp: record?.followUp || {
      required: false,
      date: '',
      notes: '',
    },
  });

  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
  });

  const [recommendation, setRecommendation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMedication = () => {
    if (medication.name) {
      setFormData((prev) => ({
        ...prev,
        treatment: {
          ...prev.treatment,
          medications: [...prev.treatment.medications, medication],
        },
      }));
      setMedication({
        name: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const removeMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: prev.treatment.medications.filter((_, i) => i !== index),
      },
    }));
  };

  const addRecommendation = () => {
    if (recommendation) {
      setFormData((prev) => ({
        ...prev,
        treatment: {
          ...prev.treatment,
          recommendations: [...prev.treatment.recommendations, recommendation],
        },
      }));
      setRecommendation('');
    }
  };

  const removeRecommendation = (index) => {
    setFormData((prev) => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        recommendations: prev.treatment.recommendations.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (record?._id) {
        await axios.put(`/api/records/${record._id}`, formData);
      } else {
        await axios.post('/api/records', formData);
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error saving health record:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the basic details of the health record.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="recordType" className="block text-sm font-medium text-gray-700">
                  Record Type
                </label>
                <select
                  id="recordType"
                  name="recordType"
                  value={formData.recordType}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="injury">Injury</option>
                  <option value="medical_exam">Medical Exam</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="treatment">Treatment</option>
                  <option value="prescription">Prescription</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Information */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Provider Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the details of the healthcare provider.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="provider.name" className="block text-sm font-medium text-gray-700">
                  Provider Name
                </label>
                <input
                  type="text"
                  name="provider.name"
                  id="provider.name"
                  value={formData.provider.name}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="provider.specialization" className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  name="provider.specialization"
                  id="provider.specialization"
                  value={formData.provider.specialization}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="provider.institution" className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="provider.institution"
                  id="provider.institution"
                  value={formData.provider.institution}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="provider.contactInfo" className="block text-sm font-medium text-gray-700">
                  Contact Information
                </label>
                <input
                  type="text"
                  name="provider.contactInfo"
                  id="provider.contactInfo"
                  value={formData.provider.contactInfo}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Diagnosis</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the diagnosis details.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="diagnosis.condition" className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <input
                  type="text"
                  name="diagnosis.condition"
                  id="diagnosis.condition"
                  value={formData.diagnosis.condition}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="diagnosis.severity" className="block text-sm font-medium text-gray-700">
                  Severity
                </label>
                <select
                  id="diagnosis.severity"
                  name="diagnosis.severity"
                  value={formData.diagnosis.severity}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="diagnosis.notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  id="diagnosis.notes"
                  name="diagnosis.notes"
                  rows={3}
                  value={formData.diagnosis.notes}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Treatment</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the treatment details.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="treatment.plan" className="block text-sm font-medium text-gray-700">
                  Treatment Plan
                </label>
                <textarea
                  id="treatment.plan"
                  name="treatment.plan"
                  rows={3}
                  value={formData.treatment.plan}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="treatment.duration" className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="treatment.duration"
                  id="treatment.duration"
                  value={formData.treatment.duration}
                  onChange={handleChange}
                  className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              {/* Medications */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Medications</label>
                <div className="mt-2 space-y-4">
                  {formData.treatment.medications.map((med, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={med.name}
                          readOnly
                          className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMedication(index)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="name"
                        value={medication.name}
                        onChange={handleMedicationChange}
                        placeholder="Medication name"
                        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="dosage"
                        value={medication.dosage}
                        onChange={handleMedicationChange}
                        placeholder="Dosage"
                        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="frequency"
                        value={medication.frequency}
                        onChange={handleMedicationChange}
                        placeholder="Frequency"
                        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addMedication}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Recommendations</label>
                <div className="mt-2 space-y-4">
                  {formData.treatment.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={rec}
                          readOnly
                          className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRecommendation(index)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                        placeholder="Add a recommendation"
                        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addRecommendation}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Follow-up</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the follow-up details.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="followUp.required"
                    id="followUp.required"
                    checked={formData.followUp.required}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        followUp: {
                          ...prev.followUp,
                          required: e.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="followUp.required" className="ml-2 block text-sm text-gray-900">
                    Follow-up required
                  </label>
                </div>
              </div>

              {formData.followUp.required && (
                <>
                  <div className="col-span-6">
                    <label htmlFor="followUp.date" className="block text-sm font-medium text-gray-700">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      name="followUp.date"
                      id="followUp.date"
                      value={formData.followUp.date}
                      onChange={handleChange}
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="followUp.notes" className="block text-sm font-medium text-gray-700">
                      Follow-up Notes
                    </label>
                    <textarea
                      id="followUp.notes"
                      name="followUp.notes"
                      rows={3}
                      value={formData.followUp.notes}
                      onChange={handleChange}
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {record?._id ? 'Update Record' : 'Create Record'}
        </button>
      </div>
    </form>
  );
};

export default HealthRecordForm; 