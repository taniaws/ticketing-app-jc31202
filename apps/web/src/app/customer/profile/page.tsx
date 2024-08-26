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
        referralCode: string;
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
                <div className="flex flex-col pb-5 bg-slate-100 p-4 rounded-lg shadow-lg">
                    <h2 className="font-semibold pb-2">Referral Code</h2>
                    <p className="text-sm text-slate-700 pb-3">
                    Get 10,000 points when someone signs up using your referral link!
                    </p>
                    <p className="text-lg font-bold bg-white px-4 py-3 rounded-lg">
                        {user?.referralCode}
                    </p>
                    <button
                        onClick={() => navigator.clipboard.writeText(user?.referralCode || '')}
                        className="px-4 py-2 text-sm font-semibold text-white bg-slate-500 rounded-lg hover:bg-slate-700"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuthUser(Profile);
