// Lightweight i18n: English · Español · Français · Português
export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'pt', label: 'Português', short: 'PT' },
];

export const LOCALES = { en: 'en-US', es: 'es-CO', fr: 'fr-FR', pt: 'pt-BR' };

export const dict = {
  /* ───────────────────────────── ENGLISH ───────────────────────────── */
  en: {
    tagline: 'Clients and tasks, in one calm place.',
    nav: { dashboard: 'Dashboard', clients: 'Clients', tasks: 'Tasks', portal: 'Client portal', settings: 'Settings', menu: 'Menu', collapse: 'Collapse' },
    login: {
      kicker: 'Client workspace',
      title: 'Your clients. Your tasks. One calm place.',
      sub: 'Sign in to manage clients, track tasks and share progress through a polished client portal.',
      email: 'Email',
      password: 'Password',
      signin: 'Sign in',
      signingIn: 'Signing in…',
      demo: 'Explore the demo',
      or: 'or',
      hint: 'Demo mode — any credentials work.',
      made: 'Designed & built by',
      f1: 'Drag & drop task board',
      f2: 'Shareable client portal',
      f3: '4 languages · light & dark',
    },
    c: {
      search: 'Search', add: 'Add', save: 'Save', cancel: 'Cancel', delete: 'Delete', close: 'Close', all: 'All',
      today: 'Today', tomorrow: 'Tomorrow', overdue: 'Overdue', noDate: 'No date', you: 'You',
      name: 'Full name', email: 'Email', phone: 'Phone', company: 'Company', title: 'Title', client: 'Client',
      status: 'Status', priority: 'Priority', dueDate: 'Due date', value: 'Monthly value', industry: 'Industry',
      create: 'Create', saveChanges: 'Save changes', viewAll: 'View all', perMonth: '/mo', open: 'Open', done: 'Done',
      required: 'This field is required', language: 'Language', theme: 'Theme', logout: 'Sign out', notifications: 'Notifications',
      light: 'Light', dark: 'Dark', switchTheme: 'Switch theme', skip: 'Skip to content',
    },
    st: { active: 'Active', lead: 'Lead', paused: 'Paused' },
    ts: { todo: 'To do', doing: 'In progress', review: 'In review', done: 'Done' },
    pr: { high: 'High', medium: 'Medium', low: 'Low' },
    ind: { design: 'Design', tech: 'Technology', hospitality: 'Hospitality', sustainability: 'Sustainability', fitness: 'Fitness', food: 'Food & beverage', legal: 'Legal', beauty: 'Beauty' },
    dash: {
      morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
      sub: 'You have {n} tasks due in the next 7 days.',
      kpiRevenue: 'Monthly revenue', kpiClients: 'Active clients', kpiOpen: 'Open tasks', kpiRate: 'Completion rate',
      vs: 'vs last month', revenue: 'Revenue', revenueSub: 'Last 12 months', byStatus: 'Tasks by status',
      upcoming: 'Upcoming deadlines', activity: 'Recent activity', total: 'tasks', nothing: 'You are all caught up.',
    },
    act: {
      done: '{who} completed “{what}”',
      comment: '{who} commented on “{what}”',
      paid: '{who} paid invoice {what}',
      approved: '{who} approved “{what}”',
      created: '{who} created “{what}”',
      client: '{who} added client {what}',
    },
    cl: {
      title: 'Clients', sub: '{n} clients in your portfolio', new: 'New client', grid: 'Cards', table: 'Table',
      searchPh: 'Search by name, company or email…', details: 'Client details', tasks: 'Tasks', noTasks: 'No tasks for this client yet.',
      sendEmail: 'Email', call: 'Call', openPortal: 'Open portal', empty: 'No clients match your search.', newTask: 'New task',
      openTasks: 'open tasks', completed: 'completed', since: 'Client since',
    },
    tk: {
      title: 'Tasks', sub: 'Drag cards between columns to update their status.', new: 'New task', board: 'Board', list: 'List',
      allClients: 'All clients', empty: 'Drop a task here', editTitle: 'Edit task', newTitle: 'New task', moveLeft: 'Move back', moveRight: 'Move forward',
      none: 'No tasks match your filters.',
    },
    po: {
      title: 'Client portal', sub: 'A shareable space where clients follow progress and approve work.',
      banner: 'Preview mode — this is exactly what {client} sees.', previewAs: 'Preview as', welcome: 'Welcome back, {name}',
      welcomeSub: 'Here is the latest on your project.', progress: 'Project progress', complete: 'complete',
      milestones: 'Milestones', deliverables: 'Deliverables', approve: 'Approve', approved: 'Approved', awaiting: 'Awaiting approval',
      invoices: 'Invoices', paid: 'Paid', pending: 'Pending', messages: 'Messages', write: 'Write a message…', send: 'Send',
      invoice: 'Invoice', amount: 'Amount',
      ms: { m1: 'Kickoff', m2: 'Design approved', m3: 'Development', m4: 'Launch' },
      d: { d1: 'Brand style guide', d2: 'Website mockups', d3: 'Content calendar' },
      m: { m1: 'Hi! The first mockups are ready for your review.', m2: 'They look great — could we try a warmer palette on the hero?' },
    },
    se: {
      title: 'Settings', profile: 'Profile', role: 'Freelancer · Virtual assistant', appearance: 'Appearance', language: 'Language',
      themeSub: 'Choose how Meridian looks to you.', languageSub: 'The whole interface updates instantly.',
      data: 'Demo data', dataSub: 'Everything is stored in your browser only. Reset to restore the original sample data.', reset: 'Reset demo data',
      about: 'About this project', aboutText: 'Meridian is a portfolio project: a CRM dashboard with client management, a task board and a shareable client portal.',
      built: 'Built with',
    },
    cmd: {
      ph: 'Search clients, tasks, actions…', nav: 'Navigate', actions: 'Actions', clients: 'Clients', tasks: 'Tasks',
      newTask: 'Create a new task', newClient: 'Add a new client', theme: 'Toggle light / dark', noRes: 'No results found', close: 'close', select: 'select',
    },
    nt: { title: 'Notifications', n1: 'Valentina Ríos approved the website mockups.', n2: 'Invoice INV-2026-014 was paid by Faro Legal.', n3: '3 tasks are due this week.', time1: '12 min', time2: '2 h', time3: 'Today' },
    to: {
      taskCreated: 'Task created', taskUpdated: 'Task updated', taskDeleted: 'Task deleted', moved: 'Moved to “{status}”',
      clientCreated: 'Client added', approved: 'Deliverable approved', msg: 'Message sent', reset: 'Demo data restored', welcome: 'Welcome, {name}',
    },
  },

  /* ───────────────────────────── ESPAÑOL ───────────────────────────── */
  es: {
    tagline: 'Clientes y tareas, en un solo lugar tranquilo.',
    nav: { dashboard: 'Panel', clients: 'Clientes', tasks: 'Tareas', portal: 'Portal del cliente', settings: 'Ajustes', menu: 'Menú', collapse: 'Contraer' },
    login: {
      kicker: 'Espacio de clientes',
      title: 'Tus clientes. Tus tareas. Un solo lugar tranquilo.',
      sub: 'Inicia sesión para gestionar clientes, seguir tareas y compartir avances con un portal de cliente cuidado al detalle.',
      email: 'Correo electrónico',
      password: 'Contraseña',
      signin: 'Iniciar sesión',
      signingIn: 'Entrando…',
      demo: 'Explorar la demo',
      or: 'o',
      hint: 'Modo demo: cualquier credencial funciona.',
      made: 'Diseñado y desarrollado por',
      f1: 'Tablero de tareas con arrastrar y soltar',
      f2: 'Portal de cliente compartible',
      f3: '4 idiomas · claro y oscuro',
    },
    c: {
      search: 'Buscar', add: 'Añadir', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', close: 'Cerrar', all: 'Todos',
      today: 'Hoy', tomorrow: 'Mañana', overdue: 'Vencida', noDate: 'Sin fecha', you: 'Tú',
      name: 'Nombre completo', email: 'Correo', phone: 'Teléfono', company: 'Empresa', title: 'Título', client: 'Cliente',
      status: 'Estado', priority: 'Prioridad', dueDate: 'Fecha límite', value: 'Valor mensual', industry: 'Sector',
      create: 'Crear', saveChanges: 'Guardar cambios', viewAll: 'Ver todo', perMonth: '/mes', open: 'Abrir', done: 'Hecho',
      required: 'Este campo es obligatorio', language: 'Idioma', theme: 'Tema', logout: 'Cerrar sesión', notifications: 'Notificaciones',
      light: 'Claro', dark: 'Oscuro', switchTheme: 'Cambiar tema', skip: 'Saltar al contenido',
    },
    st: { active: 'Activo', lead: 'Prospecto', paused: 'En pausa' },
    ts: { todo: 'Por hacer', doing: 'En curso', review: 'En revisión', done: 'Hecho' },
    pr: { high: 'Alta', medium: 'Media', low: 'Baja' },
    ind: { design: 'Diseño', tech: 'Tecnología', hospitality: 'Hospitalidad', sustainability: 'Sostenibilidad', fitness: 'Fitness', food: 'Alimentos y bebidas', legal: 'Legal', beauty: 'Belleza' },
    dash: {
      morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas noches',
      sub: 'Tienes {n} tareas con vencimiento en los próximos 7 días.',
      kpiRevenue: 'Ingresos mensuales', kpiClients: 'Clientes activos', kpiOpen: 'Tareas abiertas', kpiRate: 'Tasa de finalización',
      vs: 'vs mes anterior', revenue: 'Ingresos', revenueSub: 'Últimos 12 meses', byStatus: 'Tareas por estado',
      upcoming: 'Próximos vencimientos', activity: 'Actividad reciente', total: 'tareas', nothing: 'Estás al día con todo.',
    },
    act: {
      done: '{who} completó “{what}”',
      comment: '{who} comentó en “{what}”',
      paid: '{who} pagó la factura {what}',
      approved: '{who} aprobó “{what}”',
      created: '{who} creó “{what}”',
      client: '{who} añadió al cliente {what}',
    },
    cl: {
      title: 'Clientes', sub: '{n} clientes en tu cartera', new: 'Nuevo cliente', grid: 'Tarjetas', table: 'Tabla',
      searchPh: 'Buscar por nombre, empresa o correo…', details: 'Detalle del cliente', tasks: 'Tareas', noTasks: 'Este cliente aún no tiene tareas.',
      sendEmail: 'Correo', call: 'Llamar', openPortal: 'Abrir portal', empty: 'Ningún cliente coincide con tu búsqueda.', newTask: 'Nueva tarea',
      openTasks: 'tareas abiertas', completed: 'completadas', since: 'Cliente desde',
    },
    tk: {
      title: 'Tareas', sub: 'Arrastra las tarjetas entre columnas para actualizar su estado.', new: 'Nueva tarea', board: 'Tablero', list: 'Lista',
      allClients: 'Todos los clientes', empty: 'Suelta una tarea aquí', editTitle: 'Editar tarea', newTitle: 'Nueva tarea', moveLeft: 'Mover atrás', moveRight: 'Mover adelante',
      none: 'Ninguna tarea coincide con los filtros.',
    },
    po: {
      title: 'Portal del cliente', sub: 'Un espacio compartible donde tus clientes siguen el avance y aprueban entregas.',
      banner: 'Modo vista previa: esto es exactamente lo que ve {client}.', previewAs: 'Ver como', welcome: 'Hola de nuevo, {name}',
      welcomeSub: 'Estas son las novedades de tu proyecto.', progress: 'Avance del proyecto', complete: 'completado',
      milestones: 'Hitos', deliverables: 'Entregables', approve: 'Aprobar', approved: 'Aprobado', awaiting: 'Pendiente de aprobación',
      invoices: 'Facturas', paid: 'Pagada', pending: 'Pendiente', messages: 'Mensajes', write: 'Escribe un mensaje…', send: 'Enviar',
      invoice: 'Factura', amount: 'Monto',
      ms: { m1: 'Inicio', m2: 'Diseño aprobado', m3: 'Desarrollo', m4: 'Lanzamiento' },
      d: { d1: 'Guía de estilo de marca', d2: 'Maquetas del sitio web', d3: 'Calendario de contenidos' },
      m: { m1: '¡Hola! Las primeras maquetas están listas para tu revisión.', m2: 'Se ven genial. ¿Podemos probar una paleta más cálida en el hero?' },
    },
    se: {
      title: 'Ajustes', profile: 'Perfil', role: 'Freelancer · Asistente virtual', appearance: 'Apariencia', language: 'Idioma',
      themeSub: 'Elige cómo quieres ver Meridian.', languageSub: 'Toda la interfaz se actualiza al instante.',
      data: 'Datos de demostración', dataSub: 'Todo se guarda solo en tu navegador. Restablece para recuperar los datos de ejemplo originales.', reset: 'Restablecer datos',
      about: 'Sobre este proyecto', aboutText: 'Meridian es un proyecto de portafolio: un panel CRM con gestión de clientes, tablero de tareas y un portal de cliente compartible.',
      built: 'Construido con',
    },
    cmd: {
      ph: 'Busca clientes, tareas, acciones…', nav: 'Navegar', actions: 'Acciones', clients: 'Clientes', tasks: 'Tareas',
      newTask: 'Crear una tarea nueva', newClient: 'Añadir un cliente nuevo', theme: 'Alternar claro / oscuro', noRes: 'Sin resultados', close: 'cerrar', select: 'seleccionar',
    },
    nt: { title: 'Notificaciones', n1: 'Valentina Ríos aprobó las maquetas del sitio web.', n2: 'Faro Legal pagó la factura INV-2026-014.', n3: 'Tienes 3 tareas que vencen esta semana.', time1: '12 min', time2: '2 h', time3: 'Hoy' },
    to: {
      taskCreated: 'Tarea creada', taskUpdated: 'Tarea actualizada', taskDeleted: 'Tarea eliminada', moved: 'Movida a “{status}”',
      clientCreated: 'Cliente añadido', approved: 'Entregable aprobado', msg: 'Mensaje enviado', reset: 'Datos de demo restaurados', welcome: 'Bienvenida, {name}',
    },
  },

  /* ───────────────────────────── FRANÇAIS ───────────────────────────── */
  fr: {
    tagline: 'Clients et tâches, réunis en un seul endroit serein.',
    nav: { dashboard: 'Tableau de bord', clients: 'Clients', tasks: 'Tâches', portal: 'Portail client', settings: 'Réglages', menu: 'Menu', collapse: 'Réduire' },
    login: {
      kicker: 'Espace clients',
      title: 'Vos clients. Vos tâches. Un seul endroit serein.',
      sub: 'Connectez-vous pour gérer vos clients, suivre vos tâches et partager l’avancement grâce à un portail client soigné.',
      email: 'E-mail',
      password: 'Mot de passe',
      signin: 'Se connecter',
      signingIn: 'Connexion…',
      demo: 'Explorer la démo',
      or: 'ou',
      hint: 'Mode démo : tous les identifiants fonctionnent.',
      made: 'Conçu et développé par',
      f1: 'Tableau de tâches en glisser-déposer',
      f2: 'Portail client partageable',
      f3: '4 langues · clair et sombre',
    },
    c: {
      search: 'Rechercher', add: 'Ajouter', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', close: 'Fermer', all: 'Tous',
      today: 'Aujourd’hui', tomorrow: 'Demain', overdue: 'En retard', noDate: 'Sans date', you: 'Vous',
      name: 'Nom complet', email: 'E-mail', phone: 'Téléphone', company: 'Entreprise', title: 'Titre', client: 'Client',
      status: 'Statut', priority: 'Priorité', dueDate: 'Échéance', value: 'Valeur mensuelle', industry: 'Secteur',
      create: 'Créer', saveChanges: 'Enregistrer les modifications', viewAll: 'Tout voir', perMonth: '/mois', open: 'Ouvrir', done: 'Terminé',
      required: 'Ce champ est obligatoire', language: 'Langue', theme: 'Thème', logout: 'Se déconnecter', notifications: 'Notifications',
      light: 'Clair', dark: 'Sombre', switchTheme: 'Changer de thème', skip: 'Aller au contenu',
    },
    st: { active: 'Actif', lead: 'Prospect', paused: 'En pause' },
    ts: { todo: 'À faire', doing: 'En cours', review: 'En revue', done: 'Terminé' },
    pr: { high: 'Haute', medium: 'Moyenne', low: 'Basse' },
    ind: { design: 'Design', tech: 'Technologie', hospitality: 'Hôtellerie', sustainability: 'Durabilité', fitness: 'Fitness', food: 'Restauration', legal: 'Juridique', beauty: 'Beauté' },
    dash: {
      morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir',
      sub: 'Vous avez {n} tâches à rendre dans les 7 prochains jours.',
      kpiRevenue: 'Revenus mensuels', kpiClients: 'Clients actifs', kpiOpen: 'Tâches ouvertes', kpiRate: 'Taux d’achèvement',
      vs: 'vs mois dernier', revenue: 'Revenus', revenueSub: '12 derniers mois', byStatus: 'Tâches par statut',
      upcoming: 'Prochaines échéances', activity: 'Activité récente', total: 'tâches', nothing: 'Tout est à jour.',
    },
    act: {
      done: '{who} a terminé « {what} »',
      comment: '{who} a commenté « {what} »',
      paid: '{who} a payé la facture {what}',
      approved: '{who} a approuvé « {what} »',
      created: '{who} a créé « {what} »',
      client: '{who} a ajouté le client {what}',
    },
    cl: {
      title: 'Clients', sub: '{n} clients dans votre portefeuille', new: 'Nouveau client', grid: 'Cartes', table: 'Tableau',
      searchPh: 'Rechercher par nom, entreprise ou e-mail…', details: 'Fiche client', tasks: 'Tâches', noTasks: 'Aucune tâche pour ce client.',
      sendEmail: 'E-mail', call: 'Appeler', openPortal: 'Ouvrir le portail', empty: 'Aucun client ne correspond à votre recherche.', newTask: 'Nouvelle tâche',
      openTasks: 'tâches ouvertes', completed: 'terminées', since: 'Client depuis',
    },
    tk: {
      title: 'Tâches', sub: 'Faites glisser les cartes entre les colonnes pour changer leur statut.', new: 'Nouvelle tâche', board: 'Tableau', list: 'Liste',
      allClients: 'Tous les clients', empty: 'Déposez une tâche ici', editTitle: 'Modifier la tâche', newTitle: 'Nouvelle tâche', moveLeft: 'Reculer', moveRight: 'Avancer',
      none: 'Aucune tâche ne correspond aux filtres.',
    },
    po: {
      title: 'Portail client', sub: 'Un espace partageable où vos clients suivent l’avancement et valident les livrables.',
      banner: 'Mode aperçu : voici exactement ce que voit {client}.', previewAs: 'Aperçu en tant que', welcome: 'Bon retour, {name}',
      welcomeSub: 'Voici les dernières nouvelles de votre projet.', progress: 'Avancement du projet', complete: 'terminé',
      milestones: 'Jalons', deliverables: 'Livrables', approve: 'Valider', approved: 'Validé', awaiting: 'En attente de validation',
      invoices: 'Factures', paid: 'Payée', pending: 'En attente', messages: 'Messages', write: 'Écrire un message…', send: 'Envoyer',
      invoice: 'Facture', amount: 'Montant',
      ms: { m1: 'Lancement', m2: 'Design validé', m3: 'Développement', m4: 'Mise en ligne' },
      d: { d1: 'Charte graphique', d2: 'Maquettes du site web', d3: 'Calendrier de contenus' },
      m: { m1: 'Bonjour ! Les premières maquettes sont prêtes pour votre relecture.', m2: 'Elles sont superbes — pourrait-on tester une palette plus chaude sur la bannière ?' },
    },
    se: {
      title: 'Réglages', profile: 'Profil', role: 'Freelance · Assistante virtuelle', appearance: 'Apparence', language: 'Langue',
      themeSub: 'Choisissez l’apparence de Meridian.', languageSub: 'Toute l’interface se met à jour instantanément.',
      data: 'Données de démonstration', dataSub: 'Tout est stocké uniquement dans votre navigateur. Réinitialisez pour retrouver les données d’exemple.', reset: 'Réinitialiser les données',
      about: 'À propos du projet', aboutText: 'Meridian est un projet de portfolio : un CRM avec gestion des clients, tableau de tâches et portail client partageable.',
      built: 'Construit avec',
    },
    cmd: {
      ph: 'Rechercher clients, tâches, actions…', nav: 'Navigation', actions: 'Actions', clients: 'Clients', tasks: 'Tâches',
      newTask: 'Créer une nouvelle tâche', newClient: 'Ajouter un nouveau client', theme: 'Basculer clair / sombre', noRes: 'Aucun résultat', close: 'fermer', select: 'sélectionner',
    },
    nt: { title: 'Notifications', n1: 'Valentina Ríos a validé les maquettes du site.', n2: 'Faro Legal a réglé la facture INV-2026-014.', n3: '3 tâches arrivent à échéance cette semaine.', time1: '12 min', time2: '2 h', time3: 'Aujourd’hui' },
    to: {
      taskCreated: 'Tâche créée', taskUpdated: 'Tâche mise à jour', taskDeleted: 'Tâche supprimée', moved: 'Déplacée vers « {status} »',
      clientCreated: 'Client ajouté', approved: 'Livrable validé', msg: 'Message envoyé', reset: 'Données de démo restaurées', welcome: 'Bienvenue, {name}',
    },
  },

  /* ───────────────────────────── PORTUGUÊS ───────────────────────────── */
  pt: {
    tagline: 'Clientes e tarefas, em um só lugar tranquilo.',
    nav: { dashboard: 'Painel', clients: 'Clientes', tasks: 'Tarefas', portal: 'Portal do cliente', settings: 'Configurações', menu: 'Menu', collapse: 'Recolher' },
    login: {
      kicker: 'Espaço de clientes',
      title: 'Seus clientes. Suas tarefas. Um só lugar tranquilo.',
      sub: 'Entre para gerenciar clientes, acompanhar tarefas e compartilhar o progresso com um portal do cliente caprichado.',
      email: 'E-mail',
      password: 'Senha',
      signin: 'Entrar',
      signingIn: 'Entrando…',
      demo: 'Explorar a demo',
      or: 'ou',
      hint: 'Modo demo: qualquer credencial funciona.',
      made: 'Desenhado e desenvolvido por',
      f1: 'Quadro de tarefas arrastar e soltar',
      f2: 'Portal do cliente compartilhável',
      f3: '4 idiomas · claro e escuro',
    },
    c: {
      search: 'Buscar', add: 'Adicionar', save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', close: 'Fechar', all: 'Todos',
      today: 'Hoje', tomorrow: 'Amanhã', overdue: 'Atrasada', noDate: 'Sem data', you: 'Você',
      name: 'Nome completo', email: 'E-mail', phone: 'Telefone', company: 'Empresa', title: 'Título', client: 'Cliente',
      status: 'Status', priority: 'Prioridade', dueDate: 'Prazo', value: 'Valor mensal', industry: 'Setor',
      create: 'Criar', saveChanges: 'Salvar alterações', viewAll: 'Ver tudo', perMonth: '/mês', open: 'Abrir', done: 'Concluído',
      required: 'Este campo é obrigatório', language: 'Idioma', theme: 'Tema', logout: 'Sair', notifications: 'Notificações',
      light: 'Claro', dark: 'Escuro', switchTheme: 'Alternar tema', skip: 'Ir para o conteúdo',
    },
    st: { active: 'Ativo', lead: 'Prospect', paused: 'Em pausa' },
    ts: { todo: 'A fazer', doing: 'Em andamento', review: 'Em revisão', done: 'Concluído' },
    pr: { high: 'Alta', medium: 'Média', low: 'Baixa' },
    ind: { design: 'Design', tech: 'Tecnologia', hospitality: 'Hospitalidade', sustainability: 'Sustentabilidade', fitness: 'Fitness', food: 'Alimentos e bebidas', legal: 'Jurídico', beauty: 'Beleza' },
    dash: {
      morning: 'Bom dia', afternoon: 'Boa tarde', evening: 'Boa noite',
      sub: 'Você tem {n} tarefas com prazo nos próximos 7 dias.',
      kpiRevenue: 'Receita mensal', kpiClients: 'Clientes ativos', kpiOpen: 'Tarefas abertas', kpiRate: 'Taxa de conclusão',
      vs: 'vs mês anterior', revenue: 'Receita', revenueSub: 'Últimos 12 meses', byStatus: 'Tarefas por status',
      upcoming: 'Próximos prazos', activity: 'Atividade recente', total: 'tarefas', nothing: 'Você está em dia com tudo.',
    },
    act: {
      done: '{who} concluiu “{what}”',
      comment: '{who} comentou em “{what}”',
      paid: '{who} pagou a fatura {what}',
      approved: '{who} aprovou “{what}”',
      created: '{who} criou “{what}”',
      client: '{who} adicionou o cliente {what}',
    },
    cl: {
      title: 'Clientes', sub: '{n} clientes na sua carteira', new: 'Novo cliente', grid: 'Cartões', table: 'Tabela',
      searchPh: 'Buscar por nome, empresa ou e-mail…', details: 'Detalhes do cliente', tasks: 'Tarefas', noTasks: 'Este cliente ainda não tem tarefas.',
      sendEmail: 'E-mail', call: 'Ligar', openPortal: 'Abrir portal', empty: 'Nenhum cliente corresponde à busca.', newTask: 'Nova tarefa',
      openTasks: 'tarefas abertas', completed: 'concluídas', since: 'Cliente desde',
    },
    tk: {
      title: 'Tarefas', sub: 'Arraste os cartões entre as colunas para atualizar o status.', new: 'Nova tarefa', board: 'Quadro', list: 'Lista',
      allClients: 'Todos os clientes', empty: 'Solte uma tarefa aqui', editTitle: 'Editar tarefa', newTitle: 'Nova tarefa', moveLeft: 'Voltar', moveRight: 'Avançar',
      none: 'Nenhuma tarefa corresponde aos filtros.',
    },
    po: {
      title: 'Portal do cliente', sub: 'Um espaço compartilhável onde os clientes acompanham o progresso e aprovam entregas.',
      banner: 'Modo de visualização: é exatamente isto que {client} vê.', previewAs: 'Ver como', welcome: 'Bem-vindo de volta, {name}',
      welcomeSub: 'Veja as novidades do seu projeto.', progress: 'Progresso do projeto', complete: 'concluído',
      milestones: 'Marcos', deliverables: 'Entregas', approve: 'Aprovar', approved: 'Aprovado', awaiting: 'Aguardando aprovação',
      invoices: 'Faturas', paid: 'Paga', pending: 'Pendente', messages: 'Mensagens', write: 'Escreva uma mensagem…', send: 'Enviar',
      invoice: 'Fatura', amount: 'Valor',
      ms: { m1: 'Início', m2: 'Design aprovado', m3: 'Desenvolvimento', m4: 'Lançamento' },
      d: { d1: 'Guia de estilo da marca', d2: 'Protótipos do site', d3: 'Calendário de conteúdo' },
      m: { m1: 'Olá! Os primeiros protótipos estão prontos para a sua revisão.', m2: 'Ficaram ótimos — podemos testar uma paleta mais quente no topo da página?' },
    },
    se: {
      title: 'Configurações', profile: 'Perfil', role: 'Freelancer · Assistente virtual', appearance: 'Aparência', language: 'Idioma',
      themeSub: 'Escolha como o Meridian aparece para você.', languageSub: 'Toda a interface é atualizada na hora.',
      data: 'Dados de demonstração', dataSub: 'Tudo fica salvo apenas no seu navegador. Redefina para restaurar os dados de exemplo.', reset: 'Redefinir dados',
      about: 'Sobre este projeto', aboutText: 'O Meridian é um projeto de portfólio: um CRM com gestão de clientes, quadro de tarefas e portal do cliente compartilhável.',
      built: 'Feito com',
    },
    cmd: {
      ph: 'Busque clientes, tarefas, ações…', nav: 'Navegar', actions: 'Ações', clients: 'Clientes', tasks: 'Tarefas',
      newTask: 'Criar uma nova tarefa', newClient: 'Adicionar um novo cliente', theme: 'Alternar claro / escuro', noRes: 'Nenhum resultado', close: 'fechar', select: 'selecionar',
    },
    nt: { title: 'Notificações', n1: 'Valentina Ríos aprovou os protótipos do site.', n2: 'A Faro Legal pagou a fatura INV-2026-014.', n3: '3 tarefas vencem esta semana.', time1: '12 min', time2: '2 h', time3: 'Hoje' },
    to: {
      taskCreated: 'Tarefa criada', taskUpdated: 'Tarefa atualizada', taskDeleted: 'Tarefa excluída', moved: 'Movida para “{status}”',
      clientCreated: 'Cliente adicionado', approved: 'Entrega aprovada', msg: 'Mensagem enviada', reset: 'Dados de demo restaurados', welcome: 'Bem-vinda, {name}',
    },
  },
};

