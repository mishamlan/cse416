// Constants for API types and states
export const PLAN_TYPES = {
    SMD: 'smd',
    MMD: 'mmd'
  };
  
  export const STATES = {
    LA: 'la',
    NV: 'nv'
  };
  
  // Base API URL - can be configured through environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  /**
   * Generic fetch wrapper with error handling
   * @param {string} endpoint - API endpoint to call
   * @returns {Promise} - Resolved with JSON response or rejected with error
   */
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };
  
  /**
   * Fetches GeoJSON data for a state and type
   * @param {string} state - State identifier 
   * @param {string} type - Data type 
   */
  export const getGeoJson = (state, type) => {
    return fetchData(`/geojson/${state}/${type}`);
  };
  
  /**
   * Fetches demographic data for a state and type
   * @param {string} state - State identifier
   * @param {string} type - Data type
  */
 export const getDemographic = (state) => {
   return fetchData(`/demographic/${state}/`);
  };
  /**
   * Fetches district boundary data for a state
   * @param {string} state - State identifier
  */
 export const getDBoundary = (state) => {
   return fetchData(`/boundary/${state}/`);
  };
  
  /**
   * Fetches ensemble summary data
   * @param {string} state - State identifier
   * @param {string} type - Data type  -> in this case "summary"
   */
  /**
   * Expected data:
   * -- Feel free to change field name
    {
      smd: {
        numDistrictPlans: int,
        avgMinorityReps: int,
        avgDemSplit: int,
        avgRepSplit: int,
      },
      mmd: {
        // same as smd
      }
    }
   */
  export const getEnsembleSummary = (state, type) => {
    return fetchData(`/ensemble/summary/${state}/${type}/`);
  };
    
  /**
   * Fetches ensemble opportunity representatives data
   * @param {string} state - State identifier
   * @param {string} type - Data type  -> in this case "oppoReps"
   */
  /**
   * Expected data:
   * -- Fields are the range of opportunity reps
   * {
   *  smd: {
   *    0: num_of_district_plans,
   *    1: num_of_district_plans,
   *    2: num_of_district_plans,
   *    ...
   *  },
   *  mmd : {
   *    // same as smd
   *  }
   * }
   */
  export const getEnsembleOppoReps = (state, type) => {
    return fetchData(`/ensemble/summary/${state}/${type}/`);
  };
    
  /**
   * Fetches ensemble opportunity representatives data
   * @param {string} state - State identifier
   * @param {string} type - Data type  -> in this case "partySplit"
   */
  /**
   * Expected data:
   * -- Fields are the range of party splits
   * {
   *  smd: {
   *    "0-20%": num_of_district_plans,
   *    "21-40%": num_of_district_plans,
   *    "41-60%": num_of_district_plans,
   *    "61-80%": num_of_district_plans,
   *    "81-100%": num_of_district_plans,
   *    ...
   *  },
   *  mmd : {
   *    // same as smd
   *  }
   * }
   */
  export const getEnsemblePartySplit = (state, type) => {
    return fetchData(`/ensemble/summary/${state}/${type}/`);
  };
  
  /**
   * Fetches box and whisker plot data
   * @param {string} state - state
   * @param {string} group - demographic group
   * expected return data = {
   *  smd: [
   *    box: {...},
   *    enacted: int,
   *  ],
   *  mmd: [
   *    box {...},
   *    enacted: int,
   * ]
   * }
  */
  export const getBoxWhiskerData = (state, group) => {
    return fetchData(`/boxwhisker/${state}/${group}/`);
  };
  


  export const getDistrictPlan = (state, type, number) => {
    return fetchData(`/dplan/${state}/${type}/${number}/`);
  };
  /**
   * Fetches district plan data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   * @param {number} number - Plan number
   * to access fields:
   * const precinctName = geojson.features[index].properties.PRECNAME; //precinct name
   * const democraticCandidate = geojson.features[index].properties.DCAND; -> dem candidate
   * const republicanCandidate = geojson.features[index].properties.RCAND; -> republican candidate
   * const democraticVotes = geojson.features[index].properties.DVOTES; -> dem votes
   * const republicanVotes = geojson.features[index].properties.RVOTES; -> rep votes
   * const winningCandidate = geojson.features[index].properties.WCAND; -> winning candidate
   * const winningParty = geojson.features[index].properties.WPARTY; -> winning party (will return as "R" or "D")
   * const district = geojson.features[index].properties.DISTRICT;
   * const totalVAP = geojson.features[index].properties.TOTVAP; -> total voting age population
   * const hispanicVAP = geojson.features[index].properties.HVAP; -> hispanic votes
   * const coordinates = geojson.features[index].geometry.coordinates; 
   */
  export const getDistrictPlanSummary = (state, type, number) => {
    return fetchData(`/dplan/data/${state}/${type}/${number}/`);
  };
  
  /**
   * Custom hook for loading ensemble data with loading and error states
   */
  export const useEnsembleData = (state, type, number) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEnsemble = async () => {
        try {
          setLoading(true);
          const result = await getEnsembleData(state, "mmd", 0);
          console.log(result)
          setData(result);
          setError(null);
        } catch (err) {
          setError(err);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
  
      if (state && type && number) {
        fetchEnsemble();
      }
    }, [state, type, number]);
  
    return { data, loading, error };
  };
  
  /**
   * Custom hook for loading district plan data with loading and error states
   */
  export const useDistrictPlan = (state, type, number) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDistrictPlan = async () => {
        try {
          setLoading(true);
          const result = await getDistrictPlan(state, type, number);
          setData(result);
          setError(null);
        } catch (err) {
          setError(err);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
  
      if (state && type && number) {
        fetchDistrictPlan();
      }
    }, [state, type, number]);
  
    return { data, loading, error };
  };
  
  // Error messages for common API errors
  export const API_ERRORS = {
    NOT_FOUND: 'The requested resource was not found',
    SERVER_ERROR: 'An error occurred on the server',
    NETWORK_ERROR: 'Unable to connect to the server',
    INVALID_RESPONSE: 'Received invalid response from server'
  };