import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ItemsTable from "../item-components/ItemTable";
import { UserContext } from "../../../components/UserContext";
import { Link, useLocation } from "react-router-dom";

const CollectionDetails = () => {
	const { User } = useContext(UserContext);

	const location = useLocation();
	const collection = location.state?.collection;

	if (!collection) {
		return <h1>Collection not found</h1>;
	}

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
					{User && User.id === userId && (
						<Button style={{ textAlign: "left" }} variant="primary">
							<Link
								to="/collections/add-item"
								state={{
									parentCollection: collection,
								}}
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								Add Item
							</Link>
						</Button>
					)}
					<ItemsTable collectionId={id} userId={userId} />
				</Col>
			</Row>
		</Container>
	);
};

export default CollectionDetails;
