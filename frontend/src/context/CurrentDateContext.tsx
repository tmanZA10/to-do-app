import {createContext, ReactNode, useState} from "react";


type propTypes = {
  children: ReactNode | ReactNode[]
}
type contextType = {
  currentDate: Date,
  setCurrentDate: (date: Date) => void
}

export const CurrentDateContext = createContext<contextType | undefined>(undefined);

function CurrentDateProvider({ children }: propTypes) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  return (
    <CurrentDateContext.Provider value={{currentDate, setCurrentDate}} >
      {children}
    </CurrentDateContext.Provider>
  );
}

export default CurrentDateProvider;