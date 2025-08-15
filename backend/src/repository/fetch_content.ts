import axios from "axios";
import { randomInt } from "crypto";
import { salvarJSON, salvarPagina } from "./utils.js";
import { AdvancedSessionManager, RecaptchaBypassError } from "./teste.js";

/**
 * Sets the header type to allow generic headers like mozilaHeader
 */
type Header = { [key: string]: string }

/**
 * Array de headers simulando diferentes navegadores
 */
export const headerAgents: string[] = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ];

/**
 * Função para obter um header aleatório
 */
export function getRandomHeaderAgent(): Header {
    const userAgent = headerAgents[randomInt(0, headerAgents.length)] ?? "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

    return {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
    };
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
        console.log("Error fetching cookies");
        return "";
    }
    
    try{
        salvarPagina(response.data);
        const cookies = response.headers["set-cookie"] ?? "";
        return cookies; 
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
 * Function responsible to fetch the data from Amazon using advanced session management
 * @param keyWord - The keyword to search for on Amazon
 * @param header - Optional custom headers to use for the request
 * @param useAdvancedBypass - Whether to use advanced reCAPTCHA bypass techniques
 */
export default async function getAmazonContent(keyWord: string, header?: Header, useAdvancedBypass: boolean = true): Promise<string>
{
    const uriValue = encodeURIComponent(keyWord);
    const searchUrl = `https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`;

    if (useAdvancedBypass) {
        console.log("Usando AdvancedSessionManager para bypass de proteções...");
        
        try {
            const sessionManager = new AdvancedSessionManager();
            
            // Primeiro, simula uma sessão de navegação completa
            await sessionManager.simulateBrowsingSession("https://www.amazon.com");
            
            // Depois faz a requisição com técnicas de bypass
            const response = await sessionManager.makeStealthRequest(searchUrl, {
                useRandomDelay: true,
                useRandomHeaders: true,
                maxRetries: 5
            });

            if (response && response.data) {
                console.log("Dados obtidos com sucesso usando AdvancedSessionManager!");
                salvarPagina(response.data);
                return response.data;
            }
            
        } catch (error) {
            if (error instanceof RecaptchaBypassError) {
                console.warn("AdvancedSessionManager falhou com reCAPTCHA. Tentando método tradicional...");
            } else {
                console.warn("AdvancedSessionManager falhou:", error instanceof Error ? error.message : error);
            }
            
            // Fallback para o método tradicional
            console.log("Fazendo fallback para método tradicional...");
        }
    }

    // Método tradicional como fallback
    console.log("Usando método tradicional...");
    let currentHeader = header ?? getRandomHeaderAgent();
    
    const response = await fetchData(searchUrl, currentHeader);

    if(typeof response === "string"){
        return response;
    } else {
        salvarPagina(response.data);
        return response.data;
    }
}

/**
 * Function to force use of only the AdvancedSessionManager
 * @param keyWord - The keyword to search for on Amazon
 * @returns Promise with the fetched data or error message
 */
export async function getAmazonContentAdvanced(keyWord: string): Promise<string> {
    const uriValue = encodeURIComponent(keyWord);
    const searchUrl = `https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`;

    try {
        console.log("Usando apenas AdvancedSessionManager...");
        const sessionManager = new AdvancedSessionManager();
        
        // Simula sessão de navegação completa
        await sessionManager.simulateBrowsingSession("https://www.amazon.com");
        
        // Faz a requisição principal
        const response = await sessionManager.makeStealthRequest(searchUrl, {
            useRandomDelay: true,
            useRandomHeaders: true,
            maxRetries: 5
        });

        if (response && response.data) {
            console.log("Dados obtidos com sucesso!");
            salvarPagina(response.data);
            return response.data;
        } else {
            throw new Error("Resposta vazia ou inválida");
        }
        
    } catch (error) {
        if (error instanceof RecaptchaBypassError) {
            console.error("Falha no bypass de reCAPTCHA:", error.message);
            return "--Error: reCAPTCHA não pôde ser contornado--";
        } else {
            console.error("Erro no AdvancedSessionManager:", error instanceof Error ? error.message : error);
            return "--Error fetching data with AdvancedSessionManager--";
        }
    }
}

/**
 * Function to use traditional method only (without AdvancedSessionManager)
 * @param keyWord - The keyword to search for on Amazon
 * @param header - Optional custom headers to use for the request
 * @returns Promise with the fetched data or error message
 */
export async function getAmazonContentTraditional(keyWord: string, header?: Header): Promise<string> {
    console.log("Usando apenas método tradicional...");
    
    let currentHeader = header ?? getRandomHeaderAgent();
    const uriValue = encodeURIComponent(keyWord);
    const response = await fetchData(`https://www.amazon.com/s?k=${uriValue}&sprefix=${uriValue}`, currentHeader);

    if(typeof response === "string"){
        return response;
    } else {
        salvarPagina(response.data);
        return response.data;
    }
}
