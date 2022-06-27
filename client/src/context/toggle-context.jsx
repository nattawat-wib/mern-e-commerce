import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const ToggleContext = createContext();

export default function ToggleContextProvider({ children }) {
    const [navCartItem, setNavCartItem] = useState(0);

    useEffect(() => {
        axios('get', '/cart', null, resp => setNavCartItem(resp.data.cart.totalProduct), null, false);
    }, [])

    return (
        <ToggleContext.Provider value={{
            navCartItem,
            setNavCartItem
        }}>
            {children}
        </ToggleContext.Provider>
    )
}

export const useToggleContext = () => useContext(ToggleContext);