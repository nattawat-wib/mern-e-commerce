import { createContext, useContext, useReducer, useEffect } from "react";

const AuthCpContext = createContext();

const authCpReducer = (state, { type }) => {
    if (type === 'login') {
        return { isAuth: true }

    } else if (type === 'logout') {
        return { isAuth: false }

    }

    return state
}

export default function AuthCpContextProvider({ children }) {
    const [authCp, authCpDispatch] = useReducer(authCpReducer, { isAuth: false });

    return (
        <AuthCpContext.Provider value={{
            authCp,
            authCpDispatch
        }}>
            {children}
        </AuthCpContext.Provider>
    )
}

export const useAuthCpContext = () => useContext(AuthCpContext);