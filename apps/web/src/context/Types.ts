import { ROLE } from "@prisma/client";

export type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
  };
  
  export type UserType = {
    id?: number;
    name: string;
    email: string;
    noTelp?: string;
    role: ROLE;
    password: string;
    referralCode?: string;
    point?: PointType[];
    discount?: DiscountType[];
    transaction?: TransactionType[];
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
    id?: number;
    amount: number;
    dateCreate: Date;
    dateExpire: Date;
    isDeleted: boolean;
  };
  
  export type DiscountType = {
    id?: number;
    title: string;
    description: string;
    dateCreate: Date;
    dateExpire: Date;
    isDeleted: boolean;
    percent: number;
    code: string;
    userId: number;
  };
  
  export type TransactionType = {
    id?: number;
    userId: number;
    amount: number;
    createdAt: Date;
    detailTransaction?: DetailTransactionType[];
  };

  export type DetailTransactionType = {
    id?: number;
    discountId?: number;
    transactionId: number;
    eventId?: number;
    discount?: DiscountType;
    transaction?: TransactionType;
  };