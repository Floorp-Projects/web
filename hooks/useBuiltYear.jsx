import { createContext, useContext } from 'react';

const BuiltYearContext = createContext(undefined);

export function useBuiltYear() {
  const builtYear = useContext(BuiltYearContext);

  if (builtYear === undefined) {
    throw new Error('useBuiltYear must be used within BuiltYearProvider');
  }

  return builtYear;
}

export default function BuiltYearProvider({ children }) {
  return (
    <BuiltYearContext.Provider value={new Date().getFullYear()}>
      {children}
    </BuiltYearContext.Provider>
  );
}
