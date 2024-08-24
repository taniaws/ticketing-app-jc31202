'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoginContext, UserContext } from '@/context/UserContext';
import { ROLE } from '@prisma/client';

interface INavbarProps {}
const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);
  const { user, setUser } = React.useContext(UserContext);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    router.replace('/login');
    window.location.reload();
  };

  React.useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1">
          <Image
            width={50}
            height={50}
            src="/meteor.png"
            alt="Meteor Logo"
            className="pl-3"
          />
          <h1 className="text-lg font-semibold pl-2">Bad Event Surabaya</h1>
        </div>
        {isLoggedIn && user?.role === 'CUSTOMER' && (
          <div className="flex-1">
            <NavigationMenu className="list-none flex gap-7 font-semibold justify-between">
              <NavigationMenuItem>
                <Link href="/landing">Home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customer/event">Events</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customer/tickets">Tickets</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customer/points">Points</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customer/review">Reviews</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customer/profile">Profile</Link>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
        )}
        {isLoggedIn && user?.role === ROLE.ADMIN && (
          <div className="flex-1">
            <NavigationMenu className="list-none flex gap-7 font-semibold justify-between">
              <NavigationMenuItem>
                <Link href="/home">Home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/myevent">Events</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/registration">Registration</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/statistics">Statistics</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/admin/profile">Profile</Link>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
        )}
        <div className="flex justify-end gap-5 font-semibold pr-3 flex-1">
          {isLoggedIn ? (
            <NavigationMenu className="list-none flex gap-5">
              <NavigationMenuItem>
                <button onClick={handleLogout}>Logout</button>
              </NavigationMenuItem>
            </NavigationMenu>
          ) : (
            <NavigationMenu className="list-none flex gap-5">
              <NavigationMenuItem>
                <Link href="/register">Register</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login">Login</Link>
              </NavigationMenuItem>
            </NavigationMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
