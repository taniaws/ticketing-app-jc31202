import * as React from 'react';
import { Button } from '@/components/ui/button';
import { withAuthUser } from '@/hoc/authGuard';

interface IListEventProps {}

const ListEvent: React.FunctionComponent<IListEventProps> = (props) => {
  return (
    <div>
      <div>
        <h4>List Event Music</h4>
      </div>
      <div>
        <input type="text" placeholder="search" className="" />
      </div>
      <div>
        <Button className="shadow">Klik</Button>
      </div>
    </div>
  );
};

export default withAuthUser(ListEvent);
