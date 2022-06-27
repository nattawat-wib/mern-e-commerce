import { createContext, useContext, useReducer, useEffect } from "react";
import axios from './../api/axios';

const AuthContext = createContext();

const authReducer = (state, { type, payload }) => {
    if (type === 'login') {
        return {
            isAuth: true,
            member: payload.member
        };

    } else if (type === 'logout') {
        return {
            isAuth: false
        }
    }

    else if (type === 'update') {
        return {
            isAuth: true,
            member: payload.member
        };
    }

    return state
}

export default function AuthContextProvider({ children }) {
    const [auth, authDispatch] = useReducer(authReducer, { isAuth: false });

    useEffect(() => {
        axios('get', '/auth/verify-token', null, resp => {
            authDispatch({ type: 'login', payload: resp.data })
        }, null, false)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                authDispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);