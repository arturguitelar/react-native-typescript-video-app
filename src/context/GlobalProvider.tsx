import { createContext, useContext, useState, useEffect } from 'react';
import { http } from '../services/http/http';
import { CurrentUser } from '../services/http/models/user';

interface IGlobalProvider {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: CurrentUser | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  isLoading: boolean;
}

const GlobalContext = createContext<IGlobalProvider | null>(null);

export const useGlobalContext = () =>
  useContext(GlobalContext) as IGlobalProvider;

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    http
      .getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
