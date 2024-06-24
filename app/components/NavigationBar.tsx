"use client";

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { auth } from "../firebase/config";

export default function NavigationBar() {
  const [user, setUser] = React.useState<User|null>(null);
  const router = useRouter();
    React.useState<null | HTMLElement>(null);

  const navlinks = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
  ];

  const adminLinks = [{ name: "Invoices", link: "/invoice" }, { name: "Add Item", link: "/add-item" } ];
  const pathname = usePathname();
  
  React.useEffect(() => {
      onAuthStateChanged(auth, async () => {
        console.log(auth.currentUser)
          setUser(auth.currentUser)
      });
  },[user])

  const [mobileNavVisible, setMobileNavVisible] = React.useState(false);

  return (
    <div className="flex flex-row items-center w-full border-b p-3 shadow-sm gap-8 bg-white">
      <div className="flex flex-row items-center gap-3 text-lg font-medium">
        <img src="/images/logo.jpg" className="h-12" />
      </div>

      <div className="flex flex-row gap-4 items-center hidden md:flex">
        {
          navlinks.map( (link) => {
            return (
              <button onClick={ () => { router.push(link.link) } } className={`transition-all ease-in-out duration-300 ease-in-out hover:text-primary-500 flex flex-row py-2 rounded-lg px-3 ${ link.link === pathname ? 'bg-primary-100/40 text-primary-500' : '' }`}>{link.name}</button>
            )
          })
        }
        {
          adminLinks.map( (link) => {
            return (
              <button onClick={ () => { router.push(link.link) } } className={`transition-all ease-in-out duration-300 ease-in-out hover:text-primary-500 flex flex-row py-2 rounded-lg px-3 ${ link.link === pathname ? 'bg-primary-100/40 text-primary-500' : '' }`}>{link.name}</button>
            )
          })
        }
      </div>

      <div className="flex flex-row gap-2 ml-auto hidden md:flex">
        <button onClick={() => router.push("/login")} className="px-4  text-primary-500 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out">Sign In</button>
      </div>

      <button onClick={ () => { setMobileNavVisible(true); }} className="grid place-items-center p-3 border rounded-lg text-gray-500 shadow-sm ml-auto md:hidden">
        <MenuIcon />
      </button>

      { mobileNavVisible && 
          <div className="flex flex-col h-screen w-screen fixed top-0 bg-black/40 left-0 z-50">
            <div className="flex flex-col bg-white w-[85vw] h-full p-3 gap-4">
                <div className="flex flex-row">
                </div>
                <div className="flex flex-row items-start">
                  <img src="/images/logo.jpg" className="w-full" />
                  <button onClick={ () => { setMobileNavVisible(false)}} className="p-2 border rounded-full ml-auto text-gray-500 shadow-sm">
                    <CloseIcon />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {
                    navlinks.map( (link) => {
                      return (
                        <button key={link.name} onClick={ () => { router.push(link.link); setMobileNavVisible(false) } } className={`transition-all ease-in-out duration-300 ease-in-out hover:text-primary-500 flex flex-row py-2 rounded-lg px-3 ${ link.link === pathname ? 'bg-primary-100/40 text-primary-500' : '' }`}>{link.name}</button>
                      )
                    })
                  }
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  <button onClick={() => router.push("/login")} className="px-4 border-2 border-primary-400 rounded-full text-primary-500 py-2 font-medium transition-all duration-300 ease-in-out">Sign In</button>
                </div>
            </div>
          </div> }
    </div>
  );
}
