export type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
  };
  
  export type UserType = {
    name: string;
    email: string;
    notelp?: string;
    role_id: string;
    password: string;
  };
  
  export interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  }