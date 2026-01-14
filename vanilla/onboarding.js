var state = {
    currentStep: 0,
    steps: [
        {
            icon: 'sparkles',
            title: 'Bem-vindo ao ScreenFlow',
            description: 'Organize suas capturas automaticamente e economize espaço no seu dispositivo.',
            gradient: true
        },
        {
            icon: 'folder-sync',
            title: 'Organização Automática',
            description: 'Detectamos o app de origem e movemos screenshots e gravações para pastas organizadas.',
            gradient: false
        },
        {
            icon: 'trash',
            title: 'Limpeza Inteligente',
            description: 'Configure quanto tempo manter cada arquivo. Nós cuidamos do resto.',
            gradient: false
        },
        {
            icon: 'shield',
            title: 'Seus Dados, Seu Controle',
            description: 'Tudo fica no seu dispositivo. Nenhum upload automático. Total privacidade.',
            gradient: false
        }
    ]
};

function getIcon(name) {
    var icons = {
        'sparkles': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
        'folder-sync': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1"/><path d="M12 10v4h4"/><path d="m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5l1.5 1.5"/><path d="M22 22v-4h-4"/><path d="m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5L12 18"/></svg>',
        'trash': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        'shield': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
        'check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
    };
    return icons[name] || '';
}

function handleNext() {
    if (state.currentStep < state.steps.length - 1) {
        state.currentStep++;
        render();
    } else {
        completeOnboarding();
    }
}

function handleSkip() {
    completeOnboarding();
}

function completeOnboarding() {
    localStorage.setItem('screenflow-onboarded', 'true');
    window.location.href = 'index.html';
}

function checkOnboarded() {
    var hasOnboarded = localStorage.getItem('screenflow-onboarded');
    if (hasOnboarded) {
        window.location.href = 'index.html';
    }
}

function renderProgress() {
    var html = '';
    for (var i = 0; i < state.steps.length; i++) {
        var fillWidth = i <= state.currentStep ? '100%' : '0%';
        html += '<div class="onboarding-progress-bar animate-fade-in delay-' + i + '">';
        html += '<div class="onboarding-progress-fill" style="width: ' + fillWidth + '"></div>';
        html += '</div>';
    }
    return html;
}

function renderStep() {
    var step = state.steps[state.currentStep];
    var isLastStep = state.currentStep === state.steps.length - 1;
    var iconClass = step.gradient ? 'gradient' : '';
    
    var html = '<div class="onboarding-step animate-slide-transition">';
    html += '<div class="onboarding-icon ' + iconClass + ' animate-scale-in delay-1">';
    html += getIcon(step.icon);
    html += '</div>';
    html += '<h1 class="onboarding-title animate-fade-in delay-2">' + step.title + '</h1>';
    html += '<p class="onboarding-description animate-fade-in delay-3">' + step.description + '</p>';
    html += '</div>';
    
    return html;
}

function renderActions() {
    var isLastStep = state.currentStep === state.steps.length - 1;
    var buttonText = isLastStep ? 'Começar' : 'Continuar';
    var buttonIcon = isLastStep ? getIcon('check') : getIcon('arrow-right');
    
    var html = '<button class="onboarding-button tap-scale animate-fade-in-up delay-4" onclick="handleNext()">';
    if (isLastStep) {
        html += buttonIcon;
        html += '<span>' + buttonText + '</span>';
    } else {
        html += '<span>' + buttonText + '</span>';
        html += buttonIcon;
    }
    html += '</button>';
    
    if (!isLastStep) {
        html += '<button class="onboarding-skip animate-fade-in delay-5" onclick="handleSkip()">Pular</button>';
    }
    
    return html;
}

function render() {
    var container = document.getElementById('onboarding');
    
    var html = '<div class="onboarding-container">';
    html += '<div class="onboarding-progress">' + renderProgress() + '</div>';
    html += '<div class="onboarding-content">' + renderStep() + '</div>';
    html += '<div class="onboarding-actions">' + renderActions() + '</div>';
    html += '</div>';
    
    container.innerHTML = html;
}

function init() {
    checkOnboarded();
    render();
}

init();
