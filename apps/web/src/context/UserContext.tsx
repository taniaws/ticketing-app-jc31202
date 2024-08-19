"use client";
import * as React from "react";
import { LoginContextType, UserContextType, UserType } from "./Types";
import axios from "@/helper/axiosInstance";

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const LoginContext = React.createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const keepLogin = async () => {
    try {
      const { data } = await axios.get("/api/auth/keeplogin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      console.log("Response Data:", data);

      localStorage.setItem("auth", data.result.token);
      console.log("DATA RESULT FROM USERCONTEXT", data.result)
      setUser({
        name: data.result.name,
        email: data.result.email,
        noTelp: data.result.noTelp,
        role: data.result.role,
        password: data.result.password,
        referral_code: data.result.referral_code
    });
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      keepLogin();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    console.log("IS LOGGED IN?", isLoggedIn)
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </LoginContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;

