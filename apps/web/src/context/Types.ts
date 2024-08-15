import { ROLE } from "@prisma/client";

export type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
  };
  
  export type UserType = {
    name: string;
    email: string;
    notelp?: string;
    role: ROLE;
    password: string;
    referral_code: string;
  };
  
  export interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  }

  export interface LoginContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }