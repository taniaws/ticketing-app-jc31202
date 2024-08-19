'use client';
import { UserContext } from '@/context/UserContext';
import axios from '@/helper/axiosInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { toast } from 'react-toastify';

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const roleRef = React.useRef<HTMLSelectElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  const { user } = React.useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [selectedRole, setSelectedRole] = React.useState<string>('');

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      console.log('EMAILREF::', emailRef);
      if (passwordRef.current?.value === confirmPasswordRef.current?.value) {
        const userData = {
          name: nameRef.current?.value,
          notelp: phoneRef.current?.value,
          role: roleRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        };
        console.log('Submitted Data:', userData);

        const regis = await axios.post('/api/auth/regis', userData);
        toast(regis.data.message);
        router.push('/');
      } else {
        console.log('Password do not match');
        toast('Passwords do not match');
      }
    } catch (error: any) {
      console.log(error);
      //toast(error.response.data.error.message);
    }
  };

  React.useEffect(() => {
    if (user?.email) {
      router.replace('/');
    }
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1500);
  }, [user, isAuthenticated]);

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
          <h1 className="font-bold text-4xl text-center pr-10">
            {' '}
            Create an account{' '}
          </h1>
          <Link href="/login" className="text-blue-500 font-semibold text-lg">
            {' '}
            Log in{' '}
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
              Full Name
            </label>
            <input
              type="text"
              className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
              ref={nameRef}
            />
          </div>
          <div className="flex flex-col relative pb-5">
            <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
              Phone Number
            </label>
            <input
              type="text"
              className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
              ref={phoneRef}
            />
          </div>
          <div className="flex flex-col relative pb-5">
            <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
              Role
            </label>
            <select
              className={`px-6 pt-10 pb-5 rounded-md border border-slate-300 appearance-none ${selectedRole === '' ? 'text-slate-500' : 'text-black'}`}
              ref={roleRef}
              defaultValue=""
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="" disabled hidden>
                Select your role
              </option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
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
          <div className="flex flex-col relative">
            <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                type={isVisible ? 'text' : 'password'}
                className="px-6 pt-10 pb-5 rounded-md font-medium border border-slate-300 w-full"
                ref={confirmPasswordRef}
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
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
