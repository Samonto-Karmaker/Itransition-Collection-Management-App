import { Route, Routes } from "react-router";
import AdminPanel from "./admin-panel-page/AdminPanel";
import AllCollections from "./collections-pages/AllCollection";
import Home from "./home-page/Home";
import MyCollection from "./collections-pages/MyCollection";
import AddCollectionForm from "./forms/AddCollectionForm";
import CollectionDetails from "./collections-pages/CollectionDetails";
import AddItemForm from "./item-components/AddItemForm";
import ErrorPage from "./ErrorPage";

const Body = () => {
	return (
		<div className="body">
			<Routes>
        		<Route exact path="/" element={<Home />} />
        		<Route exact path="/collections" element={<AllCollections />} />
				<Route exact path="/admin-panel" element={<AdminPanel />} />
				<Route exact path="/my-collections" element={<MyCollection />} />
				<Route exact path="/add-collection" element={<AddCollectionForm />} />
				<Route exact path="/collections/:id" element={<CollectionDetails />} />
				<Route exact path="/collections/add-item" element={<AddItemForm />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</div>
	);
};

export default Body;
