import { Card, CardContent } from '@/components/ui/card';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { url } from 'inspector';
import Image from 'next/image';
import { title } from 'process';
import * as React from 'react';

interface ICarouselProps {}
const gambarcarosel = [
  {
    title: 'Bring Me The Horizon',
    url: '/bmth.jpg',
  },
  {
    title: 'I prevail',
    url: '/prevail.jpeg',
  },
  {
    title: 'Cigaretter After Sex',
    url: '/cigarettes.jpg',
  },
  {
    title: 'Slipknot',
    url: '/slipknot.jpg',
  },
];

const Carousel: React.FunctionComponent<ICarouselProps> = (props) => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {gambarcarosel.map(({ title, url }, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent>
                  <div>
                    <Image width={400} height={400} src={url} alt=""></Image>
                  </div>
                  <div>
                    <h3>{title}</h3>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Carousel;
