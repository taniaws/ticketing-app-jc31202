'use client';
import * as React from 'react';

interface IAboutProps {}

const About: React.FunctionComponent<IAboutProps> = (props) => {
  return (
    <div>
      <div className="font-bold text-2xl flex items-center pl-10 pt-5">
        <h1>Contact Us</h1>
      </div>
      <div className="pt-10 flex justify-center font-bold text-red-600">
        <p>
          Please be sureto read the following notes before <br />
          making an inquiry:
        </p>
        <br />
      </div>
      <div className="pl-96 pt-4">
        <div className="pb-4">
          <h1 className="font-bold">About Our Works</h1>
          <li>Because we receive a very large number of opinions</li>
          <li>We do not accept proposals for ideas or projects.</li>
          <li>
            We do not grant individuals permission to use any character image
          </li>
        </div>
        <div>
          <h1 className="font-bold">About Products & DVDs</h1>
          <li>please also note that the Toie Animation</li>
          <li>we have good product all of time</li>
        </div>
        <div className="pt-5">
          <h1 className="font-bold">Employment Opportunities</h1>
          <li>We post employment information to our japanese website</li>
        </div>
      </div>
    </div>
  );
};

export default About;
