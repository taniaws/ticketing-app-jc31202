'use client';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { withAuthUser } from '@/hoc/authGuard';

interface ICreateEventPageProps {
  params: {
    id: string;
  };
}
const CreateEventPage: React.FunctionComponent<ICreateEventPageProps> = ({
  params,
}) => {
  const router = useRouter();
  const [titleEvent, setTitleEvent] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [locationId, setLocationId] = React.useState('');
  const [type, setType] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [categoriId, setCategoriId] = React.useState('');
  const [tanggalEvent, setTanggalEvent] = React.useState('');
  const [imageEvent, setImageEvent] = React.useState<string>('');
  // const [imageUrl, setImageUrl] = React.useState<string>('');
  const [hargaEvent, setHargaEvent] = React.useState<Number>(0);
  const [locationData, setLocationData] = React.useState<[]>([]);
  const [CategoriData, setCategoriData] = React.useState<[]>([]);
  const getDataEvent = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/api/event/getallDetail/${params.id}`,
      );
      setTitleEvent(data.data.namaEvent);
      setDescription(data.data.deskripsiEvent);
      setHargaEvent(data.data.harga);
      setImageEvent(data.data.imgEvent);
      setLocationId(data.data.location.locationName);
      setStatus(data.data.status);
      setType(data.data.type);
      setTanggalEvent(new Date(data.data.tanggalEvent).toLocaleDateString());
      setCategoriId(data.data.categori.categoriName);
      console.log('ini datanya', data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDatalocation = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8001/api/event/getlocation',
      );
      setLocationData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log('cannot', error);
    }
  };
  const getDataCategori = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8001/api/event/getcategori',
      );
      setCategoriData(data.data);
    } catch (error) {}
  };
  React.useEffect(() => {
    getDataEvent();
    getDatalocation();
    getDataCategori();
    console.log(params.id);
  }, []);
  return (
    <div>
      <h1 className="font-bold text-2xl pl-3">Detail Event</h1>
      <div className="w-full  flex flex-col p-10 gap-20">
        <div className="w-1/2">
          <div className="gap-10">
            <div>
              <Image
                width={400}
                height={400}
                src={`http://localhost:8001${imageEvent}`}
                alt=""
              ></Image>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5">Title Event</p>
            {/* <input
              type="text"
              placeholder="title event"
              value={titleEvent}
              onChange={(e) => setTitleEvent(e.target.value)}
              className="border-solid border-b-black border w-full h-12"
            /> */}
            <p>{titleEvent}</p>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5 ">Descriptio</p>
            {/* <Textarea
              placeholder="Drop your description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            /> */}
            <p>{description}</p>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5 ">Location</p>
            {/* <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              {locationData.map((locationId: any) => (
                <option key={locationId.id} value={locationId.id}>
                  {locationId.locationName}
                </option>
              ))}
            </select> */}
            <p>{locationId}</p>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5 ">Type Event</p>
            {/* <input
              type="text"
              placeholder="type event"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border-solid border-b-black border w-full h-12"
            /> */}
            <p>{type}</p>
          </div>
          <div className="pt-5">
            {/* <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-"
            >
              <option value="status">Status</option>
              <option value="COMING_SOON">COMING SOON </option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select> */}
            <h3>Status</h3>
            <p>{status}</p>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5 ">Categori</p>
            {/* <select
              value={categoriId}
              onChange={(e) => setCategoriId(e.target.value)}
            >
              {CategoriData.map((categoriId: any) => (
                <option key={categoriId.id} value={categoriId.id}>
                  {categoriId.categoriName}
                </option>
              ))}
            </select> */}
            <p>{categoriId}</p>
          </div>
          <div>
            <p className="text-lg font-semibold pt-5">Tanggal </p>
            {/* <input
              type="date"
              value={tanggalEvent}
              onChange={(e) => setTanggalEvent(e.target.value)}
            /> */}
            <p>{tanggalEvent}</p>
            {/* <DatePicker
              selected={tanggalEvent}
              onChange={(e) => setTanggalEvent(e)}
            /> */}
          </div>
          <div>
            <p className="text-lg font-semibold pt-5 ">Harga</p>
            {/* <input
              className="border-solid border-b-black border w-full h-12"
              type="number"
              value={String(hargaEvent)}
              onChange={(e) => setHargaEvent(parseInt(e.target.value))}
            /> */}
            <p>{String(hargaEvent)}</p>
          </div>
        </div>
        <div>
          <div>
            <Button
              className="bg-slate-400 shadow-md"
              onClick={() => {
                router.replace(`/customer/transaksi/${params.id}`);
              }}
            >
              Lakukan Transaksi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser(CreateEventPage);
