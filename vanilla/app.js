var state = {
    activeTab: 'dashboard',
    animationsEnabled: true,
    theme: localStorage.getItem('screenflow-theme') || 'system',
    notifications: true,
    autoOrganize: true,
    autoCleanup: true,
    activePeriod: 0,
    activeFilter: 'all',
    mediaFilter: 'screenshots',
    modalOpen: false,
    processType: 'screenshots',
    processStep: 0,
    processComplete: false,
    folders: [
        { id: '1', app: 'Instagram', appIcon: '📸', screenshotCount: 24, recordingCount: 5, lastUpdated: 'Hoje, 14:32', isFavorite: true },
        { id: '2', app: 'WhatsApp', appIcon: '💬', screenshotCount: 156, recordingCount: 12, lastUpdated: 'Hoje, 12:15', isFavorite: false },
        { id: '3', app: 'Twitter/X', appIcon: '🐦', screenshotCount: 43, recordingCount: 0, lastUpdated: 'Ontem, 23:45', isFavorite: false },
        { id: '4', app: 'YouTube', appIcon: '▶️', screenshotCount: 18, recordingCount: 28, lastUpdated: 'Ontem, 19:20', isFavorite: true },
        { id: '5', app: 'TikTok', appIcon: '🎵', screenshotCount: 89, recordingCount: 45, lastUpdated: '2 dias atrás', isFavorite: false },
        { id: '6', app: 'Spotify', appIcon: '🎧', screenshotCount: 12, recordingCount: 0, lastUpdated: '3 dias atrás', isFavorite: false },
        { id: '7', app: 'Netflix', appIcon: '🎬', screenshotCount: 7, recordingCount: 15, lastUpdated: '5 dias atrás', isFavorite: false },
        { id: '8', app: 'Telegram', appIcon: '✈️', screenshotCount: 31, recordingCount: 3, lastUpdated: '1 semana atrás', isFavorite: false }
    ],
    apps: [
        { id: '1', app: 'Instagram', appIcon: '📸', enabled: true, days: 30 },
        { id: '2', app: 'WhatsApp', appIcon: '💬', enabled: false, days: 7 },
        { id: '3', app: 'Twitter/X', appIcon: '🐦', enabled: true, days: 14 },
        { id: '4', app: 'YouTube', appIcon: '▶️', enabled: false, days: 30 },
        { id: '5', app: 'TikTok', appIcon: '🎵', enabled: true, days: 7 },
        { id: '6', app: 'Spotify', appIcon: '🎧', enabled: false, days: 30 },
        { id: '7', app: 'Netflix', appIcon: '🎬', enabled: false, days: 14 },
        { id: '8', app: 'Telegram', appIcon: '✈️', enabled: true, days: 7 }
    ],
    topApps: [
        { name: 'Instagram', icon: '📸', count: 234, size: '1.2 GB', color: '#E1306C' },
        { name: 'WhatsApp', icon: '💬', count: 156, size: '890 MB', color: '#25D366' },
        { name: 'Twitter/X', icon: '🐦', count: 98, size: '456 MB', color: '#1DA1F2' },
        { name: 'YouTube', icon: '▶️', count: 67, size: '2.1 GB', color: '#FF0000' }
    ],
    weeklyData: [
        { day: 'Seg', value: 45 },
        { day: 'Ter', value: 78 },
        { day: 'Qua', value: 32 },
        { day: 'Qui', value: 95 },
        { day: 'Sex', value: 67 },
        { day: 'Sáb', value: 120 },
        { day: 'Dom', value: 89 }
    ],
    processConfigs: {
        screenshots: {
            title: 'Organizando Screenshots',
            colorClass: 'primary',
            steps: [
                { title: 'Analisando screenshots', subtitle: 'Identificando arquivos para organização', duration: 1500 },
                { title: 'Classificando por categoria', subtitle: 'Agrupando por aplicativo e data', duration: 1200 },
                { title: 'Movendo para pastas', subtitle: 'Organizando arquivos em diretórios apropriados', duration: 1800 },
                { title: 'Finalizando processo', subtitle: 'Atualizando estatísticas e registros', duration: 1000 }
            ],
            result: { value: '234', label: 'capturas organizadas' }
        },
        recordings: {
            title: 'Organizando Gravações',
            colorClass: 'accent',
            steps: [
                { title: 'Escaneando gravações', subtitle: 'Localizando arquivos de vídeo', duration: 1500 },
                { title: 'Analisando metadados', subtitle: 'Extraindo informações dos vídeos', duration: 1300 },
                { title: 'Categorizando por data', subtitle: 'Organizando cronologicamente', duration: 1600 },
                { title: 'Finalizando processo', subtitle: 'Atualizando estatísticas e registros', duration: 900 }
            ],
            result: { value: '18', label: 'gravações organizadas' }
        },
        cleanup: {
            title: 'Limpeza Inteligente',
            colorClass: 'success',
            steps: [
                { title: 'Identificando duplicados', subtitle: 'Comparando arquivos similares', duration: 1400 },
                { title: 'Localizando arquivos antigos', subtitle: 'Buscando itens não utilizados', duration: 1200 },
                { title: 'Removendo desnecessários', subtitle: 'Limpando arquivos selecionados', duration: 1700 },
                { title: 'Liberando espaço', subtitle: 'Finalizando limpeza do sistema', duration: 1100 }
            ],
            result: { value: '1.2 GB', label: 'de espaço liberado' }
        }
    },
    charts: {}
};

