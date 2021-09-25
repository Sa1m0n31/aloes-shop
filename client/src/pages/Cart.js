import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CartContent from "../components/CartContent";

const Cart = () => {
    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="cart">
            <CartContent />
        </main>
        <Footer />
    </div>
}

export default Cart;
