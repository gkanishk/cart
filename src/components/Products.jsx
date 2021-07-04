import { useEffect, useState } from "react";
import products from "../assets/products.json";

export default function Products(){
    const [showProducts,setProducts]=useState(products);
    const [cartItems,setCartItems]=useState([]);

    useEffect(()=>{
        const cart=JSON.parse(localStorage.getItem("cart"));
        setCartItems(cart??[]);
    },[])

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cartItems));
    },[cartItems])

    const addToCart=(item)=>{
        console.log("added")
        const tempCart=cartItems;
        tempCart.push({...item,count:1});
        setCartItems([...tempCart])
    }

    const removeFromCart=(itemParam)=>{
        let tempCart=cartItems;
        tempCart=tempCart.filter((item)=>item.id!==itemParam.id);
        setCartItems([...tempCart])
    }

    const itemPresent=(item)=>{
        let isPresent=false;
        cartItems.forEach(({id})=>{
            if(id===item.id)
            isPresent=true
        })
        return isPresent
    }

    const getDiscounterPrice=({price,disc})=>{
        return Math.round(price-((disc/100)*price));
    }

    return (
        <>
        Produts
        <div className="products-container">
            {
                showProducts.map(({id,title,img,attributes},index,arr)=>(
                    <div className="product-card" key={id}>
                    <img src={img} alt={title}/>
                    <strong>{title}</strong><br/>
                    <p>
                        <span>Price: {getDiscounterPrice(attributes)}</span>
                        <span style={{textDecoration:"line-through",margin:"0 0.2rem"}}>{attributes.price}</span>
                        <span>{attributes.disc}%</span>
                    </p><br/>
                    
                        {
                        itemPresent(arr[index])?
                        <button onClick={()=>removeFromCart(arr[index])}>Remove from cart</button>
                        :
                        <button onClick={()=>addToCart(arr[index])}>Add to cart</button>}
                    </div>
                ))
            }
        </div>
        </>
    )
}