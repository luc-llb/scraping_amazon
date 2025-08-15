export class ErrorMessage {
    constructor(message) {
        this.message = message;
    }

    render() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <strong>Ops! Algo deu errado:</strong> ${this.escapeHtml(this.message)}
        `;
        return errorDiv;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}