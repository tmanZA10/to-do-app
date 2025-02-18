import {createContext, ReactNode, useState} from "react";


type AuthContextType = {
    accessToken: string,
    setAccessToken: (accessToken: string) => void,
}

type propTypes = {
    children: ReactNode | ReactNode[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: propTypes) {

    const [accessToken, setAccessToken] = useState("")

    return (
        <AuthContext.Provider value={ {accessToken, setAccessToken} }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;