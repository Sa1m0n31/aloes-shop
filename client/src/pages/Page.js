import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";

const Page = ({title, content}) => {
    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="page">
            <SectionHeader title={title} />
            <article dangerouslySetInnerHTML={{__html: content}}>

            </article>
        </main>
        <Footer />
    </div>
}

export default Page;
