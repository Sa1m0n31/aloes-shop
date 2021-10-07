import React, { useEffect, useState, useRef } from 'react'

import {
    addAllergens,
    getNewId,
    getProductCategories,
    getProductDetails,
    getProductGallery
} from "../helpers/productFunctions";
import { useLocation } from "react-router";
import {getAllCategories} from "../helpers/categoriesFunctions";

import JoditEditor from 'jodit-react';
import settings from "../helpers/settings";

const AddProductContent = () => {
    const editorR = useRef(null);

    const [update, setUpdate] = useState(false);
    const [name, setName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [id, setId] = useState(0);
    const [categoryId, setCategoryId] = useState(1);
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [recommendation, setRecommendation] = useState(false);
    const [choosenCategories, setChoosenCategories] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [mainImageId, setMainImageId] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [stock, setStock] = useState(null);
    const [details, setDetails] = useState("");
    const [displayOrder, setDisplayOrder] = useState(null);

    /* Prices */
    const [price, setPrice] = useState(null);

    /* Descriptions */
    const [shortDescription, setShortDescription] = useState("");

    /* Options */
    const [sizeM, setSizeM] = useState(true);
    const [sizeL, setSizeL] = useState(false);

    const [addMsg, setAddMsg] = useState("");

    const location = useLocation();

    /* Initialize categories */
    const initializeCategories = (categoryList) => {
        setChoosenCategories(categoryList.map(item => {
           return {
               id: item.category_id,
               selected: true
           }
        }));
    }

    useEffect(() => {
        /* PRODUCT ADDED */
        const added = parseInt(new URLSearchParams(location.search).get("add"));
        if(added) {
            if(added === 1) {
                setAddMsg("Produkt został dodany");
                /* Add allergens */
                addAllergens(parseInt(localStorage.getItem('sec-product-id')), JSON.parse(localStorage.getItem('sec-allergens-to-add')))
                    .then(res => {
                        localStorage.removeItem('sec-product-id');
                        localStorage.removeItem('sec-allergens-to-add');
                    });
            }
            else if(added === 0) {
                setAddMsg("Nie udało się dodać produktu. Prosimy spróbować później lub skontaktować się z administratorem systemu");
            }
        }

        /* Get all categories */
        getAllCategories()
            .then(res => {
                setCategories(res.data.result);
                setChoosenCategories(res.data.result.map((item) => {
                    return {
                        id: item.id,
                        selected: false
                    }
                }));
            });

        /* UPDATE PRODUCT MODE */
        const param = parseInt(new URLSearchParams(location.search).get("id"));
        if(param) {
            setId(param);
            setUpdate(true);

            getProductDetails(param)
                .then(async res => {
                    console.log(res.data.result[0]);
                    await setProduct(res.data.result[0]);
                    await setInitialValues(res.data.result[0]);
                });

            getProductGallery(param)
                .then(res => {
                    setGallery(res.data?.result);
                });

            getProductCategories(param)
                .then(res => {
                    if(res.data.result) {
                        initializeCategories(res.data.result);
                    }
                });
        }
        else {
            getNewId()
                .then(res => {
                   setId(res.data.result+1);
                });
        }
    }, []);

    const setInitialValues = (productData) => {
        console.log(productData);
        setName(productData.name);
        setSubtitle(productData.subtitle);
        setPrice(productData.price);
        setDisplayOrder(productData.display_order);
        setDiscount(productData.discount);
        setCategoryId(productData.category_id);
        setHidden(productData.hidden);
        setRecommendation(productData.recommendation);
        setStock(productData.stock);
        setDetails(productData.details);
        setShortDescription(productData.description);
    }

    const isInArray = (categoryId) => {
        return choosenCategories.filter(item => {
            return item.id === categoryId;
        }).length > 0;
    }

    const handleCategories = (categoryToToggle) => {
        if(isInArray(categoryToToggle)) {
            setChoosenCategories(choosenCategories.map((item) => {
                return {
                    id: item.id,
                    selected: item.id === categoryToToggle ? !item.selected : item.selected
                }
            }));
        }
        else {
            setChoosenCategories([...choosenCategories, { id: categoryToToggle, selected: true }]);
        }
    }

    const isCategoryChoosen = (categoryId) => {
        return choosenCategories.filter((item) => {
            return item.id === categoryId && item.selected;
        }).length > 0;
    }

    const changeMainImage = (e) => {
        e.preventDefault();
        const newMainImageIndex = parseInt(e.target.getAttribute("id").split("-")[1]);
        const allGalleryImages = document.querySelectorAll(".galleryProductImage");
        setMainImageIndex(newMainImageIndex);
        Array.prototype.forEach.call(allGalleryImages, (item, index) => {
            console.log("hello: " + index + " and " + newMainImageIndex);
            if(index === newMainImageIndex) {
                console.log("change style");
                console.log(item);
                item.style.border = "4px solid #fff";
                item.style.filter = "greyscale(.7)";
            }
            else {
                item.style.border = "none";
                item.style.filter = "none";
            }
        });
    }

    const addNewGalleryImage = (e) => {
        const galleryWrapper = document.querySelector(".galleryWrapper");
        const input = document.querySelector(".galleryImageInput");

        const temporaryImages = document.querySelectorAll(".galleryProductImage");
        temporaryImages.forEach(item => {
            item.parentElement.removeChild(item);
        });

        let i = 0;

        Array.prototype.forEach.call(input.files, async (file) => {
            const reader = new FileReader();
            await reader.readAsDataURL(file);

            reader.onload = (e) => {
                const newImg = document.createElement("img");
                console.log(e.target);
                newImg.setAttribute("src", e.target.result);
                newImg.setAttribute("class", "galleryProductImage");
                newImg.setAttribute("alt", "zdjecie-galerii");
                newImg.setAttribute("id", `galleryImage-${i}`);
                newImg.addEventListener("click", (e) => {
                    e.preventDefault();
                    changeMainImage(e);
                });
                if(i === 0) {
                    newImg.style.border = "4px solid #fff";
                    newImg.style.filter = "greyscale(.7)";
                }
                galleryWrapper.appendChild(newImg);
                i++;
            }
        });
    }

    const changeMainImageId = (e) => {
        const id = parseInt(e.target.getAttribute("id").split("-")[2]);
        const allGalleryImages = document.querySelectorAll(".galleryProductImage");
        Array.prototype.forEach.call(allGalleryImages, (item, index) => {
            if(id === parseInt(item.id.split("-")[2])) {
                console.log("change style");
                console.log(item);
                item.style.border = "4px solid #fff";
                item.style.filter = "greyscale(.7)";
            }
            else {
                item.style.border = "none";
                item.style.filter = "none";
            }
        });
        setMainImageId(id);
    }

    return <main className="panelContent addProduct">
        <header className="addProduct__header">
            <h1 className="addProduct__header__h">
                Edycja produktu
            </h1>
        </header>
        {addMsg === "" ? <form className="addProduct__form addProduct__form--addProduct"
                               encType="multipart/form-data"
                               action={update ? `${settings.API_URL}/product/update-product` : `${settings.API_URL}/product/add-product`}
                               method="POST"
        >
            <section className="addProduct__form__section">
                <input className="invisibleInput"
                       name="id"
                       value={id} />

                <label className="addProduct__label">
                    <input className="addProduct__input"
                           name="name"
                           value={name}
                           onChange={(e) => { setName(e.target.value) }}
                           placeholder="Nazwa produktu" />
                </label>
                <label className="addProduct__label">
                    <input className="addProduct__input"
                           name="subtitle"
                           value={subtitle}
                           onChange={(e) => { setSubtitle(e.target.value) }}
                           placeholder="Podtytuł" />
                </label>

                {/* PRICES */}
                <label className="addProduct__label">
                    Cena
                    <input className="addProduct__input"
                           name="price"
                           type="number"
                           step={0.01}
                           value={price}
                           onChange={(e) => { setPrice(e.target.value) }}
                           placeholder="Cena" />
                </label>
                <label className="addProduct__label">
                    Promocja
                    <input className="addProduct__input"
                           name="discount"
                           type="number"
                           step={0.01}
                           value={discount}
                           onChange={(e) => { setDiscount(e.target.value) }}
                           placeholder="Promocja" />
                </label>
                <label className="addProduct__label">
                    Ilość na magazynie
                    <input className="addProduct__input"
                           name="stock"
                           type="number"
                           value={stock}
                           onChange={(e) => { setStock(e.target.value) }}
                           placeholder="Ilość na magazynie" />
                </label>
                <label className="addProduct__label">
                    Kolejność wyświetlania
                    <input className="addProduct__input"
                           name="displayOrder"
                           type="number"
                           value={displayOrder}
                           onChange={(e) => { setDisplayOrder(e.target.value) }}
                           placeholder="Kolejność wyświetlania" />
                </label>


                <section className="addProduct__categorySelect">
                    {categories?.map((item, index) => {
                        if(!item.parent_id) {
                            return <><label className="panelContent__filters__label__label" key={index}>
                                <button value={item.id} className="panelContent__filters__btn" onClick={(e) => { e.preventDefault(); handleCategories(item.id); }}>
                                    <span className={isCategoryChoosen(item.id) ? "panelContent__filters__btn--active" : "d-none"} />
                                </button>
                                {item.name}
                            </label>
                                <input className="invisibleInput"
                                       name={`category-${item.id}`}
                                       value={isCategoryChoosen(item.id)} />


                                {categories?.map((itemChild, indexChild) => {
                                    if(itemChild.parent_id === item.id) {
                                        return <><label className="panelContent__filters__label__label pl-5 d-block" key={index}>
                                            <button value={itemChild.id} className="panelContent__filters__btn" onClick={(e) => { e.preventDefault(); handleCategories(itemChild.id); }}>
                                                <span className={isCategoryChoosen(itemChild.id) ? "panelContent__filters__btn--active" : "d-none"} />
                                            </button>
                                            {itemChild.name}
                                        </label>
                                            <input className="invisibleInput"
                                                   name={`category-${itemChild.id}`}
                                                   value={isCategoryChoosen(itemChild.id)} />
                                        </>
                                    }
                                })}
                            </>
                        }
                    })}
                </section>

                <label className="jodit--label">
                    <span>Krótki opis</span>
                    <JoditEditor
                        name="shortDescription"
                        ref={editorR}
                        value={shortDescription}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => {}} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { setShortDescription(newContent) }}
                    />
                </label>
                <label className="jodit--label">
                    <span>Szczegóły produktu</span>
                    <JoditEditor
                        name="details"
                        ref={editorR}
                        value={details}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => {}} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { setDetails(newContent) }}
                    />
                </label>
            </section>

            <section className="addProduct__form__section">
                <section className="addProduct__form__subsection addProduct__form__subsection--marginLeft marginTop30">

                    <label className="fileInputLabel fileInputLabel--gallery">
                        <span>Zdjęcie produktu</span>
                        <input type="file"
                               onChange={(e) => { addNewGalleryImage(e); }}
                               className="product__fileInput galleryImageInput"
                               name="gallery" />
                        <section className="galleryWrapper" onClick={e => { e.preventDefault(); }}>
                            {gallery?.map((item, index) => {
                                //if(index === 0) setMainImageId(item.id);
                                return <img className="galleryProductImage" onClick={(e) => {update ? changeMainImageId(e) : changeMainImage(e)}} src={`${settings.API_URL}/image?url=/media/${item.file_path}`} id={`gallery-${index}-${item.id}`} alt="zdjecie-produktu" />
                            })}
                        </section>
                    </label>
                </section>


                {/* Hidden inputs */}
                <input className="input--hidden"
                       name="m"
                       value={sizeM} />
                <input className="input--hidden"
                       name="l"
                       value={sizeL} />
                <input className="input--hidden"
                       type="number"
                       name="mainImageIndex"
                       value={mainImageIndex} />
                <input className="input--hidden"
                       type="number"
                       name="mainImageId"
                       value={mainImageId} />

                <label className="panelContent__filters__label__label panelContent__filters__label__label--category">
                    <button className="panelContent__filters__btn" onClick={(e) => { e.preventDefault(); setHidden(!hidden); }}>
                        <span className={hidden ? "panelContent__filters__btn--active" : "d-none"} />
                    </button>
                    Ukryj produkt
                </label>
                <label className="panelContent__filters__label__label panelContent__filters__label__label--category mt-4">
                    <button className="panelContent__filters__btn" onClick={(e) => { e.preventDefault(); setRecommendation(!recommendation); }}>
                        <span className={recommendation ? "panelContent__filters__btn--active" : "d-none"} />
                    </button>
                    Pokaż produkt w polecanych
                </label>

                <input className="invisibleInput"
                       value={hidden ? "hidden" : ""}
                       name="hidden" />
                <input className="invisibleInput"
                       value={recommendation ? "true" : ""}
                       name="recommendation" />
            </section>

            <section className="addProduct__btnWrapper">
                <button className="addProduct__btn" type="submit">
                    {update ? "Zaktualizuj produkt" : "Dodaj produkt"}
                </button>
            </section>
        </form> : <h2 className="addMsg">
            {addMsg}
        </h2> }
    </main>
}

export default AddProductContent;
