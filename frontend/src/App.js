import Homepage from "./Components/Home/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import store from "./Redux/store";
import { Provider } from "react-redux";
import ShowsDetails from "./Components/Genre/ShowsDetails";
import Results from "./Components/Search/Results";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/SignUp";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
	position: positions.BOTTOM_CENTER,
	timeout: 5000,
	offset: "30px",
	transition: transitions.SCALE,
};

function App() {
	return (
		<>
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...options}>
					<Router>
						<Header />
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route exact path='/show/:id/:name' element={<ShowsDetails />} />
							<Route exact path='/results/:keyword' element={<Results />} />
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/signup' element={<SignUp />} />
						</Routes>
					</Router>
				</AlertProvider>
			</Provider>
		</>
	);
}

export default App;
