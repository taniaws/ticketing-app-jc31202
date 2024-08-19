"use client"

import axios from '@/helper/axiosInstance';
import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuthAdmin } from '@/hoc/authGuard';
import Link from 'next/link';

interface IMyEventProps {
    id: number;
    nama_event: string;
    tanggal_event: string;
    deskripsi_event: string;
    user_id: number;
    location: {
        id: number;
        location_name: string;
    };
    type: {
        id: number;
        type_name: string;
    };
    categori: {
        id: number;
        categoriname: string;
    };
    status: {
        id: number;
        Statusname: string;
    };
}

const MyEvent: React.FunctionComponent<IMyEventProps> = (props) => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = React.useState<IMyEventProps[]>([]);

  const fetchEvents = async () => {
      try {
          const { data } = await axios.get(`api/dashboard/getEvent/${user?.email}`);
          console.log("DATA FROM FETCHEVENTS", data);
          setEvents(data.data);
          console.log("EVENTS FROM SET EVENTS::", data.data)
      } catch (error) {
          console.log(error);
      }
  };

  React.useEffect(() => {
      if (user?.email) {
          const timer = setTimeout(() => {
              fetchEvents();
              console.log("USER EMAIL FOR FETCH EVENTS", user?.email);
          }, 500);

          return () => clearTimeout(timer);
      }
  }, [user?.email]);

  return (
    <div className='p-10'>
        <h1 className='font-bold text-3xl pb-5'>My events</h1>
        <Link href="/admin/create">
            <button className='shadow-md p-4 border rounded-md text-lg font-semibold text-blue-600 hover:bg-gray-200'> + Create an Event </button>
        </Link>
        <div>
            {events.map((event: IMyEventProps) => (
                <div key={event.id} className="p-4 mb-4 border rounded-lg shadow-md my-6">
                    <h1 className="text-2xl font-bold text-blue-700 mb-2">{event.nama_event}</h1>
                    <p className="text-gray-600">{event.deskripsi_event}</p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Date: </span>
                        {new Date(event.tanggal_event).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Location: </span>
                        {event.location?.location_name}
                    </p>
                    <div className="mt-2">
                        <p className="inline-block text-white bg-green-500 px-3 py-1 rounded-full text-sm font-medium mr-2">
                            Category: {event.categori?.categoriname}
                        </p>
                        <p className="inline-block text-white bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium mr-2">
                            Status: {event.status?.Statusname}
                        </p>
                        <p className="inline-block text-white bg-purple-500 px-3 py-1 rounded-full text-sm font-medium">
                            Type: {event.type.type_name}
                        </p>
                    </div>
                </div>
            
            ))}
        </div>
    </div>
  );
};

export default withAuthAdmin(MyEvent);