import {useState,useEffect} from "react"

export default function Cart(){
    const [cartItems,setCartItems]=useState([]);
    const [saveLaterItems,setSaveLater]=useState([]);
    const [totalPrice,setToalPrice]=useState(0);
    const [totalCount,setTotalCount]=useState(0);
    const [totalDiscountedPrice,setDiscountPrice]=useState(0);

    useEffect(()=>{
        const cart=JSON.parse(localStorage.getItem("cart"));
        setCartItems(cart??[]);
        const laterItems=JSON.parse(localStorage.getItem("saveLater"));
        setSaveLater(laterItems??[]);
        getFinalPrice();
        getItemCount();
    },[]);

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cartItems));
        localStorage.setItem("saveLater",JSON.stringify(saveLaterItems));
        getFinalPrice();
        getItemCount();
    },[cartItems])

    const addToSaveLater=(item)=>{
        const tempArr=saveLaterItems;
        tempArr.push(item);
        setSaveLater([...tempArr]);
        removeFromItemCart(item);
    }

    const removeFromItemCart=(itemParam)=>{
        let tempCart=cartItems;
        tempCart=tempCart.filter((item)=>item.id!==itemParam.id);
        setCartItems([...tempCart])
    }

    const getDiscounterPrice=({price,disc})=>{
        return Math.round(price-((disc/100)*price));
    }

    const getFinalPrice=()=>{
        let sum=0;
        let initialSum=0;
        cartItems.forEach(({count,attributes})=>{
            sum=sum+getDiscounterPrice(attributes)*count;
            initialSum=initialSum+attributes.price*count;
        })
        setToalPrice(initialSum);
        setDiscountPrice(sum);
    }

    const addSaveLaterToCart=(item)=>{
        console.log(item)
        const tempItems=cartItems;
        tempItems.push(item);
        setCartItems([...tempItems]);
        const tempSaveLaterItems=saveLaterItems.filter(({id})=>id!==item.id);
        setSaveLater([...tempSaveLaterItems])
    }

    const changeItemsQuantity=(type,index)=>{
        let tempItems=cartItems;
        if(type==="inc"){
            tempItems[index].count+=1;
        }
        else{
            tempItems[index].count-=1;
    }
        setCartItems([...tempItems])
    }

    const getItemCount=()=>{
        let itemsCount = 0;
        cartItems.forEach(({count})=>{
            itemsCount+=count;
        })
        setTotalCount(itemsCount);
    }

    return (
        <div>
            <h1>Cart:</h1>
                {totalCount===0&&"No items in Cart"}
                <div className="cart-container">
                    <div className="products-container">
                    {
                    cartItems.length>0&&(
                        cartItems.map(({id,title,img,attributes,count},index,arr)=>(
                            <div className="product-card" key={id}>
                            <img src={img} alt={title}/>
                            <strong>{title}</strong> <br/>
                            <span>Price: {getDiscounterPrice(attributes)}</span>
                            <span style={{textDecoration:"line-through",margin:"0 0.2rem"}}>{attributes.price}</span>
                            <span>{attributes.disc}%</span><br/>
                            <span>Count: {count}</span>
                            
                            <button className="circular-btn" onClick={()=>changeItemsQuantity("inc",index)}>+</button>
                            <button className="circular-btn" onClick={()=>changeItemsQuantity("dec",index)} disabled={count===1}>-</button>
                            <div>
                            <button onClick={()=>removeFromItemCart(arr[index])}>Remove from cart</button>
                            <button onClick={()=>addToSaveLater(arr[index])}>Save for later</button>
                            </div>
                            </div>
                        ))
                    )
                }
                    </div>
                    <div>
                        <h1>Summary</h1>
                        <div>Items in cart:{totalCount}</div>
                        <div>Initial Price: Rs. {totalPrice}</div>
                        <div>Savings: Rs. {totalPrice-totalDiscountedPrice}</div>
                        <span>Total Price: Rs. {totalDiscountedPrice}</span>
                    </div>
                </div>
                <div>
                    <h1>Save later:</h1>
                    <div className="products-container">
                    {
                        saveLaterItems.length>0?(saveLaterItems.map(({id,title,img,attributes,count},index,arr)=>(
                            <div className="product-card" key={id}>
                            <img src={img} alt={title}/>
                            <strong>{title}</strong><br/>
                            <span>Price: Rs.{attributes.price}</span><br/>
                            <span>Count: {count}</span>
                            <div>
                            <button onClick={()=>addSaveLaterToCart(arr[index])}>Add to Cart</button>
                            </div>
                            </div>
                        ))):"No Saved Item"
                    }
                    </div>
                </div>
        </div>
    )
}