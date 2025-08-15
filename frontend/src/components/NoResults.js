export class NoResults {
    constructor(query) {
        this.query = query;
    }

    render() {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <div class="no-results-icon">🔍</div>
            <h3>Nenhum produto encontrado</h3>
            <p>Não encontramos produtos para "${this.escapeHtml(this.query)}".<br>
            Tente pesquisar por outros termos ou navegue por nossas categorias.</p>
        `;
        return noResultsDiv;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}