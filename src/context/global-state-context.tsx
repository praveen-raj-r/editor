import { createContext, useContext, useState, useEffect } from 'react';

type GlobalStateProps = {
    children: React.ReactNode;
};
interface GlobalStateContextType {
    domainName: string;
    setDomainName: (text: string) => void;
}
const initialState: GlobalStateContextType = {
    domainName: "",
    setDomainName: () => null,
};
const GlobalStateContext = createContext<GlobalStateContextType>(initialState);

export const GlobalStateProvider: React.FC<GlobalStateProps> = ({ children }) => {
    const [domainName, setDomainName] = useState<string>(() => {
        return sessionStorage.getItem("DomainName") || ""; // Default to an empty string if nothing is in storage
    });
    // Update session storage whenever the state changes
    useEffect(() => {
        sessionStorage.setItem("DomainName", domainName);
    }, [domainName]);
    return (
        <GlobalStateContext.Provider value={{ domainName, setDomainName }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalStateContextType => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};