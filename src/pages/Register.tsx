import {useContext, useEffect, useState} from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../components/Button";
import axios from "axios";
import {UserContext} from "../context/User";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export interface AuthResponse {
  token: string;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  id: number;
}

const defaultFormFields = {
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  address: "",
};

function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const {userData, setUserData} = useContext(UserContext);

  useEffect(() => {
    if (userData && userData.id) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);

  const {username, name, surname, email, password, address} = formFields;

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const {data} = await axios.post<AuthResponse>("/auth/register", formFields);

    // Store the token in localStorage
    localStorage.setItem("token", data.token);

    const decodedToken: JwtPayload = jwtDecode(data.token);

    console.log(decodedToken);

    setUserData({
      id: decodedToken.id,
      name,
      surname,
      email,
      username,
      address,
      password: "",
      role: "",
    });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <section className="flex flex-col h-screen justify-center items-center gap-5 bg-tertiary text-gray-100">
      <h2 className="text-lg">Please register!</h2>
      <form
        className="flex flex-col gap-5 text-gray-700"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          value={username}
          required
          placeholder="Your username"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="name"
          value={name}
          required
          placeholder="Your name"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="surname"
          value={surname}
          required
          placeholder="Your surname"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />
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
        <input
          type="text"
          name="address"
          value={address}
          required
          placeholder="Your address"
          className="p-3 rounded-lg"
          onChange={handleOnChange}
        />

        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Register
        </Button>
      </form>
      <div className="flex flex-col items-center gap-2">
        <h3>Already have an account ? </h3>
        <Link to="/" className="underline">
          Go to sign-in page
        </Link>
      </div>
    </section>
  );
}

export default Register;
