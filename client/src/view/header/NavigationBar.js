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

const NavigationBar = () => {

	const [loginFormModal, setLoginFormModal] = useState(false);

	return (
		<Navbar
			expand="lg"
			className="bg-body-tertiary"
			style={{ padding: "15px" }}
		>
			<Container fluid>
				<Navbar.Brand href="#">
					Arbitrary Collection Manager
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="#action1">
							<div style={{ marginRight: "5px" }}>
								<FontAwesomeIcon icon={faHouse} />
								<span style={{ marginLeft: "5px" }}>Home</span>
							</div>
						</Nav.Link>
						<Nav.Link href="#action2">
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
							<NavDropdown.Item href="#action4">
								Register
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action5">
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
		</Navbar>
	);
};

export default NavigationBar;
