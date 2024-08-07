"use cleint"
import { NavigationMenu,NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
interface INavbarProps {
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return <div>
    <div>
  <div >
    <div className='flex '>
    <div>
    <Image 
    width={50} 
    height={50} 
    src="/meteor.png" 
    alt=''
    className='m-auto ml-3 '
    ></Image>
      </div>
      <div className='text-xl font-semibold text-25px] pl-2 pt-3'>
    <h1>Bad Event Surabaya</h1>
      </div>
  </div>
    </div>
  <div>
    <NavigationMenu className='list-none flex justify-center gap-5'>
      <NavigationMenuItem>
        <Link href="">
         Home
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="">
          Event
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="">
          Blog
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="">
          Biaya
        </Link>
      </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="">
        Hubungi kami
      </Link>
    </NavigationMenuItem>
    </NavigationMenu>
  </div>
    </div>
    <div>
      <NavigationMenu className='list-none'>
        <NavigationMenuItem>
          <Link href="">
          Register
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="">
           Login
          </Link>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
    </div>



};

export default Navbar;
