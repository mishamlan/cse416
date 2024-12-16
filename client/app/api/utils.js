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
   * Fetches district plan data for individual district, based on a state and type and its number
   * @param {string} state - State identifier
   * @param {string} type - Data type
   * @param {int} number - district plan number
   */
  export const getDistrictPlanData = (state, type, number) => {
    return fetchData(`/dplan/data/${state}/${type}/${number}/`);
  };
   /**
   * Fetches district plan summary for individual district, based on a state and type and its number
   * @param {string} state - State identifier
   * @param {string} type - Data type
   * @param {int} number - district plan number
   */
   export const getDistrictPlanSummary = (state, type, number) => {
    return fetchData(`/dplan/summary/${state}/${type}/${number}/`);
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
   * @param {string} type - Plan type (SMD/MMD)
   * @param {int} number - based on which ensemble picked ??
   */
  export const getEnsembleSummary = (state, type, number) => {
    return fetchData(`/ensemble/summary/${state}/${type}/${number}/`);
  };
  
  /**
   * Fetches detailed ensemble data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   * @param {number} number - Ensemble number
   */
  export const getEnsembleData = (state, type, number) => {
    return fetchData(`/ensemble/data/${state}/${type}/${number}/`);
  };
  
  /**
   * Fetches box and whisker plot data
   * @param {string} group - demographic group
   * @param {string} type - Plan type (SMD/MMD)
   * @param {int} number - district number
   * @param {int} index - index number of disrict plan
   * all the possible groups: {  
    asian,
    black,
    white,
    hispanic,
    democrat,
    republican, 
    american_indian,
  }
   */
  export const getBoxWhiskerData = (group, type, district, index) => {
    return fetchData(`/boxwhisker/${group}/${type}/${district}/${index}/`);
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

  export const getDistrictPlan = (state, type, number) => {
    return fetchData(`/dplan/${state}/${type}/${number}/`);
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