'use client';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Carousel from './landing/Carousel';
interface IBannerProps {}

const Home: React.FunctionComponent<IBannerProps> = (props) => {
  const router = useRouter();
  const [showEvent, setShowEvent] = React.useState<[]>([]);
  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(`api/dashboard/getEvent`);
      setShowEvent(data.data);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[80vh] bg-">
      <Image width="500" height="500" src="/meteor.png" alt=""></Image>
      <div>
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