var processTimer = null;

function getIcon(name) {
    var icons = {
        'home': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        'folder-open': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>',
        'trash': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        'bar-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
        'settings': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        'folder-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9 13 2 2 4-4"/></svg>',
        'hard-drive': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>',
        'clock': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'sparkles': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
        'camera': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
        'video': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>',
        'download': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
        'search': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
        'sliders': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>',
        'folder': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
        'star': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        'star-fill': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        'image': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
        'more-vertical': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
        'sun': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
        'moon': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
        'monitor': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
        'folder-sync': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1"/><path d="M12 10v4h4"/><path d="m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5l1.5 1.5"/><path d="M22 22v-4h-4"/><path d="m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5L12 18"/></svg>',
        'bell': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
        'rotate-ccw': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
        'trending-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
        'calendar': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
        'check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        'pie-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
        'activity': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    };
    return icons[name] || '';
}

function setTab(tab) {
    state.activeTab = tab;
    render();
}

function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('screenflow-theme', theme);
    applyTheme();
    render();
}

function applyTheme() {
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (state.theme === 'system') {
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
    } else {
        root.classList.add(state.theme);
    }
}

function toggleAnimations() {
    state.animationsEnabled = !state.animationsEnabled;
    if (!state.animationsEnabled) {
        document.documentElement.classList.add('no-animations');
    } else {
        document.documentElement.classList.remove('no-animations');
    }
    render();
}

function toggleSwitch(key) {
    state[key] = !state[key];
    render();
}

function setFilter(filter) {
    state.activeFilter = filter;
    render();
}

function setMediaFilter(filter) {
    state.mediaFilter = filter;
    render();
}

function setPeriod(index) {
    state.activePeriod = index;
    render();
}

function toggleAppClean(id) {
    state.apps = state.apps.map(function(app) {
        if (app.id === id) {
            return Object.assign({}, app, { enabled: !app.enabled });
        }
        return app;
    });
    render();
}

function setAppDays(id, days) {
    state.apps = state.apps.map(function(app) {
        if (app.id === id) {
            return Object.assign({}, app, { days: days });
        }
        return app;
    });
    render();
}

function toggleFolderFavorite(id) {
    state.folders = state.folders.map(function(folder) {
        if (folder.id === id) {
            return Object.assign({}, folder, { isFavorite: !folder.isFavorite });
        }
        return folder;
    });
    render();
}

function deleteFolder(id) {
    state.folders = state.folders.filter(function(folder) {
        return folder.id !== id;
    });
    render();
}

function openProcess(type) {
    state.processType = type;
    state.modalOpen = true;
    state.processStep = 0;
    state.processComplete = false;
    render();
    startProcess();
}

function closeModal() {
    state.modalOpen = false;
    state.processStep = 0;
    state.processComplete = false;
    if (processTimer) {
        clearTimeout(processTimer);
        processTimer = null;
    }
    render();
}

function startProcess() {
    var config = state.processConfigs[state.processType];
    if (state.processStep >= config.steps.length) {
        state.processComplete = true;
        render();
        return;
    }
    
    processTimer = setTimeout(function() {
        state.processStep++;
        render();
        startProcess();
    }, config.steps[state.processStep].duration);
}

