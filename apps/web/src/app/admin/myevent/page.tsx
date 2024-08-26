'use client';

import axios from '@/helper/axiosInstance';
import * as React from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuthAdmin } from '@/hoc/authGuard';
import Link from 'next/link';
import { STATUS, TYPE } from '@prisma/client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { event } from 'cypress/types/jquery';
import { string } from 'yup';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface IMyEventProps {
  id: number;
  namaEvent: string;
  tanggalEvent: string;
  deskripsiEvent: string;
  userId: number;
  status: STATUS;
  type: TYPE;
  imgEvent: string;
  harga: number;
  location: {
    id: number;
    locationName: string;
  };
  categori: {
    id: number;
    categoriName: string;
  };
}

const MyEvent: React.FunctionComponent<IMyEventProps> = (props) => {

  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const [events, setEvents] = React.useState<IMyEventProps[]>([]);
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`api/dashboard/getEvent/${user?.email}`);
      console.log('DATA FROM FETCHEVENTS', data);
      setEvents(data.data);
      console.log('EVENTS FROM SET EVENTS::', data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isDelete = async (id: String) => {
    try {
      const { data } = await axios.delete(`api/event/delete/${id}`);
      setEvents(data.data);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (user?.email) {
      const timer = setTimeout(() => {
        fetchEvents();
        console.log('USER EMAIL FOR FETCH EVENTS', user?.email);
      }, 500);
      console.log('INI PUNYA EVENT', events);
      return () => clearTimeout(timer);
    }
  }, [user?.email]);
  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl pb-5">My events</h1>
      <Link href="/admin/create">
        <button className="shadow-md p-4 border rounded-md text-lg font-semibold text-blue-600 hover:bg-gray-200">
          {' '}
          + Create an Event{' '}
        </button>
      </Link>
      <div>
        {events
          ? events.map((event: IMyEventProps) => (
              <div
                key={event.id}
                className="p-4 mb-4 border rounded-lg shadow-md my-6"
              >
                <div className="flex  gap-3">
                  <div>
                    <Image
                      src={`http://localhost:8001${event.imgEvent}`}
                      alt={event.namaEvent}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="flex flex-col">
                        <div>
                          <Badge variant="destructive">
                            <p className="font-bold ">
                              <span className="text-blue-500 font-semibold text-xl">
                                {event.namaEvent}
                              </span>{' '}
                              |{event.categori?.categoriName}
                            </p>
                          </Badge>
                        </div>
                        <div className="flex gap-40">
                          <div>
                            <p className="text-gray-600 pl-3 line-clamp-2">
                              {event.deskripsiEvent}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <div>
                              <p className="text-gray-600">
                                {new Date(
                                  event.tanggalEvent,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 font-semibold">
                                {event.location?.locationName}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p>{event.status}</p>
                          </div>
                          <div>
                            <p>{event.type}</p>
                          </div>
                          <div>
                            <p>{event.harga}</p>
                          </div>
                          <div className="flex gap-3">
                            <div>
                              <Button
                                className="border border-solid border-black"
                                onClick={() => {
                                  router.replace(
                                    `/admin/event-detail/${event.id}`,
                                  );
                                }}
                              >
                                Detail Event
                              </Button>
                            </div>
                            <div>
                              <Button
                                onClick={() => isDelete(String(event.id))}
                                className="bg- border border-solid border-black text-black font-semibold"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default withAuthAdmin(MyEvent);
