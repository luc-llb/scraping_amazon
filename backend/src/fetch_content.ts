import axios, { Axios } from "axios";

/**
 * Sets the header type to allow generic headers like mozilaHeader
 */
type Header = { [key: string]: string }

/**
 * Generic header with mozilla configurations
 */   
const mozillaHeader: Header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "sec-ch-ua": "\"Chromium\";v=\"115\", \"Google Chrome\";v=\"115\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "referer": "https://www.google.com/",
    "pragma": "no-cache"   
}

/**
 * Fetch data from a URL with the specified headers.
 * @param url The URL to fetch data from.
 * @param header The headers to include in the request.
 * @returns The data fetched from the URL or an error message.
 */
async function getData(url: string, header: Header)
{
    try{
        const response = await axios.get(url, {
            headers: header,
            maxRedirects: 5,
            validateStatus: (status) => {return true;},
            timeout: 30000
        });
        return response;
    }catch( error ){
        if (error instanceof Error){
            console.warn(error.message, `\n[${url}]`);
        } 
        else
        {
            console.warn("Erro desconhecido", `\n[${url}]`);
        }
        return "--Error fetching data--";
    }
}

/**
 * Function to get cookies from a URL
 * @param url The URL to fetch cookies from
 * @returns Array of cookies or empty string if not found
 */
async function getCookies(url: string): Promise<string[] | string> 
{
    const response = await getData(encodeURI(url), mozillaHeader);
    
    if (typeof response === "string") {
        return "";
    }
    
    try{
        const cookies = response.headers["set-cookie"];
        return cookies || ""; 
    }
    catch (error) {
        console.error("Erro ao obter cookies:", error);
        return "";
    }
}

/**
 * Function that processes Cookies to used them in headers
 * @param cookies Array with cookies obtained from a page
 * @returns String with the cookies
 */
function processCookies(cookies: string[]): string
{
    if (Array.isArray(cookies) && cookies.length > 0) {
        const setCookie = cookies.map(c => c.split(";")[0]);
        return setCookie.join("; ");
    } 

    return "";
}

/**
 * Function responsible to fetch the data from Amazon
 * @param keyWord - The keyword to search for on Amazon
 * @param header - Optional custom headers to use for the request
 */
export default async function getAmazonContent(keyWord: string, header?: Header)
{
    const cookies = await getCookies("https://www.amazon.com/");

    if (Array.isArray(cookies)) {
        const cookiesFormated = processCookies(cookies);
        if (header) {
            header["Cookie"] = cookiesFormated;
        } else {
            mozillaHeader["Cookie"] = cookiesFormated;
        }
    }

    const uriValue = encodeURIComponent(keyWord);
    const response = await getData(`https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`, 
        header ?? mozillaHeader);

    if(typeof response === "string"){
        return response;
    }else{
        return response.data;
    }
}
