// ==================== MOCK DATA ====================
const newsData = [
    {
        id: 1,
        title: "Inteligência Artificial Transforma o Mercado de Trabalho em 2026",
        excerpt: "Com o avanço da IA generativa, milhões de novas oportunidades surgem, enquanto profissões tradicionais se adaptam ou desaparecem.",
        image: "https://picsum.photos/id/1018/800/600",
        category: "Tecnologia",
        date: "09 de Junho de 2026",
        author: "Ana Beatriz Costa",
        readTime: "7 min",
        fullContent: "A inteligência artificial está redefinindo completamente o cenário profissional global. Segundo especialistas, até o final de 2026 mais de 40% das tarefas rotineiras serão automatizadas. No entanto, novas carreiras em prompt engineering, ética em IA e manutenção de sistemas autônomos estão surgindo rapidamente. Empresas como Google e OpenAI lideram essa transformação, oferecendo treinamentos gratuitos para requalificação de profissionais."
    },
    {
        id: 2,
        title: "Eleições 2026: Candidatos Apresentam Planos para Cidades Inteligentes",
        excerpt: "Principais postulantes prometem investimentos em mobilidade urbana, sustentabilidade e tecnologia para melhorar a qualidade de vida.",
        image: "https://picsum.photos/id/1005/800/600",
        category: "Política",
        date: "08 de Junho de 2026",
        author: "Carlos Mendes",
        readTime: "5 min",
        fullContent: "Com as eleições se aproximando, os candidatos às prefeituras de grandes capitais têm focado suas campanhas em projetos de cidades inteligentes. Propostas incluem expansão de redes 5G, sistemas de transporte elétrico e plataformas digitais para serviços públicos. Especialistas alertam para a importância de inclusão digital para que todos os cidadãos possam se beneficiar."
    },
    {
        id: 3,
        title: "Economia Brasileira Registra Crescimento Acima do Esperado",
        excerpt: "O PIB cresceu 1,8% impulsionado pelo setor de serviços e exportações, surpreendendo analistas do mercado financeiro.",
        image: "https://picsum.photos/id/160/800/600",
        category: "Economia",
        date: "07 de Junho de 2026",
        author: "Roberto Almeida",
        readTime: "6 min",
        fullContent: "Dados divulgados pelo IBGE mostram um desempenho robusto da economia nacional. O consumo das famílias e o aumento das exportações de commodities foram os principais motores. O governo celebra os números, mas economistas pedem cautela devido à inflação persistente em alguns setores."
    },
    {
        id: 4,
        title: "Seleção Brasileira Empata em Amistoso e Prepara para a Copa",
        excerpt: "Com atuação equilibrada, o time comandado por Dorival Júnior testa novas táticas contra seleção europeia de alto nível.",
        image: "https://picsum.photos/id/201/800/600",
        category: "Esportes",
        date: "09 de Junho de 2026",
        author: "Lucas Ferreira",
        readTime: "4 min",
        fullContent: "Em um amistoso disputado em solo brasileiro, a Seleção Canarinho empatou em 1 a 1 com a França. O técnico Dorival Júnior aproveitou para avaliar jovens talentos e ajustar a defesa. A torcida lotou o estádio e mostrou apoio incondicional."
    },
    {
        id: 5,
        title: "Festival de Cinema do Rio Premia Produções Nacionais",
        excerpt: "Filme brasileiro 'O Sonho de Clara' leva o prêmio principal, destacando a força do cinema nacional no cenário global.",
        image: "https://picsum.photos/id/251/800/600",
        category: "Cultura",
        date: "06 de Junho de 2026",
        author: "Sofia Mendes",
        readTime: "5 min",
        fullContent: "O Festival do Rio 2026 foi um sucesso absoluto. Com mais de 200 filmes exibidos, o evento celebrou a diversidade cultural. O longa-metragem nacional 'O Sonho de Clara' emocionou o público e crítica, demonstrando a vitalidade do cinema brasileiro."
    },
    {
        id: 6,
        title: "Cientistas Descobrem Nova Espécie de Coral Resistente ao Clima",
        excerpt: "A descoberta no Oceano Pacífico pode ser chave para a preservação dos recifes de coral ameaçados pelo aquecimento global.",
        image: "https://picsum.photos/id/133/800/600",
        category: "Ciência",
        date: "05 de Junho de 2026",
        author: "Dr. Pedro Santos",
        readTime: "8 min",
        fullContent: "Uma equipe internacional de biólogos marinhos anunciou a descoberta de uma nova espécie de coral que apresenta alta resistência ao branqueamento causado pelo aumento da temperatura dos oceanos. A pesquisa oferece esperança para a conservação dos ecossistemas marinhos."
    }
];

// ==================== VARIÁVEIS DE ESTADO ====================
let currentCategory = 'Todas';
let currentSearch = '';

// ==================== DARK MODE ====================
function initDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const icon = document.getElementById('theme-icon');

    // Carregar preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        icon.textContent = isDark ? '☀️' : '🌙';
    });
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==================== RENDERIZAR NOTÍCIAS ====================
function renderNews(filteredData) {
    const container = document.getElementById('news-grid');
    container.innerHTML = '';

    filteredData.forEach(news => {
        const card = document.createElement('article');
        card.className = 'news-card';
        
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}">
            <div class="card-content">
                <span class="category-badge">${news.category}</span>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <div class="meta">
                    <span>${news.date}</span>
                    <span>${news.author}</span>
                    <span>${news.readTime}</span>
                </div>
            </div>
        `;

        // Clique no card abre o modal
        card.addEventListener('click', () => openModal(news));
        
        container.appendChild(card);
    });
}

// ==================== FILTRAR NOTÍCIAS ====================
function filterNews() {
    let filtered = newsData;

    // Filtro por categoria
    if (currentCategory !== 'Todas') {
        filtered = filtered.filter(item => item.category === currentCategory);
    }

    // Filtro por busca
    if (currentSearch) {
        const term = currentSearch.toLowerCase();
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(term) ||
            item.excerpt.toLowerCase().includes(term)
        );
    }

    renderNews(filtered);
}

// ==================== INICIAR FILTROS ====================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    // Filtros de categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.dataset.category;
            filterNews();
        });
    });

    // Busca em tempo real
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterNews();
    });
}

// ==================== MODAL ====================
function openModal(news) {
    const modal = document.getElementById('modal');
    
    document.getElementById('modal-image').src = news.image;
    document.getElementById('modal-category').textContent = news.category;
    document.getElementById('modal-title').textContent = news.title;
    document.getElementById('modal-meta').innerHTML = `
        <span>${news.date}</span> • 
        <span>${news.author}</span> • 
        <span>${news.readTime}</span>
    `;
    document.getElementById('modal-full-content').innerHTML = `<p>${news.fullContent}</p>`;

    modal.style.display = 'block';
}

function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Função auxiliar para abrir modal pelo ID (usado no Hero)
function openModalById(id) {
    const news = newsData.find(item => item.id === id);
    if (news) {
        openModal(news);
    }
}

// ==================== INICIALIZAÇÃO ====================
function init() {
    initDarkMode();
    initHamburger();
    initFilters();
    initModal();

    // Renderiza todas as notícias inicialmente
    renderNews(newsData);
}

// Inicia a aplicação
init();