"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Collapse, Drawer, useTheme } from "@mui/material";
import {
  default as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import Authentication from "../firebase/authentication";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { usePathname } from 'next/navigation';
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}



const pages = [{name:'Home', link:"/"}, { name:"About", link:"/about"}, {name:"Contact Us", link:"/contact-us"}];

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<User|null>(null);
  const theme = useTheme();
  const router = useRouter();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navlinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '#about' },
    { name: 'Contact Us', link: '#Contact Us' },
    { name: 'Products', link: '/products' },
    
  ];

  const adminLinks = [{ name: "Invoices", link: "/invoice" }];

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      {/* Brand */}
      <div className="flex flex-row items-center gap-3 text-lg font-medium">
        <img src="/images/logo.jpg" class="h-12" />
      </div>

      <div className="flex flex-row gap-4 items-center hidden md:flex">
        {
          navlinks.map( (link) => {
            return (
              <button onClick={ () => { router.push(link.link) } } className={`transition-all ease-in-out duration-300 ease-in-out hover:text-primary-500 flex flex-row py-2 rounded-lg px-3 ${ link.link === pathname ? 'bg-primary-100/40 text-primary-500' : '' }`}>{link.name}</button>
            )
          })
        }
      </div>

      <div className="flex flex-row gap-2 ml-auto hidden md:flex">
        <button className="px-4  text-primary-500 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out">Sign In</button>
        <button className="px-4 bg-primary-500 text-white py-2 font-medium shadow rounded-full transition-all duration-300 ease-in-out">Get started</button>
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
                  <img src="/images/logo.jpg" class="w-full" />
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
                  <button className="px-4 border-2 border-primary-400 rounded-full text-primary-500 py-2 font-medium transition-all duration-300 ease-in-out">Sign In</button>
                  <button className="px-4 bg-primary-500 text-white py-2 font-medium shadow rounded-full transition-all duration-300 ease-in-out">Get started</button>
                </div>
            </div>
          </div> }
    </div>
  );
}
