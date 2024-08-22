import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ItemsTable from "../item-components/ItemTable";

const CollectionDetails = ({ collection }) => {
    const { id, userId, name, category, description } = collection;

    return (
        <Container className="collection-details">
            <Row>
                <Col>
                    <Card className="collection-header">
                        <Card.Body>
                            <Card.Title as="h1">{name}</Card.Title>
                            <Card.Subtitle as="h2" className="mb-2 text-muted">
                                {category}
                            </Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <h2 className="items-title">Items</h2>
                    <ItemsTable 
                        collectionId={id} 
                        userId={userId} 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CollectionDetails;
