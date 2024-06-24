"use client"

import React, { useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';

// icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Product ({ product }:any) {
	const [_isInCart, setIsInCart] = useState<boolean>(false); // replace
	const [animationParent] = useAutoAnimate();

	const addToCart = () => {
		/* Add to cart logic */
		setIsInCart(true); // replace
	}
	const removeFromCart = () => {
		/* remove from cart logic */
		setIsInCart(false); // replace
	}
	const isInCart = () => {
		// replace with an actual checker for if an items is a cart

		return _isInCart;
	}
	return (
		<div className="border border-primary-100 flex flex-col p-3 rounded-lg shadow-sm gap-3 w-full h-fit">
			<div className="flex flex-col aspect-video bg-primary-100 rounded bg-center bg-cover" ></div>

			<div className="flex flex-col">
				<span className="text-xl font-semibold">{product.name}</span>
				<span className="text-sm font-bold">{product.price}</span>
				<span className="text-sm text-gray-500 mt-2">{product.description}</span>		
			</div>

			<div ref={animationParent} className="flex flex-row w-full">
				{
					isInCart() ? (
			              <button onClick={removeFromCart} className="px-6 py-2 rounded-full font-medium text-white bg-red-500 flex flex-row items-center justify-center gap-2 w-full">
			              	Remove From Cart
			              	<DeleteIcon />
			              </button>
						) : (
			              <button onClick={addToCart} className="px-6 py-2 rounded-full font-medium text-white bg-primary-500 flex flex-row items-center justify-center gap-2 w-full">
			              	Add To Cart
			              	<AddShoppingCartIcon />
			              </button>
						)
				}
			</div>

		</div>
	);
}