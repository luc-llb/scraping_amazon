import { scrapeAmazonProducts, type AmazonProduct } from "../repository/scraping_content";
import getAmazonContent, { getAmazonContentAdvanced, getAmazonContentTraditional } from "../repository/fetch_content";

/**
 * Estratégias de fetch disponíveis
 */
export enum FetchStrategy {
    HYBRID = "hybrid",           // Usa AdvancedSessionManager com fallback tradicional
    ADVANCED_ONLY = "advanced",  // Usa apenas AdvancedSessionManager
    TRADITIONAL = "traditional"  // Usa apenas método tradicional
}

/**
 * Configurações do serviço de scraping
 */
interface ScrapingConfig {
    strategy: FetchStrategy;
    maxRetries: number;
    retryDelay: number;
    enableLogging: boolean;
}

/**
 * Serviço de scraping com estratégias avançadas
 */
async function scrapingService(keyword: string, config: Partial<ScrapingConfig> = {}): Promise<AmazonProduct[]> {
    const defaultConfig: ScrapingConfig = {
        strategy: FetchStrategy.HYBRID,
        maxRetries: 10,
        retryDelay: 1000,
        enableLogging: true
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    let html: string = "";
    let products: AmazonProduct[] = [];
    let lastError: string = "";
    
    if (finalConfig.enableLogging) {
        console.log(`🔍 Iniciando scraping para: "${keyword}"`);
        console.log(`📋 Estratégia: ${finalConfig.strategy.toUpperCase()}`);
        console.log(`🔄 Máximo de tentativas: ${finalConfig.maxRetries}`);
    }
  
    for(let i = 0; i < finalConfig.maxRetries; i++) {
        try {
            if (finalConfig.enableLogging) {
                console.log(`\n⏳ Tentativa ${i + 1}/${finalConfig.maxRetries}`);
            }
            
            // Escolhe a estratégia de fetch
            switch (finalConfig.strategy) {
                case FetchStrategy.HYBRID:
                    html = await getAmazonContent(keyword, undefined, true);
                    break;
                    
                case FetchStrategy.ADVANCED_ONLY:
                    html = await getAmazonContentAdvanced(keyword);
                    break;
                    
                case FetchStrategy.TRADITIONAL:
                    html = await getAmazonContentTraditional(keyword);
                    break;
                    
                default:
                    html = await getAmazonContent(keyword);
            }
            
            // Verifica se houve erro na obtenção do HTML
            if (html.includes("--Error")) {
                lastError = html;
                if (finalConfig.enableLogging) {
                    console.log(`❌ Erro no fetch: ${html}`);
                }
                
                // Se for erro de reCAPTCHA, tenta estratégia diferente
                if (html.includes("reCAPTCHA") && finalConfig.strategy === FetchStrategy.HYBRID) {
                    if (finalConfig.enableLogging) {
                        console.log("🛡️ reCAPTCHA detectado, tentando método tradicional...");
                    }
                    html = await getAmazonContentTraditional(keyword);
                }
                
                if (html.includes("--Error")) {
                    await new Promise(resolve => setTimeout(resolve, finalConfig.retryDelay * (i + 1))); // Backoff exponencial
                    continue;
                }
            }
            
            // Tenta extrair produtos do HTML
            products = scrapeAmazonProducts(html);
            
            if (finalConfig.enableLogging) {
                console.log(`📊 HTML obtido: ${html.length} caracteres`);
                console.log(`🛍️ Produtos extraídos: ${products.length}`);
            }
            
            if(products.length > 0) {
                if (finalConfig.enableLogging) {
                    console.log(`✅ Sucesso na tentativa ${i + 1}!`);
                }
                break;
            } else {
                if (finalConfig.enableLogging) {
                    console.log("⚠️ Nenhum produto encontrado nesta tentativa");
                }
            }
            
        } catch (error) {
            lastError = error instanceof Error ? error.message : "Erro desconhecido";
            if (finalConfig.enableLogging) {
                console.error(`💥 Erro na tentativa ${i + 1}:`, lastError);
            }
        }
        
        // Delay entre tentativas
        if (i < finalConfig.maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, finalConfig.retryDelay));
        }
    }
    
    if (products.length === 0) {
        const message = `Nenhum produto encontrado após ${finalConfig.maxRetries} tentativas. Último erro: ${lastError}`;
        if (finalConfig.enableLogging) {
            console.log(`🚫 ${message}`);
        }
        return [];
    }
    
    if (finalConfig.enableLogging) {
        console.log(`🎉 Scraping concluído com sucesso! Encontrados ${products.length} produtos.`);
    }
    
    return products;
}

/**
 * Versão simplificada do serviço (mantém compatibilidade)
 */
async function scrapingServiceSimple(keyword: string): Promise<AmazonProduct[]> {
    return scrapingService(keyword, {
        strategy: FetchStrategy.HYBRID,
        maxRetries: 10,
        enableLogging: true
    });
}

/**
 * Serviço robusto que tenta todas as estratégias sequencialmente
 */
async function scrapingServiceRobust(keyword: string): Promise<AmazonProduct[]> {
    const strategies = [
        FetchStrategy.HYBRID,
        FetchStrategy.ADVANCED_ONLY,
        FetchStrategy.TRADITIONAL
    ];
    
    console.log(`🛡️ Iniciando scraping robusto para: "${keyword}"`);
    
    for (const strategy of strategies) {
        console.log(`\n🔄 Tentando estratégia: ${strategy.toUpperCase()}`);
        
        try {
            const products = await scrapingService(keyword, {
                strategy,
                maxRetries: 3, // Menos tentativas por estratégia
                retryDelay: 2000,
                enableLogging: false // Reduz logs para não poluir
            });
            
            if (products.length > 0) {
                console.log(`✅ Estratégia ${strategy.toUpperCase()} funcionou! ${products.length} produtos encontrados.`);
                return products;
            }
            
        } catch (error) {
            console.log(`❌ Estratégia ${strategy.toUpperCase()} falhou:`, error instanceof Error ? error.message : error);
        }
        
        // Delay entre estratégias
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log("🚫 Todas as estratégias falharam!");
    return [];
}

export { scrapingService, scrapingServiceSimple, scrapingServiceRobust };
