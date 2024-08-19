'use client';
import * as React from 'react';

interface IBannerProps {}

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <div>
      <div>
        <h1 className="text-center font-extrabold text-xl font-serif">
          BAD EVENT SURABAYA
        </h1>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
