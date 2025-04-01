import axios from "axios";
import { createContext, ReactNode } from "react";
import useAuth from "../hooks/UseAuth.tsx";
import useAuthAxios from "../hooks/UseAuthAxios.tsx";
import {backendURL} from "../AppVariables.ts";

const api = axios.create(
  {
    baseURL: `${backendURL}/api`,
  }
)

export const MainAxiosContext = createContext(api)

type propTypes = {
  children: ReactNode | ReactNode[]
}

function MainAxiosProvider({ children }: propTypes) {
  const { accessToken, setAccessToken, setUserId } = useAuth()
  const authAxios = useAuthAxios()

  api.interceptors.request.use(
    request => {
      const initAuthHeader = request.headers["Authorization"]
      if (initAuthHeader && initAuthHeader !== `Bearer ${accessToken}`) {
        return request
      }
      request.headers["Authorization"] = `Bearer ${accessToken}`
      return request;
    },
    error => Promise.reject(error)
  )

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config
      if (error.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshResponse = await authAxios.get(
          "/refresh",
          {
            withCredentials: true,
          }
        )
        const newToken = refreshResponse.data.accessToken
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`
        setAccessToken(newToken)
        setUserId(refreshResponse.data.userId)
        return api(originalRequest)
      }
      return Promise.reject(error)
    }
  )

  return (
    <MainAxiosContext.Provider value={api}>
      { children }
    </MainAxiosContext.Provider>
  )
}

export default MainAxiosProvider