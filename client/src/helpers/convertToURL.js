const convertToURL = (str) => {
    console.log(str);
    console.log(str.toLowerCase()
        .replace(/-/g, "--")
        .replace(/ /g, "-")
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ź/g, "z")
        .replace(/ż/g, "z"));
    if(str) return str.toLowerCase()
        .replace(/-/g, "--")
        .replace(/ /g, "-")
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ź/g, "z")
        .replace(/ż/g, "z")
    else return "";
}

const convertToString = (url) => {
    console.log(url);
    console.log(url.replace(/--/g, "123456789").replace(/-/g, " ").replace(/123456789/g, "-"));
    if(url) return url.replace(/--/g, "123456789").replace(/-/g, " ").replace(/123456789/g, "-");
    else return "";
}

export default convertToURL;
export { convertToString }
