import "./App.css";
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import axios from "axios";
import Home from "./pages/Home";
import Shop from "./pages/Shop";



function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;


// const user = {
//   username: 'john_doe',
//   name: 'John',
//   surname: 'Doe',
//   password: '123456',
//   email: 'john.doe@example.com',
//   address: '123 Main St, Anytown, USA',
// };

// const createUser = async () => {
//   try {
//     const response = await axios.post('/user/add', user, {
//       headers: {
//         'Content-Type': 'application/json',
//         // Include any other headers if required
//       },
//     });
//     console.log('User created successfully:', response.data);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// };

// // Call the function to create the user
// createUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </>
  );
}

export default App;