// Seed content that should also follow the active language.
export const seedText = {
  en: { t1: 'Redesign landing page', t2: 'Set up email automation', t3: 'Monthly social media calendar', t4: 'Prepare invoice and report', t5: 'Customer inbox management', t6: 'Update product catalog', t7: 'Schedule discovery call', t8: 'Research competitors', t9: 'Newsletter design', t10: 'Migrate CRM contacts', t11: 'Proofread blog posts', t12: 'Quarterly performance report' },
  es: { t1: 'Rediseño de la landing page', t2: 'Configurar automatización de correos', t3: 'Calendario mensual de redes sociales', t4: 'Preparar factura e informe', t5: 'Gestión de la bandeja de clientes', t6: 'Actualizar catálogo de productos', t7: 'Agendar llamada de descubrimiento', t8: 'Investigación de la competencia', t9: 'Diseño de newsletter', t10: 'Migrar contactos del CRM', t11: 'Revisión de artículos del blog', t12: 'Informe trimestral de rendimiento' },
  fr: { t1: 'Refonte de la landing page', t2: 'Configurer l’automatisation des e-mails', t3: 'Calendrier mensuel des réseaux sociaux', t4: 'Préparer la facture et le rapport', t5: 'Gestion de la boîte de réception clients', t6: 'Mettre à jour le catalogue produits', t7: 'Planifier l’appel de découverte', t8: 'Étude de la concurrence', t9: 'Conception de la newsletter', t10: 'Migrer les contacts du CRM', t11: 'Relecture des articles de blog', t12: 'Rapport de performance trimestriel' },
  pt: { t1: 'Redesign da landing page', t2: 'Configurar automação de e-mails', t3: 'Calendário mensal de redes sociais', t4: 'Preparar fatura e relatório', t5: 'Gestão da caixa de entrada de clientes', t6: 'Atualizar catálogo de produtos', t7: 'Agendar chamada de descoberta', t8: 'Pesquisa de concorrência', t9: 'Design da newsletter', t10: 'Migrar contatos do CRM', t11: 'Revisão dos artigos do blog', t12: 'Relatório trimestral de desempenho' },
};

function lookup(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function translate(lang, key, vars) {
  let s = lookup(dict[lang], key);
  if (s === undefined) s = lookup(dict.en, key);
  if (s === undefined) return key;
  if (vars && typeof s === 'string') {
    s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
  }
  return s;
}

export function detectLang() {
  try {
    const n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.some((l) => l.code === n) ? n : 'en';
  } catch {
    return 'en';
  }
}
