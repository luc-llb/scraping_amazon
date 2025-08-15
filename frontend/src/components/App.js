import { ErrorMessage } from './ErrorMessage.js'
import { ApiService } from '../services/ApiService.js'
import { NoResults } from './NoResults.js'
import { ProductCard } from './ProductCard.js'

export class App {
    constructor() {
        this.apiService = new ApiService();
        this.searchForm = document.getElementById('searchForm');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorContainer = document.getElementById('errorContainer');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resultsCount = document.getElementById('resultsCount');
        this.productsGrid = document.getElementById('productsGrid');
        
        this.currentQuery = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialData();
    }

    bindEvents() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        this.searchInput.addEventListener('input', (e) => {
            // Auto-search depois de 500ms sem digitação
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                if (e.target.value !== this.currentQuery) {
                    this.handleSearch();
                }
            }, 500);
        });
    }

    async loadInitialData() {
        try {
            this.showLoading();
            const products = await this.apiService.searchProducts('');
            this.displayResults(products, '');
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        this.currentQuery = query;

        try {
            this.showLoading();
            this.clearError();
            
            const products = await this.apiService.searchProducts(query);
            this.displayResults(products, query);
        } catch (error) {
            this.showError(error.message);
            this.hideResults();
        } finally {
            this.hideLoading();
        }
    }

    displayResults(products, query) {
        this.hideError();
        this.showResults();
        
        // Atualizar contador
        const count = products.length;
        this.resultsCount.textContent = `${count} produto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
        
        // Limpar grid anterior
        this.productsGrid.innerHTML = '';
        
        if (products.length === 0) {
            const noResults = new NoResults(query);
            this.productsGrid.appendChild(noResults.render());
        } else {
            products.forEach(product => {
                const productCard = new ProductCard(product);
                this.productsGrid.appendChild(productCard.render());
            });
        }
    }

    showLoading() {
        this.loadingIndicator.style.display = 'block';
        this.searchButton.disabled = true;
        this.searchButton.textContent = 'Pesquisando...';
    }

    hideLoading() {
        this.loadingIndicator.style.display = 'none';
        this.searchButton.disabled = false;
        this.searchButton.textContent = 'Pesquisar';
    }

    showResults() {
        this.resultsContainer.style.display = 'block';
    }

    hideResults() {
        this.resultsContainer.style.display = 'none';
    }

    showError(message) {
        this.clearError();
        const errorMessage = new ErrorMessage(message);
        this.errorContainer.appendChild(errorMessage.render());
    }

    clearError() {
        this.errorContainer.innerHTML = '';
    }

    hideError() {
        this.errorContainer.style.display = 'none';
    }
}