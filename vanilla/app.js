const App = {
  state: {
    showOnboarding: true,
    onboardingStep: 0,
    activeTab: 'dashboard',
    theme: 'system',
    animationsEnabled: true,
    autoOrganize: true,
    autoCleanup: true,
    notifications: true,
    mediaFilter: 'screenshots',
    folderFilter: 'all',
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
    autocleanApps: [
      { id: '1', app: 'Instagram', appIcon: '📸', enabled: true, days: 30 },
      { id: '2', app: 'WhatsApp', appIcon: '💬', enabled: false, days: 7 },
      { id: '3', app: 'Twitter/X', appIcon: '🐦', enabled: true, days: 14 },
      { id: '4', app: 'YouTube', appIcon: '▶️', enabled: false, days: 30 },
      { id: '5', app: 'TikTok', appIcon: '🎵', enabled: true, days: 7 },
      { id: '6', app: 'Spotify', appIcon: '🎧', enabled: false, days: 30 },
      { id: '7', app: 'Netflix', appIcon: '🎬', enabled: false, days: 14 },
      { id: '8', app: 'Telegram', appIcon: '✈️', enabled: true, days: 7 }
    ]
  },

  onboardingSteps: [
    { icon: 'sparkles', title: 'Bem-vindo ao ScreenFlow', description: 'Organize suas capturas automaticamente e economize espaço no seu dispositivo.', gradient: true },
    { icon: 'folder-sync', title: 'Organização Automática', description: 'Detectamos o app de origem e movemos screenshots e gravações para pastas organizadas.', gradient: false },
    { icon: 'trash', title: 'Limpeza Inteligente', description: 'Configure quanto tempo manter cada arquivo. Nós cuidamos do resto.', gradient: false },
    { icon: 'shield', title: 'Seus Dados, Seu Controle', description: 'Tudo fica no seu dispositivo. Nenhum upload automático. Total privacidade.', gradient: false }
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

  init() {
    const hasOnboarded = localStorage.getItem('screenflow-onboarded');
    if (hasOnboarded) {
      this.state.showOnboarding = false;
    }

    const savedTheme = localStorage.getItem('screenflow-theme');
    if (savedTheme) {
      this.state.theme = savedTheme;
    }

    const savedAnimations = localStorage.getItem('screenflow-animations-enabled');
    if (savedAnimations === 'false') {
      this.state.animationsEnabled = false;
    }

    this.applyTheme();
    this.render();
  },

  applyTheme() {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (this.state.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(this.state.theme);
    }

    localStorage.setItem('screenflow-theme', this.state.theme);
  },

  icons: {
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    'folder-sync': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1"/><path d="M12 10v4h4"/><path d="m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5l1.5 1.5"/><path d="M22 22v-4h-4"/><path d="m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5L12 18"/></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    shield: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    folder: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
    'folder-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9 13 2 2 4-4"/></svg>',
    hardDrive: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    camera: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    video: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    monitor: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
    bell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    rotateCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    sliders: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    image: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    moreVertical: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>'
  },

  render() {
    const app = document.getElementById('app');
    
    if (this.state.showOnboarding) {
      app.innerHTML = this.renderOnboarding();
    } else {
      app.innerHTML = this.renderMain();
    }

    if (this.state.modalOpen) {
      app.innerHTML += this.renderModal();
    }

    this.attachEvents();
    
    // Initialize charts after DOM is ready
    setTimeout(() => this.initCharts(), 0);
  },

  renderOnboarding() {
    const step = this.onboardingSteps[this.state.onboardingStep];
    const isLastStep = this.state.onboardingStep === this.onboardingSteps.length - 1;

    return `
      <div class="onboarding">
        <div class="onboarding-progress safe-top">
          ${this.onboardingSteps.map((_, i) => `
            <div class="progress-bar">
              <div class="progress-fill gradient-primary ${i <= this.state.onboardingStep ? 'active' : ''}"></div>
            </div>
          `).join('')}
        </div>

        <div class="onboarding-content">
          <div class="onboarding-icon ${step.gradient ? 'gradient gradient-primary' : ''}">
            ${this.icons[step.icon]}
          </div>
          <h1 class="onboarding-title">${step.title}</h1>
          <p class="onboarding-description">${step.description}</p>
        </div>

        <div class="onboarding-actions safe-bottom">
          <button class="btn-primary gradient-primary glow" id="onboarding-next">
            ${isLastStep ? `${this.icons.check} Começar` : `Continuar ${this.icons.arrowRight}`}
          </button>
          ${!isLastStep ? '<button class="btn-skip" id="onboarding-skip">Pular</button>' : ''}
        </div>
      </div>
    `;
  },

  renderMain() {
    return `
      <div class="main-container">
        ${this.renderCurrentPage()}
        ${this.renderBottomNav()}
      </div>
    `;
  },

  renderCurrentPage() {
    switch (this.state.activeTab) {
      case 'dashboard': return this.renderDashboard();
      case 'files': return this.renderFiles();
      case 'autoclean': return this.renderAutoclean();
      case 'stats': return this.renderStats();
      case 'settings': return this.renderSettings();
      default: return this.renderDashboard();
    }
  },

  renderDashboard() {
    return `
      <div class="page safe-top">
        <div class="header">
          <div class="header-logo gradient-primary" style="font-size: 1.5rem;">📱</div>
          <div>
            <h1 class="header-title">ScreenFlow</h1>
            <p class="header-subtitle">Tudo organizado automaticamente</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card gradient gradient-primary glow card-glow">
            <div class="stat-card-overlay"></div>
            <div class="stat-card-content">
              <div class="stat-icon-wrapper">${this.icons['folder-check']}</div>
              <p class="stat-label">Arquivos Organizados</p>
              <p class="stat-value">1,234</p>
              <p class="stat-subtext">Este mês</p>
            </div>
          </div>
          <div class="stat-card card-glow">
            <div class="stat-card-content">
              <div class="stat-icon-wrapper">${this.icons.hardDrive}</div>
              <p class="stat-label">Espaço Economizado</p>
              <p class="stat-value">4.2 GB</p>
              <p class="stat-subtext">+800 MB hoje</p>
            </div>
          </div>
          <div class="stat-card card-glow">
            <div class="stat-card-content">
              <div class="stat-icon-wrapper">${this.icons.clock}</div>
              <p class="stat-label">Última Limpeza</p>
              <p class="stat-value">2h atrás</p>
              <p class="stat-subtext">Automática</p>
            </div>
          </div>
          <div class="stat-card card-glow">
            <div class="stat-card-content">
              <div class="stat-icon-wrapper">${this.icons.sparkles}</div>
              <p class="stat-label">Taxa de Automação</p>
              <p class="stat-value">98%</p>
              <p class="stat-subtext">Excelente!</p>
            </div>
          </div>
        </div>

        <div class="section-title">Ações Rápidas</div>
        <div class="quick-actions">
          <button class="quick-action-btn blue" data-process="screenshots">
            <div class="quick-action-icon">${this.icons.camera}</div>
            <span class="quick-action-label">Organizar capturas</span>
          </button>
          <button class="quick-action-btn purple" data-process="recordings">
            <div class="quick-action-icon">${this.icons.video}</div>
            <span class="quick-action-label">Organizar gravações</span>
          </button>
          <button class="quick-action-btn green" data-process="cleanup">
            <div class="quick-action-icon">${this.icons.sparkles}</div>
            <span class="quick-action-label">Executar limpeza</span>
          </button>
        </div>

        <div class="apps-header">
          <h2 class="apps-title">Apps com Mais Capturas</h2>
          <button class="apps-link">Ver todos</button>
        </div>

        <div class="apps-list">
          ${this.topApps.map(app => `
            <div class="app-card card-glow">
              <div class="app-icon" style="background-color: ${app.color}20">${app.icon}</div>
              <div class="app-info">
                <p class="app-name">${app.name}</p>
                <p class="app-details">${app.count} arquivos • ${app.size}</p>
              </div>
              <div class="app-indicator" style="background-color: ${app.color}"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderFiles() {
    const filteredFolders = this.state.folders.filter(folder => {
      if (this.state.folderFilter === 'favorites' && !folder.isFavorite) return false;
      if (this.state.mediaFilter === 'screenshots' && folder.screenshotCount === 0) return false;
      if (this.state.mediaFilter === 'recordings' && folder.recordingCount === 0) return false;
      return true;
    });

    const totalCaptures = filteredFolders.reduce((sum, folder) => 
      sum + (this.state.mediaFilter === 'screenshots' ? folder.screenshotCount : folder.recordingCount), 0
    );

    return `
      <div class="page safe-top">
        <div class="page-header">
          <div class="files-header-row">
            <h1 class="page-title">Apps</h1>
            <div class="files-counters">
              <span>${this.icons.folder} ${filteredFolders.length}</span>
              <span>${this.state.mediaFilter === 'screenshots' ? this.icons.image : this.icons.video} ${totalCaptures}</span>
            </div>
          </div>
        </div>

        <div class="search-wrapper">
          <span class="search-icon">${this.icons.search}</span>
          <input type="text" class="search-input" placeholder="Buscar por app...">
          <button class="search-filter-btn">${this.icons.sliders}</button>
        </div>

        <div class="filters-row">
          <button class="filter-btn ${this.state.folderFilter === 'all' ? 'active gradient-primary glow' : ''}" data-filter="all">
            ${this.icons.folder} Todas
          </button>
          <button class="filter-btn ${this.state.folderFilter === 'favorites' ? 'active gradient-primary glow' : ''}" data-filter="favorites">
            ${this.icons.star} Favoritas
          </button>
          <div class="media-toggle">
            <button class="media-toggle-btn ${this.state.mediaFilter === 'screenshots' ? 'active' : ''}" data-media="screenshots">
              ${this.icons.image}
            </button>
            <button class="media-toggle-btn ${this.state.mediaFilter === 'recordings' ? 'active' : ''}" data-media="recordings">
              ${this.icons.video}
            </button>
          </div>
        </div>

        ${filteredFolders.length > 0 ? `
          <div class="folders-grid">
            ${filteredFolders.map(folder => {
              const count = this.state.mediaFilter === 'screenshots' ? folder.screenshotCount : folder.recordingCount;
              const label = this.state.mediaFilter === 'screenshots' 
                ? (count === 1 ? 'captura' : 'capturas')
                : (count === 1 ? 'gravação' : 'gravações');
              return `
                <div class="folder-card card-glow">
                  <div class="folder-preview">
                    <div class="folder-icon-wrapper">
                      ${this.icons.folder}
                      <span class="folder-emoji">${folder.appIcon}</span>
                    </div>
                    <div class="folder-badge glass">
                      ${this.state.mediaFilter === 'screenshots' ? this.icons.image : this.icons.video}
                      <span>${count} ${label}</span>
                    </div>
                    ${folder.isFavorite ? `<div class="folder-favorite">${this.icons.star}</div>` : ''}
                  </div>
                  <div class="folder-info">
                    <div class="folder-info-row">
                      <div class="folder-info-left">
                        <span>${folder.appIcon}</span>
                        <div>
                          <p class="folder-app-name">${folder.app}</p>
                          <p class="folder-updated">${folder.lastUpdated}</p>
                        </div>
                      </div>
                      <button class="folder-menu-btn">${this.icons.moreVertical}</button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-icon">${this.icons.folder}</div>
            <p class="empty-title">Nenhuma pasta encontrada</p>
            <p class="empty-text">${this.state.mediaFilter === 'recordings' ? 'Nenhum app com gravações' : 'Tente ajustar os filtros'}</p>
          </div>
        `}
      </div>
    `;
  },

  renderAutoclean() {
    const enabledCount = this.state.autocleanApps.filter(app => app.enabled).length;
    const dayOptions = [7, 14, 30, 60, 90];

    return `
      <div class="page safe-top">
        <div class="autoclean-header">
          <div class="autoclean-icon gradient-primary">${this.icons.trash}</div>
          <div>
            <h1 class="header-title">Auto Clean</h1>
            <p class="header-subtitle">${enabledCount} apps com limpeza automática</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-content">
            ${this.icons.clock}
            <div>
              <p class="info-card-title">Como funciona?</p>
              <p class="info-card-text">Configure o prazo de dias para cada app. Após esse período, as capturas serão automaticamente removidas para liberar espaço.</p>
            </div>
          </div>
        </div>

        <div class="autoclean-list">
          ${this.state.autocleanApps.map(app => `
            <div class="autoclean-item ${app.enabled ? 'enabled' : ''}" data-app-id="${app.id}">
              <div class="autoclean-item-header">
                <div class="autoclean-item-info">
                  <span>${app.appIcon}</span>
                  <span>${app.app}</span>
                </div>
                <div class="switch ${app.enabled ? 'active' : ''}" data-toggle="${app.id}">
                  <div class="switch-thumb"></div>
                </div>
              </div>
              ${app.enabled ? `
                <div class="autoclean-days">
                  <p class="autoclean-days-label">Remover após:</p>
                  <div class="autoclean-days-options">
                    ${dayOptions.map(days => `
                      <button class="days-btn ${app.days === days ? 'active gradient-primary' : ''}" data-app="${app.id}" data-days="${days}">
                        ${days} dias
                      </button>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderStats() {
    return `
      <div class="page safe-top">
        <div class="page-header">
          <h1 class="page-title">Estatísticas</h1>
          <p class="page-subtitle">Acompanhe seu uso e economia</p>
        </div>

        <div class="period-selector">
          ${['7 dias', '30 dias', '3 meses', '1 ano'].map((period, i) => `
            <button class="period-btn ${i === 0 ? 'active gradient-primary glow' : ''}">${period}</button>
          `).join('')}
        </div>

        <div class="chart-card card-glow">
          <div class="chart-header">
            ${this.icons.trendingUp}
            <h3 class="chart-title">Capturas por Dia</h3>
          </div>
          <div class="chart-container">
            <canvas id="weeklyChart"></canvas>
          </div>
        </div>

        <div class="charts-row">
          <div class="chart-card-small card-glow">
            <div class="chart-header-small">
              <h4 class="chart-title-small">Por App</h4>
            </div>
            <div class="chart-container-small">
              <canvas id="appsChart"></canvas>
            </div>
          </div>
          <div class="chart-card-small card-glow">
            <div class="chart-header-small">
              <h4 class="chart-title-small">Espaço</h4>
            </div>
            <div class="chart-container-small">
              <canvas id="storageChart"></canvas>
            </div>
          </div>
        </div>

        <div class="summary-grid">
          <div class="summary-card card-glow">
            <div class="summary-icon success">${this.icons.trash}</div>
            <p class="summary-value">847</p>
            <p class="summary-label">Arquivos limpos</p>
          </div>
          <div class="summary-card card-glow">
            <div class="summary-icon primary">${this.icons['folder-check']}</div>
            <p class="summary-value">1,456</p>
            <p class="summary-label">Organizados</p>
          </div>
        </div>

        <div class="activity-card card-glow">
          <div class="activity-header">
            ${this.icons.calendar}
            <h3 class="activity-title">Atividade Recente</h3>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <span class="activity-item-icon">🧹</span>
              <div class="activity-item-content">
                <p class="activity-item-action">Limpeza automática</p>
                <p class="activity-item-detail">156 arquivos removidos</p>
              </div>
              <span class="activity-item-time">2h atrás</span>
            </div>
            <div class="activity-item">
              <span class="activity-item-icon">📁</span>
              <div class="activity-item-content">
                <p class="activity-item-action">Organização</p>
                <p class="activity-item-detail">34 screenshots do Instagram</p>
              </div>
              <span class="activity-item-time">5h atrás</span>
            </div>
            <div class="activity-item">
              <span class="activity-item-icon">☁️</span>
              <div class="activity-item-content">
                <p class="activity-item-action">Backup completo</p>
                <p class="activity-item-detail">2.3 GB sincronizados</p>
              </div>
              <span class="activity-item-time">1 dia atrás</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initCharts() {
    if (this.state.activeTab !== 'stats') return;

    // Destroy existing charts
    if (this.charts) {
      Object.values(this.charts).forEach(chart => chart?.destroy());
    }
    this.charts = {};

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Weekly Bar Chart
    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
      this.charts.weekly = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: this.weeklyData.map(d => d.day),
          datasets: [{
            data: this.weeklyData.map(d => d.value),
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return 'hsl(199, 89%, 48%)';
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'hsl(199, 89%, 48%)');
              gradient.addColorStop(1, 'hsl(265, 89%, 60%)');
              return gradient;
            },
            borderRadius: 8,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? 'hsl(222, 47%, 12%)' : 'hsl(0, 0%, 100%)',
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (context) => `${context.raw} capturas`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Inter', size: 11 } }
            }
          }
        }
      });
    }

    // Doughnut Chart - Apps
    const appsCtx = document.getElementById('appsChart');
    if (appsCtx) {
      this.charts.apps = new Chart(appsCtx, {
        type: 'doughnut',
        data: {
          labels: this.topApps.map(a => a.name),
          datasets: [{
            data: this.topApps.map(a => a.count),
            backgroundColor: this.topApps.map(a => a.color),
            borderWidth: 0,
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? 'hsl(222, 47%, 12%)' : 'hsl(0, 0%, 100%)',
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (context) => `${context.label}: ${context.raw} arquivos`
              }
            }
          }
        }
      });
    }

    // Line Chart - Storage
    const storageCtx = document.getElementById('storageChart');
    if (storageCtx) {
      const storageData = [2.1, 2.4, 2.8, 3.2, 2.9, 2.5, 2.3];
      this.charts.storage = new Chart(storageCtx, {
        type: 'line',
        data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [{
            data: storageData,
            borderColor: 'hsl(142, 76%, 45%)',
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return 'transparent';
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'hsla(142, 76%, 45%, 0)');
              gradient.addColorStop(1, 'hsla(142, 76%, 45%, 0.3)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'hsl(142, 76%, 45%)',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? 'hsl(222, 47%, 12%)' : 'hsl(0, 0%, 100%)',
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (context) => `${context.raw} GB usado`
              }
            }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
    }
  },

  renderSettings() {
    return `
      <div class="page safe-top">
        <div class="page-header">
          <h1 class="page-title">Configurações</h1>
          <p class="page-subtitle">Personalize sua experiência</p>
        </div>

        <div class="settings-section">
          <p class="section-title">Tema</p>
          <div class="settings-card card-glow">
            <div class="settings-card-content">
              <div class="theme-grid">
                <button class="theme-btn ${this.state.theme === 'light' ? 'active gradient-primary glow' : ''}" data-theme="light">
                  ${this.icons.sun}
                  Claro
                </button>
                <button class="theme-btn ${this.state.theme === 'dark' ? 'active gradient-primary glow' : ''}" data-theme="dark">
                  ${this.icons.moon}
                  Escuro
                </button>
                <button class="theme-btn ${this.state.theme === 'system' ? 'active gradient-primary glow' : ''}" data-theme="system">
                  ${this.icons.monitor}
                  Sistema
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <p class="section-title">Automação</p>
          <div class="settings-card card-glow">
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon primary">${this.icons['folder-sync']}</div>
                <div>
                  <p class="settings-item-title">Organização Automática</p>
                  <p class="settings-item-subtitle">Mover arquivos automaticamente</p>
                </div>
              </div>
              <div class="switch ${this.state.autoOrganize ? 'active' : ''}" data-setting="autoOrganize">
                <div class="switch-thumb"></div>
              </div>
            </div>
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon accent">${this.icons.trash}</div>
                <div>
                  <p class="settings-item-title">Auto Limpeza</p>
                  <p class="settings-item-subtitle">Remover arquivos antigos</p>
                </div>
              </div>
              <div class="switch ${this.state.autoCleanup ? 'active' : ''}" data-setting="autoCleanup">
                <div class="switch-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <p class="section-title">Outros</p>
          <div class="settings-card card-glow">
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon primary">${this.icons.sparkles}</div>
                <div>
                  <p class="settings-item-title">Animações</p>
                  <p class="settings-item-subtitle">Efeitos visuais e transições</p>
                </div>
              </div>
              <div class="switch ${this.state.animationsEnabled ? 'active' : ''}" data-setting="animationsEnabled">
                <div class="switch-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <p class="section-title">Notificações</p>
          <div class="settings-card card-glow">
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon warning">${this.icons.bell}</div>
                <div>
                  <p class="settings-item-title">Notificações</p>
                  <p class="settings-item-subtitle">Receber alertas de limpeza</p>
                </div>
              </div>
              <div class="switch ${this.state.notifications ? 'active' : ''}" data-setting="notifications">
                <div class="switch-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <button class="reset-btn" id="reset-settings">
            ${this.icons.rotateCcw}
            Restaurar Configurações Padrão
          </button>
        </div>

        <p class="version-text">ScreenFlow v1.0.0</p>
      </div>
    `;
  },

  renderBottomNav() {
    const tabs = [
      { id: 'dashboard', icon: 'home', label: 'Início' },
      { id: 'files', icon: 'folder', label: 'Apps' },
      { id: 'autoclean', icon: 'trash', label: 'Auto Clean' },
      { id: 'stats', icon: 'barChart', label: 'Stats' },
      { id: 'settings', icon: 'settings', label: 'Config' }
    ];

    return `
      <nav class="bottom-nav glass safe-bottom">
        <div class="bottom-nav-inner">
          ${tabs.map(tab => `
            <button class="nav-btn ${this.state.activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
              <div class="nav-bg gradient-primary"></div>
              ${this.icons[tab.icon]}
              <span>${tab.label}</span>
            </button>
          `).join('')}
        </div>
      </nav>
    `;
  },

  renderModal() {
    const config = this.processConfigs[this.state.processType];
    const totalSteps = config.steps.length;
    const progress = this.state.processComplete ? 100 : ((this.state.processStep + 1) / totalSteps) * 100;
    const currentStepLabel = this.state.processStep < totalSteps 
      ? config.steps[this.state.processStep].title 
      : 'Concluído';

    const borderColorMap = {
      primary: 'hsl(var(--primary))',
      accent: 'hsl(var(--accent))',
      success: 'hsl(var(--success))'
    };

    const bgColorMap = {
      primary: 'hsl(var(--primary) / 0.2)',
      accent: 'hsl(var(--accent) / 0.2)',
      success: 'hsl(var(--success) / 0.2)'
    };

    const textColorMap = {
      primary: 'hsl(var(--primary))',
      accent: 'hsl(var(--accent))',
      success: 'hsl(var(--success))'
    };

    return `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">${config.title}</h2>
          </div>

          <div class="modal-progress">
            <div class="progress-track">
              <div class="progress-fill-bar gradient-primary" style="width: ${progress}%"></div>
            </div>
            <div class="progress-info">
              <span>${currentStepLabel}</span>
              <span>${Math.round(progress)}%</span>
            </div>
          </div>

          <div class="modal-steps">
            ${config.steps.map((step, index) => {
              const isActive = index === this.state.processStep && !this.state.processComplete;
              const isDone = index < this.state.processStep || this.state.processComplete;
              
              return `
                <div class="step-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}" style="${isActive ? `border-color: ${borderColorMap[config.colorClass]}` : ''}">
                  <div class="step-item-content">
                    <div class="step-icon" style="background-color: ${isActive ? bgColorMap[config.colorClass] : isDone ? 'hsl(var(--success) / 0.2)' : 'hsl(var(--muted))'}">
                      ${isDone && !isActive 
                        ? `<span style="color: hsl(var(--success))">${this.icons.check}</span>`
                        : `<span style="color: ${isActive ? textColorMap[config.colorClass] : 'hsl(var(--muted-foreground))'}">${this.icons.download}</span>`
                      }
                    </div>
                    <div class="step-info">
                      <h4 class="step-title">${step.title}</h4>
                      <p class="step-subtitle">${step.subtitle}</p>
                    </div>
                  </div>
                  ${isActive ? `<div class="step-pulse" style="border-color: ${borderColorMap[config.colorClass]}"></div>` : ''}
                </div>
              `;
            }).join('')}
          </div>

          ${this.state.processComplete ? `
            <div class="modal-complete">
              <div class="complete-card">
                <div class="complete-icon">${this.icons.check}</div>
                <p class="complete-title">Processo Concluído!</p>
                <p class="complete-text">
                  <span class="complete-value">${config.result.value}</span> ${config.result.label}
                </p>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  attachEvents() {
    document.getElementById('onboarding-next')?.addEventListener('click', () => {
      if (this.state.onboardingStep < this.onboardingSteps.length - 1) {
        this.state.onboardingStep++;
        this.render();
      } else {
        this.completeOnboarding();
      }
    });

    document.getElementById('onboarding-skip')?.addEventListener('click', () => {
      this.completeOnboarding();
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.activeTab = btn.dataset.tab;
        this.render();
      });
    });

    document.querySelectorAll('[data-process]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openProcess(btn.dataset.process);
      });
    });

    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') {
        this.closeModal();
      }
    });

    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.folderFilter = btn.dataset.filter;
        this.render();
      });
    });

    document.querySelectorAll('[data-media]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.mediaFilter = btn.dataset.media;
        this.render();
      });
    });

    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.theme = btn.dataset.theme;
        this.applyTheme();
        this.render();
      });
    });

    document.querySelectorAll('[data-setting]').forEach(el => {
      el.addEventListener('click', () => {
        const setting = el.dataset.setting;
        this.state[setting] = !this.state[setting];
        if (setting === 'animationsEnabled') {
          localStorage.setItem('screenflow-animations-enabled', String(this.state.animationsEnabled));
        }
        this.render();
      });
    });

    document.querySelectorAll('[data-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.toggle;
        this.state.autocleanApps = this.state.autocleanApps.map(app => 
          app.id === id ? { ...app, enabled: !app.enabled } : app
        );
        this.render();
      });
    });

    document.querySelectorAll('[data-days]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.app;
        const days = parseInt(btn.dataset.days);
        this.state.autocleanApps = this.state.autocleanApps.map(app => 
          app.id === id ? { ...app, days } : app
        );
        this.render();
      });
    });

    document.getElementById('reset-settings')?.addEventListener('click', () => {
      this.state.theme = 'system';
      this.state.animationsEnabled = true;
      this.state.autoOrganize = true;
      this.state.autoCleanup = true;
      this.state.notifications = true;
      localStorage.setItem('screenflow-animations-enabled', 'true');
      this.applyTheme();
      this.render();
    });
  },

  completeOnboarding() {
    localStorage.setItem('screenflow-onboarded', 'true');
    this.state.showOnboarding = false;
    this.render();
  },

  openProcess(type) {
    this.state.processType = type;
    this.state.modalOpen = true;
    this.state.processStep = 0;
    this.state.processComplete = false;
    this.render();
    this.runProcess();
  },

  runProcess() {
    const config = this.processConfigs[this.state.processType];
    
    if (this.state.processStep >= config.steps.length) {
      this.state.processComplete = true;
      this.render();
      return;
    }

    const duration = config.steps[this.state.processStep].duration;
    
    setTimeout(() => {
      if (!this.state.modalOpen) return;
      this.state.processStep++;
      this.render();
      this.runProcess();
    }, duration);
  },

  closeModal() {
    this.state.modalOpen = false;
    this.state.processStep = 0;
    this.state.processComplete = false;
    this.render();
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());