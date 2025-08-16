
// API Service Component
export class ApiService {
    constructor() {
        this.baseUrl = this.getApiUrl();
        console.log(`🔗 Base URL configurada: ${this.baseUrl}`);
        
        // Dados mock para desenvolvimento/teste
        this.mockData = [
            {
                id: 1,
                name: "Smartphone Galaxy Pro",
                description: "Smartphone premium com câmera de 108MP, processador octa-core e bateria de longa duração. Ideal para fotografia e produtividade.",
                price: "R$ 2.499,00",
                category: "Eletrônicos"
            },
            {
                id: 2,
                name: "Notebook UltraBook",
                description: "Notebook ultrafino com SSD de 512GB, 16GB RAM e processador Intel i7. Perfeito para trabalho e estudos.",
                price: "R$ 3.999,00",
                category: "Informática"
            },
            {
                id: 3,
                name: "Headphone Wireless Premium",
                description: "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de áudio Hi-Fi.",
                price: "R$ 899,00",
                category: "Áudio"
            }
        ];
    }

    getApiUrl() {
        const hostname = window.location.hostname;
        
        if (hostname.includes('github.dev')) {
            const backendUrl = hostname.replace(/-\d+\.app\.github\.dev$/, '-3000.app.github.dev');
            const apiUrl = `https://${backendUrl}/api`;
            return apiUrl;
        } else {
            // Para desenvolvimento local
            const localUrl = 'http://localhost:3000/api';
            return localUrl;
        }
    }

    async searchProducts(query = '') {
        const url = `${this.baseUrl}/scrape?keyword=${encodeURIComponent(query)}`;
        console.log(`📡 Fazendo requisição para: ${url}`);
        
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            
            console.log(`📊 Status da resposta: ${response.status}`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            console.log(`✅ Dados recebidos:`, data);
            
            // Retorna os produtos da API ou dados mock se estiver vazio
            const products = data.data || [];
            
            // Se a API retornar lista vazia, usa dados mock para demonstração
            if (products.length === 0) {
                console.log(`🎭 Usando dados mock para demonstração`);
                // Filtra os dados mock baseado na query se houver
                if (!query.trim()) {
                    return this.mockData;
                } else {
                    return this.mockData.filter(product => 
                        product.name.toLowerCase().includes(query.toLowerCase()) ||
                        product.description.toLowerCase().includes(query.toLowerCase()) ||
                        product.category.toLowerCase().includes(query.toLowerCase())
                    );
                }
            }
            
            return products;
        } catch (error) {
            console.error('❌ Erro ao buscar produtos:', error);
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}