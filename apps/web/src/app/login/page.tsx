'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import axios from '@/helper/axiosInstance';
import { LoginContext, UserContext } from "@/context/UserContext";
import Link from 'next/link';

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const { user, setUser } = React.useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = async (): Promise<void> => {
    try {
      console.log('EMAILL::', emailRef.current?.value);
      const { data } = await axios.post('/api/auth/login', {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log('DATA AFTER LOGIN::', data);
      localStorage.setItem("auth", data.result.token);

      setIsLoggedIn(true);
      setUser({
        name: data.result.name,
        email: data.result.email,
        noTelp: data.result.noTelp,
        role: data.result.role,
        password: data.result.password,
        referralCode: data.result.referralCode,
    });
      if (user?.role === "ADMIN") {
        router.push("/admin/myevent");
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(true);

      if (user?.email && user?.role === 'ADMIN') {
        router.replace('/admin/myevent');
      }

      if (user?.email && user?.role === 'CUSTOMER') {
        router.replace('/');
      }
    }, 1500);
  }, [user, isAuthenticated, isLoggedIn]);

  if (!isAuthenticated) {
    return <p className="text-center text-5xl my-8">LOADING...</p>;
  }

  return (
    <div className="flex items-center mt-auto">
      <div className="m-auto p-8">
        <h1 className="font-bold text-3xl pr-10 text-orange-500 pb-5">
          {' '}
          Bad Event Surabaya
        </h1>
        <div className="flex items-center pb-10 justify-between">
          <h1 className="font-bold text-4xl text-center pr-10"> Log in </h1>
          <Link
            href="/register"
            className="text-blue-500 font-semibold text-lg"
          >
            {' '}
            Sign Up{' '}
          </Link>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-col relative pb-5">
            <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
              Email Address
            </label>
            <input
              type="text"
              className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col relative pb-5">
            <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={isVisible ? 'text' : 'password'}
                className="px-6 pt-10 pb-5 rounded-md font-medium border border-slate-300 w-full"
                ref={passwordRef}
              />
              <span
                onClick={toggleVisibility}
                className="absolute right-3 align-middle"
              >
                {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
          </div>
          <div className="flex pt-10 w-full justify-between">
            <button
              className="bg-orange-500 text-white font-semibold p-4 rounded-md flex-1"
              type="button"
              onClick={onSubmit}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
