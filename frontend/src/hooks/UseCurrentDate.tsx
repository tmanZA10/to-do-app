import {useContext} from "react";
import { CurrentDateContext } from "../context/CurrentDateContext.tsx";


function useCurrentDate() {
  return useContext(CurrentDateContext);
}

export default useCurrentDate;