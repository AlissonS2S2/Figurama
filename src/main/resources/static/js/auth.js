class AuthManager {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        return !!this.token;
    }

    // Carrega Header e Footer dinamicamente
    async carregarComponentes() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (header) {
            // Regra: se não houver token, usa header.html. Se houver, usa header_logged.html
            const fragmento = this.isAuthenticated() ? 'header_logged.html' : 'header.html';
            const resp = await fetch(`/fragments/${fragmento}`);
            header.innerHTML = await resp.text();

            if (this.isAuthenticated() && this.user) {
                const nameDisplay = document.getElementById('header-user-name');
                if (nameDisplay) nameDisplay.textContent = this.user.nome || this.user.username;
            }
            this.configurarLogout();
        }

        if (footer) {
            const resp = await fetch('/fragments/footer.html');
            footer.innerHTML = await resp.text();
        }
    }

    configurarLogout() {
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '/index.html';
        });
    }

    // Protege páginas que exigem login
    verificarAcessoPrivado() {
        const path = window.location.pathname;
        const paginasPrivadas = ['dashboard.html', 'criando_colecao.html', 'minha_colecao.html'];
        
        if (paginasPrivadas.some(p => path.includes(p)) && !this.isAuthenticated()) {
            window.location.href = '/pages/login.html';
        }
    }
}

const auth = new AuthManager();
document.addEventListener('DOMContentLoaded', () => {
    auth.carregarComponentes();
    auth.verificarAcessoPrivado();
});