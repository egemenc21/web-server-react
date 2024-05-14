import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {createContext, useEffect, useState} from "react";
import {JwtPayload} from "../pages/Register";

export interface UserProps {
  id: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  address: string;
  role: string;
}

interface UserContextProps {
  userData: UserProps | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | null>>;
  logout: () => void;
  token: string;
}

export const defaultUserData: UserProps = {
  id: 0,
  username: "",
  name: "",
  surname: "",
  password: "",
  email: "",
  address: "",
  role: "",
};

export const UserContext = createContext<UserContextProps>({
  userData: defaultUserData,
  setUserData: () => {},
  logout: () => {},
  token: "",
});

function UserProvider({children}: {children: React.ReactNode}) {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [token, setToken] = useState("");

  //User data is fetched from the token after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      const decodedToken: JwtPayload = jwtDecode(token);

      axios.get(`/user/${decodedToken.id}`).then((response) => {
        const {
          userId,
          username,
          name,
          surname,
          password,
          email,
          address,
          role,
        } = response.data;

        setUserData({
          id: userId,
          username,
          name,
          surname,
          password,
          email,
          address,
          role,
        });
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{userData, setUserData, logout, token}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
