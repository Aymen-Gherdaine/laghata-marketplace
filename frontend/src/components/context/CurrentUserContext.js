import { useState, useEffect } from "react";
import { createContext } from "react";
import { getPayloadFromToken } from "../../utils/utils";

export const CurrentUserContext = createContext();

const CurrentUserContextProvider = ({ children }) => {
  // get token from local storage
  const token = localStorage.getItem("token");

  // state to store current user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      setUser(getPayloadFromToken(token));
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
