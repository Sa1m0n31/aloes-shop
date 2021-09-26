import React, { useState } from 'react'
import './static/style/admin.css'
import './static/style/adminMobile.css'
import './static/style/style.css'
import './static/style/mobile.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Homepage from "./pages/Homepage";
import LoginAdminPage from './admin/pages/LoginPage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccount from "./pages/MyAccount";
import ShopPage from "./pages/ShopPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ShippingAndPayment from "./pages/ShippingAndPayment";
import TyPage from "./pages/TyPage";
import PanelPage from "./admin/pages/PanelPage";
import PanelProducts from "./admin/pages/PanelProducts";
import PanelOrders from "./admin/pages/PanelOrders";
import PanelCategories from "./admin/pages/PanelCategories";
import PanelPayment from "./admin/pages/PanelPayment";
import PanelShipping from "./admin/pages/PanelShipping";
import PanelSettings from "./admin/pages/PanelSettings";
import PanelCoupons from "./admin/pages/PanelCoupons";
import PanelImages from "./admin/pages/PanelImages";
import PanelOthers from "./admin/pages/PanelOthers";
import NewsletterPage from "./admin/pages/NewsletterPage";
import PanelStocks from "./admin/pages/PanelStocks";
import AddStockPage from "./admin/pages/AddStockPage";
import AddProductPage from "./admin/pages/AddProductPage";
import AddPostPage from "./admin/pages/AddPostPage";
import OrderDetails from "./admin/pages/OrderDetails";
import {getProductById} from "./helpers/productFunctions";
import Page from "./pages/Page";

const CartContext = React.createContext(null);

function App() {
  const [cartContent, setCartContent] = useState(localStorage.getItem('sec-cart') ? JSON.parse(localStorage.getItem('sec-cart')) : []);

  const addToCart = (id, title, amount, img, price) => {
    const uuid = uuidv4();

    let existedUuid, existedAmount = 0;

    /* If product already in cart - increase amount */
    if(cartContent.findIndex((item) => {
      if(item.id === id) {
        existedUuid = item.uuid;
        existedAmount = item.amount;
        return true;
      }
      else return false;
    }) !== -1) {
      if(existedUuid) {
        getProductById(id)
            .then(res => {
                console.log(res.data.result);
                editCart(existedUuid, id, title, existedAmount+amount, img, price);
            });


        // getProductStock(id)
        //     .then(res => {
        //       editCart(existedUuid, id, title, existedAmount+amount, img, price);

              // const result = res?.data?.result[0];
              // if(result) {
              //   const sizes = [
              //     { name: result.size_1_name, value: result.size_1_stock },
              //     { name: result.size_2_name, value: result.size_2_stock },
              //     { name: result.size_3_name, value: result.size_3_stock },
              //     { name: result.size_4_name, value: result.size_4_stock },
              //     { name: result.size_5_name, value: result.size_5_stock }
              //   ];
              //   sizes.forEach((item) => {
              //     if(item.name === size) {
              //       if(item.value >= existedAmount+amount) {
              //         editCart(existedUuid, id, title, existedAmount+amount, img, size, price);
              //       }
              //     }
              //   })
              // }
            //})
      }
    }
    else {
      localStorage.setItem('sec-cart', JSON.stringify([...cartContent, {
        uuid, id, title, amount, img, price
      }]));

      setCartContent([...cartContent, {
        uuid, id, title, amount, img,  price
      }]);
    }
  }

  const editCart = (uuid, id, title, amount, img, price) => {
    localStorage.setItem('sec-cart', JSON.stringify(cartContent.map((item) => {
      if(item.uuid === uuid) {
        return {
          uuid, id, title, amount, img, price
        }
      }
      else return item;
    })));

    setCartContent(cartContent.map((item) => {
      if(item.uuid === uuid) {
        return {
          uuid, id, title, amount, img, price
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
    <Route path="/dziekujemy">
      <TyPage />
    </Route>
    <Route path="/regulamin">
      <Page title="Regulamin" content={""} />
    </Route>
    <Route path="/polityka-prywatnosci">
      <Page title="Polityka prywatności" content={""} />
    </Route>

      {/* Admin routes */}
      <div className="admin">
        <Route exact path='/admin'>
          <LoginAdminPage />
        </Route>
        <Route exact path="/panel">
          <PanelPage />
        </Route>
        <Route path="/panel/produkty">
          <PanelProducts />
        </Route>
        <Route path="/panel/zamowienia">
          <PanelOrders />
        </Route>
        <Route path="/panel/kategorie">
          <PanelCategories />
        </Route>
        <Route path="/panel/platnosci">
          <PanelPayment />
        </Route>
        <Route path="/panel/wysylka">
          <PanelShipping />
        </Route>
        <Route path="/panel/ustawienia">
          <PanelSettings />
        </Route>
        <Route path="/panel/kupony">
          <PanelCoupons />
        </Route>
        <Route path="/panel/zdjecia">
          <PanelImages />
        </Route>
        <Route path="/panel/pozostale">
          <PanelOthers />
        </Route>
        <Route path="/panel/newsletter">
          <NewsletterPage />
        </Route>
        <Route path="/panel/stany-magazynowe">
          <PanelStocks />
        </Route>
        <Route path="/panel/dodaj-stan-magazynowy">
          <AddStockPage />
        </Route>

        {/* Add content pages */}
        <Route path="/panel/dodaj-produkt">
          <AddProductPage />
        </Route>
        <Route path="/panel/dodaj-wpis">
          <AddPostPage />
        </Route>

        {/* Order details */}
        <Route path="/panel/szczegoly-zamowienia">
          <OrderDetails />
        </Route>
      </div>
  </Router>
  </CartContext.Provider>
}

export default App;
export { CartContext };
