import {useContext} from "react";
import {CurrentListContext} from "../context/CurrentListContext.tsx";


function useCurrentList(){
  return useContext(CurrentListContext)!
}

export default useCurrentList