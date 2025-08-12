import axios from "axios";

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
            headers: header
        });
        return response.data;
    }catch( error ){
        if (error instanceof Error){
            console.warn(error.message, `\n[${url}]`);
        } 
        else
        {
            console.warn("Erro desconhecido", `\n[${url}]`);
        }
    }
}

/**
 * Function responsible to fetch the data from Amazon
 * @param keyWord - The keyword to search for on Amazon
 * @param header - Optional custom headers to use for the request
 */
export default function getAmazonContent(keyWord: string, header?: Header)
{
    const uriValue = encodeURIComponent(keyWord);
    return getData(`https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`, 
        header ?? mozillaHeader);
}
