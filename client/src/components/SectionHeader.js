import React from 'react'
import {userLogout} from "../helpers/userFunctions";

const SectionHeader = ({title, logout}) => {
    const logoutUser = () => {
        userLogout(localStorage.getItem('sec-sessionKey'))
            .then(res => {
                window.location = "/";
            });
        localStorage.removeItem('sec-sessionKey');
        localStorage.removeItem('sec-user-id');
    }

    return <header className="sectionHeader">
        <h2 className="sectionHeader__h">
            {title}
        </h2>

        {logout ? <button className="button button--logout" onClick={() => { logoutUser(); }}>
            Wyloguj się
        </button> : ""}
    </header>
}

export default SectionHeader;
