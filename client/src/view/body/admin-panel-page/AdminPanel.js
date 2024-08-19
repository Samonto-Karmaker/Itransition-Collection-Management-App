import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button } from "react-bootstrap";

const AdminPanel = () => {

    // TODO: Implement the following functions

    const toggleStatus = (e) => {
        e.target.innerText = e.target.innerText === "Active" ? "Blocked" : "Active";
    }

    const toggleRole = (e) => {
        e.target.innerText = e.target.innerText === "User" ? "Admin" : "User";
    }

    const deleteUser = (e) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            // Delete the user
            window.alert("User has been deleted.");
        }
    }

    return (
        <div>
            <h1>Admin Panel</h1>
            <Table striped bordered hover className="admin-table">
                <thead>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>jd@gmail.com</td>
                        {/* blocked -> Blocked; unblocked -> Active */}
                        <td>
                            <Button onClick={toggleStatus}>
                                <span>Active</span>
                            </Button>
                        </td>
                        {/* User -> User; Admin -> Admin */}
                        <td>
                            <Button onClick={toggleRole}>
                                <span>Admin</span>
                            </Button>
                        </td>
                        <td>
                            <Button onClick={deleteUser}>
                                <FontAwesomeIcon icon={faTrash} />
                                <span style={{ marginLeft: "5px" }}>Delete</span>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default AdminPanel;