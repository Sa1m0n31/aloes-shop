import React, {useEffect, useState} from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import {getPagesContent} from "../helpers/pagesFunctions";

const Page = ({title, content}) => {
    const [article, setArticle] = useState("");

    useEffect(() => {
        /* Get pages content */
        getPagesContent()
            .then(res => {
                const result = res.data?.result;
                if(result) {
                    if(content === "terms") setArticle(result[0].terms_of_service);
                    else if(content === "policy") setArticle(result[0].privacy_policy);
                }
            });
    }, []);

    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="page">
            <SectionHeader title={title} />
            <article dangerouslySetInnerHTML={{__html: article}}>

            </article>
        </main>
        <Footer />
    </div>
}

export default Page;
