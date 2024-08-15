import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { config } from '../../../constant';

const RegisterFormModal = ({ show, onHide }) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // TODO: Implement register functionality
    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            window.alert("Passwords do not match!");
            return;
        }
        try {
            const url = config.API_URL + "/api/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            if (response.ok) {
                const data = await response.text();
                window.alert(data);
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setTimeout(() => {
                    onHide();
                }, 1000);
            } else {
                const error = await response.text();
                window.alert(error);
            }
        } catch (error) {
            console.error("Error registering user: ", error);
            window.alert("Error registering user!");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Welcome to Arbitrary Collection Manager!</h4>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="ConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary">
                        Register
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RegisterFormModal;