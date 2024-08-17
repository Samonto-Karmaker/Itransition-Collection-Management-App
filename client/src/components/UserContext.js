import { useState, useEffect, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [User, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <UserContext.Provider value={{ User, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };