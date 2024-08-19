"use client"

import { withAuthAdmin } from '@/hoc/authGuard';
import * as React from 'react';

interface IStatisticsProps {
}

const Statistics: React.FunctionComponent<IStatisticsProps> = (props) => {
  return (
    <div>
        Statistics
    </div>
  );
};

export default withAuthAdmin(Statistics);
