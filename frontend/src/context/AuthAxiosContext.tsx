import {createContext, ReactNode} from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/auth",
})

export const AuthAxiosContext = createContext(api)

type propTypes = {
  children: ReactNode | ReactNode[]
}

function AuthAxiosProvider({ children }: propTypes) {
  return <AuthAxiosContext.Provider value={api}>
    { children }
  </AuthAxiosContext.Provider>
}

export default AuthAxiosProvider