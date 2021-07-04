import {useState,useEffect} from "react"

export default function Cart(){
    const [cartItems,setCartItems]=useState([]);
    const [saveLaterItems,setSaveLater]=useState([]);
    const [totalPrice,setToalPrice]=useState(0);

    useEffect(()=>{
        const cart=JSON.parse(localStorage.getItem("cart"));
        setCartItems(cart??[]);
        const laterItems=JSON.parse(localStorage.getItem("saveLater"));
        setSaveLater(laterItems??[]);
        getFinalPrice();
    },[]);

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cartItems));
        localStorage.setItem("saveLater",JSON.stringify(saveLaterItems));
        getFinalPrice();
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

    const getFinalPrice=()=>{
        let sum=0;
        cartItems.forEach(({count,attributes})=>{
            sum=sum+attributes.price*count;
        })
        setToalPrice(sum);
    }

    const addSaveLaterToCart=(item)=>{
        console.log(item)
    }

    const changeItemsQuantity=(item,type,index)=>{
        let tempItems=cartItems;
        let count=tempItems[index].count;
        if(type==="inc"){
            count+=1;
        }
        else{
            count-=1;
    }

    tempItems[index].count=count;
        setCartItems([...tempItems])
    }

    return (
        <div>
            <h1>Cart:</h1>
                <div className="cart-container">
                    <div>
                    {
                    cartItems.length>0?(
                        cartItems.map(({id,title,img,attributes,count},index,arr)=>(
                            <div className="product-card">
                            <img src={img} alt="image"/>
                            <span>{title}</span>
                            <span>Price: {attributes.price}</span><br/>
                            <span>Count: {count}</span>
                            
                            <button onClick={()=>changeItemsQuantity(arr[index],"inc",index)}>+</button>
                            <button onClick={()=>changeItemsQuantity(arr[index],"dec")} disabled={count===1}>-</button>
                            <div>
                            <button onClick={()=>removeFromItemCart(arr[index])}>Remove from cart</button>
                            <button onClick={()=>addToSaveLater(arr[index])}>Save for later</button>
                            </div>
                            </div>
                        ))
                    ):"No items in Cart"
                }
                    </div>
                    <div>
                        <h1>Summary</h1>
                        Items in cart:{cartItems.length}
                        Total Price: {totalPrice}
                    </div>
                </div>
                <div>
                    <h1>Save later:</h1>
                    {
                        saveLaterItems.map(({id,title,img,attributes,count},index,arr)=>(
                            <div className="product-card">
                            <img src={img} alt="image"/>
                            <span>{title}</span>
                            <span>Price: {attributes.price}</span><br/>
                            <span>Count: {count}</span>
                            <div>
                            <button onClick={()=>addSaveLaterToCart(arr[index])}>Add to Cart</button>
                            </div>
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}