import { useEffect, useState } from 'react';
import { DCForm, JTCForm } from './components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import AuthService from '@/services/AuthService';

interface CheckList {
  [key: string]: {
    [category: string]: string[];
  };
}

const checkList: CheckList = {
  OutletOne: {
    "Journey Setup": [
      "Journey Name & Descrition",
      "Automation Linked",
      "Entry Source & Up to Date",
      "Entry Criteria & Filters",
    ],
    "Audience Targeting": [
      "Target Audience or Segment",
      "Verify that exclusion rules"
    ],
    "Automation Integration": [
      "Automation Tested and Approved",
      "Automation is set to start",
      "Contacts are routed to the automation "
    ],
    "Decision Splits": [
      "Split criteria are defined accurately",
      "Test decision split paths"
    ],
  },
  OutletTwo: {
    "Email Content & Personalization": [
      "Email templates are correctly designed",
      "Check dynamic content personalization",
      "Test preview and rendering",
    ],
    "Timing & Wait Activities": [
      "Review wait times",
      "Confirm that time-based activities",
    ],
    "Goals and Exit Criteria": [
      "Journey goals & success Criteria",
      "Set up exit criteria",
    ],
    "Email Sending Configuration": [
      "Sender Profile & Delivery options",
      "Suppression Lists or Exclusion Criteria",
    ],
  },
  OutletThree: {
    "Content and Assets": [
      "Ensure all assets in emails are functional",
      "Check tracking parameters and UTM tags",
    ],
    "Tracking and Reporting": [
      "Enable tracking for emails",
      "Set up tracking tags for website visits",
      "Ensure that tracking data is flowing correctly",
    ],
    "Testing": [
      "Perform thorough testing with sample data",
      "personalization or dynamic content",
      "Check for journey logic errors",
      "Ensure that the journey follows the correct",
    ],
    "Compliance": [
      "Verify the Journey complies CAN-SPAM, GDPR",
      "Unsubscribe and Opt-out mechanisms"
    ],
  },
  OutletFour: {
    "Error Handling": [
      "Create error paths who encounter issues",
      "Test error-handling paths"
    ],
    "Documentation": [
      "Ensure that comprehensive documentation"
    ],
    "Stakeholder Review": [
      "Conduct a review session with stakeholders"
    ],
    " Final Review": [
      "Verify all checklist items is completed",
      "Obtain approval from relevant stakeholders",
    ],
  }
}

export default function JourneyQA() {
  console.log(checkList);

  const [state, setState] = useState({
    showPrevButton: false,
    showNextButton: true,
    showDCForm: true,
    showJTCForm: false,
  });
  const [searchParams] = useSearchParams();
  const [journeyData, setJourneyData] = useState({});
  const [searchJourneyData, setSearchJourneyData] = useState({});

  const handleNextClick = () => {
    setState({
      showPrevButton: true,
      showNextButton: false,
      showDCForm: false,
      showJTCForm: true,
    });
  };

  console.log('Journey QA', journeyData);
  const handlePrevClick = () => {
    setState({
      showPrevButton: false,
      showNextButton: true,
      showDCForm: true,
      showJTCForm: false,
    });
  };

  console.log(searchJourneyData);

  useEffect(() => {
    async function initialize() {
      const params = await getParamsFromUrl();
      if (params.code) {
        await getTokenAndSaveToSession(params.code);
        await fetchJourneyData(); // Renamed the function to make it clearer
      } else {
        console.log('There is no code in the params');
      }
    }

    initialize();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  async function getTokenAndSaveToSession(code: string) {
    try {
      const authService = new AuthService();
      const result = await authService.getToken(code);
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('expiration', result.expiration.toString());
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchJourneyData() {
    try {
      const storedToken = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/sfmc/rest/get/journey', {
        headers: {
          'token': storedToken
        },
      });
      const journeyData = response.data;
      // Store the journeyData in state
      setJourneyData(journeyData);
    } catch (error) {
      console.error('Error fetching journey data:', error);
      // Handle errors
    }
  }

  async function getParamsFromUrl() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paramsArray: any = {};
    searchParams.forEach((value: string, key: string) => {
      paramsArray[key] = value;
    });

    return paramsArray;
  }

  const outlets = Object.keys(checkList);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * 1;
  const endIndex = startIndex + 1;

  const totalPages = Math.ceil(outlets.length / 1);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  return (
    <div>
      <div className="headers flex justify-between">
        <h1 className="text-4xl font-bold text-primary">Journey QA</h1>
        <div className="inline-flex">
          {state.showPrevButton && (
            <button
              onClick={handlePrevClick}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Prev
            </button>
          )}
          {state.showNextButton && (
            <button
              onClick={handleNextClick}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
      {state.showDCForm && <DCForm />}
      {state.showJTCForm && <JTCForm journeyData={journeyData} setJourneyData={setJourneyData} setSearchJourneyData={setSearchJourneyData} />}

      {outlets.slice(startIndex, endIndex).map(outlet => (
        <div key={outlet} className='flex flex-col justify-around mt-5 sm:flex-row'>
          {Object.entries(checkList[outlet]).map(([category, items]) => (
            <div key={category} className='bg-[#E9ECF6] pl-5 pr-5 min-h-[200px] min-w-[390px] flex flex-col items-center justify-center mb-5 sm:mr-5 sm:mb-0'>
              <h3>{category}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index} className='flex items-center'>
                    <input type="checkbox" id={`item-${index}`} className='mr-2' />
                    <label htmlFor={`item-${index}`}>{item}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
