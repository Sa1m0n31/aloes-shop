import React from 'react'

const SectionHeader = ({title}) => {
    return <header className="sectionHeader">
        <h2 className="sectionHeader__h">
            {title}
        </h2>
    </header>
}

export default SectionHeader;
