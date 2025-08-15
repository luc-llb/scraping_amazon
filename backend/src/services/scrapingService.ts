import { scrapeAmazonProducts, type AmazonProduct } from "../repository/scraping_content";
import getAmazonContent from "../repository/fetch_content";
  
async function scrapingService(keyword: string): Promise<AmazonProduct[]> {
    let html: string = "";
    let products: AmazonProduct[] = [];
  
    for(let i = 0; i < 10; i++) {
      html = await getAmazonContent(keyword);
      products = scrapeAmazonProducts(html);
      
      if(products.length > 0) {
        break;
      }
  
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de tentar novamente
    }
    
    if (products.length === 0) {
      console.log("Nenhum produto encontrado.");
      return [];
    }
    console.log(`Encontrados ${products.length} produtos.`);
    return products;
}

export { scrapingService };
