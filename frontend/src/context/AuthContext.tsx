import {createContext, ReactNode, useState} from "react";


type AuthContextType = {
    accessToken: string,
    setAccessToken: (accessToken: string) => void,
    userId: string,
    setUserId: (userId: string) => void,
}

type propTypes = {
    children: ReactNode | ReactNode[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProvider({ children }: propTypes) {

    const [accessToken, setAccessToken] = useState("")
    const [userId, setUserId] = useState("")

    return (
        <AuthContext.Provider value={ {
            accessToken,
            setAccessToken,
            userId,
            setUserId
        }
        }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;