import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";


function useAuth() {
    const context = useContext(AuthContext)!;

    return context;
}

export default useAuth;