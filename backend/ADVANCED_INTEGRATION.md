# Sistema Integrado com AdvancedSessionManager

O sistema de scraping da Amazon agora utiliza o módulo `teste.ts` com funcionalidades avançadas de bypass de proteções anti-bot e reCAPTCHA.

## 🏗️ Arquitetura do Sistema

### Camadas de Funcionalidade

1. **fetch_content.ts**: Camada de fetch com múltiplas estratégias
2. **teste.ts**: AdvancedSessionManager com bypass avançado
3. **scrapingService.ts**: Serviços de alto nível com configurações

## 🎯 Estratégias Disponíveis

### 1. Híbrida (Recomendada)
```typescript
import getAmazonContent from "./repository/fetch_content.js";

const html = await getAmazonContent("notebook gaming", undefined, true);
```

**Como funciona:**
1. Tenta AdvancedSessionManager primeiro
2. Se falhar, usa método tradicional como fallback
3. Ideal para máxima compatibilidade

### 2. Apenas AdvancedSessionManager
```typescript
import { getAmazonContentAdvanced } from "./repository/fetch_content.js";

const html = await getAmazonContentAdvanced("smartphone");
```

**Recursos:**
- Simulação completa de sessão de navegação
- Bypass de reCAPTCHA e proteções anti-bot
- Headers rotativos e comportamento humano
- Mais lento, mas mais eficaz contra proteções

### 3. Método Tradicional
```typescript
import { getAmazonContentTraditional } from "./repository/fetch_content.js";

const html = await getAmazonContentTraditional("mouse gamer");
```

**Características:**
- Rápido e direto
- Apenas headers básicos
- Sem simulação de navegador

## 🚀 Serviços de Alto Nível

### Serviço Básico (Configurável)
```typescript
import { scrapingService, FetchStrategy } from "./services/scrapingService.js";

const produtos = await scrapingService("teclado", {
    strategy: FetchStrategy.HYBRID,
    maxRetries: 5,
    retryDelay: 2000,
    enableLogging: true
});
```

### Serviço Robusto (Todas as Estratégias)
```typescript
import { scrapingServiceRobust } from "./services/scrapingService.js";

// Tenta todas as estratégias sequencialmente
const produtos = await scrapingServiceRobust("monitor 4k");
```

### Serviço Simples (Compatibilidade)
```typescript
import { scrapingServiceSimple } from "./services/scrapingService.js";

// Mantém a interface original
const produtos = await scrapingServiceSimple("headset");
```

## ⚙️ Configurações Detalhadas

### Enum FetchStrategy
```typescript
enum FetchStrategy {
    HYBRID = "hybrid",           // AdvancedSessionManager + fallback
    ADVANCED_ONLY = "advanced",  // Apenas AdvancedSessionManager
    TRADITIONAL = "traditional"  // Apenas método tradicional
}
```

### Interface ScrapingConfig
```typescript
interface ScrapingConfig {
    strategy: FetchStrategy;      // Estratégia de fetch
    maxRetries: number;           // Máximo de tentativas
    retryDelay: number;          // Delay entre tentativas (ms)
    enableLogging: boolean;       // Ativar logs detalhados
}
```

## 🛡️ Funcionalidades do AdvancedSessionManager

### Anti-Detecção
- ✅ Simulação de sessão de navegação completa
- ✅ Headers rotativos realistas
- ✅ Delays aleatórios entre ações
- ✅ Simulação de comportamento humano
- ✅ Interceptação e análise de scripts anti-bot

### Bypass de reCAPTCHA
- ✅ Detecção automática de desafios
- ✅ Extração de site keys
- ✅ Tentativas de contorno automático
- ✅ Fallback estratégico em caso de falha

### Gestão de Sessão
- ✅ Cookies automáticos
- ✅ Viewport dinâmico
- ✅ User-agents rotativos
- ✅ Cleanup automático de recursos

## 📊 Monitoramento e Logs

### Logs Informativos
```
🔍 Iniciando scraping para: "notebook gaming"
📋 Estratégia: HYBRID
🔄 Máximo de tentativas: 10

⏳ Tentativa 1/10
Usando AdvancedSessionManager para bypass de proteções...
Iniciando simulação de sessão de navegação...
✅ Dados obtidos com sucesso usando AdvancedSessionManager!
📊 HTML obtido: 245678 caracteres
🛍️ Produtos extraídos: 16
✅ Sucesso na tentativa 1!
🎉 Scraping concluído com sucesso! Encontrados 16 produtos.
```

