import { Modal, Form, Row, Col, Button } from "react-bootstrap";

const AddCustomFieldFormModal = ({
	showModal,
	customField,
	handleCustomFieldChange,
	addCustomField,
	onHide,
}) => {
	return (
		<Modal show={showModal} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add Custom Field</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Name
						</Form.Label>
						<Col sm="9">
							<Form.Control
								type="text"
								name="name"
								value={customField.name}
								onChange={handleCustomFieldChange}
								required
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Type
						</Form.Label>
						<Col sm="9">
							<Form.Select
								name="type"
								value={customField.type}
								onChange={handleCustomFieldChange}
								required
							>
								<option value="text">1 line Text</option>
								<option value="textarea">Multiline Text</option>
                                <option value="number">Number</option>
								<option value="date">Date</option>
							</Form.Select>
						</Col>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<div className="d-flex justify-content-end mt-4">
                    <Button className="me-2" variant="primary" onClick={addCustomField}>
                        Add Field
                    </Button>
                
                    <Button className="ms-2" variant="secondary" onClick={onHide}>
                        Close
                    </Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default AddCustomFieldFormModal;
