import { useEffect, useContext } from "react";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { config } from "../constant";
import { UserContext } from "../components/UserContext";
import RemoveCredentials from "../components/utils/RemoveCredentials";

const MainComponent = () => {
    const jwt = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const { setUser } = useContext(UserContext);

    const checkTokenExpiry = async () => {
        if (!jwt) {
            RemoveCredentials(setUser);
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
                    RemoveCredentials(setUser);
                }
            } else {
                RemoveCredentials(setUser);
                const error = await response.text();
                console.error("Error checking token expiry: ", error);
            }
        } catch (error) {
            console.error("Error checking token expiry: ", error);
            RemoveCredentials(setUser);
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