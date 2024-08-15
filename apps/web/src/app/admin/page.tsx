"use client"
import { NavigationMenu,Link } from '@radix-ui/react-navigation-menu';
interface IAdmindashboardProps {
}

const Admindashboard: React.FunctionComponent<IAdmindashboardProps> = (props) => {
  return <div>
    <div>
        <div className='font-semibold flex gap-5 justify-center pt-3'>
            <NavigationMenu>
            <Link href="/profile">Profile Admin</Link>
            </NavigationMenu>
            <NavigationMenu>
            <Link href="/create">Create Event</Link>
            </NavigationMenu>
            <NavigationMenu>
            <Link href="/myevent">My Event</Link>
            </NavigationMenu>
        </div>
    </div>
  </div> ;
};

export default Admindashboard;
