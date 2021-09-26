import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import ShippingAndPaymentForm from "../components/ShippingAndPaymentForm";

const ShippingAndPayment = () => {
    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <ShippingAndPaymentForm />
        <Footer />
    </div>
}

export default ShippingAndPayment;
