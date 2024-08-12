import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

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
    const handleRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            window.alert("Passwords do not match!");
            return;
        }
        console.log(formData);
        window.alert("Register button clicked!");
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setTimeout(() => {
            onHide();
        }, 1000);
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