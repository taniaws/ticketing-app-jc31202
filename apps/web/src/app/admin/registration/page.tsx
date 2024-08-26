'use client';

import { UserContext } from '@/context/UserContext';
import axios from '@/helper/axiosInstance';
import { withAuthAdmin } from '@/hoc/authGuard';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface IRegistrationProps {}

interface Event {
  id: number;
  namaEvent: string;
}

const Registration: React.FunctionComponent<IRegistrationProps> = (props) => {
    const { user } = React.useContext(UserContext);
    const [events, setEvents] = React.useState<Event[]>([]);
    const router = useRouter();

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`/api/dashboard/getEvent/${user?.email}`);
        setEvents(data.data);
      } catch (error) {
        console.log(error);
      }
    };

      React.useEffect(() => {
        if (user?.email) {
            const timer = setTimeout(() => {
                fetchEvents();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [user?.email]);

    const handleEventClick = (eventId: number) => {
      router.push(`/admin/registration/${eventId}`);
    };

    return (
      <div className="p-10">
        <h1 className="font-bold text-3xl pb-5 text-orange-500">Event List</h1>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-300 rounded-md bg-white cursor-pointer"
                onClick={() => handleEventClick(event.id)}
              >
                <p className="text-lg">
                  <strong>{event.namaEvent}</strong>
                </p>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    );
  };

export default withAuthAdmin(Registration);
