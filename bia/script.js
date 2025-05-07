document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Modal de Emergência
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModal = document.getElementById('closeModal');
    
    emergencyBtn.addEventListener('click', () => {
        emergencyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Botões do Modal
    document.getElementById('modalFindClinicBtn').addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('#clinicas').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    document.getElementById('chatVetBtn').addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('#veterinarios').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    document.getElementById('firstAidBtn').addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('#socorros').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    document.getElementById('callVetBtn').addEventListener('click', () => {
        window.location.href = 'tel:+5511987654321';
    });
    
    // Assistente Virtual
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    // Respostas pré-definidas
    const responses = {
        'envenenamento': {
            title: 'Envenenamento',
            steps: [
                '1. Mantenha a calma e afaste seu pet da fonte de envenenamento',
                '2. Identifique a substância ingerida, se possível (guarde a embalagem)',
                '3. Não induza o vômito sem orientação veterinária',
                '4. Ligue imediatamente para um veterinário ou centro de toxicologia',
                '5. Transporte seu pet para a clínica veterinária mais próxima'
            ],
            warning: 'NÃO dê leite, água ou qualquer substância sem orientação profissional.'
        },
        'fratura': {
            title: 'Fratura ou Lesão Óssea',
            steps: [
                '1. Imobilize o animal para evitar movimentos bruscos',
                '2. Não tente colocar o osso no lugar',
                '3. Para fraturas expostas, cubra com gaze ou pano limpo',
                '4. Transporte com cuidado, usando uma superfície rígida como apoio',
                '5. Evite dar analgésicos humanos sem orientação veterinária'
            ],
            warning: 'Animais com dor podem morder - use uma toalha para manusear com segurança.'
        },
        'convulsao': {
            title: 'Convulsão',
            steps: [
                '1. Afaste objetos que possam machucar o animal',
                '2. Não tente segurar a língua do pet',
                '3. Cronometre a duração da convulsão',
                '4. Mantenha o ambiente calmo e com pouca luz',
                '5. Após a crise, mantenha o animal em local tranquilo e aquecido',
                '6. Leve ao veterinário mesmo que a convulsão tenha passado'
            ],
            warning: 'Nunca coloque as mãos perto da boca do animal durante a convulsão.'
        },
        'dificuldade-respirar': {
            title: 'Dificuldade Respiratória',
            steps: [
                '1. Mantenha o animal calmo e em repouso',
                '2. Verifique se há objetos obstruindo as vias aéreas',
                '3. Se houver corpo estranho visível, tente remover com cuidado',
                '4. Mantenha o pescoço estendido para facilitar a respiração',
                '5. Leve imediatamente ao veterinário',
                '6. Se possível, transporte com janelas abertas para ventilação'
            ],
            warning: 'Animais com dificuldade respiratória podem entrar em pânico - manuseie com cuidado.'
        }
    };
    
    // Função para adicionar mensagem ao chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageContent = document.createElement('p');
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Função para processar a entrada do usuário
    function processUserInput(input) {
        addMessage(input, true);
        userInput.value = '';
        
        // Simular "digitando..."
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-message', 'bot-message');
        typingIndicator.innerHTML = '<p><i class="fas fa-ellipsis-h"></i></p>';
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Simular tempo de resposta
        setTimeout(() => {
            chatContainer.removeChild(typingIndicator);
            
            // Verificar se é um problema conhecido
            let foundResponse = false;
            for (const [key, response] of Object.entries(responses)) {
                if (input.toLowerCase().includes(key)) {
                    showEmergencyGuide(response);
                    foundResponse = true;
                    break;
                }
            }
            
            if (!foundResponse) {
                addMessage('Entendi que seu pet está com: "' + input + '". Enquanto não há um veterinário disponível, posso sugerir que você:');
                addMessage('1. Mantenha a calma e observe os sintomas do seu pet');
                addMessage('2. Remova qualquer perigo imediato do ambiente');
                addMessage('3. Não administre medicamentos sem orientação profissional');
                addMessage('4. Entre em contato com uma clínica de emergência imediatamente');
                addMessage('Para orientações mais específicas, clique em um dos botões de emergência acima ou descreva melhor os sintomas.');
            }
        }, 1500);
    }
    
    // Função para mostrar guia de emergência
    function showEmergencyGuide(response) {
        addMessage(`🔴 EMERGÊNCIA: ${response.title.toUpperCase()} 🔴`);
        addMessage('Siga estas instruções imediatamente:');
        
        response.steps.forEach(step => {
            addMessage(step);
        });
        
        addMessage(`⚠️ ATENÇÃO: ${response.warning}`);
        addMessage('Por favor, dirija-se à clínica veterinária mais próxima o mais rápido possível.');
        
        // Adicionar botão para encontrar clínicas
        const clinicBtn = document.createElement('button');
        clinicBtn.classList.add('btn', 'secondary-btn');
        clinicBtn.style.marginTop = '10px';
        clinicBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Encontrar Clínica Mais Próxima';
        clinicBtn.addEventListener('click', () => {
            document.querySelector('#clinicas').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', 'bot-message');
        messageDiv.appendChild(clinicBtn);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Evento de envio de mensagem
    sendBtn.addEventListener('click', () => {
        if (userInput.value.trim() !== '') {
            processUserInput(userInput.value.trim());
        }
    });
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && userInput.value.trim() !== '') {
            processUserInput(userInput.value.trim());
        }
    });
    
    // Botões rápidos
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const issue = btn.getAttribute('data-issue');
            if (responses[issue]) {
                processUserInput(issue);
            }
        });
    });
    
    // Simular Mapa de Clínicas
    function initMap() {
        // Esta função seria substituída pela API do Google Maps
        // Aqui está uma simulação para demonstração
        const clinics = [
            {
                name: 'Clínica Vet24 Horas',
                address: 'Av. Paulista, 1000 - São Paulo',
                phone: '(11) 1234-5678',
                distance: '1.2 km'
            },
            {
                name: 'Hospital Veterinário PetCare',
                address: 'Rua Augusta, 500 - São Paulo',
                phone: '(11) 9876-5432',
                distance: '2.5 km'
            },
            {
                name: 'Emergência Vet Animal',
                address: 'Rua da Consolação, 200 - São Paulo',
                phone: '(11) 4567-8901',
                distance: '3.1 km'
            },
            {
                name: 'Vet Emergency Center',
                address: 'Alameda Santos, 800 - São Paulo',
                phone: '(11) 2345-6789',
                distance: '4.0 km'
            }
        ];
        
        const clinicsList = document.getElementById('clinicsList');
        clinics.forEach(clinic => {
            const clinicItem = document.createElement('div');
            clinicItem.classList.add('clinic-item');
            
            clinicItem.innerHTML = `
                <h4 class="clinic-name">${clinic.name}</h4>
                <p class="clinic-address"><i class="fas fa-map-marker-alt"></i> ${clinic.address}</p>
                <p class="clinic-phone"><i class="fas fa-phone"></i> ${clinic.phone}</p>
                <span class="clinic-distance"><i class="fas fa-walking"></i> ${clinic.distance}</span>
                <button class="btn secondary-btn" style="margin-top: 0.5rem; width: 100%;">
                    <i class="fas fa-directions"></i> Como chegar
                </button>
            `;
            
            clinicsList.appendChild(clinicItem);
        });
        
        // Adicionar evento aos botões "Como chegar"
        document.querySelectorAll('.clinic-item .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Esta funcionalidade integraria com o Google Maps para mostrar a rota até a clínica selecionada.');
            });
        });
    }
    
    // Simular Guia de Primeiros Socorros
    function loadFirstAidGuides() {
        const guides = [
            {
                title: 'Engasgo em Cães',
                description: 'Aprenda como agir quando seu cão está engasgado e não consegue respirar.',
                image: 'assets/images/dog-choking.jpg'
            },
            {
                title: 'Intoxicação Alimentar',
                description: 'O que fazer quando seu pet ingere algo tóxico ou estragado.',
                image: 'assets/images/poisoning.jpg'
            },
            {
                title: 'Ferimentos e Cortes',
                description: 'Como limpar e proteger ferimentos até chegar ao veterinário.',
                image: 'assets/images/wound.jpg'
            },
            {
                title: 'Golpe de Calor',
                description: 'Identifique e trate rapidamente casos de hipertermia em pets.',
                image: 'assets/images/heat-stroke.jpg'
            },
            {
                title: 'Convulsões',
                description: 'Saiba como agir durante uma crise convulsiva do seu pet.',
                image: 'assets/images/seizure.jpg'
            },
            {
                title: 'Queimaduras',
                description: 'Primeiros cuidados com queimaduras térmicas ou químicas.',
                image: 'assets/images/burn.jpg'
            }
        ];
        
        const firstAidGrid = document.querySelector('.first-aid-grid');
        
        guides.forEach(guide => {
            const guideCard = document.createElement('div');
            guideCard.classList.add('first-aid-card');
            
            guideCard.innerHTML = `
                <div class="first-aid-image" style="background-image: url(${guide.image})"></div>
                <div class="first-aid-content">
                    <h3 class="first-aid-title">${guide.title}</h3>
                    <p class="first-aid-description">${guide.description}</p>
                    <a href="#" class="first-aid-link">Ver procedimento completo →</a>
                </div>
            `;
            
            firstAidGrid.appendChild(guideCard);
        });
        
        // Adicionar evento aos links
        document.querySelectorAll('.first-aid-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Esta funcionalidade mostraria o guia completo em uma nova página.');
            });
        });
    }
    
    // Inicializar componentes
    initMap();
    loadFirstAidGuides();
    
    // Verificar geolocalização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Localização encontrada:', position.coords.latitude, position.coords.longitude);
                // Aqui você usaria as coordenadas para encontrar clínicas próximas
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
            }
        );
    }
    
    // Adicionar classe ativa ao scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Botão de encontrar clínica no hero
    document.getElementById('findClinicBtn').addEventListener('click', () => {
        document.querySelector('#clinicas').scrollIntoView({
            behavior: 'smooth'
        });
    });
});