/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface JourneyToCheckFormData {
  journeyName: string;
  version: string;
}

interface JourneyToCheckFormProps {
  journeyData: any;
  setJourneyData: React.Dispatch<React.SetStateAction<any>>;
  setSearchJourneyData: React.Dispatch<React.SetStateAction<any>>;
}

const JourneyToCheckForm: React.FC<JourneyToCheckFormProps> = ({ journeyData }) => {
  const [formData, setFormData] = useState<JourneyToCheckFormData>({
    journeyName: '',
    version: '',
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
    const searchId = findJourneyIdByName(formData.journeyName, journeyData);
    const pageCount = getPageCount(journeyData);
  
    console.log('searchID', searchId);
    console.log('pageCount', pageCount);
  
    if (searchId === null && pageCount > 0) {
      // Variable to store the found searchId
      let foundSearchId: string | null = null;
  
      // Loop through pages to find the journey ID
      for (let page = 1; page <= pageCount; page++) {
        const searchIdOnPage = await searchJourneyData(page, formData.journeyName);
  
        if (searchIdOnPage !== null) {
          // Store the found searchId and break the loop
          foundSearchId = searchIdOnPage;
          break;
        }
      }
  
      // Do something with the found searchId, if any
      if (foundSearchId !== null) {
        console.log('Found Journey ID:', foundSearchId);
      } else {
        console.log('Journey ID not found on any page.');
      }
    }
  };
  
  async function searchJourneyData(page: number, journeyName: string): Promise<string | null> {
    try {
      const storedToken = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/sfmc/rest/get/journey', {
        headers: {
          'token': storedToken,
          'page': page,
        },
      });
  
      const journeyData = response.data;
      const searchIdOnPage = findJourneyIdByName(journeyName, journeyData);
  
      if (searchIdOnPage !== null) {
        console.log(`Found Journey ID (${journeyName}) on Page ${page}:`, searchIdOnPage);
        return searchIdOnPage;
      }
  
      return null;
    } catch (error) {
      console.error(`Error fetching journey data for page ${page}:`, error);
      return null;
    }
  }

  function findJourneyIdByName(JourneyName: string, JourneyData: any | null): string | null {

    if (JourneyData && JourneyData.items && Array.isArray(JourneyData.items)) {

      const foundJourney = JourneyData.items.find((item: { name: string; }) => item.name === JourneyName);

      return foundJourney ? foundJourney.id : null;
    }

    return null;
  }

  function getPageCount(journeyData: any): number {
    // Default page size to 50 if not provided
    return Math.ceil(journeyData.count / 50);
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#8248e5] text-center">Journey to Check</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="journeyName" className="block text-gray-700 text-sm font-bold mb-2">
            Journey Name:
          </label>
          <input
            type="text"
            id="journeyName"
            name="journeyName"
            value={formData.journeyName}
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
            value={formData.version}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violet-500"
            required
          />
        </div>
        {/* Add styling for other input fields as needed */}
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

export default JourneyToCheckForm;
