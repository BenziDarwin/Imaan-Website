"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Authentication from "./firebase/authentication";

// components
import Product from './components/Product/Product';

// icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Home() {
  useEffect(() => {
    if(sessionStorage.getItem("user") === null) {
      // new Authentication().onAuthStateChanged();
    }
  })

  const router = useRouter();

  const productData = [
      {
        id: 0,
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          name: 'Laptop',
          price: '2,500,000 UGX',
          featured: true,
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 1,
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          name: 'Desktop PC',
          price: '3,000,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 2,
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          name: 'Camera',
          price: '1,200,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 3,
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          name: 'Keyboard',
          price: '150,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 4,
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          name: 'Monitor',
          price: '800,000 UGX',
          cols: 2,
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 5,
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          name: 'Smartphone',
          price: '1,500,000 UGX',
          featured: true,
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 6,
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          name: 'Tablet',
          price: '900,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 7,
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          name: 'Printer',
          price: '600,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 8,
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          name: 'Router',
          price: '200,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 9,
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          name: 'External Hard Drive',
          price: '350,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 10,
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          name: 'USB Flash Drive',
          price: '50,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
      {
        id: 11,
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          name: 'Headphones',
          price: '250,000 UGX',
          description: 'Physical systemic grenade skyscraper sensory papier-mache futurity. 3D-printed bomb San Francisco denim cardboard',
      },
  ];

  return (
    <main className="flex flex-col pb-5">
      
      {/* Hero */}
      <div className="flex flex-row h-[100vh] w-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row md:w-[75vw] p-3 md:p-0">
        <div className="flex flex-col items-center md:items-start gap-4 text-gray-700">
          <span className="text-4xl text-center md:text-left font-bold">Most affordable computer appliances in kampala</span>
          <div className="flex flex-col w-full gap-3">
            <span class="text-center md:text-left">Imaan Computer World is the best place to find any computer related accessory or gadget for your home or your business.</span>

            <div className="flex flex-col md:flex-row gap-3">
              <button onClick={ () => { router.push('/products') } } className="bg-primary-100/40 px-6 py-2 rounded-full text-lg font-medium text-primary-500 border border-primary-500">View Products</button>
              <button className="px-6 py-2 rounded-full text-lg font-medium text-white bg-primary-500">Contact Us</button>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <div class="bg-gray-300 w-full h-full"></div>
        </div>
        
      </div>

      </div>

      {/* Products */}
      <div className="flex flex-col md:items-center py-8">
        <div className="flex flex-col md:w-[75%] gap-8 p-3 md:p-0">
          <div className="flex flex-row items-center">
            <span className="text-2xl font-medium">Products</span>

            <button onClick={ () => { router.push('/products') } } className="border border-primary-500 text-primary-500 bg-primary-100/40 font-medium px-6 p-2 rounded-full ml-auto">View All</button>
          </div>

          <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full justify-left overflow-y-scroll -mr-3 snap-x snap-mandatory">
            {productData.map((product) => (
                <div className="flex flex-col w-[75vw] md:w-full shrink-0 snap-center">
                  <Product key={product.id} product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="flex flex-col md:items-center py-8 bg-gray-100">
        <div className="flex flex-col gap-5 md:flex-row md:w-[75%] p-3 md:p-0">
          <div className="flex flex-col text-center md:text-left md:items-start items-center gap-3">
            <span className="text-2xl font-semibold">Contact Us</span>
            <span>Are you looking to get one on one with us? Fill in the form or use one of our contact links</span>

            <div className="flex flex-row gap-2 p-2 rounded-full border border-primary-200 shadow w-fit bg-white">
              <button className="p-2 grid place-items-center bg-primary-500 text-white rounded-full">
                <WhatsAppIcon />
              </button>
              <button className="p-2 grid place-items-center bg-primary-500 text-white rounded-full">
                <InstagramIcon />
              </button>
              <button className="p-2 grid place-items-center bg-primary-500 text-white rounded-full">
                <FacebookIcon />
              </button>
              <button className="p-2 grid place-items-center bg-primary-500 text-white rounded-full">
                <XIcon />
              </button>
              <button className="p-2 grid place-items-center bg-primary-500 text-white rounded-full">
                <PhoneIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full border border-primary-200 rounded-lg shadow p-3 gap-3 bg-white">
              <span className="text-xl font-medium text-center mb-4">Send Us A Message</span>
              <div className="focus-within:ring-2 ring-gray-500 bg-gray-200 p-3 w-full rounded-lg flex flex-row gap-2 items-center text-gray-500">
                <PersonOutlineOutlinedIcon />
                <input className="focus:ring-0 bg-transparent w-full border-0 p-0 text-gray-700" placeholder="Your Name" />
              </div>

              <div className="focus-within:ring-2 ring-gray-500 bg-gray-200 p-3 w-full rounded-lg flex flex-row gap-2 items-center text-gray-500">
                <EmailOutlinedIcon />
                <input className="focus:ring-0 bg-transparent w-full border-0 p-0 text-gray-700" placeholder="Your Email" />
              </div>

              <div className="focus-within:ring-2 ring-gray-500 bg-gray-200 p-3 w-full rounded-lg flex flex-row gap-2 items-center text-gray-500">
                <textarea rows="8" className="focus:ring-0 bg-transparent w-full border-0 p-0 text-gray-700" placeholder="Your Message"></textarea>
              </div>

              <button className="px-6 py-2 rounded-full text-lg font-medium text-primary-500 border border-primary-500">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
