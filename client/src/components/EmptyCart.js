import React from 'react'
import SectionHeader from "./SectionHeader";

const EmptyCart = () => {
    return <>
        <SectionHeader title="Twój koszyk jest pusty" />
        <a href="/sklep" className="button button--emptyCart">
            Wróć do sklepu
        </a>
    </>
}

export default EmptyCart;
