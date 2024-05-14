import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../context/User";
import axios from "axios";
import Button, {BUTTON_TYPE_CLASSES} from "../components/Button";
import {AuthResponse} from "./Register";
import {JwtPayload} from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  const {userData, setUserData} = useContext(UserContext);

  useEffect(() => {
    console.log(userData, "signinpage");
    if (userData) {
      navigate("/shop");
    }
  }, [userData]);

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const {data} = await axios.post<AuthResponse>(
      "/auth/authenticate",
      formFields
    );
    const {token} = data;

    localStorage.setItem("token", token);

    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get(`/user/${decodedToken.id}`).then((response) => {
        const userData = response.data;
        userData.id = userData.userId; 
        setUserData(userData);
      
      });
    }
    console.log(data);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <section className="flex flex-col h-screen justify-center items-center gap-5 bg-tertiary text-gray-100">
      <h2 className="text-lg">Already have an account? Please sign in!</h2>
      <form
        className="flex flex-col gap-5 text-gray-700"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="Your email"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          placeholder="Your password"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
          Sign in
        </Button>
      </form>
      <div className="flex flex-col items-center gap-2">
        <h3>You want to register ? </h3>
        <Link to="/register" className="underline">
          Go to register page
        </Link>
      </div>
    </section>
  );
}

export default SignIn;