function resetSettings() {
    state.notifications = true;
    state.autoOrganize = true;
    state.autoCleanup = true;
    state.animationsEnabled = true;
    state.theme = 'system';
    document.documentElement.classList.remove('no-animations');
    localStorage.setItem('screenflow-theme', 'system');
    applyTheme();
    render();
}

function getFilteredFolders() {
    return state.folders.filter(function(folder) {
        if (state.activeFilter === 'favorites' && !folder.isFavorite) return false;
        if (state.mediaFilter === 'screenshots' && folder.screenshotCount === 0) return false;
        if (state.mediaFilter === 'recordings' && folder.recordingCount === 0) return false;
        return true;
    });
}

function renderDashboard() {
    var html = '<div class="page-container page-enter animate-fade-in">';
    
    html += '<div class="page-header animate-fade-in-down">';
    html += '<div class="header-row">';
    html += '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2306b6d4\' stroke-width=\'2\'%3E%3Cpath d=\'M12 3v18\'/%3E%3Cpath d=\'m8 7 4-4 4 4\'/%3E%3Cpath d=\'m8 17 4 4 4-4\'/%3E%3C/svg%3E" alt="ScreenFlow Logo" class="logo-img">';
    html += '<div class="header-text">';
    html += '<h1>ScreenFlow</h1>';
    html += '<p>Tudo organizado automaticamente</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="stats-grid">';
    html += renderStatCard({ icon: 'folder-check', label: 'Arquivos Organizados', value: '1,234', subtext: 'Este mês', gradient: true, delay: 1 });
    html += renderStatCard({ icon: 'hard-drive', label: 'Espaço Economizado', value: '4.2 GB', subtext: '+800 MB hoje', delay: 2 });
    html += renderStatCard({ icon: 'clock', label: 'Última Limpeza', value: '2h atrás', subtext: 'Automática', delay: 3 });
    html += renderStatCard({ icon: 'sparkles', label: 'Taxa de Automação', value: '98%', subtext: 'Excelente!', delay: 4 });
    html += '</div>';
    
    html += '<div class="animate-fade-in delay-5">';
    html += '<h2 class="section-title">Ações Rápidas</h2>';
    html += '<div class="quick-actions">';
    html += '<button class="action-button blue tap-scale" onclick="openProcess(\'screenshots\')">';
    html += '<div class="action-icon-wrapper">' + getIcon('camera') + '</div>';
    html += '<span class="action-label">Organizar capturas</span>';
    html += '</button>';
    html += '<button class="action-button purple tap-scale" onclick="openProcess(\'recordings\')">';
    html += '<div class="action-icon-wrapper">' + getIcon('video') + '</div>';
    html += '<span class="action-label">Organizar gravações</span>';
    html += '</button>';
    html += '<button class="action-button green tap-scale" onclick="openProcess(\'cleanup\')">';
    html += '<div class="action-icon-wrapper">' + getIcon('sparkles') + '</div>';
    html += '<span class="action-label">Executar limpeza</span>';
    html += '</button>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="animate-fade-in delay-6">';
    html += '<div class="section-header">';
    html += '<h2 class="section-header-title">Apps com Mais Capturas</h2>';
    html += '<button class="section-header-link">Ver todos</button>';
    html += '</div>';
    html += '<div class="apps-list">';
    state.topApps.forEach(function(app, index) {
        html += renderAppCard(app, index);
    });
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    
    return html;
}

function renderStatCard(props) {
    var gradientClass = props.gradient ? 'gradient glow' : '';
    var html = '<div class="stat-card ' + gradientClass + ' card-glow animate-fade-in-up delay-' + props.delay + '">';
    if (props.gradient) {
        html += '<div class="overlay"></div>';
    }
    html += '<div class="content">';
    html += '<div class="stat-icon-wrapper">';
    html += '<span class="stat-icon">' + getIcon(props.icon) + '</span>';
    html += '</div>';
    html += '<p class="stat-label">' + props.label + '</p>';
    html += '<p class="stat-value">' + props.value + '</p>';
    if (props.subtext) {
        html += '<p class="stat-subtext">' + props.subtext + '</p>';
    }
    html += '</div>';
    html += '</div>';
    return html;
}

