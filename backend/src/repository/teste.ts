import axios, { type AxiosRequestConfig } from 'axios';
import { randomInt } from 'crypto';
import { JSDOM } from 'jsdom';

interface Header {
    [key: string]: string;
}

class RecaptchaBypassError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RecaptchaBypassError';
    }
}

/**
 * Advanced session manager with reCAPTCHA handling strategies
 */
class AdvancedSessionManager {
    private cookies: Map<string, string> = new Map();
    private userAgent: string;
    private baseHeaders: Header;

    constructor() {
        this.userAgent = this.getRandomUserAgent();
        this.baseHeaders = this.generateAdvancedHeaders();
    }

    private getRandomUserAgent(): string {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ];
        return userAgents[Math.floor(Math.random() * userAgents.length)];
    }

    private generateAdvancedHeaders(): Header {
        return {
            'User-Agent': this.userAgent,
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
     * Strategy 1: Try to bypass by simulating a complete browsing session
     */
    async simulateBrowsingSession(baseUrl: string): Promise<void> {
        try {
            console.log('Iniciando simulação de sessão de navegação...');
            
            // Step 1: Visit homepage first
            await this.delay(randomInt(2000, 4000));
            const homeResponse = await this.makeRequest(baseUrl, {
                'Referer': 'https://www.google.com/search?q=' + encodeURIComponent(new URL(baseUrl).hostname)
            });

            // Step 2: Parse potential reCAPTCHA site key
            await this.extractRecaptchaInfo(homeResponse.data);

            // Step 3: Simulate some browsing behavior
            await this.simulateHumanBehavior(baseUrl);

        } catch (error) {
            console.error('Erro na simulação de sessão:', error);
            throw error;
        }
    }

    /**
     * Extract reCAPTCHA information from HTML
     */
    private async extractRecaptchaInfo(html: string): Promise<void> {
        try {
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Look for reCAPTCHA elements
            const recaptchaElements = document.querySelectorAll('[data-sitekey], .g-recaptcha');
            
            if (recaptchaElements.length > 0) {
                console.log('reCAPTCHA detectado no site');
                
                recaptchaElements.forEach((element, index) => {
                    const siteKey = element.getAttribute('data-sitekey');
                    if (siteKey) {
                        console.log(`Site Key ${index + 1}:`, siteKey);
                    }
                });

                // Try to find and execute any anti-bot scripts
                await this.handleAntiBot(document);
            }
        } catch (error) {
            console.log('Não foi possível extrair informações do reCAPTCHA');
        }
    }

    /**
     * Handle potential anti-bot mechanisms
     */
    private async handleAntiBot(document: any): Promise<void> {
        // Look for common anti-bot patterns
        const scripts = document.querySelectorAll('script');
        
        scripts.forEach((script: any) => {
            const content = script.textContent || script.innerHTML;
            
            // Look for common patterns
            if (content && (
                content.includes('recaptcha') || 
                content.includes('challenge') ||
                content.includes('bot') ||
                content.includes('cf_')
            )) {
                console.log('Script anti-bot detectado');
                // Here you could try to execute or simulate the script logic
            }
        });
    }

    /**
     * Simulate human-like browsing behavior
     */
    private async simulateHumanBehavior(baseUrl: string): Promise<void> {
        const domain = new URL(baseUrl).origin;
        
        // Simulate visiting common pages
        const commonPaths = ['/about', '/contact', '/sitemap.xml', '/robots.txt'];
        
        for (const path of commonPaths) {
            try {
                await this.delay(randomInt(1000, 3000));
                await this.makeRequest(domain + path, {
                    'Referer': baseUrl
                });
                console.log(`Visitado: ${path}`);
            } catch (error) {
                // Ignore errors for optional pages
                console.log(`Página ${path} não acessível`);
            }
        }
    }

    /**
     * Strategy 2: Try different request patterns to avoid detection
     */
    async makeStealthRequest(url: string, options: {
        useRandomDelay?: boolean;
        useRandomHeaders?: boolean;
        maxRetries?: number;
    } = {}): Promise<any> {
        const { 
            useRandomDelay = true, 
            useRandomHeaders = true, 
            maxRetries = 3 
        } = options;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                if (useRandomDelay) {
                    await this.delay(randomInt(1000, 5000));
                }

                const headers = useRandomHeaders ? 
                    this.getRandomizedHeaders() : 
                    { ...this.baseHeaders, 'Cookie': this.getCookieHeader() };

                const response = await axios.get(url, {
                    headers,
                    timeout: 30000,
                    maxRedirects: 5,
                    validateStatus: (status) => status < 500, // Don't throw on 4xx
                    // Add some randomization to request config
                    maxBodyLength: randomInt(50000000, 100000000)
                });

                // Check if we hit a reCAPTCHA challenge
                if (this.isRecaptchaChallenge(response)) {
                    console.log(`Tentativa ${attempt}: reCAPTCHA detectado`);
                    
                    if (attempt < maxRetries) {
                        console.log('Tentando estratégias alternativas...');
                        await this.handleRecaptchaChallenge(response);
                        continue;
                    } else {
                        throw new RecaptchaBypassError('Não foi possível contornar o reCAPTCHA');
                    }
                }

                // Update cookies from response
                this.updateCookies(response.headers['set-cookie']);
                
                return response;

            } catch (error) {
                console.log(`Tentativa ${attempt} falhou:`, error instanceof Error ? error.message : error);
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                // Exponential backoff
                await this.delay(Math.pow(2, attempt) * 1000);
            }
        }
    }

    /**
     * Check if response indicates a reCAPTCHA challenge
     */
    private isRecaptchaChallenge(response: any): boolean {
        const html = response.data || '';
        const status = response.status;
        
        return (
            status === 403 ||
            status === 429 ||
            html.includes('recaptcha') ||
            html.includes('captcha') ||
            html.includes('challenge') ||
            html.includes('cf-challenge') ||
            response.headers['cf-ray'] // Cloudflare protection
        );
    }

    /**
     * Strategy 3: Handle reCAPTCHA challenge response
     */
    private async handleRecaptchaChallenge(response: any): Promise<void> {
        console.log('Tentando contornar desafio reCAPTCHA...');
        
        // Extract challenge information
        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Look for hidden forms or challenge data
        const forms = document.querySelectorAll('form');
        const hiddenInputs = document.querySelectorAll('input[type="hidden"]');

        // Try to extract and submit any required form data
        for (const form of forms) {
            const formData = new Map();
            const inputs = form.querySelectorAll('input');
            
            inputs.forEach((input: any) => {
                if (input.name && input.value) {
                    formData.set(input.name, input.value);
                }
            });

            if (formData.size > 0) {
                console.log('Dados do formulário encontrados:', Object.fromEntries(formData));
                // Here you would submit the form data
                // This is highly site-specific and may not work universally
            }
        }

        // Add additional delay after challenge
        await this.delay(randomInt(5000, 10000));
    }

    /**
     * Generate randomized headers for each request
     */
    private getRandomizedHeaders(): Header {
        const variations = {
            'Accept': [
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            ],
            'Accept-Language': [
                'pt-BR,pt;q=0.9,en;q=0.8',
                'pt-BR,pt;q=0.8,en-US;q=0.7,en;q=0.6',
                'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
            ]
        };

        const randomHeaders = { ...this.baseHeaders };
        
        // Randomly vary some headers
        Object.keys(variations).forEach(key => {
            const options = variations[key as keyof typeof variations];
            randomHeaders[key] = options[Math.floor(Math.random() * options.length)];
        });

        // Add cookie header
        randomHeaders['Cookie'] = this.getCookieHeader();

        return randomHeaders;
    }

    /**
     * Utility methods
     */
    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async makeRequest(url: string, additionalHeaders: Header = {}): Promise<any> {
        const headers = {
            ...this.baseHeaders,
            'Cookie': this.getCookieHeader(),
            ...additionalHeaders
        };

        const response = await axios.get(url, {
            headers,
            timeout: 30000,
            maxRedirects: 5,
            validateStatus: () => true
        });

        this.updateCookies(response.headers['set-cookie']);
        return response;
    }

    private updateCookies(setCookieHeader?: string[]): void {
        if (setCookieHeader) {
            setCookieHeader.forEach(cookie => {
                const [nameValue] = cookie.split(';');
                const [name, value] = nameValue.split('=');
                if (name && value) {
                    this.cookies.set(name.trim(), value.trim());
                }
            });
        }
    }

    private getCookieHeader(): string {
        return Array.from(this.cookies.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    }
}

