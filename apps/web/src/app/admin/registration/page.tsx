"use client"

import { withAuthAdmin } from '@/hoc/authGuard';
import * as React from 'react';

interface IRegistrationProps {
}

const Registration: React.FunctionComponent<IRegistrationProps> = (props) => {
  return (
    <div>
        Attendee Registration
    </div>
  );
};

export default withAuthAdmin(Registration);
