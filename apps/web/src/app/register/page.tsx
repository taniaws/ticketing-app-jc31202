'use client';
import { UserContext } from '@/context/UserContext';
import axios from '@/helper/axiosInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import * as yup from 'yup';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  const router = useRouter();
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

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid Email Address')
      .required('Email is required'),
    name: yup.string().required('Full Name is required'),
    noTelp: yup.string().required('Phone Number is required'),
    role: yup.string().required('Role is required'),
    password: yup
      .string()
      .min(7, 'Password must be at least 7 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = async (values: any): Promise<void> => {
    try {
      const userData = {
        name: values.name,
        noTelp: values.noTelp,
        role: values.role,
        email: values.email,
        referralCode: values.referralCode,
        password: values.password,
      };
      console.log('Submitted Data:', userData);

      const regis = await axios.post('/api/auth/regis', userData);
      console.log('Registration API Response Data:', regis.data);

      if (values.referralCode) {
        const referralData = {
          referralCode: values.referralCode,
        };
        const redeemReferral = await axios.post(
          '/api/points/redeemReferralCode',
          referralData,
        );

        const discountData = {
          title: 'Referral Discount',
          description: '10% discount for registering with a referral code.',
          percent: 10,
          code: 'REFERRAL10',
          userId: regis.data.userId,
        };
        console.log('DISCOUNT DATA USER ID AND REFERRAL CODE::', discountData);

        const createDiscount = await axios.post(
          '/api/discount/createDiscount',
          discountData,
        );
        console.log('DISCOUNT CREATED::', createDiscount);
      }
      router.push('/');
    } catch (error: any) {
      console.log(error);
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
        <Formik
          initialValues={{
            email: '',
            name: '',
            noTelp: '',
            role: '',
            referralCode: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col relative pb-5">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Email Address
                </label>
                <Field
                  type="text"
                  name="email"
                  className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col relative pb-5">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col relative pb-5">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="noTelp"
                  className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
                />
                <ErrorMessage
                  name="noTelp"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col relative pb-5">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className={`px-6 pt-10 pb-5 rounded-md border border-slate-300 appearance-none ${selectedRole === '' ? 'text-slate-500' : 'text-black'}`}
                  onChange={(e: any) => {
                    setSelectedRole(e.target.value);
                    setFieldValue('role', e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select your role
                  </option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {selectedRole !== "ADMIN" && (
                <div className="flex flex-col relative pb-5">
                  <label className='font-medium text-slate-400 pb-2 absolute top-3 left-6'>Referral Code (Optional)</label>
                  <Field
                    type="text"
                    name="referralCode"
                    className="px-6 pt-10 pb-5 rounded-md border border-slate-300"
                  />
                </div>
              )}
              <div className="flex flex-col relative pb-5">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Password
                </label>
                <div className="flex items-center">
                  <Field
                    type={isVisible ? 'text' : 'password'}
                    name="password"
                    className="px-6 pt-10 pb-5 rounded-md font-medium border border-slate-300 w-full"
                  />
                  <span
                    onClick={toggleVisibility}
                    className="absolute right-3 align-middle"
                  >
                    {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col relative">
                <label className="font-medium text-slate-400 pb-2 absolute top-3 left-6">
                  Confirm Password
                </label>
                <div className="flex items-center">
                  <Field
                    type={isVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    className="px-6 pt-10 pb-5 rounded-md font-medium border border-slate-300 w-full"
                  />
                  <span
                    onClick={toggleVisibility}
                    className="absolute right-3 align-middle"
                  >
                    {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex pt-10 w-full justify-between">
                <button
                  className="bg-orange-500 text-white font-semibold p-4 rounded-md flex-1"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
