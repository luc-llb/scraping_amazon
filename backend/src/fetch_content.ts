import axios from "axios";
import { randomInt } from "crypto";

/**
 * Sets the header type to allow generic headers like mozilaHeader
 */
type Header = { [key: string]: string }

/**
 * Array de headers simulando diferentes navegadores
 */
export const headerAgents: Header[] = [
    {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "referer": "https://www.google.com/",
        "sec-ch-ua": '"Chromium";v="121", "Google Chrome";v="121", "Not/A)Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "pragma": "no-cache",
        "Connection": "keep-alive",
        "DNT": "1",
        "TE": "Trailers"
    },
    {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "referer": "https://www.bing.com/",
        "sec-ch-ua": '"Not/A)Brand";v="99", "Safari";v="17", "AppleWebKit";v="605"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "pragma": "no-cache",
        "Connection": "keep-alive",
        "DNT": "1",
        "TE": "Trailers"
    },
    {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "referer": "https://duckduckgo.com/",
        "sec-ch-ua": '"Not/A)Brand";v="99", "Firefox";v="125", "Gecko";v="20100101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "pragma": "no-cache",
        "Connection": "keep-alive",
        "DNT": "1",
        "TE": "Trailers"
    },
    {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "referer": "https://www.yahoo.com/",
        "sec-ch-ua": '"Chromium";v="121", "Google Chrome";v="121", "Not/A)Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "pragma": "no-cache",
        "Connection": "keep-alive",
        "DNT": "1",
        "TE": "Trailers"
    }
];

/**
 * Função para obter um header aleatório
 */
export function getRandomHeaderAgent(): Header {
  return !headerAgents[randomInt(0, headerAgents.length)];
}

/**
 * Fetch data from a URL with the specified headers.
 * @param url The URL to fetch data from.
 * @param header The headers to include in the request.
 * @returns The data fetched from the URL or an error message.
 */
async function fetchData(url: string, header: Header)
{
    try{
        const response = await axios.get(url, {
            headers: header,
            maxRedirects: randomInt(5, 8),
            validateStatus: () => true,
            timeout: 60000,

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
async function getCookies(url: string, header: Header): Promise<string[] | string> 
{
    const response = await fetchData(encodeURI(url), header);
    
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
export default async function getAmazonContent(keyWord: string, header?: Header): Promise<string>
{
    let currentHeader = header ?? getRandomHeaderAgent();
    const cookies = await getCookies("https://www.amazon.com/", currentHeader);
    console.log(cookies);
    if (Array.isArray(cookies)) {
        currentHeader["Cookie"] = processCookies(cookies);
    }
    
    const uriValue = encodeURIComponent(keyWord);
    const response = await fetchData(`https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`, currentHeader);

    if(typeof response === "string"){
        return response;
    }else{
        return response.data;
    }
}
