import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // history of symptom results
  const [history, setHistory] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, history, setHistory }}>
      {children}
    </UserContext.Provider>
  );
}
