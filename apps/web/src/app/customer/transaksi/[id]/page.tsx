'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TransaksiPageProps {
  params: {
    id: string;
  };
}

const TransaksiPage: React.FunctionComponent<TransaksiPageProps> = ({
  params,
}) => {
  const router = useRouter();
  const [titleEvent, setTitleEvent] = React.useState('');
  const [LokasiEvent, setLokasiEvent] = React.useState('');
  const [categoriEvent, setCategoriEvent] = React.useState('');
  const [typeEvent, setTypeEvent] = React.useState('');
  const [tanggalEvent, setTanggalEvent] = React.useState('');
  const [hargaEvent, setHargaEvent] = React.useState<number>(0); // Contoh harga dasar
  const [quantity, setQuantity] = React.useState<number>(1);
  const [totalHarga, setTotalharga] = React.useState<number>(hargaEvent);
  const [amount, setAmount] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [transaksiId, setTransaksiId] = React.useState<number>(0);
  const handleButton = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8001/api/transaksi/PostTransaksi`,
        {
          amount: amount,
          eventId: params.id,
          price: price,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
          },
        },
      );
      console.log(data);
      setTransaksiId(data.data.id);
      router.replace(`/customer/Validasi/${transaksiId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataEvent = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/api/event/getallDetail/${params.id}`,
      );
      setTitleEvent(data.data.namaEvent);
      setLokasiEvent(data.data.location.locationName);
      setTypeEvent(data.data.type);
      setTanggalEvent(data.data.tanggalEvent);
      setHargaEvent(data.data.harga);
      setCategoriEvent(data.data.categoriEvent);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getDataEvent();
  });
  const handleQuantityChange = async (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalharga(newQuantity * hargaEvent);
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center">Transaksi Event</h1>
        <div className="flex justify-center ">
          <div className="bg-orange-400 w-1/2 rounded-md pt-5">
            <div className="">
              <div>
                <h3 className="pl-4 text-white font-semibold">
                  Nama Event :{titleEvent}
                </h3>
              </div>
              <div>
                <h3 className="pl-4 text-white font-semibold">
                  Lokasi Event :{LokasiEvent}
                </h3>
              </div>
              <div>
                <h3 className="pl-4 text-white font-semibold">
                  Categori Event :{categoriEvent}
                </h3>
              </div>
              <div>
                <h3 className="pl-4 text-white font-semibold">
                  Tanggal : {tanggalEvent}
                </h3>
              </div>
              <div>
                <h3 className="pl-4 text-white font-semibold">
                  Tipe Event : {typeEvent}
                </h3>
              </div>
              <div className="pl-4 text-white font-semibold">
                <label>Jumlah: </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-16 text-black text-center"
                  min="1"
                />
              </div>
              <div className="pl-4 text-white font-semibold">
                <h3>
                  Total Harga: Rp {totalHarga === 0 ? hargaEvent : totalHarga}
                </h3>
              </div>
              <div className="flex justify-center">
                <Button
                  className="rounded-lg border bg-indigo-100 text-black "
                  onClick={() => {
                    handleButton();
                  }}
                >
                  Bayar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPage;
