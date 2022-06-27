import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export default function ToggleContextProvider({ children }) {
    const [navCartItem, setNavCartItem] = useState(0);

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