/**
 * Exemplos de uso do sistema integrado com AdvancedSessionManager
 */

import getAmazonContent, { 
    getAmazonContentAdvanced, 
    getAmazonContentTraditional,
    getRandomHeaderAgent 
} from "../repository/fetch_content.js";

// Exemplo 1: Uso híbrido (recomendado) - tenta AdvancedSessionManager primeiro, fallback tradicional
async function exemploUsoHibrido() {
    console.log("=== Exemplo 1: Uso Híbrido (AdvancedSessionManager + Fallback) ===");
    
    try {
        const resultado = await getAmazonContent("notebook gaming", undefined, true);
        
        if (resultado.includes("--Error")) {
            console.log("❌ Falha na busca:", resultado);
        } else {
            console.log("✅ Dados obtidos com sucesso!");
            console.log("📊 Tamanho do HTML:", resultado.length);
            console.log("🔍 Contém produtos:", resultado.includes('data-component-type="s-search-result"'));
        }
    } catch (error) {
        console.error("💥 Erro:", error);
    }
}

// Exemplo 2: Uso apenas do AdvancedSessionManager
async function exemploUsoAvancado() {
    console.log("=== Exemplo 2: Apenas AdvancedSessionManager ===");
    
    try {
        const resultado = await getAmazonContentAdvanced("smartphone samsung");
        
        if (resultado.includes("--Error")) {
            console.log("❌ AdvancedSessionManager falhou:", resultado);
            
            if (resultado.includes("reCAPTCHA")) {
                console.log("🛡️ reCAPTCHA detectado - considere usar proxies ou aguardar");
            }
        } else {
            console.log("✅ AdvancedSessionManager funcionou!");
            console.log("📊 Tamanho do HTML:", resultado.length);
        }
    } catch (error) {
        console.error("💥 Erro:", error);
    }
}

// Exemplo 3: Uso apenas do método tradicional
async function exemploUsoTradicional() {
    console.log("=== Exemplo 3: Apenas Método Tradicional ===");
    
    try {
        const headerCustomizado = getRandomHeaderAgent();
        const resultado = await getAmazonContentTraditional("mouse gamer", headerCustomizado);
        
        if (resultado.includes("--Error")) {
            console.log("❌ Método tradicional falhou:", resultado);
        } else {
            console.log("✅ Método tradicional funcionou!");
            console.log("📊 Tamanho do HTML:", resultado.length);
        }
    } catch (error) {
        console.error("💥 Erro:", error);
    }
}

// Exemplo 4: Comparação de performance entre métodos
async function exemploComparacaoPerformance() {
    console.log("=== Exemplo 4: Comparação de Performance ===");
    
    const keyword = "teclado mecânico";
    
    // Teste método tradicional
    console.log("🏃‍♂️ Testando método tradicional...");
    console.time("Método Tradicional");
    try {
        const resultadoTradicional = await getAmazonContentTraditional(keyword);
        console.timeEnd("Método Tradicional");
        console.log("📊 Tamanho (tradicional):", resultadoTradicional.length);
    } catch (error) {
        console.timeEnd("Método Tradicional");
        console.log("❌ Método tradicional falhou");
    }
    
    console.log("\n" + "-".repeat(30) + "\n");
    
    // Teste AdvancedSessionManager
    console.log("🛡️ Testando AdvancedSessionManager...");
    console.time("AdvancedSessionManager");
    try {
        const resultadoAvancado = await getAmazonContentAdvanced(keyword);
        console.timeEnd("AdvancedSessionManager");
        console.log("📊 Tamanho (avançado):", resultadoAvancado.length);
    } catch (error) {
        console.timeEnd("AdvancedSessionManager");
        console.log("❌ AdvancedSessionManager falhou");
    }
}

