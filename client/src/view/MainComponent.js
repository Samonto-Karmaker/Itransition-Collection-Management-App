import { useEffect, useContext } from "react";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { config } from "../constant";
import { UserContext } from "../components/UserContext";

const MainComponent = () => {
    const jwt = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const { setUser } = useContext(UserContext);

    const removeInvalidCredentials = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const checkTokenExpiry = async () => {
        if (!jwt) {
            removeInvalidCredentials();
            return;
        }

        try {
            const response = await fetch(`${config.API_URL}/api/auth/isTokenStillValid`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });

            if (response.ok) {
                const result = await response.text();
                if (result === "true") {
                    const userObj = JSON.parse(user);
                    setUser(userObj);
                    console.log("Token is still valid");
                } else {
                    removeInvalidCredentials();
                }
            } else {
                removeInvalidCredentials();
                const error = await response.text();
                console.error("Error checking token expiry: ", error);
            }
        } catch (error) {
            console.error("Error checking token expiry: ", error);
            removeInvalidCredentials();
        }
    };

    useEffect(() => {
        checkTokenExpiry();
    }, [jwt]);

    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default MainComponent;