// ============================================
// API.JS - VERSÃO CORRIGIDA (SEM CONFIG DUPLICADO)
// Se você está lendo isso no navegador, o arquivo atualizou!
// ============================================

// NÃO DECLARAMOS "const CONFIG" AQUI. 
// Ele já vem do arquivo config.js carregado antes.

// ============================================
// UTILITÁRIOS
// ============================================

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(error.message || `Erro ${response.status}`);
    }
    return response.json();
}

function getHeaders() {
    return {
        'Content-Type': 'application/json'
    };
}

// ============================================
// CATÁLOGO DE ACTION FIGURES
// ============================================

const CatalogoAPI = {
    // Listar todas
    listarTodas: async () => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo`);
        return handleResponse(response);
    },

    // Buscar por ID
    buscarPorId: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/${id}`);
        return handleResponse(response);
    },

    // Buscar por Categoria
    buscarPorCategoria: async (categoria) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/categoria/${categoria}`);
        return handleResponse(response);
    },

    // Pesquisar por nome
    pesquisar: async (termo) => {
        // Tenta rota de busca específica, senão filtra localmente
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo`);
            const todas = await handleResponse(response);
            
            // Filtra no JavaScript (case insensitive)
            return todas.filter(f => 
                f.nome.toLowerCase().includes(termo.toLowerCase()) || 
                (f.fabricante && f.fabricante.toLowerCase().includes(termo.toLowerCase()))
            );
        } catch (e) {
            console.error("Erro na pesquisa:", e);
            return [];
        }
    }
};

// ============================================
// COLEÇÕES
// ============================================

const ColecaoAPI = {
    criar: async (dados) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(dados)
        });
        return handleResponse(response);
    },

    listarTodas: async () => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes`);
        return handleResponse(response);
    },
    
    buscarPorId: async (id) => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`);
        return handleResponse(response);
    }
};

// ============================================
// ITENS DA COLEÇÃO
// ============================================

const ItemColecaoAPI = {
    adicionar: async (colecaoId, figureId, dadosExtras) => {
        const payload = {
            catalogoActionFigure: { id: figureId },
            colecao: { id: colecaoId },
            estado: dadosExtras.estado || 'Novo',
            favorito: dadosExtras.favorito || false,
            observacoes: dadosExtras.observacoes || ''
        };

        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/itens`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });
        return handleResponse(response);
    }
};

// Exportar globalmente
window.CatalogoAPI = CatalogoAPI;
window.ColecaoAPI = ColecaoAPI;
window.ItemColecaoAPI = ItemColecaoAPI;