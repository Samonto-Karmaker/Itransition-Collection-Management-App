import { Card, Button } from 'react-bootstrap';

const CollectionCard = ({ collection }) => {

    const {name, category, description} = collection;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary">View Collection</Button>
            </Card.Footer>
        </Card>
    )
};

export default CollectionCard;