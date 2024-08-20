import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button } from "react-bootstrap";
import { config } from "../../../constant";
import { UserContext } from "../../../components/UserContext";
import RemoveCredentials from "../../../components/utils/RemoveCredentials";

const AdminPanel = () => {
	const [userList, setUserList] = useState([]);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");
	const { User, setUser } = useContext(UserContext);
    const navigate = useNavigate();

	const fetchUsers = async () => {
		const url = config.API_URL + "/api/admin/users";
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			if (response.ok) {
				const extractedData = result.map((item) => item.data);
				setUserList(extractedData);
			} else {
				window.alert(result.message);
			}
		} catch (error) {
			console.log(error.message);
			window.alert("Something went wrong while fetching users");
		} finally {
            setLoading(false);
        }
	};

	useEffect(() => {
		if (User) {
			if (token && User.Admin) fetchUsers();
		}
	}, [User, token]);

	// TODO: Implement the following functions
	const toggleStatus = async (userId) => {
		if (
			window.confirm(
				"Are you sure you want to change the status of this user?"
			)
		) {
			const action = userList.find((user) => user.id === userId).Blocked ? "unblock" : "block";
            const url = config.API_URL + `/api/admin/${action}/${userId}`;

            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const result = await response.json();
                if (response.ok) {
                    const updatedUserList = userList.map((user) => {
                        if (user.id === userId) {
                            user.Blocked = !user.Blocked;
                        }
                        return user;
                    });
                    setUserList(updatedUserList);
                    window.alert("User status has been changed.");
                    
                    if(User.id === userId && action === "block") {
                        RemoveCredentials(setUser);
                        window.alert("Your account has been blocked. Please contact the administrator.");
                        navigate("/");
                    }
                } else {
                    window.alert(result.message);
                }
            } catch(error) {
                console.error(error)
                window.alert("Something went wrong")
            }
		}
	};

	const toggleRole = async (userId) => {
		if (window.confirm("Are you sure you want to change the role of this user?")) {

			const action = userList.find((user) => user.id === userId).Admin ? "demote" : "promote";
			const url = config.API_URL + `/api/admin/${action}/${userId}`;

			try {
				const response = await fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				
				if(response.ok) {
					const updatedUserList = userList.map((user) => {
						if (user.id === userId) {
							user.Admin = !user.Admin;
						}
						return user;
					});
					setUserList(updatedUserList);
					window.alert("User role has been changed.");

					if(User.id === userId && action === "demote") {
						RemoveCredentials(setUser);
						window.alert("Your role has been changed. Please contact the administrator.");
						navigate("/");
					}
				} else {
					const result = await response.json();
					window.alert(result.message);
				}
			} catch (error) {
				console.error(error);
				window.alert("Something went wrong");
			}
		}
	};

	const deleteUser = (e) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			// Delete the user
			window.alert("User has been deleted.");
		}
	};

	if (!token) {
		return (
			<div>
				<h1>Admin Panel</h1>
				<p>Please log in to access this page.</p>
			</div>
		);
	}

	if (!User || !User.Admin) {
		return (
			<div>
				<h1>Admin Panel</h1>
				<p>You are not authorized to access this page.</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div>
				<h1>Admin Panel</h1>
				<p>Loading...</p>
			</div>
		);
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
					{userList.map((user) => (
						<tr key={user.id}>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td
								style={{ cursor: "pointer" }}
								onClick={() => toggleStatus(user.id)}
							>
								{user.Blocked ? "Blocked" : "Active"}
							</td>
							<td
								style={{ cursor: "pointer" }}
								onClick={() => toggleRole(user.id)}
							>
								{user.Admin ? "Admin" : "User"}
							</td>
							<td>
								<Button variant="danger" onClick={deleteUser}>
									<FontAwesomeIcon icon={faTrash} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default AdminPanel;
