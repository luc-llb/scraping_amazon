import { JSDOM } from "jsdom";

/**
 * Interface para os dados de produto extraídos
 */
export interface AmazonProduct {
  title: string;
  rating: number;
  reviews: number;
  image: string;
}

/**
 * Data properties to CSS selectors
 * Using to identify product elements on the page
 */
const dataProps: {[key: string] : string} = {
    "container-items-1": '[data-cy="asin-faceout-container"]',
    "container-items-2": '[cel_widget_id="MAIN-SEARCH_RESULTS-42"]',
    "item-name-1": 'h2.a-size-medium.a-spacing-none.a-color-base.a-text-normal',
    "item-name-2": 'h2.a-size-base-plus.a-spacing-none.a-color-base.a-text-normal',
    "price-inter": '.a-price-whole',
    "price-fraction": '.a-price-fraction',
    "item-image": 'div.a-section.aok-relative.s-image-square-aspect img.s-image',
    "item-link": 'a.a-link-normal.s-line-clamp-4.s-link-style.a-text-normal'
};

/**
 * Function to get product elements from the DOM
 * @param document DOM document
 * @returns Array of product elements
 */
function getItemsElements(document: Document): Element[] {
    const cards_type_1 = document.querySelectorAll(`${dataProps["container-items-1"]}`);
    const cards_type_2 = document.querySelectorAll(`${dataProps["container-items-2"]}`);

    let items: Node[] = Array.from(cards_type_1);
    items = items.concat(Array.from(cards_type_2));
    return items as Element[];
}

/**
 * Convert product elements to JSON format
 * @param items Array of product elements
 * @returns Array of AmazonProduct objects
 */
function itemsToJSON(items: Element[]): AmazonProduct[] {
    let products: AmazonProduct[] = [];

    if (items.length === 0) {
        console.warn("Não há elementos no DOM");
        return products;
    }

    items.forEach(element => {
        // Title
        const titleSelector1 = dataProps["item-name-1"] ?? "";
        const titleSelector2 = dataProps["item-name-2"] ?? "";
        const titleElement = element.querySelector(titleSelector1) || element.querySelector(titleSelector2);
        const title = titleElement ? titleElement.textContent?.trim() ?? "" : "";

        // Link
        const linkSelector = dataProps["item-link"] ?? "";
        const linkElement = element.querySelector(linkSelector);
        const link = linkElement ? "https://www.amazon.com" + linkElement.getAttribute("href") : "";

        // Image
        const imageSelector = dataProps["item-image"] ?? "";
        const imageElement = element.querySelector(imageSelector);
        const image = imageElement ? imageElement.getAttribute("src") ?? "" : "";

        // Price
        const priceWholeSelector = dataProps["price-inter"] ?? "";
        const priceFractionSelector = dataProps["price-fraction"] ?? "";
        const priceWhole = element.querySelector(priceWholeSelector);
        const priceFraction = element.querySelector(priceFractionSelector);
        let price = "";
        if (priceWhole && priceFraction) {
            price = `${priceWhole.textContent?.trim() ?? ""}${priceFraction.textContent?.trim() ?? ""}`;
        }

        if (title && link) {
            products.push({ title, price, link, image });
        }
    });

    return products;
}

/**
 * Função principal para extrair produtos do HTML da Amazon
 * @param html HTML da página de resultados da Amazon
 * @returns Array de produtos encontrados
 */
export function scrapeAmazonProducts(html: string): AmazonProduct[] {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const itemsElements = getItemsElements(document);

    return itemsToJSON(itemsElements);
}