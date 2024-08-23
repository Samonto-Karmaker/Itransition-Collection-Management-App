import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../../../components/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { config } from "../../../constant";
import { Link } from "react-router-dom";

const CollectionCard = ({ collection }) => {
	const { id, userId, name, category, description } = collection;
	const { User } = useContext(UserContext);
	const token = localStorage.getItem("token");

	const handleDelete = async (collectionId) => {
		if (
			window.confirm("Are you sure you want to delete this collection?")
		) {
			console.log(collection);
			const url =
				config.API_URL + "/api/collections/delete/" + collectionId;
			try {
				const response = await fetch(url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const result = await response.text();
				if (response.ok) {
					window.alert("Collection deleted successfully");
					window.location.reload();
					return;
				} else {
					window.alert(result);
				}
			} catch (error) {
				console.error(error);
				window.alert("Failed to delete collection");
			}
		}
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{category}
				</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
			<Card.Footer
				style={{
					display: "flex",
					justifyContent: "flex-end",
					gap: "10px",
				}}
			>
				{User && User.id === userId && (
					<Button variant="danger" onClick={() => handleDelete(id)}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>
				)}
				<Button variant="primary">
					<Link
						to={`/collections/${id}`}
						state={{ collection: collection }}
						style={{ textDecoration: "none", color: "white" }}
					>
						View Collection
					</Link>
				</Button>
			</Card.Footer>
		</Card>
	);
};

export default CollectionCard;
