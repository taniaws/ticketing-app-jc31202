import * as React from 'react';
import { Button } from '@/components/ui/button';

interface IMyeventProps {}

const Myevent: React.FunctionComponent<IMyeventProps> = (props) => {
  return (
    <div>
      <div>
        <div>
          <h1>My Event</h1>
        </div>
        <div>
          <Button>Edit</Button>
        </div>
      </div>
    </div>
  );
};

export default Myevent;
