"use client"
import { NavigationMenu,Link } from '@radix-ui/react-navigation-menu';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface IAdmindashboardProps {
}

const Admindashboard: React.FunctionComponent<IAdmindashboardProps> = (props) => {
  const router = useRouter();
  router.push("/create")
  return <div>
    <div>
        <div>
            <NavigationMenu>
            <Link href="">Profile Admin</Link>
            </NavigationMenu>
            <NavigationMenu>
            <Link href="/create">Create Event</Link>
            </NavigationMenu>
            <NavigationMenu>
            <Link href="">My Event</Link>
            </NavigationMenu>
        </div>
    </div>
  </div> ;
};

export default Admindashboard;
