export class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src=${this.escapeHtml(this.product.image)} 
                        alt="Imagem do produto ${this.product.title} da categoria ${this.product.review} com design moderno e elegante" 
                        onerror="this.style.display='none'">
            </div>
            <h3 class="product-name">${this.escapeHtml(this.product.title)}</h3>
            <p class="product-description">${this.escapeHtml(this.product.review)}</p>
            <div class="product-meta">
                <span class="product-price">${this.escapeHtml(this.product.price)}</span>
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