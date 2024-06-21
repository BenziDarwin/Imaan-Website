"use client"
import React, { useEffect, useState } from "react";

// components
import Product from '../components/Product/Product';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import SortIcon from '@mui/icons-material/Sort';
const CategoryButton = ({ isActive, children, onClick }) => {
	const classes = `text-sm px-6 py-2 rounded-full font-semibold ${isActive ? 'bg-primary-500 text-white border-primary-500' : 'border text-gray-500 border-gray-400' }`
	return (
		<button className={classes} onClick={onClick}>{children}</button>
	);
}

export default function ProductsPage() {
	const [currentCategory, setCurrentCategory] = useState<string>('All');
	const categories = ["All", "Laptops", "Bags", "Keyboards", "Mouses"];


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
		<div className="flex flex-row h-full">
			{/* Filters */}
			<div className="flex flex-col border-r w-64 h-full hidden md:flex p-3">
				<span className="text-xl font-semibold">Filters</span>
			</div>


			<div className="flex flex-col w-full h-full">
				{/* Top Bar */}
				<div className="flex flex-col border-b p-3 gap-3">
					<span className="text-xl font-semibold">Check out our Products</span>

					<div className="flex flex-row gap-3 text-sm">
						<button className="flex flex-row items-center text-sm gap-1 items-center text-gray-500 border border-gray-400 px-4 py-2 rounded-full shadow-sm">
							<SortIcon />
							<span className="hidden md:block">Sort By: </span>
							<span> <strong>Popularity</strong></span>
							<KeyboardArrowDownIcon />
						</button>

						<button className="flex flex-row items-center text-sm gap-1 items-center text-gray-500 border border-gray-400 px-4 py-2 rounded-full shadow-sm ml-auto md:hidden">
							<FilterAltOutlinedIcon />
							<span>Filters</span>
						</button>
					</div>
					<div className="flex flex-row gap-2 overflow-x-scroll">
						{categories.map(category => {
							return (
								<CategoryButton key={category} isActive={currentCategory === category} onClick={() => {setCurrentCategory(category)}}>
									{ category }
								</CategoryButton>
							);
						})}
						
					</div>
				</div>

				{/* Products */}
				<div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-3 gap-3 overflow-y-scroll">
					{productData.map((product) => {
						return (
							<Product key={product.id} product={product} />
						)
					})}
				</div>
			</div>
		</div>
	)
}