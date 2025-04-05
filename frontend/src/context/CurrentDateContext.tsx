import {createContext, ReactNode, useState} from "react";
import {setMaxTime} from "../util.tsx";


type propTypes = {
  children: ReactNode | ReactNode[]
}
type contextType = {
  currentDate: Date,
  setCurrentDate: (date: Date) => void
}

export const CurrentDateContext = createContext<contextType | undefined>(undefined);

function CurrentDateProvider({ children }: propTypes) {
  const [currentDate, setCurrentDate] = useState<Date>(setMaxTime(new Date()));
  return (
    <CurrentDateContext.Provider value={{currentDate, setCurrentDate}} >
      {children}
    </CurrentDateContext.Provider>
  );
}

export default CurrentDateProvider;