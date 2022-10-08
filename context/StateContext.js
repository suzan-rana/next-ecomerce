import React, { useState, useContext, createContext } from "react";
import toast from "react-hot-toast";

// logic here.

// context ---------------------------------
const Context = createContext();

const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(true);
  const [totalQuantitites, setTotalQuantities] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ checkout, setCheckOut ] = useState(false)

  const handleAddToCart = (product, quantity) => {
    //totalquantites--inc
    //totalprice--

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    const checkInCartForItem = cartItems.find(
      (item) => item._id === product._id
    );
    // const updatedCart = cartItems.filter((item) => item._id !== product._id);
    const checkForItemInCart = cartItems.find( item => item._id === product._id)
    if( checkForItemInCart ) {
        const updatedCartItems = cartItems.map( cartProduct => {
            if(cartProduct._id === product._id) {
                return {
                    ...cartProduct,
                    quantity: checkForItemInCart.quantity + quantity
                }
            } else {
                return cartProduct
            }
            
        })
        setCartItems(updatedCartItems)
        toast.success(`${product.name} added to Cart.`);
        return;
    }
    // if (checkInCartForItem) {
    //   setCartItems([
    //     ...updatedCart,
    //     {
    //       ...checkInCartForItem,
    //       quantity: checkInCartForItem.quantity + quantity,
    //     },
    //   ]);
    //   return;
    // }
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        ...product,
        quantity: quantity,
      },
    ]);
    toast.success(`${product.name} added to Cart.`);
    return;
  };

  const removeFromCart = (id) => {
    const toBeRemovedItem = cartItems.find((item) => item._id === id);
    setTotalQuantities(
      (prevTotalQuantitiy) => prevTotalQuantitiy - toBeRemovedItem.quantity
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - toBeRemovedItem.quantity * toBeRemovedItem.price
    );
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    console.log("Total Price is:", totalPrice);
    console.log("Total Quantities is:", totalQuantitites);
  };


  //increase from cart
  const toggleQuantityFromCart = (id, value) => {
    const item = cartItems.find( element => element._id === id)
    const updatedCartItem = []
    console.log(value)
    if( value == 'INC') {
        const updatedCartItem = cartItems.map( cartItem => {
            if( cartItem._id === id ) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
            }
            return cartItem
        })
        setCartItems(updatedCartItem)
        setTotalQuantities(prevTotalQuantitiy => prevTotalQuantitiy + 1)
        setTotalPrice(prevTotalPrice => prevTotalPrice + item.price)
        
    } else if( value == 'DEC' && item.quantity > 1) {
        const updatedCartItem = cartItems.map( cartItem => {
            if( cartItem._id === id ) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                }
            }
            return cartItem
        })
        setCartItems(updatedCartItem)
        setTotalQuantities(prevTotalQuantitiy => prevTotalQuantitiy - 1)
        setTotalPrice(prevTotalPrice => prevTotalPrice - item.price)
    }
    
  }
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        handleAddToCart,
        totalQuantitites,
        totalPrice,
        cartItems,
        removeFromCart, toggleQuantityFromCart,
        checkout, setCheckOut
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { StateContext };
const useStateContext = () => useContext(Context);
export default useStateContext;
