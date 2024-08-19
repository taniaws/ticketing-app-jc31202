import { ROLE } from "@prisma/client";

export type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
  };
  
  export type UserType = {
    name: string;
    email: string;
    noTelp?: string;
    role: ROLE;
    password: string;
    referral_code?: string;
    point?: PointType[];
    };
  
  export interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  }

  export interface LoginContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export type PointType = {
    amount: number;
    dateCreate: Date;
    dateExpire: Date;
    isDeleted: boolean;
  };
  