function renderAppCard(app, index) {
    var html = '<div class="app-card card-glow animate-fade-in-left delay-' + (7 + index) + '">';
    html += '<div class="app-icon-wrapper" style="background-color: ' + app.color + '20;">';
    html += app.icon;
    html += '</div>';
    html += '<div class="app-info">';
    html += '<p class="app-name">' + app.name + '</p>';
    html += '<p class="app-details">' + app.count + ' arquivos • ' + app.size + '</p>';
    html += '</div>';
    html += '<div class="app-indicator" style="background-color: ' + app.color + ';"></div>';
    html += '</div>';
    return html;
}

function renderFiles() {
    var filteredFolders = getFilteredFolders();
    var totalFolders = filteredFolders.length;
    var totalCaptures = filteredFolders.reduce(function(sum, folder) {
        return sum + (state.mediaFilter === 'screenshots' ? folder.screenshotCount : folder.recordingCount);
    }, 0);
    
    var html = '<div class="page-container page-enter animate-fade-in">';
    
    html += '<div class="page-header animate-fade-in-down">';
    html += '<div class="section-header" style="margin-bottom: 1rem;">';
    html += '<h1 class="page-title" style="margin-bottom: 0;">Apps</h1>';
    html += '<div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: hsl(var(--muted-foreground));">';
    html += '<span style="display: flex; align-items: center; gap: 0.25rem;">' + getIcon('folder') + ' ' + totalFolders + '</span>';
    html += '<span style="display: flex; align-items: center; gap: 0.25rem;">' + (state.mediaFilter === 'screenshots' ? getIcon('image') : getIcon('video')) + ' ' + totalCaptures + '</span>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="search-container animate-fade-in-up delay-1">';
    html += '<span class="search-icon">' + getIcon('search') + '</span>';
    html += '<input type="text" class="search-input" placeholder="Buscar por app...">';
    html += '<button class="search-filter-btn">' + getIcon('sliders') + '</button>';
    html += '</div>';
    
    html += '<div class="filters-row animate-fade-in-up delay-2">';
    html += '<button class="filter-button ' + (state.activeFilter === 'all' ? 'active glow' : '') + ' tap-scale" onclick="setFilter(\'all\')">' + getIcon('folder') + ' Todas</button>';
    html += '<button class="filter-button ' + (state.activeFilter === 'favorites' ? 'active glow' : '') + ' tap-scale" onclick="setFilter(\'favorites\')">' + getIcon('star') + ' Favoritas</button>';
    html += '<div class="media-toggle">';
    html += '<button class="media-toggle-btn ' + (state.mediaFilter === 'screenshots' ? 'active' : '') + '" onclick="setMediaFilter(\'screenshots\')" title="Capturas de tela">' + getIcon('image') + '</button>';
    html += '<button class="media-toggle-btn ' + (state.mediaFilter === 'recordings' ? 'active' : '') + '" onclick="setMediaFilter(\'recordings\')" title="Gravações">' + getIcon('video') + '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    if (filteredFolders.length > 0) {
        html += '<div class="folders-grid animate-fade-in delay-3">';
        filteredFolders.forEach(function(folder, index) {
            html += renderFolderCard(folder, index);
        });
        html += '</div>';
    } else {
        html += '<div class="empty-state animate-fade-in delay-3">';
        html += '<div class="empty-icon-wrapper">' + getIcon('folder') + '</div>';
        html += '<p class="empty-title">Nenhuma pasta encontrada</p>';
        html += '<p class="empty-subtitle">' + (state.mediaFilter === 'recordings' ? 'Nenhum app com gravações' : 'Tente ajustar os filtros') + '</p>';
        html += '</div>';
    }
    
    html += '</div>';
    
    return html;
}

