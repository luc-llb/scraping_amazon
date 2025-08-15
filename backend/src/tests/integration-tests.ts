/**
 * Demonstração do sistema integrado com AdvancedSessionManager
 * Execute este arquivo para testar todas as funcionalidades
 */

import { scrapingService, scrapingServiceSimple, scrapingServiceRobust, FetchStrategy } from "../services/scrapingService.js";
import getAmazonContent, { getAmazonContentAdvanced, getAmazonContentTraditional } from "../repository/fetch_content.js";

/**
 * Teste das funções de fetch de baixo nível
 */
async function testesFetchBasico() {
    console.log("🔧 === TESTES DE FETCH BÁSICO ===\n");
    
    const keyword = "mouse wireless";
    
    // Teste 1: Método híbrido
    console.log("1️⃣ Testando método híbrido...");
    try {
        const html1 = await getAmazonContent(keyword, undefined, true);
        console.log(`✅ Híbrido: ${html1.length} caracteres`);
        console.log(`🔍 Contém produtos: ${html1.includes('data-component-type="s-search-result"')}`);
    } catch (error) {
        console.log("❌ Híbrido falhou:", error instanceof Error ? error.message : error);
    }
    
    console.log("\n" + "-".repeat(40) + "\n");
    
    // Teste 2: Apenas AdvancedSessionManager
    console.log("2️⃣ Testando apenas AdvancedSessionManager...");
    try {
        const html2 = await getAmazonContentAdvanced(keyword);
        console.log(`✅ AdvancedSessionManager: ${html2.length} caracteres`);
        console.log(`🔍 Contém produtos: ${html2.includes('data-component-type="s-search-result"')}`);
    } catch (error) {
        console.log("❌ AdvancedSessionManager falhou:", error instanceof Error ? error.message : error);
    }
    
    console.log("\n" + "-".repeat(40) + "\n");
    
    // Teste 3: Método tradicional
    console.log("3️⃣ Testando método tradicional...");
    try {
        const html3 = await getAmazonContentTraditional(keyword);
        console.log(`✅ Tradicional: ${html3.length} caracteres`);
        console.log(`🔍 Contém produtos: ${html3.includes('data-component-type="s-search-result"')}`);
    } catch (error) {
        console.log("❌ Tradicional falhou:", error instanceof Error ? error.message : error);
    }
}

/**
 * Teste dos serviços de alto nível
 */
async function testesServicosAltoNivel() {
    console.log("\n\n🚀 === TESTES DE SERVIÇOS DE ALTO NÍVEL ===\n");
    
    const keyword = "teclado mecânico";
    
    // Teste 1: Serviço simples
    console.log("1️⃣ Testando serviço simples...");
    try {
        const produtos1 = await scrapingServiceSimple(keyword);
        console.log(`✅ Serviço simples: ${produtos1.length} produtos encontrados`);
        if (produtos1.length > 0 && produtos1[0]?.title) {
            console.log(`📦 Primeiro produto: ${produtos1[0].title.substring(0, 50)}...`);
        }
    } catch (error) {
        console.log("❌ Serviço simples falhou:", error instanceof Error ? error.message : error);
    }
    
    console.log("\n" + "-".repeat(40) + "\n");
    
    // Teste 2: Serviço configurável
    console.log("2️⃣ Testando serviço configurável (estratégia híbrida)...");
    try {
        const produtos2 = await scrapingService(keyword, {
            strategy: FetchStrategy.HYBRID,
            maxRetries: 3,
            retryDelay: 2000,
            enableLogging: false // Reduz poluição nos logs
        });
        console.log(`✅ Serviço configurável: ${produtos2.length} produtos encontrados`);
        if (produtos2.length > 0 && produtos2[0]?.title) {
            console.log(`📦 Primeiro produto: ${produtos2[0].title.substring(0, 50)}...`);
        }
    } catch (error) {
        console.log("❌ Serviço configurável falhou:", error instanceof Error ? error.message : error);
    }
    
    console.log("\n" + "-".repeat(40) + "\n");
    
    // Teste 3: Serviço robusto
    console.log("3️⃣ Testando serviço robusto (todas as estratégias)...");
    try {
        const produtos3 = await scrapingServiceRobust(keyword);
        console.log(`✅ Serviço robusto: ${produtos3.length} produtos encontrados`);
        if (produtos3.length > 0 && produtos3[0]?.title) {
            console.log(`📦 Primeiro produto: ${produtos3[0].title.substring(0, 50)}...`);
        }
    } catch (error) {
        console.log("❌ Serviço robusto falhou:", error instanceof Error ? error.message : error);
    }
}

/**
 * Teste de múltiplas estratégias com comparação
 */
