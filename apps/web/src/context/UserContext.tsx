"use client";
import * as React from "react";
import { UserContextType, UserType } from "./Types";
import { useRouter } from "next/navigation";
import axios from "@/helper/axiosInstance";

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<UserType | null>(null);

  const keepLogin = async () => {
    try {
      const { data } = await axios.get("/auth/keeplogin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });

      localStorage.setItem("auth", data.result.token);
      setUser({
        name: data.result.name,
        email: data.result.email,
        notelp: data.result.noTelp,
        role_id: data.result.role_id,
        password: data.result.password
    });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      keepLogin();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

