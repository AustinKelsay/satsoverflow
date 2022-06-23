import { 
    createContext,
    useContext,
    useState,
    useEffect, 
    useMemo
  } from 'react';
import { publicFetch } from '../util/fetcher'
  
  const UserContext = createContext();
  
  export function UserWrapper({ children }) {
    /* Construct a wrapper that provides the user object store. */
    const [ user, setUser ] = useState({ load: true });
  
    useEffect(() => {
      if (user.load) {
        getUser((data) => setUser(data))
      }
    })
  
    const contextValue = useMemo(() => {
      /* Format and cache our user object for the Provider. */
      return [ user, setUser ]
    }, [ user, setUser ]);
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  }
  
  export function useUserContext() {
    /* Components can import this method 
     * in order to access our user store.
     */
    return useContext(UserContext);
  }
  
  async function getUser(callback) {
    try {
      const res  = await publicFetch('/api/user/read')
  
      if (res.status === 401) {
        return callback({ load: false })
      }
  
      const json = await res.json()
      return callback(json)
    } catch(e) { console.error(e) }
  }