"use client"

import { UserContext } from '@/context/UserContext';
import axios from '@/helper/axiosInstance';
import { withAuthAdmin } from '@/hoc/authGuard';
import * as React from 'react';

interface IRegistrationProps {
}

interface Attendee {
  user: {
    id: number;
    name: string;
  };
  event: {
    id: number;
    namaEvent: string;
  };
}

const Registration: React.FunctionComponent<IRegistrationProps> = (props) => {
    const { user } = React.useContext(UserContext);
    const [attendees, setAttendees] = React.useState<Attendee[]>([]);

      const fetchAttendees = async () => {
          try {
              const { data } = await axios.get(`/api/dashboard/getAttendee/${user?.email}`);
              setAttendees(data.data);
              console.log("ATTENDEES FROM SET ATTENDEES::", data.data)
          } catch (error) {
              console.log(error);
          }
      };

      React.useEffect(() => {
        if (user?.email) {
            const timer = setTimeout(() => {
                fetchAttendees();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [user?.email]);

    return (
      <div className="p-10">
        <h1 className="font-bold text-3xl pb-5 text-orange-500">Attendee Registration</h1>
        <div className="space-y-4">
          {attendees.length > 0 ? (
            attendees.map((attendee, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-md bg-white">
                <p className="text-lg">
                  <strong>{attendee.user.name}</strong> registered for <strong>{attendee.event.namaEvent}</strong>
                </p>
              </div>
            ))
          ) : (
            <p>No attendees found.</p>
          )}
        </div>
      </div>
    );
};

export default withAuthAdmin(Registration);