// Example usage
async function bypassRecaptchaExample() {
    const session = new AdvancedSessionManager();
    
    try {
        const targetUrl = 'https://example.com';
        
        // Step 1: Simulate a complete browsing session
        await session.simulateBrowsingSession(targetUrl);
        
        // Step 2: Make stealth requests to the actual endpoints
        const response = await session.makeStealthRequest(targetUrl + '/api/data', {
            useRandomDelay: true,
            useRandomHeaders: true,
            maxRetries: 5
        });
        
        if (response.status === 200) {
            console.log('Dados obtidos com sucesso!');
            return response.data;
        } else {
            console.log('Status não esperado:', response.status);
        }
        
    } catch (error) {
        if (error instanceof RecaptchaBypassError) {
            console.error('Não foi possível contornar o reCAPTCHA:', error.message);
            console.log('\nAlternativas sugeridas:');
            console.log('1. Use um serviço de resolução de CAPTCHA (2captcha, Anti-Captcha)');
            console.log('2. Considere usar Puppeteer com plugins de bypass');
            console.log('3. Implemente rotação de proxies');
            console.log('4. Entre em contato com o proprietário do site para acesso via API');
        } else {
            console.error('Erro inesperado:', error);
        }
    }
}

export { AdvancedSessionManager, bypassRecaptchaExample, RecaptchaBypassError };