function renderFolderCard(folder, index) {
    var mediaCount = state.mediaFilter === 'screenshots' ? folder.screenshotCount : folder.recordingCount;
    var favoriteClass = folder.isFavorite ? 'favorite' : '';
    
    var html = '<div class="folder-card card-glow ' + favoriteClass + ' animate-scale-in delay-' + (index % 10) + '">';
    html += '<div class="folder-header">';
    html += '<div class="folder-icon-wrapper">';
    html += '<span class="folder-main-icon">' + getIcon('folder') + '</span>';
    html += '<span class="folder-app-icon">' + folder.appIcon + '</span>';
    html += '</div>';
    html += '<div style="position: relative;">';
    html += '<button class="folder-menu-btn" onclick="event.stopPropagation(); toggleDropdown(\'' + folder.id + '\')">' + getIcon('more-vertical') + '</button>';
    html += '<div id="dropdown-' + folder.id + '" class="dropdown-menu">';
    html += '<button class="dropdown-item" onclick="event.stopPropagation(); toggleFolderFavorite(\'' + folder.id + '\'); closeDropdown(\'' + folder.id + '\')">' + (folder.isFavorite ? getIcon('star-fill') : getIcon('star')) + ' ' + (folder.isFavorite ? 'Remover favorito' : 'Favoritar') + '</button>';
    html += '<button class="dropdown-item destructive" onclick="event.stopPropagation(); deleteFolder(\'' + folder.id + '\'); closeDropdown(\'' + folder.id + '\')">' + getIcon('trash') + ' Excluir</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<p class="folder-app-name">' + folder.app + (folder.isFavorite ? ' <span class="star">' + getIcon('star-fill') + '</span>' : '') + '</p>';
    html += '<p class="folder-count">' + (state.mediaFilter === 'screenshots' ? getIcon('image') : getIcon('video')) + ' ' + mediaCount + '</p>';
    html += '<p class="folder-updated">' + folder.lastUpdated + '</p>';
    html += '</div>';
    
    return html;
}

