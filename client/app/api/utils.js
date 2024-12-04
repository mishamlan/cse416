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
  export const getDemographic = (state, type) => {
    return fetchData(`/demographic/${state}/${type}`);
  };
  
  /**
   * Fetches ensemble summary data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   */
  export const getEnsembleSummary = (state, type) => {
    return fetchData(`/ensemble/summary/${state}/${type}`);
  };
  
  /**
   * Fetches detailed ensemble data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   * @param {number} number - Ensemble number
   */
  export const getEnsembleData = (state, type, number) => {
    return fetchData(`/ensemble/data/${state}/${type}/${number}`);
  };
  
  /**
   * Fetches box and whisker plot data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   * @param {number} number - Ensemble number
   */
  export const getBoxWhiskerData = (state, type, number) => {
    return fetchData(`/boxwhisker/${state}/${type}/${number}`);
  };
  
  /**
   * Fetches district plan data
   * @param {string} state - State identifier
   * @param {string} type - Plan type (SMD/MMD)
   * @param {number} number - Plan number
   */
  export const getDistrictPlan = (state, type, number) => {
    return fetchData(`/dplan/${state}/${type}/${number}`);
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
          const result = await getEnsembleData(state, type, number);
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