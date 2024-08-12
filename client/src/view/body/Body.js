import { Route, Routes } from "react-router";
import AdminPanel from "./admin-panel-page/AdminPanel";
import AllCollections from "./collections-page/AllCollection";
import Home from "./home-page/Home";

const Body = () => {
	return (
		<>
			<Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/collections" element={<AllCollections />} />
				<Route exact path="/admin-panel" element={<AdminPanel />} />
			</Routes>
		</>
	);
};

export default Body;
