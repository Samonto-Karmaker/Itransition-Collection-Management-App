import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CollectionCard from "./CollectionCard";
import { config } from "../../../constant";

const AllCollections = () => {

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        const url = config.API_URL + "/api/collections/all";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
        fetchCollections();
    }, []);

    if(loading) {
        return (
            <div style={{
				padding: "10px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
                <Spinner animation="border" />
            </div>
        )
    }

    return (
        <div>
            <h1>AllCollections</h1>
            <Container style={{ marginBottom: "15px", marginTop: "15px" }}>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {mapCollections()}
                </Row>
            </Container>
        </div>
    );
}

export default AllCollections;