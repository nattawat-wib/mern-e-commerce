import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export default function ToggleContextProvider({ children }) {
    const [cartItem, setCartItem] = useState(0);

    return (
        <ToggleContext.Provider value={{
            cartItem, setCartItem
        }}>
            {children}
        </ToggleContext.Provider>
    )
}

export const useToggleContext = () => useContext(ToggleContext);