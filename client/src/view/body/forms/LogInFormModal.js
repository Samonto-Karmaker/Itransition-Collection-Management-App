import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const LoginFormModal = ({ show, onHide }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

    // TODO: Implement login functionality
	const handleLogin = (e) => {
		e.preventDefault();
        console.log(formData);
		window.alert("Login button clicked!");
        setFormData({
            email: "",
            password: "",
        });
        setTimeout(() => {
            onHide();
        }, 1000);
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Log In</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <h4>Welcome to Arbitrary Collection Manager!</h4>
				<Form onSubmit={handleLogin}>
					<Form.Group className="mb-3" controlId="Email">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="Password">
						<Form.Label>Email addr</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</Form.Group>
                    <Button type="submit" className="btn btn-primary">
                        Log In
                    </Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginFormModal;
