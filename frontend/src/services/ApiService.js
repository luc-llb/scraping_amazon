
// API Service Component
export class ApiService {
    constructor() {
        this.baseUrl = 'https://localhost:3000/api';
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
            },
            {
                id: 4,
                name: "Smart TV 55 OLED",
                description: "TV OLED 4K de 55 polegadas com HDR, sistema operacional Android TV e design ultra-slim.",
                price: "R$ 4.299,00",
                category: "Eletrônicos"
            },
            {
                id: 5,
                name: "Câmera DSLR Professional",
                description: "Câmera DSLR profissional com sensor full-frame, gravação 4K e sistema de foco automático avançado.",
                price: "R$ 5.599,00",
                category: "Fotografia"
            },
            {
                id: 6,
                name: "Tablet Pro 12.9",
                description: "Tablet profissional com tela de 12.9 polegadas, processador M1 e suporte para Apple Pencil.",
                price: "R$ 3.199,00",
                category: "Informática"
            },
            {
                id: 7,
                name: "Console Gaming Next-Gen",
                description: "Console de videogame de nova geração com SSD ultra-rápido, ray tracing e compatibilidade 4K.",
                price: "R$ 2.799,00",
                category: "Games"
            },
            {
                id: 8,
                name: "Smartwatch Fitness Pro",
                description: "Relógio inteligente com monitoramento de saúde 24/7, GPS integrado e bateria de 7 dias.",
                price: "R$ 1.299,00",
                category: "Wearables"
            },
            {
                id: 9,
                name: "Speaker Bluetooth Premium",
                description: "Caixa de som Bluetooth à prova d'água com som 360°, bateria de 24h e conectividade multi-dispositivo.",
                price: "R$ 699,00",
                category: "Áudio"
            },
            {
                id: 10,
                name: "Drone 4K Professional",
                description: "Drone profissional com câmera 4K gimbal 3 eixos, tempo de voo de 30 minutos e controle inteligente.",
                price: "R$ 3.799,00",
                category: "Fotografia"
            }
        ];
    }

    async searchProducts(query = '') {
        // Simular delay da API
        await this.delay(800);
        
        // Simular possível erro da API (5% de chance)
        if (Math.random() < 0.05) {
            throw new Error('Erro de conexão com o servidor. Tente novamente.');
        }

        if (!query.trim()) {
            return this.mockData;
        }

        const filteredData = this.mockData.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        return filteredData;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}