"use client"

import * as React from 'react';
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { withAuthUser } from '@/hoc/authGuard';

interface IProfileProps {
    user: {
        name: string;
        email: string;
        noTelp: string;
        role: string;
    };
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {

    const { user } = React.useContext(UserContext);

    return (
        <div className="flex items-center mt-auto">
            <div className="m-auto p-8">
                <h1 className="font-bold text-3xl pr-10 text-orange-500 pb-5">
                    Account Information
                </h1>
                <hr className='border border-b-2 mb-5'/>
                <div className="flex flex-col pb-5">
                    <h2 className="font-medium text-slate-400 pb-2">Full Name</h2>
                    <p className="px-6 py-5 rounded-md border border-slate-300">{user?.name}</p>
                </div>
                <div className="flex flex-col pb-5">
                    <h2 className="font-medium text-slate-400 pb-2">Email Address</h2>
                    <p className="px-6 py-5 rounded-md border border-slate-300">{user?.email}</p>
                </div>
                <div className="flex flex-col pb-5">
                    <h2 className="font-medium text-slate-400 pb-2">Phone Number</h2>
                    <p className="px-6 py-5 rounded-md border border-slate-300">{user?.noTelp}</p>
                </div>
                <div className="flex flex-col pb-5">
                    <h2 className="font-medium text-slate-400 pb-2">Role</h2>
                    <p className="px-6 py-5 rounded-md border border-slate-300">{user?.role}</p>
                </div>
            </div>
        </div>
    );
};

export default withAuthUser(Profile);
