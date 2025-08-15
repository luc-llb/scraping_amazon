export class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f383d5e8-f947-4914-95af-6797e4d1139c.png" 
                        alt="Imagem do produto ${this.product.name} da categoria ${this.product.category} com design moderno e elegante" 
                        onerror="this.style.display='none'">
            </div>
            <h3 class="product-name">${this.escapeHtml(this.product.name)}</h3>
            <p class="product-description">${this.escapeHtml(this.product.description)}</p>
            <div class="product-meta">
                <span class="product-price">${this.escapeHtml(this.product.price)}</span>
                <span class="product-category">${this.escapeHtml(this.product.category)}</span>
            </div>
        `;
        return card;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}