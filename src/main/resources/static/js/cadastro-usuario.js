/**
 * Script para cadastro de usuários
 * Envia dados do formulário para o endpoint POST /usuarios/registrar
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const nomeUsuario = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('password').value;
            const confirmarSenha = document.getElementById('confirmPassword').value;
            
            // Validações
            if (!nomeUsuario || !email || !senha) {
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
            if (senha.length < 6) {
                mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
                return;
            }
            
            if (senha !== confirmarSenha) {
                mostrarMensagem('As senhas não coincidem.', 'erro');
                return;
            }
            
            // Validar formato do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensagem('Por favor, insira um email válido.', 'erro');
                return;
            }
            
            // Desabilitar botão durante o envio
            const submitBtn = form.querySelector('button[type="submit"]');
            const textoOriginal = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Cadastrando...';
            
            try {
                // Enviar requisição para a API
                const response = await fetch('/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nomeUsuario: nomeUsuario,
                        email: email,
                        senha: senha
                    })
                });
                
                const result = await response.text();
                
                if (response.ok) {
                    mostrarMensagem('Cadastro realizado com sucesso! Redirecionando para o login...', 'sucesso');
                    
                    // Limpar formulário
                    form.reset();
                    
                    // Redirecionar para login após 2 segundos
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                    
                } else {
                    // Tratar erros específicos
                    if (result.includes('E-mail já cadastrado')) {
                        mostrarMensagem('Este e-mail já está cadastrado. Tente outro ou faça login.', 'erro');
                    } else if (result.includes('Usuário já cadastrado')) {
                        mostrarMensagem('Este nome de usuário já está em uso. Tente outro.', 'erro');
                    } else {
                        mostrarMensagem('Erro ao cadastrar: ' + result, 'erro');
                    }
                }
                
            } catch (error) {
                console.error('Erro na requisição:', error);
                mostrarMensagem('Erro de conexão. Verifique sua internet e tente novamente.', 'erro');
                
            } finally {
                // Reabilitar botão
                submitBtn.disabled = false;
                submitBtn.textContent = textoOriginal;
            }
        });
    }
});

/**
 * Exibe mensagens de sucesso ou erro na tela
 */
function mostrarMensagem(mensagem, tipo) {
    // Remover mensagens anteriores
    const mensagemAnterior = document.querySelector('.mensagem-cadastro');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Criar elemento de mensagem
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem-cadastro ${tipo}`;
    divMensagem.textContent = mensagem;
    
    // Estilos
    Object.assign(divMensagem.style, {
        padding: '12px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        fontWeight: 'bold',
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease-in'
    });
    
    // Cor conforme o tipo
    if (tipo === 'sucesso') {
        divMensagem.style.backgroundColor = '#d4edda';
        divMensagem.style.color = '#155724';
        divMensagem.style.border = '1px solid #c3e6cb';
    } else {
        divMensagem.style.backgroundColor = '#f8d7da';
        divMensagem.style.color = '#721c24';
        divMensagem.style.border = '1px solid #f5c6cb';
    }
    
    // Inserir mensagem antes do formulário
    const form = document.getElementById('cadastroForm');
    form.parentNode.insertBefore(divMensagem, form);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (divMensagem.parentNode) {
            divMensagem.remove();
        }
    }, 5000);
}

/**
 * Validação em tempo real dos campos
 */
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Validação de username
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const valor = this.value.trim();
            if (valor.length < 3) {
                this.setCustomValidity('O nome de usuário deve ter pelo menos 3 caracteres.');
            } else if (!/^[a-zA-Z0-9_]+$/.test(valor)) {
                this.setCustomValidity('Use apenas letras, números e underscores.');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Validação de email
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
                this.setCustomValidity('Por favor, insira um email válido.');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Validação de senhas
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length < 6) {
                this.setCustomValidity('A senha deve ter pelo menos 6 caracteres.');
            } else {
                this.setCustomValidity('');
            }
        });
        
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.setCustomValidity('As senhas não coincidem.');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .mensagem-cadastro {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    input:invalid {
        border-color: #dc3545 !important;
    }
    
    input:valid {
        border-color: #28a745 !important;
    }
`;
document.head.appendChild(style);