function toggleDropdown(id) {
    var dropdown = document.getElementById('dropdown-' + id);
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function closeDropdown(id) {
    var dropdown = document.getElementById('dropdown-' + id);
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

function renderAutoclean() {
    var enabledCount = state.apps.filter(function(app) { return app.enabled; }).length;
    var dayOptions = [7, 14, 30, 60, 90];
    
    var html = '<div class="page-container page-enter animate-fade-in">';
    
    html += '<div class="page-header animate-fade-in-down">';
    html += '<div class="autoclean-header">';
    html += '<div class="autoclean-icon-wrapper">' + getIcon('trash') + '</div>';
    html += '<div class="autoclean-header-text">';
    html += '<h1>Auto Clean</h1>';
    html += '<p>' + enabledCount + ' apps com limpeza automática</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="info-card animate-fade-in-up delay-1">';
    html += '<div class="info-card-content">';
    html += getIcon('clock');
    html += '<div>';
    html += '<h4>Como funciona?</h4>';
    html += '<p>Configure o prazo de dias para cada app. Após esse período, as capturas serão automaticamente removidas para liberar espaço.</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="app-clean-list animate-fade-in delay-2">';
    state.apps.forEach(function(app, index) {
        var enabledClass = app.enabled ? 'enabled' : '';
        
        html += '<div class="app-clean-card ' + enabledClass + ' animate-fade-in-left delay-' + (index % 10) + '">';
        html += '<div class="app-clean-header">';
        html += '<div class="app-clean-info">';
        html += '<span>' + app.appIcon + '</span>';
        html += '<span>' + app.app + '</span>';
        html += '</div>';
        html += '<button class="switch ' + (app.enabled ? 'active' : '') + '" onclick="toggleAppClean(\'' + app.id + '\')"></button>';
        html += '</div>';
        
        if (app.enabled) {
            html += '<div class="app-clean-options">';
            html += '<p>Remover após:</p>';
            html += '<div class="days-options">';
            dayOptions.forEach(function(days) {
                html += '<button class="day-button tap-scale ' + (app.days === days ? 'active' : '') + '" onclick="setAppDays(\'' + app.id + '\', ' + days + ')">' + days + ' dias</button>';
            });
            html += '</div>';
            html += '</div>';
        }
        
        html += '</div>';
    });
    html += '</div>';
    
    html += '</div>';
    
    return html;
}

function renderStats() {
    var periods = ['7 dias', '30 dias', '3 meses', '1 ano'];
    
    var html = '<div class="page-container page-enter animate-fade-in">';
    
    html += '<div class="page-header animate-fade-in-down">';
    html += '<h1 class="page-title">Estatísticas</h1>';
    html += '<p class="page-subtitle">Acompanhe seu uso e economia</p>';
    html += '</div>';
    
    html += '<div class="period-selector animate-fade-in-up delay-1">';
    periods.forEach(function(period, index) {
        html += '<button class="period-button tap-scale ' + (state.activePeriod === index ? 'active glow' : '') + '" onclick="setPeriod(' + index + ')">' + period + '</button>';
    });
    html += '</div>';
    
    html += '<div class="chart-card card-glow animate-fade-in-up delay-2">';
    html += '<div class="chart-header">';
    html += getIcon('trending-up');
    html += '<h3>Capturas por Dia</h3>';
    html += '</div>';
    html += '<div class="chart-container"><canvas id="weeklyChart"></canvas></div>';
    html += '</div>';
    
    html += '<div class="charts-row">';
    html += '<div class="chart-card-small card-glow animate-fade-in-left delay-3">';
    html += '<div class="chart-header-small">';
    html += getIcon('pie-chart');
    html += '<span class="chart-title-small">Por App</span>';
    html += '</div>';
    html += '<div class="chart-container-small"><canvas id="appsChart"></canvas></div>';
    html += '</div>';
    html += '<div class="chart-card-small card-glow animate-fade-in-right delay-4">';
    html += '<div class="chart-header-small">';
    html += getIcon('activity');
    html += '<span class="chart-title-small">Espaço</span>';
    html += '</div>';
    html += '<div class="chart-container-small"><canvas id="storageChart"></canvas></div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="summary-cards">';
    html += '<div class="summary-card card-glow animate-fade-in-left delay-5">';
    html += '<div class="summary-icon-wrapper">';
    html += '<div class="summary-icon success">' + getIcon('trash') + '</div>';
    html += '</div>';
    html += '<p class="summary-value">847</p>';
    html += '<p class="summary-label">Arquivos limpos</p>';
    html += '</div>';
    html += '<div class="summary-card card-glow animate-fade-in-right delay-6">';
    html += '<div class="summary-icon-wrapper">';
    html += '<div class="summary-icon primary">' + getIcon('folder-check') + '</div>';
    html += '</div>';
    html += '<p class="summary-value">1,456</p>';
    html += '<p class="summary-label">Organizados</p>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="activity-card card-glow animate-fade-in-up delay-7">';
    html += '<div class="activity-header">';
    html += getIcon('calendar');
    html += '<h3>Atividade Recente</h3>';
    html += '</div>';
    html += '<div class="activity-list">';
    
    var activities = [
        { action: 'Limpeza automática', detail: '156 arquivos removidos', time: '2h atrás', icon: '🧹' },
        { action: 'Organização', detail: '34 screenshots do Instagram', time: '5h atrás', icon: '📁' },
        { action: 'Backup completo', detail: '2.3 GB sincronizados', time: '1 dia atrás', icon: '☁️' }
    ];
    
    activities.forEach(function(item) {
        html += '<div class="activity-item">';
        html += '<span class="activity-icon">' + item.icon + '</span>';
        html += '<div class="activity-content">';
        html += '<p class="activity-title">' + item.action + '</p>';
        html += '<p class="activity-detail">' + item.detail + '</p>';
        html += '</div>';
        html += '<span class="activity-time">' + item.time + '</span>';
        html += '</div>';
    });
    
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    
    return html;
}

function renderSettings() {
    var themeOptions = [
        { label: 'Claro', value: 'light', icon: 'sun' },
        { label: 'Escuro', value: 'dark', icon: 'moon' },
        { label: 'Sistema', value: 'system', icon: 'monitor' }
    ];
    
    var html = '<div class="page-container page-enter animate-fade-in">';
    
    html += '<div class="page-header animate-fade-in-down">';
    html += '<h1 class="page-title">Configurações</h1>';
    html += '<p class="page-subtitle">Personalize sua experiência</p>';
    html += '</div>';
    
    html += '<div class="settings-section animate-fade-in-up delay-1">';
    html += '<h2 class="section-title">Tema</h2>';
    html += '<div class="settings-card card-glow">';
    html += '<div class="theme-grid">';
    themeOptions.forEach(function(option) {
        html += '<button class="theme-button tap-scale ' + (state.theme === option.value ? 'active glow' : '') + '" onclick="setTheme(\'' + option.value + '\')">';
        html += getIcon(option.icon);
        html += '<span>' + option.label + '</span>';
        html += '</button>';
    });
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="settings-section animate-fade-in-up delay-2">';
    html += '<h2 class="section-title">Automação</h2>';
    html += '<div class="settings-card card-glow">';
    html += '<div class="setting-row">';
    html += '<div class="setting-info">';
    html += '<div class="setting-icon primary">' + getIcon('folder-sync') + '</div>';
    html += '<div class="setting-text">';
    html += '<h4>Organização Automática</h4>';
    html += '<p>Mover arquivos automaticamente</p>';
    html += '</div>';
    html += '</div>';
    html += '<button class="switch ' + (state.autoOrganize ? 'active' : '') + '" onclick="toggleSwitch(\'autoOrganize\')"></button>';
    html += '</div>';
    html += '<div class="setting-row">';
    html += '<div class="setting-info">';
    html += '<div class="setting-icon accent">' + getIcon('trash') + '</div>';
    html += '<div class="setting-text">';
    html += '<h4>Auto Limpeza</h4>';
    html += '<p>Remover arquivos antigos</p>';
    html += '</div>';
    html += '</div>';
    html += '<button class="switch ' + (state.autoCleanup ? 'active' : '') + '" onclick="toggleSwitch(\'autoCleanup\')"></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="settings-section animate-fade-in-up delay-3">';
    html += '<h2 class="section-title">Outros</h2>';
    html += '<div class="settings-card card-glow">';
    html += '<div class="setting-row">';
    html += '<div class="setting-info">';
    html += '<div class="setting-icon primary">' + getIcon('sparkles') + '</div>';
    html += '<div class="setting-text">';
    html += '<h4>Animações</h4>';
    html += '<p>Efeitos visuais e transições</p>';
    html += '</div>';
    html += '</div>';
    html += '<button class="switch ' + (state.animationsEnabled ? 'active' : '') + '" onclick="toggleAnimations()"></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="settings-section animate-fade-in-up delay-4">';
    html += '<h2 class="section-title">Notificações</h2>';
    html += '<div class="settings-card card-glow">';
    html += '<div class="setting-row">';
    html += '<div class="setting-info">';
    html += '<div class="setting-icon warning">' + getIcon('bell') + '</div>';
    html += '<div class="setting-text">';
    html += '<h4>Notificações</h4>';
    html += '<p>Receber alertas de limpeza</p>';
    html += '</div>';
    html += '</div>';
    html += '<button class="switch ' + (state.notifications ? 'active' : '') + '" onclick="toggleSwitch(\'notifications\')"></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="settings-section animate-fade-in-up delay-5">';
    html += '<button class="reset-button tap-scale" onclick="resetSettings()">';
    html += getIcon('rotate-ccw');
    html += '<span>Restaurar Configurações Padrão</span>';
    html += '</button>';
    html += '</div>';
    
    html += '<p class="version-text animate-fade-in delay-6">ScreenFlow v1.0.0</p>';
    
    html += '</div>';
    
    return html;
}

function renderBottomNav() {
    var tabs = [
        { id: 'dashboard', icon: 'home', label: 'Início' },
        { id: 'files', icon: 'folder-open', label: 'Apps' },
        { id: 'autoclean', icon: 'trash', label: 'Auto Clean' },
        { id: 'stats', icon: 'bar-chart', label: 'Stats' },
        { id: 'settings', icon: 'settings', label: 'Config' }
    ];
    
    var html = '<nav class="bottom-nav animate-fade-in-up">';
    html += '<div class="nav-container">';
    
    tabs.forEach(function(tab) {
        var activeClass = state.activeTab === tab.id ? 'active' : '';
        html += '<button class="nav-button ' + activeClass + ' tap-scale" onclick="setTab(\'' + tab.id + '\')">';
        if (state.activeTab === tab.id) {
            html += '<div class="nav-bg"></div>';
        }
        html += '<span class="nav-icon">' + getIcon(tab.icon) + '</span>';
        html += '<span class="nav-label">' + tab.label + '</span>';
        html += '</button>';
    });
    
    html += '</div>';
    html += '</nav>';
    
    return html;
}

function renderModal() {
    if (!state.modalOpen) return '';
    
    var config = state.processConfigs[state.processType];
    var totalSteps = config.steps.length;
    var progress = state.processComplete ? 100 : ((state.processStep + 1) / totalSteps) * 100;
    var currentStepLabel = state.processStep < totalSteps ? config.steps[state.processStep].title : 'Concluído';
    
    var html = '<div class="modal-overlay active" onclick="closeModal()">';
    html += '<div class="modal animate-scale-in" onclick="event.stopPropagation()">';
    
    html += '<div class="modal-header">';
    html += '<h2 class="modal-title">' + config.title + '</h2>';
    html += '</div>';
    
    html += '<div class="modal-body">';
    
    html += '<div class="progress-bar-container">';
    html += '<div class="progress-bar" style="width: ' + progress + '%;"></div>';
    html += '</div>';
    html += '<div class="progress-info">';
    html += '<span>' + currentStepLabel + '</span>';
    html += '<span>' + Math.round(progress) + '%</span>';
    html += '</div>';
    
    html += '<div class="process-steps">';
    config.steps.forEach(function(step, index) {
        var isActive = index === state.processStep && !state.processComplete;
        var isDone = index < state.processStep || state.processComplete;
        var stepClass = isActive ? 'active ' + config.colorClass : (isDone ? 'done' : '');
        var iconClass = config.colorClass;
        
        html += '<div class="process-step ' + stepClass + '">';
        html += '<div class="process-step-content">';
        html += '<div class="process-step-icon ' + iconClass + '">';
        html += isDone && !isActive ? getIcon('check') : getIcon('download');
        html += '</div>';
        html += '<div class="process-step-text">';
        html += '<h4 class="process-step-title">' + step.title + '</h4>';
        html += '<p class="process-step-subtitle">' + step.subtitle + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    html += '</div>';
    
    if (state.processComplete) {
        html += '<div class="process-complete animate-fade-in-up">';
        html += '<div class="process-complete-icon">' + getIcon('check') + '</div>';
        html += '<p class="process-complete-title">Processo Concluído!</p>';
        html += '<p class="process-complete-stats"><span>' + config.result.value + '</span> ' + config.result.label + '</p>';
        html += '</div>';
    }
    
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

function initCharts() {
    if (state.activeTab !== 'stats') return;
    
    Object.keys(state.charts).forEach(function(key) {
        if (state.charts[key]) {
            state.charts[key].destroy();
        }
    });
    state.charts = {};
    
    var isDark = document.documentElement.classList.contains('dark');
    var textColor = isDark ? 'hsl(210, 40%, 98%)' : 'hsl(222, 47%, 11%)';
    var gridColor = isDark ? 'hsl(222, 47%, 15%)' : 'hsl(214, 32%, 91%)';
    var primaryColor = 'hsl(199, 89%, 48%)';
    var accentColor = 'hsl(265, 89%, 60%)';
    
    var weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        state.charts.weekly = new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: state.weeklyData.map(function(d) { return d.day; }),
                datasets: [{
                    data: state.weeklyData.map(function(d) { return d.value; }),
                    backgroundColor: function(context) {
                        var chart = context.chart;
                        var ctx = chart.ctx;
                        var gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                        gradient.addColorStop(0, primaryColor);
                        gradient.addColorStop(1, accentColor);
                        return gradient;
                    },
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor, font: { size: 11 } }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { size: 11 } }
                    }
                }
            }
        });
    }
    
    var appsCtx = document.getElementById('appsChart');
    if (appsCtx) {
        state.charts.apps = new Chart(appsCtx, {
            type: 'doughnut',
            data: {
                labels: state.topApps.map(function(app) { return app.name; }),
                datasets: [{
                    data: state.topApps.map(function(app) { return app.count; }),
                    backgroundColor: state.topApps.map(function(app) { return app.color; }),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '60%'
            }
        });
    }
    
    var storageCtx = document.getElementById('storageChart');
    if (storageCtx) {
        state.charts.storage = new Chart(storageCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    data: [2.1, 2.8, 3.2, 3.5, 3.9, 4.2],
                    borderColor: primaryColor,
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }
}

function render() {
    var container = document.getElementById('app');
    var html = '';
    
    switch (state.activeTab) {
        case 'dashboard':
            html = renderDashboard();
            break;
        case 'files':
            html = renderFiles();
            break;
        case 'autoclean':
            html = renderAutoclean();
            break;
        case 'stats':
            html = renderStats();
            break;
        case 'settings':
            html = renderSettings();
            break;
    }
    
    html += renderBottomNav();
    html += renderModal();
    
    container.innerHTML = html;
    
    requestAnimationFrame(function() {
        initCharts();
    });
}

function checkOnboarding() {
    var hasOnboarded = localStorage.getItem('screenflow-onboarded');
    if (!hasOnboarded) {
        window.location.href = 'onboarding.html';
    }
}

function init() {
    checkOnboarding();
    applyTheme();
    
    if (!state.animationsEnabled) {
        document.documentElement.classList.add('no-animations');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (state.theme === 'system') {
            applyTheme();
        }
    });
    
    document.addEventListener('click', function(e) {
        var dropdowns = document.querySelectorAll('.dropdown-menu.active');
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.parentElement.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    render();
}

init();
