import React, { useState, ChangeEvent, FormEvent } from 'react';

interface JourneyFormData {
  journeyName: string;
  version: string;
  entrySource: string;
  automationName: string;
  schedule: string;
}

const DefaultConfigurationForm: React.FC = () => {
  const [journeyFormData, setJourneyFormData] = useState<JourneyFormData>({
    journeyName: '',
    version: '',
    entrySource: '',
    automationName: '',
    schedule: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setJourneyFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Do something with the form data, like sending it to a server
    console.log('Form submitted:', journeyFormData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#8248e5] text-center">Journey Default Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="journeyName" className="block text-gray-700 text-sm font-bold mb-2">
            Journey Name:
          </label>
          <input
            type="text"
            id="journeyName"
            name="journeyName"
            value={journeyFormData.journeyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="version" className="block text-[#1D2F64] text-sm font-bold mb-2">
            Version:
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={journeyFormData.version}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="entrySource" className="block text-gray-700 text-sm font-bold mb-2">
            Entry Source:
          </label>
          <input
            type="text"
            id="entrySource"
            name="entrySource"
            value={journeyFormData.entrySource}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="automationName" className="block text-gray-700 text-sm font-bold mb-2">
            Automation Name:
          </label>
          <input
            type="text"
            id="automationName"
            name="automationName"
            value={journeyFormData.automationName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="schedule" className="block text-gray-700 text-sm font-bold mb-2">
            Schedule:
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={journeyFormData.schedule}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#8248e5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DefaultConfigurationForm;
