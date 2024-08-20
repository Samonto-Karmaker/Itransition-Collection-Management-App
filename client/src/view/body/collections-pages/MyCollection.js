import { useContext } from "react";
import { UserContext } from "../../../components/UserContext";

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
		</div>
	);
};

export default MyCollection;
