import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { UserContext } from '../../../components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CollectionCard = ({ collection }) => {

    const {userId, name, category, description} = collection;
    const {User} = useContext(UserContext);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Footer style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
            }}>
                {User && User.id === userId && (
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                )}
                <Button variant="primary">View Collection</Button>
            </Card.Footer>
        </Card>
    )
};

export default CollectionCard;