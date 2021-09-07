import React, { useEffect, useState } from 'react'

const SiteMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories([
            'Strona główna',
            'Suplementy diety',
            'Sylwetka',
            "Mięśnie i stawy",
            'Pielęgnacja',
            'Produkty pszczele',
            'Napoje',
            'Zestawy'
        ]);
    }, []);

    return <menu className="siteMenu">
        <ul className="siteMenu__list">
            {categories.map((item) => {
                return <li className="siteMenu__item">
                    <a className="siteMenu__link">
                        {item}
                    </a>
                </li>
            })}
        </ul>
    </menu>
}

export default SiteMenu;
