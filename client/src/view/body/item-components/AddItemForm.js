import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { useLocation } from "react-router-dom";
import { fetchTags } from "../../../components/utils/FetchPreDefinedTags";
import { UserContext } from "../../../components/UserContext";
import { config } from "../../../constant";

const AddItemForm = () => {
    const { User } = useContext(UserContext);
    const token = localStorage.getItem('token');

    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [customFieldsData, setCustomFieldsData] = useState({});
    const location = useLocation();
    const parentCollection = location.state ? location.state.parentCollection : null;

    const { id, userId, custom_fields } = parentCollection;

    useEffect(() => {
        const loadTags = async () => {
            const fetchedTags = await fetchTags();
            console.log(fetchedTags);
            setTags(fetchedTags);
        };
        loadTags();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCustomFieldChange = (fieldName, value) => {
        setCustomFieldsData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!User || User.id !== userId || !token) {
            window.alert("User not authorized to add item");
            console.error("User not authorized to add item");
            return;
        }

        const newItem = {
            collectionId: id,
            name: name,
            tags: selectedTags.map(tag => tag.label),
            custom_fields: customFieldsData
        };

        const url = `${config.API_URL}/api/items/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                window.alert("Item added successfully");
                window.location.reload();
                
            } else {
                window.alert("Error adding item");
                console.error("Error adding item:", response.statusText);
            }
        } catch (error) {
            window.alert("Error submitting form");
            console.error("Error submitting form:", error);
        }
    };

    if (!parentCollection) {
        return (
            <Container>
                <h1>Add Item Form</h1>
                <p>Parent Collection not found</p>
            </Container>
        );
    }

    if (!User) {
        return (
            <Container>
                <h1>Add Item Form</h1>
                <p>Please log in to add an item</p>
            </Container>
        );
    }

    const renderCustomFields = () => {
        return Object.keys(custom_fields).map((fieldName, index) => {
            const fieldType = custom_fields[fieldName];
            return (
                <Form.Group className="mb-3" key={index}>
                    <Form.Label>{fieldName}</Form.Label>
                    <Form.Control
                        type={fieldType}
                        name={fieldName}
                        value={customFieldsData[fieldName] || ''}
                        onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
                        required
                    />
                </Form.Group>
            );
        });
    };

    return (
        <Container className="add-item-form">
            <h1>Add Item Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={handleNameChange}
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tags</Form.Label>
                    <CreatableSelect
                        isMulti
                        options={tags}
                        value={selectedTags}
                        onChange={handleTagChange}
                        placeholder="Select tags or create new ones"
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </Form.Group>

                {renderCustomFields()}

                <Button variant="primary" type="submit">
                    Add Item
                </Button>
            </Form>
        </Container>
    );
};

export default AddItemForm;
