import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { config } from "../../../constant";

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
	const handleLogin = async (e) => {
		e.preventDefault();
        try {
			const url = config.API_URL + "/api/auth/login";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				window.alert("Logged in successfully!");
				setFormData({
					email: "",
					password: "",
				});
				setTimeout(() => {
					onHide();
				}, 1000);
			} else {
				const error = await response.json();
				window.alert(error.message);
			}
		} catch (error) {
			console.error("Error logging in user: ", error);
			window.alert("Error logging in user!");
		}
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
						<Form.Label>Password</Form.Label>
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
