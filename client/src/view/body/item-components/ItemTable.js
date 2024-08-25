import { useEffect, useState, useContext } from 'react';
import { Table, Button, Spinner} from 'react-bootstrap';
import { UserContext } from '../../../components/UserContext';
import { fetchTags } from '../../../components/utils/FetchPreDefinedTags';
import { config } from "../../../constant";

const ItemsTable = ({ collectionId, userId }) => {
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState({});
    const [loading, setLoading] = useState(true);

    const { User } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const apiUrl = config.API_URL;

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/items/collection/${collectionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                window.alert('Failed to fetch items');
                return;
            }
            const result = await response.json();
            const extractedItems = result.map(item => item.data);
            setItems(extractedItems);
            
        } catch (err) {
            console.error(err);
            window.alert('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAndSetTags = async () => {
            try {
                const tagsData = await fetchTags();
                const tagsMap = {};
                tagsData.forEach(tag => {
                    tagsMap[tag.value] = tag.label;
                });
                setTags(tagsMap);
            } catch (err) {
                window.alert('Failed to fetch tags');
            }
        };

        fetchItems();
        fetchAndSetTags();
    }, [collectionId]);

    const handleLike = async (itemId) => {
        try {
            const response = await fetch(`${apiUrl}/api/items/like/${itemId}`, { 
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                const result = await response.text();
                window.alert('Failed to like item: ' + result);
                return;
            }
            await fetchItems();
        } catch (err) {
            window.alert('Failed to like item');
        }
    };

    const handleUnlike = async (itemId) => {
        try {
            const response = await fetch(`${apiUrl}/api/items/unlike/${itemId}`, { 
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                const result = await response.text();
                window.alert('Failed to like item: ' + result);
                return;
            }
            await fetchItems();
        } catch (err) {
            window.alert('Failed to unlike item');
        }
    };

    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure want to delete this item?")) {
            try {
                const response = await fetch(`${apiUrl}/api/items/delete/${itemId}`, { 
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    const result = await response.text();
                    window.alert('Failed to like item: ' + result);
                    return;
                }
                await fetchItems();
            } catch (err) {
                window.alert('Failed to delete item');
            }
        }
    };

    if (loading) {
        return (
            <div style={{padding: "10px"}}>
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Table striped bordered hover style={{marginTop: "10px"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tags</th>
                    {User && <th>Like</th>}
                    {userId === User?.id && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.tags.map(tagId => tags[tagId]).join(', ')}</td>
                        {User && (
                            <td>
                                {item.likes.includes(User.id) ? (
                                    <Button variant="secondary" onClick={() => handleUnlike(item.id)}>Unlike</Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleLike(item.id)}>Like</Button>
                                )}
                            </td>
                        )}
                        <td>
                            {userId === User?.id && (
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ItemsTable;