### Tratamento de Erros
```
❌ AdvancedSessionManager falhou com reCAPTCHA. Tentando método tradicional...
🛡️ reCAPTCHA detectado - aguardando mais tempo...
💥 Erro na tentativa 3: Timeout na requisição
```

## 🔧 Exemplos Práticos

### Exemplo 1: Busca Simples
```typescript
import { scrapingServiceSimple } from "./services/scrapingService.js";

async function buscaSimples() {
    const produtos = await scrapingServiceSimple("notebook");
    
    if (produtos.length > 0) {
        console.log(`Encontrados ${produtos.length} produtos!`);
        produtos.forEach(produto => {
            console.log(`- ${produto.title}: ${produto.price}`);
        });
    }
}
```

### Exemplo 2: Configuração Personalizada
```typescript
import { scrapingService, FetchStrategy } from "./services/scrapingService.js";

async function buscaPersonalizada() {
    const produtos = await scrapingService("smartphone", {
        strategy: FetchStrategy.ADVANCED_ONLY,
        maxRetries: 3,
        retryDelay: 5000,
        enableLogging: false
    });
    
    return produtos;
}
```

### Exemplo 3: Múltiplas Buscas com Delay
```typescript
async function multiplasBuscas() {
    const keywords = ["laptop", "tablet", "smartwatch"];
    const todosProdutos = [];
    
    for (const keyword of keywords) {
        console.log(`Buscando: ${keyword}`);
        
        const produtos = await scrapingServiceRobust(keyword);
        todosProdutos.push(...produtos);
        
        // Delay entre buscas
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    return todosProdutos;
}
```

## 🚨 Situações de Erro e Soluções

### reCAPTCHA Detectado
```
🛡️ reCAPTCHA detectado - aguardando mais tempo...
```
**Soluções:**
- Sistema automaticamente tenta método tradicional
- Aguarda mais tempo entre tentativas
- Use proxies/VPN se persistir

### Timeout de Requisição
```
💥 Erro na tentativa 3: Timeout na requisição
```
**Soluções:**
- Aumentar `retryDelay` na configuração
- Verificar conexão de internet
- Usar `scrapingServiceRobust` para mais tentativas

### Nenhum Produto Encontrado
```
⚠️ Nenhum produto encontrado nesta tentativa
```
**Possíveis causas:**
- Palavra-chave muito específica
- Site em manutenção
- Estrutura HTML mudou

## 📈 Otimizações de Performance

### Para Velocidade
```typescript
const config = {
    strategy: FetchStrategy.TRADITIONAL,
    maxRetries: 3,
    retryDelay: 1000,
    enableLogging: false
};
```

### Para Máxima Compatibilidade
```typescript
const config = {
    strategy: FetchStrategy.HYBRID,
    maxRetries: 10,
    retryDelay: 5000,
    enableLogging: true
};
```

### Para Contornar Proteções
```typescript
const config = {
    strategy: FetchStrategy.ADVANCED_ONLY,
    maxRetries: 5,
    retryDelay: 8000,
    enableLogging: true
};
```

## 🔄 Migração do Código Existente

### Antes (versão antiga)
```typescript
import { scrapingService } from "./services/scrapingService.js";

const produtos = await scrapingService("notebook");
```

### Depois (versão atual)
```typescript
// Opção 1: Mantém comportamento similar
import { scrapingServiceSimple } from "./services/scrapingService.js";
const produtos = await scrapingServiceSimple("notebook");

// Opção 2: Usa novos recursos
import { scrapingService, FetchStrategy } from "./services/scrapingService.js";
const produtos = await scrapingService("notebook", {
    strategy: FetchStrategy.HYBRID
});

// Opção 3: Máxima robustez
import { scrapingServiceRobust } from "./services/scrapingService.js";
const produtos = await scrapingServiceRobust("notebook");
```

## 💡 Dicas e Boas Práticas

1. **Use estratégia HYBRID** para a maioria dos casos
2. **Ative logging** durante desenvolvimento/debug
3. **Use delays adequados** entre buscas múltiplas
4. **Monitore erros** para ajustar estratégias
5. **Teste com keywords diferentes** para validar robustez
6. **Use scrapingServiceRobust** para palavras-chave problemáticas

## 🏁 Conclusão

O sistema integrado oferece máxima flexibilidade e robustez para scraping da Amazon, combinando velocidade do método tradicional com a sofisticação do AdvancedSessionManager para contornar proteções modernas.
