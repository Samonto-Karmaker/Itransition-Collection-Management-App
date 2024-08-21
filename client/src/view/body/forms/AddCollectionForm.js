import { useState, useContext } from "react";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { UserContext } from "../../../components/UserContext";
import AddCustomFieldFormModal from "./AddCustomFieldFormModal";
import { config } from "../../../constant";

const AddCollectionForm = () => {
	const { User } = useContext(UserContext);
	const token = localStorage.getItem("token");

	const [collection, setCollection] = useState({
		name: "",
		category: "",
		description: "",
		customFields: {},
	});
	const [customField, setCustomField] = useState({
		name: "",
		type: "text",
	});
	const [showModal, setShowModal] = useState(false);

	const handleInputChange = (e) => {
		setCollection({
			...collection,
			[e.target.name]: e.target.value,
		});
	};

	const handleCustomFieldChange = (e) => {
		setCustomField({
			...customField,
			[e.target.name]: e.target.value,
		});
	};

	const addCustomField = () => {

        if (!customField.name || customField.name.trim() === "") {
            window.alert("Please enter a name for the custom field");
            return;
        }

        if (collection.customFields[customField.name]) {
            window.alert("Custom field with this name already exists");
            return;
        }

		setCollection({
			...collection,
			customFields: {
				...collection.customFields,
				[customField.name]: customField.type,
			},
		});
		setCustomField({
			name: "",
			type: "text",
		});
		setShowModal(false);
	};

	const onHide = () => {
		setCustomField({
			name: "",
			type: "text",
		});
		setShowModal(false);
	};

	const handleSubmit = async () => {
		console.log(collection);
		const url = config.API_URL + "/api/collections/create";
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(collection),
			});
			const result = await response.text();
			if (response.ok) {
				window.alert("Collection added successfully");
				setCollection({
					name: "",
					category: "",
					description: "",
					customFields: {},
				});
			} else {
				window.alert(result);
			}
		} catch (error) {
			console.error("Error:", error);
			window.alert("Something went wrong");
		}
	};

	if (!User) {
		return (
			<div>
				<h1>Add Collection Form</h1>
				<p>Please login to add a collection</p>
			</div>
		);
	}

	return (
		<Container className="mt-4">
			<Card className="p-4 shadow-sm">
				<h2 className="mb-4 text-center">Add New Collection</h2>
				<Form>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={collection.name}
									onChange={handleInputChange}
									required
									placeholder="Enter collection name"
								/>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Category</Form.Label>
								<Form.Control
									type="text"
									name="category"
									value={collection.category}
									onChange={handleInputChange}
									required
									placeholder="Enter category"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							name="description"
							value={collection.description}
							onChange={handleInputChange}
							required
							placeholder="Enter description"
							rows={3}
						/>
					</Form.Group>
					{Object.keys(collection.customFields).length > 0 && (
						<>
							<h4 className="mt-4">Custom Fields:</h4>
							<ul className="custom-fields">
								{Object.entries(collection.customFields).map(
									([key, value]) => (
										<li
											key={key}
											className="custom-field-item"
										>
											<span className="custom-field-name">
												{key}
											</span>
											:{" "}
											<span className="custom-field-type">
												{value}
											</span>
										</li>
									)
								)}
							</ul>
						</>
					)}
					<div className="d-flex justify-content-end mt-4">
						<Button
							variant="secondary"
							onClick={() => setShowModal(true)}
							className="me-2"
						>
							Add Custom Field
						</Button>
						<Button
							variant="primary"
							onClick={handleSubmit}
							className="ms-2"
						>
							Add Collection
						</Button>
					</div>
				</Form>
			</Card>

			{showModal && (
				<AddCustomFieldFormModal
					showModal={showModal}
					customField={customField}
					handleCustomFieldChange={handleCustomFieldChange}
					addCustomField={addCustomField}
					onHide={onHide}
				/>
			)}
		</Container>
	);
};

export default AddCollectionForm;
