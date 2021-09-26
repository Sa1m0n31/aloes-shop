import React, { useEffect, useState } from 'react'
import {getAllCategories} from "../helpers/categoryFunctions";

const SiteMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(res => {
                setCategories(res?.data?.result);
            });
    }, []);

    return <menu className="siteMenu d-desktop">
        <ul className="siteMenu__list">
            <li className="siteMenu__item">
                <a className="siteMenu__link" href="/">
                    Strona główna
                </a>
            </li>
            {categories?.map((item, index) => {
                return <li key={index} className="siteMenu__item">
                    <a className="siteMenu__link" href={`/sklep/${item.permalink}`}>
                        {item.name}
                    </a>
                </li>
            })}
        </ul>
    </menu>
}

export default SiteMenu;
