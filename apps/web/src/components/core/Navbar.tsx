"use client"
import { NavigationMenu,NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoginContext } from "@/context/UserContext";

interface INavbarProps {
}
const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);
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
    <div className="mx-auto p-4 shadow-md sticky">
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1">
          <Image 
            width={50} 
            height={50} 
            src="/meteor.png" 
            alt="Meteor Logo" 
            className="pl-3"
          />
          <h1 className="text-xl font-semibold pl-2">Bad Event Surabaya</h1>
        </div>
        {isLoggedIn && (
          <div className='flex-1'>
            <NavigationMenu className="list-none flex gap-7 font-semibold">
              <NavigationMenuItem>
                <Link href="/">Home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/event">Event</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog">Blog</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/biaya">Biaya</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact">Contact</Link>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
        )}
        <div className="flex justify-end gap-5 font-semibold pr-3 flex-1">
            {isLoggedIn? (
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