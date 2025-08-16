
// API Service Component
export class ApiService {
    constructor() {
        this.baseUrl = this.getApiUrl();
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
        
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            
            console.log(`📊 Status da resposta: ${response.status}`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}