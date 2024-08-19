import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

interface ICardticketProps {}

const Cardticket: React.FunctionComponent<ICardticketProps> = (props) => {
  const router = useRouter();
  return (
    <div>
      <div>
        <div>
          <Image width={200} height={200} src={'/foto/bmth.jpg'} alt=""></Image>
          <h4 className="font-semibold text-sm">Bring Me To Horizon</h4>
        </div>
      </div>
    </div>
  );
};

export default Cardticket;
