// suporte.js - Página de suporte e FAQ

class SuporteManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFAQ();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Formulário de contato
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }

        // FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    this.toggleFAQ(item);
                });
            }
        });

        // Busca de FAQ
        const faqSearch = document.getElementById('faq-search');
        if (faqSearch) {
            faqSearch.addEventListener('input', (e) => {
                this.filterFAQ(e.target.value);
            });
        }

        // Categorias de FAQ
        const categoryButtons = document.querySelectorAll('.faq-category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterFAQByCategory(btn.dataset.category);
            });
        });

        // Validação de campos
        const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    loadFAQ() {
        // FAQ estático - em produção, isso viria de um endpoint
        const faqData = [
            {
                id: 1,
                category: 'geral',
                question: 'O que é o Figurama?',
                answer: 'Figurama é uma plataforma para colecionadores de action figures gerenciarem suas coleções, descobrirem novas figuras e se conectarem com outros colecionadores.'
            },
            {
                id: 2,
                category: 'conta',
                question: 'Como criar uma conta?',
                answer: 'Clique em "Login" no menu superior e depois em "Criar conta". Preencha suas informações e confirme seu email para começar a usar.'
            },
            {
                id: 3,
                category: 'colecao',
                question: 'Como adiciono figuras à minha coleção?',
                answer: 'Navegue pelo catálogo, encontre a figura desejada e clique em "Adicionar à Minha Coleção". Selecione qual coleção deseja adicionar e pronto!'
            },
            {
                id: 4,
                category: 'colecao',
                question: 'Posso criar várias coleções?',
                answer: 'Sim! Você pode criar quantas coleções quiser para organizar suas figuras por franquia, categoria, década ou qualquer critério que preferir.'
            },
            {
                id: 5,
                category: 'busca',
                question: 'Como encontro figuras específicas?',
                answer: 'Use a barra de busca na página principal ou acesse a página de Pesquisa Avançada para filtrar por nome, franquia, categoria e outros critérios.'
            },
            {
                id: 6,
                category: 'conta',
                question: 'Esqueci minha senha. Como faço?',
                answer: 'Na página de login, clique em "Esqueci minha senha" e siga as instruções para redefinir sua senha através do seu email.'
            },
            {
                id: 7,
                category: 'geral',
                question: 'O Figurama é gratuito?',
                answer: 'Sim! O uso básico do Figurama é completamente gratuito. Planejamos oferecer planos premium com recursos adicionais no futuro.'
            },
            {
                id: 8,
                category: 'tecnico',
                question: 'Quais navegadores são compatíveis?',
                answer: 'O Figurama funciona nos navegadores modernos como Chrome, Firefox, Safari e Edge. Recomendamos manter seu navegador sempre atualizado.'
            },
            {
                id: 9,
                category: 'tecnico',
                question: 'Meus dados estão seguros?',
                answer: 'Sim! Utilizamos criptografia SSL em todas as conexões e seguimos as melhores práticas de segurança para proteger suas informações.'
            },
            {
                id: 10,
                category: 'colecao',
                question: 'Posso exportar minha coleção?',
                answer: 'Atualmente estamos trabalhando nesta funcionalidade. Em breve você poderá exportar sua coleção em diversos formatos.'
            }
        ];

        this.faqData = faqData;
        this.renderFAQ(faqData);
    }

    renderFAQ(faqItems) {
        const faqContainer = document.getElementById('faq-container');
        if (!faqContainer) return;

        if (faqItems.length === 0) {
            faqContainer.innerHTML = '<p class="no-faq">Nenhuma pergunta encontrada.</p>';
            return;
        }

        faqContainer.innerHTML = faqItems.map(item => `
            <div class="faq-item" data-category="${item.category}">
                <div class="faq-question">
                    <h4>${item.question}</h4>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    toggleFAQ(item) {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        const isActive = item.classList.contains('active');

        // Fechar todos os outros itens
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                otherItem.querySelector('.faq-toggle').textContent = '+';
            }
        });

        // Alternar item atual
        if (isActive) {
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            toggle.textContent = '+';
        } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            toggle.textContent = '-';
        }
    }

    filterFAQ(searchTerm) {
        if (!searchTerm) {
            this.renderFAQ(this.faqData);
            return;
        }

        const filtered = this.faqData.filter(item => 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderFAQ(filtered);
    }

    filterFAQByCategory(category) {
        // Atualizar botões ativos
        document.querySelectorAll('.faq-category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        if (category === 'all') {
            this.renderFAQ(this.faqData);
            return;
        }

        const filtered = this.faqData.filter(item => item.category === category);
        this.renderFAQ(filtered);
    }

    setupFormValidation() {
        // Configurar validação personalizada
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Validação de email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const email = emailInput.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email && !emailRegex.test(email)) {
                    this.showFieldError(emailInput, 'Por favor, insira um email válido.');
                } else {
                    this.clearFieldError(emailInput);
                }
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Validações específicas
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Nome é obrigatório.';
                    isValid = false;
                } else if (value.length < 3) {
                    errorMessage = 'Nome deve ter pelo menos 3 caracteres.';
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email é obrigatório.';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Por favor, insira um email válido.';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    errorMessage = 'Assunto é obrigatório.';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'Mensagem é obrigatória.';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formData = new FormData(form);

        // Validar todos os campos
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError('Por favor, corrija os erros no formulário.');
            return;
        }

        // Desabilitar botão e mostrar loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Simular envio do formulário
            // Em produção, isso seria uma chamada real para o backend
            await this.simulateFormSubmission(formData);
            
            this.showFormSuccess('Mensagem enviada com sucesso! Responderemos em até 24h.');
            form.reset();
            
        } catch (error) {
            console.error('Erro no envio:', error);
            this.showFormError('Erro ao enviar mensagem. Tente novamente mais tarde.');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    }

    async simulateFormSubmission(formData) {
        // Simulação de envio - em produção, substituir por chamada real
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Formulário enviado:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    showFormError(message) {
        const errorElement = document.getElementById('form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    showFormSuccess(message) {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
            
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }
    }
}

// Funções utilitárias globais
function scrollToFAQ() {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.suporteManager = new SuporteManager();
});
