import React, { useState } from 'react'
import './static/style/style.css'
import './static/style/mobile.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccount from "./pages/MyAccount";
import ShopPage from "./pages/ShopPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ShippingAndPayment from "./pages/ShippingAndPayment";

const CartContext = React.createContext(null);

function App() {
  const [cartContent, setCartContent] = useState(localStorage.getItem('sec-cart') ? JSON.parse(localStorage.getItem('hideisland-cart')) : [1]);

  const addToCart = (id, title, amount, img, size, price) => {
    const uuid = uuidv4();

    let existedUuid, existedAmount = 0;

    /* If product already in cart - increase amount */
    if(cartContent.findIndex((item) => {
      if((item.id === id)&&(item.size === size)) {
        existedUuid = item.uuid;
        existedAmount = item.amount;
        return true;
      }
      else return false;
    }) !== -1) {
      if(existedUuid) {
        // getProductStock(id)
        //     .then(res => {
        //       const result = res?.data?.result[0];
        //       if(result) {
        //         const sizes = [
        //           { name: result.size_1_name, value: result.size_1_stock },
        //           { name: result.size_2_name, value: result.size_2_stock },
        //           { name: result.size_3_name, value: result.size_3_stock },
        //           { name: result.size_4_name, value: result.size_4_stock },
        //           { name: result.size_5_name, value: result.size_5_stock }
        //         ];
        //         sizes.forEach((item) => {
        //           if(item.name === size) {
        //             if(item.value >= existedAmount+amount) {
        //               editCart(existedUuid, id, title, existedAmount+amount, img, size, price);
        //             }
        //           }
        //         })
        //       }
        //     })
      }
    }
    else {
      localStorage.setItem('sec-cart', JSON.stringify([...cartContent, {
        uuid, id, title, amount, img, size, price
      }]));

      setCartContent([...cartContent, {
        uuid, id, title, amount, img, size, price
      }]);
    }
  }

  const editCart = (uuid, id, title, amount, img, size, price) => {
    localStorage.setItem('sec-cart', JSON.stringify(cartContent.map((item) => {
      if(item.uuid === uuid) {
        return {
          uuid, id, title, amount, img, size, price
        }
      }
      else return item;
    })));

    setCartContent(cartContent.map((item) => {
      if(item.uuid === uuid) {
        return {
          uuid, id, title, amount, img, size, price
        }
      }
      else return item;
    }));
  }

  const removeFromCart = (uuid) => {
    const localStorageItem = localStorage.getItem('sec-cart');
    if(localStorageItem) {
      const newCart = JSON.parse(localStorage.getItem('sec-cart'))
          .filter((item) => {
            return item.uuid !== uuid;
          });
      setCartContent(newCart);
      localStorage.setItem('sec-cart', JSON.stringify(newCart));
    }
  }

  return <CartContext.Provider value={{cartContent, addToCart, editCart, removeFromCart}}>
    <Router>
    <Route exact path="/">
      <Homepage />
    </Route>
    <Route path="/zaloguj-sie">
      <LoginPage />
    </Route>
    <Route path="/zarejestruj-sie">
      <RegisterPage />
    </Route>
    <Route path="/moje-konto">
      <MyAccount />
    </Route>
    <Route path="/sklep">
      <ShopPage />
    </Route>
    <Route path="/produkt">
      <SingleProduct />
    </Route>
    <Route path="/koszyk">
      <Cart />
    </Route>
    <Route path="/zamowienie">
        <ShippingAndPayment />
    </Route>
  </Router>
  </CartContext.Provider>
}

export default App;
export { CartContext };
