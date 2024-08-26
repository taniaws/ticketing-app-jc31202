'use client';
import { withAuthUser } from '@/hoc/authGuard';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';

interface IValidasiProps {
  params: {
    id: string;
  };
}
const Validasi: React.FunctionComponent<IValidasiProps> = ({ params }) => {
  const router = useRouter;
  const [ispaid, setIsPaid] = React.useState(false);
  const [transsaksiCode, setTransaksiCode] = React.useState<number>();
  const handlePayment = async () => {
    const paymentSuccessful = true;
    if (paymentSuccessful) {
      setIsPaid(true);
    }
  };
  // const getTransaksi = async () => {
  //   const { data } = await axios.get(
  //     `http://localhost:8001/api/transaksi/transaksidetail/${params.id}`,
  //   );
  //   setTransaksiCode(data.data.transaksiCode);
  // };
  React.useEffect(() => {
    // getTransaksi();
  });
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={handlePayment}>Bayar Sekarang</button>
      </div>
      {ispaid && (
        <div
          className="mt-20 text-green-700 font-bold text-2xl text-center"
          style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}
        >
          Done Payment{transsaksiCode}
        </div>
      )}
    </div>
  );
};

export default withAuthUser(Validasi);
