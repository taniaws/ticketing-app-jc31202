'use client';
import axios from '@/helper/axiosInstance';
import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { data } from 'cypress/types/jquery';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/ui/pagination';
import page from '@/app/page';

interface IMyEventProps {
  id: number;
  namaEvent: string;
  tanggalEvent: string;
  deskripsiEvent: string;
  userId: number;
  status: string;
  type: string;
  harga: number;
  imgEvent: string;
  location: {
    id: number;
    locationName: string;
  };
  categori: {
    id: number;
    categoriName: string;
  };
}

const MyEvent: React.FunctionComponent<IMyEventProps> = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [events, setEvents] = React.useState<IMyEventProps[]>([]);
  const [paginationEvent, setPaginationEvent] = React.useState<[]>([]);
  const [locations, setLocations] = React.useState<
    { id: number; locationName: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [dataCategori, setDataCategori] = React.useState<
    { id: number; categoriName: string }[]
  >([]);
  const [selectedCategori, setSelectedCategori] = React.useState('');
  // const [currentPage, setCurrentPage] = React.useState<number>(1);
  // const [totalPage, setTotalPAge] = React.useState<number>(1);
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('api/event/getAllEvent');
      setEvents(data.data);
      console.log('DATANYA TOL', events);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategori = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8001/api/event/getcategori',
      );
      setDataCategori(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterEventsByCategori = async (categoriName: string) => {
    try {
      if (categoriName === '') {
        fetchEvents();
      } else {
        const { data } = await axios.post(
          'http://localhost:8001/api/event/getdatabycategori',
          { categoriName },
        );
        setEvents(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocations = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8001/api/event/getlocation',
      );
      setLocations(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterEventsByLocation = async (locationName: string) => {
    try {
      if (locationName === '') {
        fetchEvents();
      } else {
        const { data } = await axios.post(
          'http://localhost:8001/api/event/getdatabylocation',
          { locationName },
        );
        setEvents(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const PaginationEvent = async (page = 1) => {
  //   try {
  //     const { data } = await axios.get(
  //       'http://localhost:8001/api/event/getpagination',
  //       {
  //         params: { page, limit: 10 },
  //       },
  //     );
  //     setPaginationEvent(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  React.useEffect(() => {
    if (user?.email) {
      fetchEvents();
      getLocations();
      getCategori();
    }
  }, [user?.email]);
  // const handlePage = (page: number) => {
  //   setCurrentPage(page);
  //   PaginationEvent(page);
  // };
  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl text-center">List Event</h1>
      <div className="mb-6">
        <div className="flex gap-3">
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => {
                const selectedLocationName = e.target.value;
                setSelectedLocation(selectedLocationName);
                filterEventsByLocation(selectedLocationName);
              }}
              className="p-2 border rounded"
            >
              <option value="">Pilih Lokasi</option>
              {locations.map((location) => (
                <option key={location.id} value={location.locationName}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedCategori}
              onChange={(e) => {
                const selectedCategoriName = e.target.value;
                setSelectedCategori(selectedCategoriName);
                filterEventsByCategori(selectedCategoriName);
              }}
              className="p-2 border rounded"
            >
              <option value="">Pilih Categori</option>
              {dataCategori.map((categori) => (
                <option key={categori.id} value={categori.categoriName}>
                  {categori.categoriName}
                </option>
              ))}
            </select>
          </div>
          <div></div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {events.map((event: IMyEventProps) => (
          <div
            key={event.id}
            className="p-4 mb-4 border rounded-lg shadow-md my-6 min-h-[40vh] flex justify-center items-center"
          >
            <div className="flex gap-3">
              <div>
                <Image
                  src={`http://localhost:8001${event.imgEvent}`}
                  alt={event.namaEvent}
                  width={400}
                  height={400}
                />
                <div className="text-center">
                  <Badge variant="destructive">
                    <p className="font-bold">
                      <span className="text-blue-500 font-semibold text-xl">
                        {event.namaEvent}
                      </span>{' '}
                      |{event.categori?.categoriName}
                    </p>
                  </Badge>
                  <div>
                    <p className="text-gray-600 pl-3 line-clamp-3">
                      {event.deskripsiEvent}
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div>
                      <Badge variant="destructive">
                        <p className="text-black-600">
                          {new Date(event.tanggalEvent).toLocaleDateString()}
                          <span className="text-sm font-semibold">
                            {'       '}|{event.location?.locationName}
                          </span>
                        </p>
                      </Badge>
                    </div>
                    <div>
                      <Button
                        className="border border-solid border-black"
                        onClick={() => {
                          router.replace(`/customer/detail-user/${event.id}`);
                        }}
                      >
                        Detail Event
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvent;
