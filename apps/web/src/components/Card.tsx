import Image from 'next/image';
import * as React from 'react';

interface ICardProps {
  titleEvent: string;
  ImageEvent: string;
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  return (
    <div
      className="flex w-60 h-60 shadow-md rounded-md items-center justify-center
  cursor-pointer flex-col xs:w-[100px] xs:h-[100px] xs:pt-5"
    >
      <div className="">
        <Image
          width={400}
          height={400}
          src={`http:${props.ImageEvent}`}
          alt=""
          className="flex justify-center items-center"
        />
        <div>
          <h3 className="text-lg font-bold text-center">{props.titleEvent}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