async function testeComparacaoEstrategias() {
    console.log("\n\n📊 === COMPARAÇÃO DE ESTRATÉGIAS ===\n");
    
    const keyword = "smartphone";
    const estrategias = [
        { nome: "Tradicional", strategy: FetchStrategy.TRADITIONAL },
        { nome: "Apenas Avançado", strategy: FetchStrategy.ADVANCED_ONLY },
        { nome: "Híbrido", strategy: FetchStrategy.HYBRID }
    ];
    
    const resultados = [];
    
    for (const estrategia of estrategias) {
        console.log(`🔄 Testando estratégia: ${estrategia.nome}`);
        console.time(`Tempo ${estrategia.nome}`);
        
        try {
            const produtos = await scrapingService(keyword, {
                strategy: estrategia.strategy,
                maxRetries: 2, // Reduzido para acelerar testes
                retryDelay: 1000,
                enableLogging: false
            });
            
            console.timeEnd(`Tempo ${estrategia.nome}`);
            
            resultados.push({
                estrategia: estrategia.nome,
                produtos: produtos.length,
                sucesso: true
            });
            
            console.log(`✅ ${estrategia.nome}: ${produtos.length} produtos`);
            
        } catch (error) {
            console.timeEnd(`Tempo ${estrategia.nome}`);
            
            resultados.push({
                estrategia: estrategia.nome,
                produtos: 0,
                sucesso: false,
                erro: error instanceof Error ? error.message : String(error)
            });
            
            console.log(`❌ ${estrategia.nome}: Falhou`);
        }
        
        console.log("");
    }
    
    // Resumo dos resultados
    console.log("📋 === RESUMO DOS RESULTADOS ===");
    resultados.forEach(resultado => {
        if (resultado.sucesso) {
            console.log(`✅ ${resultado.estrategia}: ${resultado.produtos} produtos`);
        } else {
            console.log(`❌ ${resultado.estrategia}: Falhou - ${resultado.erro?.substring(0, 50)}...`);
        }
    });
    
    // Estratégia recomendada
    const melhorEstrategia = resultados
        .filter(r => r.sucesso)
        .sort((a, b) => b.produtos - a.produtos)[0];
    
    if (melhorEstrategia) {
        console.log(`\n🏆 Melhor estratégia para "${keyword}": ${melhorEstrategia.estrategia}`);
    } else {
        console.log(`\n🚫 Nenhuma estratégia funcionou para "${keyword}"`);
    }
}

/**
 * Teste de robustez com palavras-chave problemáticas
 */
async function testeRobustez() {
    console.log("\n\n🛡️ === TESTE DE ROBUSTEZ ===\n");
    
    const keywordsProblematicas = [
        "produtos inexistentes xyz123",
        "termo com símbolos @#$%",
        "palavra muito específica ultraespecífica",
        "termo normal mouse" // Este deve funcionar
    ];
    
    for (const keyword of keywordsProblematicas) {
        console.log(`🎯 Testando: "${keyword}"`);
        
        try {
            const produtos = await scrapingServiceRobust(keyword);
            
            if (produtos.length > 0) {
                console.log(`✅ Sucesso: ${produtos.length} produtos encontrados`);
            } else {
                console.log(`⚠️ Sem produtos, mas sem erro`);
            }
            
        } catch (error) {
            console.log(`❌ Falhou: ${error instanceof Error ? error.message : error}`);
        }
        
        console.log("");
        
        // Delay entre testes para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

/**
 * Função principal que executa todos os testes
 */
async function executarTodosTestes() {
    console.log("🚀 INICIANDO TESTES COMPLETOS DO SISTEMA INTEGRADO\n");
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("=" .repeat(60));
    
    const inicioTempo = Date.now();
    
    try {
        // Executa todos os testes sequencialmente
        await testesFetchBasico();
        await testesServicosAltoNivel();
        await testeComparacaoEstrategias();
        await testeRobustez();
        
        const tempoTotal = (Date.now() - inicioTempo) / 1000;
        
        console.log("\n" + "=" .repeat(60));
        console.log("🏁 TESTES CONCLUÍDOS COM SUCESSO!");
        console.log(`⏱️ Tempo total: ${tempoTotal.toFixed(2)} segundos`);
        console.log("⏰ Fim:", new Date().toLocaleString());
        
    } catch (error) {
        console.error("\n💥 ERRO DURANTE OS TESTES:", error);
        console.log("⏰ Fim com erro:", new Date().toLocaleString());
    }
}

/**
 * Teste rápido para validação básica
 */
async function testeRapido() {
    console.log("⚡ === TESTE RÁPIDO ===\n");
    
    try {
        const produtos = await scrapingServiceSimple("mouse");
        
        if (produtos.length > 0) {
            console.log("✅ Sistema funcionando!");
            console.log(`📦 ${produtos.length} produtos encontrados`);
            if (produtos[0]?.title) {
                console.log(`🎯 Primeiro: ${produtos[0].title.substring(0, 80)}...`);
            }
        } else {
            console.log("⚠️ Sistema funcionando, mas sem produtos encontrados");
        }
        
    } catch (error) {
        console.log("❌ Sistema com problemas:", error instanceof Error ? error.message : error);
    }
}

// Descomente uma das linhas abaixo para executar os testes:

// Para teste rápido (recomendado para primeira execução):
// testeRapido().catch(console.error);

// Para testes completos (demora mais tempo):
// executarTodosTestes().catch(console.error);

// Para testes específicos:
// testesFetchBasico().catch(console.error);
// testesServicosAltoNivel().catch(console.error);
// testeComparacaoEstrategias().catch(console.error);
// testeRobustez().catch(console.error);

export {
    testeRapido,
    executarTodosTestes,
    testesFetchBasico,
    testesServicosAltoNivel,
    testeComparacaoEstrategias,
    testeRobustez
};
