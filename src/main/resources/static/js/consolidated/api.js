// ============================================
// API.JS - INTEGRAÇÃO COMPLETA COM BACKEND
// ============================================

// ============================================
// UTILITÁRIOS
// ============================================

// Função para lidar com erros de API
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(error.message || `Erro ${response.status}`);
    }
    return response.json();
}

// Headers padrão para requisições JSON
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        // Adicionar token de autenticação quando implementado
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    };
}

// ============================================
// CATÁLOGO DE ACTION FIGURES
// ============================================

const CatalogoAPI = {
    // Listar todas as action figures do catálogo
    listarTodas: async () => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo`);
        return handleResponse(response);
    },

    // Buscar action figure por ID
    buscarPorId: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/${id}`);
        return handleResponse(response);
    },

    // Buscar por categoria (Marvel, DC, Anime, etc)
    buscarPorCategoria: async (categoria) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/categoria/${categoria}`);
        return handleResponse(response);
    },

    // Pesquisar por nome
    pesquisar: async (nome) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/pesquisar?nome=${encodeURIComponent(nome)}`);
        return handleResponse(response);
    },

    // Buscar por fabricante
    buscarPorFabricante: async (fabricante) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/fabricante/${fabricante}`);
        return handleResponse(response);
    },

    // ADMIN: Adicionar ao catálogo (com imagem)
    adicionar: async (formData) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/admin`, {
            method: 'POST',
            body: formData // multipart/form-data
        });
        return handleResponse(response);
    },

    // ADMIN: Desativar do catálogo
    desativar: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/admin/${id}/desativar`, {
            method: 'DELETE'
        });
        return response.ok;
    }
};

// ============================================
// COLEÇÕES DO USUÁRIO
// ============================================

const ColecaoAPI = {
    // Listar todas as coleções
    listarTodas: async () => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes`);
        return handleResponse(response);
    },

    // Buscar coleção por ID (com itens)
    buscarPorId: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`);
        return handleResponse(response);
    },

    // Criar nova coleção
    criar: async (dados) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(dados)
        });
        return handleResponse(response);
    },

    // Deletar coleção
    deletar: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    },

    // Listar coleções públicas
    listarPublicas: async () => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/publicas`);
        return handleResponse(response);
    }
};

// ============================================
// ITENS DA COLEÇÃO
// ============================================

const ItemColecaoAPI = {
    // Listar itens de uma coleção
    listarItens: async (colecaoId) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens`);
        return handleResponse(response);
    },

    // Buscar item específico
    buscarItem: async (colecaoId, itemId) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/${itemId}`);
        return handleResponse(response);
    },

    // Adicionar action figure do catálogo à coleção
    adicionar: async (colecaoId, actionFigureId, detalhes = {}) => {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/adicionar/${actionFigureId}`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(detalhes)
            }
        );
        return handleResponse(response);
    },

    // Atualizar informações do item
    atualizar: async (colecaoId, itemId, dados) => {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/${itemId}`,
            {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(dados)
            }
        );
        return handleResponse(response);
    },

    // Remover item da coleção
    remover: async (colecaoId, itemId) => {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/${itemId}`,
            {
                method: 'DELETE'
            }
        );
        return response.ok;
    },

    // Listar favoritos
    listarFavoritos: async (colecaoId) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/favoritos`);
        return handleResponse(response);
    },

    // Contar itens
    contar: async (colecaoId) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/contar`);
        return handleResponse(response);
    },

    // Marcar/desmarcar favorito
    toggleFavorito: async (colecaoId, itemId, favorito) => {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens/${itemId}/favorito?favorito=${favorito}`,
            {
                method: 'PATCH'
            }
        );
        return handleResponse(response);
    }
};

// ============================================
// FUNÇÕES DE COMPATIBILIDADE (MOCK -> REAL)
// ============================================

// Substituir funções antigas do sistema
async function buscarNovidades() {
    // Buscar as últimas adicionadas ao catálogo
    const todasFigures = await CatalogoAPI.listarTodas();
    return todasFigures.slice(0, 6); // Pegar as 6 primeiras
}

async function buscarPopulares() {
    // Buscar por categoria Marvel (populares)
    const marvel = await CatalogoAPI.buscarPorCategoria('Marvel');
    return marvel.slice(0, 6);
}

// ============================================
// EXPORTAR PARA USO GLOBAL
// ============================================

// Disponibilizar globalmente
window.CatalogoAPI = CatalogoAPI;
window.ColecaoAPI = ColecaoAPI;
window.ItemColecaoAPI = ItemColecaoAPI;
window.buscarNovidades = buscarNovidades;
window.buscarPopulares = buscarPopulares;
