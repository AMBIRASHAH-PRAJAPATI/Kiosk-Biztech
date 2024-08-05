import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const SearchContextValue = useContext(SearchContext);
  if (!SearchContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return SearchContextValue;
};
