class AuthManager {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        return !!localStorage.getItem('user'); // Simples verificação se há usuário no storage
    }

    async configurarGeral() {
        await this.configurarHeader();
        await this.configurarFooter();
    }
    
    async configurarHeader() {
        const headerElement = document.querySelector('header');
        if (!headerElement) return;

        const logado = this.isAuthenticated();
        // Define qual fragmento carregar
        const fragmento = logado ? 'header_logged.html' : 'header.html';
        
        try {
            const response = await fetch(`/fragments/${fragmento}`);
            const html = await response.text();
            headerElement.innerHTML = html;

            if (logado && this.user) {
                const nameDisplay = document.getElementById('header-user-name');
                if (nameDisplay) nameDisplay.textContent = this.user.nomeUsuario;
            }
            this.configurarLogout();
        } catch (e) { console.error("Erro ao carregar header", e); }
    }

    async configurarFooter() {
        const footerElement = document.querySelector('footer');
        if (!footerElement) return;
        try {
            // Carrega o footer único para todas as páginas
            const response = await fetch('/fragments/footer.html');
            footerElement.innerHTML = await response.text();
        } catch (e) { console.error("Erro no footer", e); }
    }

    configurarLogout() {
        const btn = document.getElementById('logoutBtn');
        if (btn) {
            btn.onclick = () => {
                localStorage.clear();
                window.location.href = '/index.html';
            };
        }
    }
}

const auth = new AuthManager();
document.addEventListener('DOMContentLoaded', () => auth.configurarGeral());