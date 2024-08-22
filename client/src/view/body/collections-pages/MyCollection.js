import { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/UserContext";
import CollectionCard from "./CollectionCard";
import { config } from "../../../constant";

const MyCollection = () => {

    const { User } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        const url = config.API_URL + "/api/collections/user";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                const extractedData = result.map((item) => item.data);
                if (extractedData.length === 0) {
                    window.alert("No collections found");
                    return;
                }
                setCollections(extractedData);
            } else {
                window.alert(result.message);
            }
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    const mapCollections = () => {
        return collections.map((collection) => {
            return (
                <Col key={collection.id} xs={12} md={6} lg={4}>
                    <CollectionCard collection={collection} />
                </Col>
            );
        });
    };

    useEffect(() => {
        if (User && token) {
            fetchCollections();
        }
    }, [token, User]);

    if(loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!User) {
        return (
            <div>
                <h1>My Collection</h1>
                <p>Please login to view your collection</p>
            </div>
        );
    }

	return (
		<div>
			<h1>My Collection</h1>
            <Button>
                <Link to="/add-collection" style={{textDecoration: "none", color: "white"}}>Add Collection</Link>
            </Button>
            <Container style={{ marginBottom: "15px", marginTop: "15px" }}>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {mapCollections()}
                </Row>
            </Container>
		</div>
	);
};

export default MyCollection;
