import { useContext } from "react";
import { UserContext } from "../../../components/UserContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyCollection = () => {

    const { User } = useContext(UserContext);

    if (!User) {
        return (
            <div>
                <h1>My Collection</h1>
                <p>Please login to view your collection</p>
            </div>
        );
    }

	return (
		<div>
			<h1>My Collection</h1>
            <Button>
                <Link to="/add-collection" style={{textDecoration: "none", color: "white"}}>Add Collection</Link>
            </Button>
		</div>
	);
};

export default MyCollection;
