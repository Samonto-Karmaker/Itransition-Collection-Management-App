import "./App.css";
import MainComponent from "./view/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
	return (
		<UserProvider>
			<div className="App">
				<BrowserRouter>
					<MainComponent />
				</BrowserRouter>
			</div>
		</UserProvider>
	);
}

export default App;