// Exemplo 5: Estratégia robusta com múltiplas tentativas
async function exemploEstrategiaRobusta() {
    console.log("=== Exemplo 5: Estratégia Robusta ===");
    
    const keywords = ["laptop", "fone bluetooth", "monitor 4k"];
    
    for (const keyword of keywords) {
        console.log(`\n🔍 Buscando: "${keyword}"`);
        
        // Estratégia: híbrido -> avançado -> tradicional
        let resultado: string = "";
        let metodoUsado: string = "";
        
        try {
            // Tentativa 1: Híbrido
            resultado = await getAmazonContent(keyword, undefined, true);
            metodoUsado = "Híbrido";
            
            if (resultado.includes("--Error")) {
                // Tentativa 2: Apenas avançado
                console.log("⚡ Tentando apenas AdvancedSessionManager...");
                resultado = await getAmazonContentAdvanced(keyword);
                metodoUsado = "AdvancedSessionManager";
                
                if (resultado.includes("--Error")) {
                    // Tentativa 3: Apenas tradicional
                    console.log("🔄 Tentando método tradicional...");
                    resultado = await getAmazonContentTraditional(keyword);
                    metodoUsado = "Tradicional";
                }
            }
            
            if (resultado.includes("--Error")) {
                console.log(`❌ Todas as tentativas falharam para "${keyword}"`);
            } else {
                console.log(`✅ Sucesso com método ${metodoUsado}!`);
                console.log(`📊 Tamanho: ${resultado.length} caracteres`);
                
                // Verifica se encontrou produtos
                const temProdutos = resultado.includes('data-component-type="s-search-result"');
                console.log(`🛍️ Produtos encontrados: ${temProdutos ? 'Sim' : 'Não'}`);
            }
            
        } catch (error) {
            console.error(`💥 Erro para "${keyword}":`, error instanceof Error ? error.message : error);
        }
        
        // Delay entre buscas para evitar rate limiting
        if (keywords.indexOf(keyword) < keywords.length - 1) {
            console.log("⏳ Aguardando antes da próxima busca...");
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

// Exemplo 6: Monitoramento de bloqueios
async function exemploMonitoramentoBloqueios() {
    console.log("=== Exemplo 6: Monitoramento de Bloqueios ===");
    
    const keyword = "headset gamer";
    let tentativas = 0;
    const maxTentativas = 5;
    
    while (tentativas < maxTentativas) {
        tentativas++;
        console.log(`\n🔄 Tentativa ${tentativas}/${maxTentativas}`);
        
        try {
            const resultado = await getAmazonContent(keyword);
            
            if (resultado.includes("--Error")) {
                console.log("❌ Bloqueado ou erro");
                
                if (resultado.includes("reCAPTCHA")) {
                    console.log("🛡️ reCAPTCHA detectado - aguardando mais tempo...");
                    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 segundos
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000)); // 5 segundos
                }
            } else {
                console.log("✅ Sucesso!");
                console.log(`📊 Dados obtidos: ${resultado.length} caracteres`);
                break;
            }
            
        } catch (error) {
            console.error("💥 Erro na tentativa:", error instanceof Error ? error.message : error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    
    if (tentativas >= maxTentativas) {
        console.log("🚫 Máximo de tentativas atingido. Considere:");
        console.log("   - Usar proxy/VPN");
        console.log("   - Aguardar mais tempo");
        console.log("   - Verificar se há manutenção no site");
    }
}

// Função principal para executar todos os exemplos
async function executarTodosExemplos() {
    const exemplos = [
        { nome: "Uso Híbrido", func: exemploUsoHibrido },
        { nome: "Uso Avançado", func: exemploUsoAvancado },
        { nome: "Uso Tradicional", func: exemploUsoTradicional },
        { nome: "Comparação Performance", func: exemploComparacaoPerformance },
        { nome: "Estratégia Robusta", func: exemploEstrategiaRobusta },
        { nome: "Monitoramento Bloqueios", func: exemploMonitoramentoBloqueios }
    ];
    
    console.log("🚀 Executando todos os exemplos do sistema integrado...\n");
    
    for (let i = 0; i < exemplos.length; i++) {
        const exemplo = exemplos[i];
        if (!exemplo) continue;
        
        console.log(`📍 ${i + 1}/${exemplos.length} - ${exemplo.nome}`);
        
        try {
            await exemplo.func();
        } catch (error) {
            console.error(`❌ Erro no exemplo "${exemplo.nome}":`, error);
        }
        
        if (i < exemplos.length - 1) {
            console.log("\n" + "=".repeat(60) + "\n");
            // Pausa entre exemplos
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    console.log("\n🏁 Todos os exemplos foram executados!");
}

// Descomente a linha abaixo para executar todos os exemplos
// executarTodosExemplos().catch(console.error);

export {
    exemploUsoHibrido,
    exemploUsoAvancado,
    exemploUsoTradicional,
    exemploComparacaoPerformance,
    exemploEstrategiaRobusta,
    exemploMonitoramentoBloqueios,
    executarTodosExemplos
};
