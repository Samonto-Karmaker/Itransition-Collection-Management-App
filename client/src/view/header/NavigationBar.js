import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faFolder,
	faHouse,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginFormModal from "../body/forms/LogInFormModal";
import RegisterFormModal from "../body/forms/RegisterFormModal";
import { Link } from "react-router-dom";

const NavigationBar = () => {

	const [loginFormModal, setLoginFormModal] = useState(false);
	const [registerFormModal, setRegisterFormModal] = useState(false);

	return (
		<Navbar
			expand="lg"
			className="bg-body-tertiary"
			style={{ padding: "15px" }}
		>
			<Container fluid>
				<Navbar.Brand as={Link} to="/" >
					Arbitrary Collection Manager
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link as={Link} to="/" >
							<div style={{ marginRight: "5px" }}>
								<FontAwesomeIcon icon={faHouse} />
								<span style={{ marginLeft: "5px" }}>Home</span>
							</div>
						</Nav.Link>
						<Nav.Link as={Link} to="/collections">
							<div style={{ marginRight: "5px" }}>
								<FontAwesomeIcon icon={faFolder} />
								<span style={{ marginLeft: "5px" }}>
									All Collections
								</span>
							</div>
						</Nav.Link>
						<NavDropdown
							title={
								<>
									<FontAwesomeIcon icon={faBars} />
									<span style={{ marginLeft: "5px" }}>
										Menu
									</span>
								</>
							}
							id="navbarScrollingDropdown"
						>
							<NavDropdown.Item onClick={() => setLoginFormModal(true)}>
								Login
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => setRegisterFormModal(true)}>
								Register
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to="/admin-panel" >
								Admin Panel
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							style={{ width: "300px", marginRight: "10px" }}
						/>
						<Button variant="outline-success">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
							<span style={{ marginLeft: "10px" }}>Search</span>
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
			<LoginFormModal 
				show={loginFormModal}
				onHide={() => setLoginFormModal(false)}
			/>
			<RegisterFormModal
				show={registerFormModal}
				onHide={() => setRegisterFormModal(false)}
			/>
		</Navbar>
	);
};

export default NavigationBar;
