/**
 * PORTFOLIO — script.js
 * Author: Abdelaziz BOUGRICH Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================
  // 1. THEME TOGGLE (Dark / Light Mode)
  // ==========================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Check system preference if no saved theme
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) {
      htmlElement.setAttribute('data-theme', 'light');
    }
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================================
  // 2. MOBILE NAVIGATION
  // ==========================================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  const toggleNav = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  };

  navToggle.addEventListener('click', toggleNav);

  // Close mobile menu when a link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleNav();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navToggle.contains(e.target) && 
        !navLinks.contains(e.target)) {
      toggleNav();
    }
  });

  // ==========================================================
  // 3. LANGUAGE SWITCHER & FULL i18n TRANSLATION ENGINE
  // ==========================================================
  const translations = {
    en: {
      // NAV
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      // HERO
      'hero.greeting': "Hello, I'm",
      'hero.role': 'Technical Sales Professional',
      'hero.tagline': '5+ years driving revenue through client relationships,<br />negotiation mastery &amp; CRM excellence.',
      'hero.cta_work': 'View My Work',
      'hero.cta_cv': 'Download CV',
      // ABOUT
      'about.label': 'Who I Am',
      'about.title': 'About Me',
      'about.lead': 'Motivated and results-oriented professional with <strong>over five years of experience</strong> in technical sales and customer service. I combine excellent communication and negotiation skills with solid expertise in sales management and store operations.',
      'about.body': 'I thrive in dynamic, fast-paced environments, consistently delivering dedication, creative problem-solving, and outstanding client support. Currently based in <strong>Bologna, Italy</strong>, and open to new opportunities across Europe and beyond.',
      'about.badge_available': '✦ Available Immediately',
      'about.badge_open': 'Open to Work',
      'about.info_location_label': 'Location',
      'about.info_location_value': 'Bologna, Italy',
      'about.info_email_label': 'Email',
      'about.info_phone_label': 'Phone',
      'about.stat_exp': 'Years Experience',
      'about.stat_lang': 'Languages Spoken',
      'about.stat_countries': 'Countries Worked',
      'about.stat_commit': 'Commitment',
      // EXPERIENCE
      'exp.label': 'Career Path',
      'exp.title': 'Work Experience',
      'exp.eglo_role': 'Technical Sales Representative',
      'exp.eglo_date': 'November 2019 — April 2025',
      'exp.eglo_b1': 'Spearheaded comprehensive sales management strategies and successfully expanded the active client portfolio across the Moroccan region through targeted B2B initiatives.',
      'exp.eglo_b2': 'Orchestrated high-stakes negotiations with major stakeholders, successfully closing key commercial contracts and securing long-term partnerships.',
      'exp.eglo_b3': 'Directed end-to-end after-sales service operations, quickly resolving technical issues to maintain exceptional customer satisfaction and retention rates.',
      'exp.eglo_b4': 'Diligently managed CRM databases to maintain accurate client records, actively tracking order pipelines to forecast revenue and ensure timely deliveries.',
      'exp.eglo_b5': 'Optimized inventory management and stock control processes, reducing discrepancies and ensuring a highly efficient product turnover rate.',
      'exp.bim_role': 'Store Associate / Cashier',
      'exp.bim_date': 'March 2018 — October 2018',
      'exp.bim_b1': 'Coordinated daily product receiving, executed dynamic store displays, and organized stock to maximize accessibility and visual appeal for customers.',
      'exp.bim_b2': 'Executed fast and precise cashiering operations, handling daily transactions securely while minimizing wait times during peak hours.',
      'exp.bim_b3': 'Provided proactive and consistent support to store visitors, addressing inquiries and resolving issues to enhance the overall shopping experience.',
      'exp.bim_b4': 'Conducted regular inventory audits and warehouse tracking to maintain optimal stock levels and prevent product shortages.',
      'exp.onee_role': 'Intern — Final Year Project',
      'exp.onee_date': 'March 2017',
      'exp.onee_b1': 'Assisted the finance team with comprehensive accounting management, ensuring accurate budget tracking and financial data entry.',
      'exp.onee_b2': 'Supported the purchasing department by coordinating with external suppliers to verify orders, delivery schedules, and invoicing details.',
      'exp.onee_b3': 'Streamlined inventory records and maintained detailed warehouse documentation to support transparent and efficient logistical operations.',
      'exp.tf_role': 'Accounting Intern',
      'exp.tf_date': 'July 2016',
      'exp.tf_b1': 'Facilitated the preparation of monthly financial reports and ensured the accurate registration of incoming and outgoing invoices.',
      'exp.tf_b2': 'Managed essential administrative documentation, improving the organization of physical and digital filings for quick retrieval and compliance.',
      // EDUCATION
      'edu.label': 'Academic Background',
      'edu.title': 'Education',
      'edu.ista_degree': 'Diploma in Business Management',
      'edu.ista_level': 'Bac+2 (Technical Diploma)',
      'edu.ista_school': 'ISTA — Specialized Institute of Applied Technology',
      'edu.ibnzohr_degree': "Bachelor's in English Studies",
      'edu.ibnzohr_level': 'Licence (Bac+3)',
      'edu.ibnzohr_school': 'University Ibn Zohr',
      'edu.bac_degree': 'High School Diploma',
      'edu.bac_level': 'Modern Literature (Baccalauréat)',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'What I Bring',
      'skills.title': 'Skills &amp; Languages',
      'skills.hard_title': 'Hard Skills',
      'skills.soft_title': 'Soft Skills',
      'skills.lang_section_title': 'Languages',
      'skills.crm': 'CRM Systems',
      'skills.tech_sales': 'Technical Sales',
      'skills.negotiation': 'Negotiation',
      'skills.inventory': 'Inventory Management',
      'skills.warehouse': 'Warehouse Management',
      'skills.accounting': 'Accounting &amp; Reporting',
      'skills.cashier': 'Cashiering Operations',
      'skills.order_tracking': 'Order Tracking',
      'skills.after_sales': 'After-Sales Service',
      'skills.driving': 'Driving Licence B',
      'skills.sales_mgmt': 'Sales Management',
      'skills.customer_svc': 'Customer Service Excellence',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Teamwork',
      'skills.problem_solving': 'Creative Problem Solving',
      'skills.persuasion': 'Persuasion',
      'skills.adaptability': 'Adaptability',
      // LANG CARDS
      'lang.arabic': 'Arabic',
      'lang.arabic_level': 'Native · C2',
      'lang.english': 'English',
      'lang.english_level': 'Professional · C1',
      'lang.french': 'French',
      'lang.french_level': 'Advanced · B2',
      'lang.italian': 'Italian',
      'lang.italian_level': 'Intermediate · B1',
      // CONTACT
      'contact.label': 'Get In Touch',
      'contact.title': 'Contact Me',
      'contact.subtitle': "I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open.",
      'contact.email_label': 'Email',
      'contact.phone_label': 'Phone',
      'contact.location_label': 'Location',
      'contact.location_value': 'Bologna, Italy',
      'contact.form_name': 'Full Name',
      'contact.form_name_ph': 'Your full name',
      'contact.form_email': 'Email Address',
      'contact.form_subject': 'Subject',
      'contact.form_subject_ph': "What's this about?",
      'contact.form_message': 'Message',
      'contact.form_message_ph': 'Tell me more...',
      'contact.form_send': 'Send Message',
      'contact.form_success': 'Thank you! Your message has been sent successfully.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. All rights reserved.',
      'footer.sub': 'Technical Sales Professional · Bologna, Italy',
    },

    fr: {
      // NAV
      'nav.about': 'À propos',
      'nav.experience': 'Expérience',
      'nav.education': 'Formation',
      'nav.skills': 'Compétences',
      'nav.contact': 'Contact',
      // HERO
      'hero.greeting': 'Bonjour, je suis',
      'hero.role': 'Commercial Technique',
      'hero.tagline': '5+ ans à générer du chiffre d\'affaires grâce aux relations clients,<br />à la maîtrise de la négociation &amp; à l\'excellence CRM.',
      'hero.cta_work': 'Voir mes réalisations',
      'hero.cta_cv': 'Télécharger le CV',
      // ABOUT
      'about.label': 'Qui je suis',
      'about.title': 'À propos de moi',
      'about.lead': 'Professionnel motivé et orienté résultats avec <strong>plus de cinq ans d\'expérience</strong> dans la vente technique et le service client. Je combine d\'excellentes compétences en communication et en négociation avec une solide expertise en gestion commerciale et en opérations de vente.',
      'about.body': 'Je m\'épanouis dans des environnements dynamiques, apportant constamment dévouement, résolution créative de problèmes et un excellent soutien client. Actuellement basé à <strong>Bologne, Italie</strong>, et ouvert aux nouvelles opportunités en Europe et au-delà.',
      'about.badge_available': '✦ Disponible immédiatement',
      'about.badge_open': 'Ouvert aux opportunités',
      'about.info_location_label': 'Localisation',
      'about.info_location_value': 'Bologne, Italie',
      'about.info_email_label': 'E-mail',
      'about.info_phone_label': 'Téléphone',
      'about.stat_exp': 'Ans d\'expérience',
      'about.stat_lang': 'Langues parlées',
      'about.stat_countries': 'Pays travaillés',
      'about.stat_commit': 'Engagement',
      // EXPERIENCE
      'exp.label': 'Parcours professionnel',
      'exp.title': 'Expériences professionnelles',
      'exp.eglo_role': 'Représentant commercial technique',
      'exp.eglo_date': 'Novembre 2019 — Avril 2025',
      'exp.eglo_b1': 'Dirigé des stratégies globales de gestion commerciale et étendu avec succès le portefeuille de clients actifs sur la région marocaine grâce à des initiatives B2B ciblées.',
      'exp.eglo_b2': 'Orchestré des négociations à fort enjeu avec des partenaires majeurs, concluant avec succès des contrats commerciaux clés et sécurisant des partenariats à long terme.',
      'exp.eglo_b3': 'Dirigé les opérations du service après-vente de bout en bout, résolvant rapidement les problèmes techniques pour maintenir des taux de satisfaction et de fidélisation exceptionnels.',
      'exp.eglo_b4': 'Géré rigoureusement les bases de données CRM pour maintenir des dossiers clients précis, assurant un suivi actif des pipelines de commandes pour prévoir les revenus et garantir des livraisons ponctuelles.',
      'exp.eglo_b5': 'Optimisé les processus de gestion des stocks et de contrôle d\'inventaire, réduisant les écarts et assurant un taux de rotation des produits hautement efficace.',
      'exp.bim_role': 'Employé de magasin / Caissier',
      'exp.bim_date': 'Mars 2018 — Octobre 2018',
      'exp.bim_b1': 'Coordonné la réception quotidienne des produits, organisé des présentations dynamiques en magasin et optimisé l\'organisation des stocks pour maximiser l\'accessibilité pour les clients.',
      'exp.bim_b2': 'Effectué des opérations de caisse rapides et précises, gérant les transactions quotidiennes en toute sécurité tout en minimisant les temps d\'attente lors des pics d\'affluence.',
      'exp.bim_b3': 'Fourni un soutien constant et proactif aux visiteurs du magasin, répondant aux demandes et résolvant les problèmes pour améliorer l\'expérience d\'achat globale.',
      'exp.bim_b4': 'Réalisé des audits d\'inventaire réguliers et assuré le suivi de l\'entrepôt pour maintenir des niveaux de stock optimaux et prévenir les ruptures de produits.',
      'exp.onee_role': 'Stagiaire — Projet de fin d\'études',
      'exp.onee_date': 'Mars 2017',
      'exp.onee_b1': 'Assisté l\'équipe financière dans la gestion comptable globale, garantissant un suivi budgétaire précis et une saisie rigoureuse des données financières.',
      'exp.onee_b2': 'Soutenu le département des achats en se coordonnant avec les fournisseurs externes pour vérifier les commandes, les calendriers de livraison et les détails de facturation.',
      'exp.onee_b3': 'Rationalisé les registres d\'inventaire et maintenu une documentation détaillée de l\'entrepôt pour soutenir des opérations logistiques transparentes et efficaces.',
      'exp.tf_role': 'Stagiaire en comptabilité',
      'exp.tf_date': 'Juillet 2016',
      'exp.tf_b1': 'Facilité la préparation des rapports financiers mensuels et assuré l\'enregistrement précis des factures entrantes et sortantes.',
      'exp.tf_b2': 'Géré la documentation administrative essentielle, améliorant l\'organisation des archives physiques et numériques pour une recherche rapide et garantir la conformité.',
      // EDUCATION
      'edu.label': 'Parcours académique',
      'edu.title': 'Formation',
      'edu.ista_degree': 'Diplôme en Gestion des Entreprises',
      'edu.ista_level': 'Bac+2 (Diplôme Technique)',
      'edu.ista_school': 'ISTA — Institut Spécialisé de Technologie Appliquée',
      'edu.ibnzohr_degree': 'Licence en Études Anglaises',
      'edu.ibnzohr_level': 'Licence (Bac+3)',
      'edu.ibnzohr_school': 'Université Ibn Zohr',
      'edu.bac_degree': 'Baccalauréat',
      'edu.bac_level': 'Littérature Moderne',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'Mes atouts',
      'skills.title': 'Compétences &amp; Langues',
      'skills.hard_title': 'Compétences techniques',
      'skills.soft_title': 'Compétences relationnelles',
      'skills.lang_section_title': 'Langues',
      'skills.crm': 'Systèmes CRM',
      'skills.tech_sales': 'Vente technique',
      'skills.negotiation': 'Négociation',
      'skills.inventory': 'Gestion des stocks',
      'skills.warehouse': 'Gestion d\'entrepôt',
      'skills.accounting': 'Comptabilité &amp; Reporting',
      'skills.cashier': 'Opérations de caisse',
      'skills.order_tracking': 'Suivi des commandes',
      'skills.after_sales': 'Service après-vente',
      'skills.driving': 'Permis de conduire B',
      'skills.sales_mgmt': 'Management commercial',
      'skills.customer_svc': 'Excellence du service client',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Travail en équipe',
      'skills.problem_solving': 'Résolution créative de problèmes',
      'skills.persuasion': 'Persuasion',
      'skills.adaptability': 'Adaptabilité',
      // LANG CARDS
      'lang.arabic': 'Arabe',
      'lang.arabic_level': 'Natif · C2',
      'lang.english': 'Anglais',
      'lang.english_level': 'Professionnel · C1',
      'lang.french': 'Français',
      'lang.french_level': 'Avancé · B2',
      'lang.italian': 'Italien',
      'lang.italian_level': 'Intermédiaire · B1',
      // CONTACT
      'contact.label': 'Me contacter',
      'contact.title': 'Contactez-moi',
      'contact.subtitle': 'Je suis actuellement ouvert à de nouvelles opportunités. Que vous ayez une question ou simplement envie de discuter, ma boîte mail est toujours ouverte.',
      'contact.email_label': 'E-mail',
      'contact.phone_label': 'Téléphone',
      'contact.location_label': 'Localisation',
      'contact.location_value': 'Bologne, Italie',
      'contact.form_name': 'Nom complet',
      'contact.form_name_ph': 'Votre nom complet',
      'contact.form_email': 'Adresse e-mail',
      'contact.form_subject': 'Sujet',
      'contact.form_subject_ph': 'De quoi s\'agit-il ?',
      'contact.form_message': 'Message',
      'contact.form_message_ph': 'Dites-m\'en plus...',
      'contact.form_send': 'Envoyer le message',
      'contact.form_success': 'Merci ! Votre message a été envoyé avec succès.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. Tous droits réservés.',
      'footer.sub': 'Commercial Technique · Bologne, Italie',
    },

    it: {
      // NAV
      'nav.about': 'Chi sono',
      'nav.experience': 'Esperienza',
      'nav.education': 'Formazione',
      'nav.skills': 'Competenze',
      'nav.contact': 'Contatti',
      // HERO
      'hero.greeting': 'Ciao, sono',
      'hero.role': 'Tecnico Commerciale',
      'hero.tagline': 'Oltre 5 anni a generare fatturato grazie alle relazioni con i clienti,<br />alla padronanza della negoziazione &amp; all\'eccellenza CRM.',
      'hero.cta_work': 'Vedi i miei lavori',
      'hero.cta_cv': 'Scarica il CV',
      // ABOUT
      'about.label': 'Chi sono',
      'about.title': 'Su di me',
      'about.lead': 'Professionista motivato e orientato ai risultati con <strong>oltre cinque anni di esperienza</strong> nelle vendite tecniche e nel servizio clienti. Combino eccellenti capacità comunicative e di negoziazione con una solida esperienza nella gestione delle vendite e nelle operazioni di negozio.',
      'about.body': 'Prosperare in ambienti dinamici e frenetici, offrendo costantemente dedizione, risoluzione creativa dei problemi e un supporto clienti eccezionale. Attualmente basato a <strong>Bologna, Italia</strong>, e aperto a nuove opportunità in Europa e oltre.',
      'about.badge_available': '✦ Disponibile immediatamente',
      'about.badge_open': 'Aperto alle opportunità',
      'about.info_location_label': 'Posizione',
      'about.info_location_value': 'Bologna, Italia',
      'about.info_email_label': 'Email',
      'about.info_phone_label': 'Telefono',
      'about.stat_exp': 'Anni di esperienza',
      'about.stat_lang': 'Lingue parlate',
      'about.stat_countries': 'Paesi lavorati',
      'about.stat_commit': 'Impegno',
      // EXPERIENCE
      'exp.label': 'Percorso professionale',
      'exp.title': 'Esperienza lavorativa',
      'exp.eglo_role': 'Rappresentante vendite tecnico',
      'exp.eglo_date': 'Novembre 2019 — Aprile 2025',
      'exp.eglo_b1': 'Guidato strategie di gestione delle vendite ad ampio raggio e ampliato con successo il portafoglio di clienti attivi nella regione marocchina attraverso iniziative B2B mirate.',
      'exp.eglo_b2': 'Orchestrato negoziazioni ad alto rischio con i principali stakeholder, concludendo con successo contratti commerciali chiave e garantendo partnership a lungo termine.',
      'exp.eglo_b3': 'Diretto le operazioni del servizio post-vendita end-to-end, risolvendo rapidamente i problemi tecnici per mantenere tassi eccezionali di soddisfazione e fidelizzazione dei clienti.',
      'exp.eglo_b4': 'Gestito diligentemente i database CRM per mantenere registri clienti accurati, tracciando attivamente le pipeline degli ordini per prevedere i ricavi e garantire consegne puntuali.',
      'exp.eglo_b5': 'Ottimizzato i processi di gestione dell\'inventario e controllo delle scorte, riducendo le discrepanze e garantendo un tasso di rotazione dei prodotti altamente efficiente.',
      'exp.bim_role': 'Addetto vendite / Cassiere',
      'exp.bim_date': 'Marzo 2018 — Ottobre 2018',
      'exp.bim_b1': 'Coordinato la ricezione quotidiana dei prodotti, eseguito esposizioni dinamiche in negozio e organizzato le scorte per massimizzare l\'accessibilità e l\'attrattiva visiva per i clienti.',
      'exp.bim_b2': 'Eseguito operazioni di cassa rapide e precise, gestendo le transazioni quotidiane in modo sicuro e riducendo al minimo i tempi di attesa durante le ore di punta.',
      'exp.bim_b3': 'Fornito un supporto coerente e proattivo ai visitatori del negozio, affrontando le richieste e risolvendo tempestivamente i problemi per migliorare l\'esperienza di acquisto complessiva.',
      'exp.bim_b4': 'Condotto regolari controlli dell\'inventario e tracciamento del magazzino per mantenere livelli di scorte ottimali e prevenire l\'esaurimento dei prodotti.',
      'exp.onee_role': 'Stagista — Progetto di fine anno',
      'exp.onee_date': 'Marzo 2017',
      'exp.onee_b1': 'Assistito il team finanziario con una gestione contabile completa, garantendo un tracciamento accurato del budget e l\'inserimento preciso dei dati finanziari.',
      'exp.onee_b2': 'Supportato il dipartimento acquisti coordinandosi con fornitori esterni per verificare ordini, tempistiche di consegna e dettagli di fatturazione.',
      'exp.onee_b3': 'Semplificato i registri di inventario e mantenuto una documentazione di magazzino dettagliata per supportare operazioni logistiche trasparenti ed efficienti.',
      'exp.tf_role': 'Stagista in contabilità',
      'exp.tf_date': 'Luglio 2016',
      'exp.tf_b1': 'Facilitato la preparazione dei report finanziari mensili e garantito l\'accurata registrazione delle fatture in entrata e in uscita.',
      'exp.tf_b2': 'Gestito la documentazione amministrativa essenziale, migliorando l\'organizzazione degli archivi fisici e digitali per un rapido recupero e per garantire la conformità.',
      // EDUCATION
      'edu.label': 'Percorso accademico',
      'edu.title': 'Formazione',
      'edu.ista_degree': 'Diploma in Gestione Aziendale',
      'edu.ista_level': 'Bac+2 (Diploma Tecnico)',
      'edu.ista_school': 'ISTA — Istituto Specializzato di Tecnologia Applicata',
      'edu.ibnzohr_degree': 'Laurea in Studi di Lingua Inglese',
      'edu.ibnzohr_level': 'Laurea triennale (Bac+3)',
      'edu.ibnzohr_school': 'Università Ibn Zohr',
      'edu.bac_degree': 'Diploma di Maturità',
      'edu.bac_level': 'Letteratura Moderna (Baccalauréat)',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'Cosa offro',
      'skills.title': 'Competenze &amp; Lingue',
      'skills.hard_title': 'Competenze tecniche',
      'skills.soft_title': 'Competenze trasversali',
      'skills.lang_section_title': 'Lingue',
      'skills.crm': 'Sistemi CRM',
      'skills.tech_sales': 'Vendite tecniche',
      'skills.negotiation': 'Negoziazione',
      'skills.inventory': 'Gestione dell\'inventario',
      'skills.warehouse': 'Gestione del magazzino',
      'skills.accounting': 'Contabilità &amp; Reporting',
      'skills.cashier': 'Operazioni di cassa',
      'skills.order_tracking': 'Monitoraggio ordini',
      'skills.after_sales': 'Servizio post-vendita',
      'skills.driving': 'Patente di guida B',
      'skills.sales_mgmt': 'Gestione commerciale',
      'skills.customer_svc': 'Eccellenza nel servizio clienti',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Lavoro di squadra',
      'skills.problem_solving': 'Risoluzione creativa dei problemi',
      'skills.persuasion': 'Persuasione',
      'skills.adaptability': 'Adattabilità',
      // LANG CARDS
      'lang.arabic': 'Arabo',
      'lang.arabic_level': 'Madrelingua · C2',
      'lang.english': 'Inglese',
      'lang.english_level': 'Professionale · C1',
      'lang.french': 'Francese',
      'lang.french_level': 'Avanzato · B2',
      'lang.italian': 'Italiano',
      'lang.italian_level': 'Intermedio · B1',
      // CONTACT
      'contact.label': 'Contattami',
      'contact.title': 'Contattami',
      'contact.subtitle': 'Sono attualmente aperto a nuove opportunità. Che tu abbia una domanda o voglia semplicemente salutarmi, la mia casella di posta è sempre aperta.',
      'contact.email_label': 'Email',
      'contact.phone_label': 'Telefono',
      'contact.location_label': 'Posizione',
      'contact.location_value': 'Bologna, Italia',
      'contact.form_name': 'Nome completo',
      'contact.form_name_ph': 'Il tuo nome completo',
      'contact.form_email': 'Indirizzo email',
      'contact.form_subject': 'Oggetto',
      'contact.form_subject_ph': 'Di cosa si tratta?',
      'contact.form_message': 'Messaggio',
      'contact.form_message_ph': 'Dimmi di più...',
      'contact.form_send': 'Invia messaggio',
      'contact.form_success': 'Grazie! Il tuo messaggio è stato inviato con successo.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. Tutti i diritti riservati.',
      'footer.sub': 'Tecnico Commerciale · Bologna, Italia',
    }
  };

  const langBtns = document.querySelectorAll('.lang-btn');

  const applyTranslation = (lang) => {
    const dict = translations[lang] || translations['en'];

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Translate all [data-i18n-placeholder] input/textarea elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update <html lang=""> attribute
    document.documentElement.setAttribute('lang', lang);


  };

  const setLanguage = (lang) => {
    localStorage.setItem('preferred_lang', lang);

    // Update active button style
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    applyTranslation(lang);
  };

  // Initialize on load
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

  // Listen for button clicks
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  // ==========================================================
  // 4. HEADER SCROLL STATE & SCROLL-TO-TOP BUTTON
  // ==========================================================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    // Header shrink
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================================
  // 5. ACTIVE NAV LINK ON SCROLL
  // ==========================================================
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavLink = () => {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ==========================================================
  // 6. INTERSECTION OBSERVER (Scroll Animations)
  // ==========================================================
  const revealElements = document.querySelectorAll('.reveal');
  const skillBadges = document.querySelectorAll('.skill-badge');
  const langBars = document.querySelectorAll('.lang-bar');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      
      // Standard reveal
      if (target.classList.contains('reveal')) {
        target.classList.add('is-visible');
        observer.unobserve(target); // Only animate once
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Staggered skill badges animation
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const badgeContainer = entry.target;
      const badges = badgeContainer.querySelectorAll('.skill-badge');
      
      badges.forEach((badge, index) => {
        setTimeout(() => {
          badge.classList.add('pop');
        }, index * 80); // 80ms stagger
      });
      
      observer.unobserve(badgeContainer);
    });
  }, { threshold: 0.2 });

  const badgeClouds = document.querySelectorAll('.badge-cloud');
  badgeClouds.forEach(cloud => skillsObserver.observe(cloud));

  // ----------------------------------------------------------
  // Bullet slide-up animation for Work Experience timeline
  // ----------------------------------------------------------
  const bulletObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;
      const bullets = card.querySelectorAll('.timeline-bullets li');

      // Mark each bullet hidden before animating
      bullets.forEach(li => li.classList.add('bullet-hidden'));

      // Stagger reveal from first to last
      bullets.forEach((li, i) => {
        setTimeout(() => {
          li.classList.remove('bullet-hidden');
          li.classList.add('bullet-visible');
        }, i * 90); // 90ms stagger per bullet
      });

      observer.unobserve(card);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.timeline-card').forEach(card => bulletObserver.observe(card));

  // Language bars animation
  const langObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const barContainer = entry.target;
      const bars = barContainer.querySelectorAll('.lang-bar');
      
      bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add('animated');
        }, index * 200); // 200ms stagger
      });
      
      observer.unobserve(barContainer);
    });
  }, { threshold: 0.2 });

  const langSection = document.querySelector('.languages-section');
  if (langSection) {
    langObserver.observe(langSection);
  }

  // ==========================================================
  // 8. CONTACT EMAIL REDIRECT (Mobile/Desktop)
  // ==========================================================
  const contactEmailLink = document.getElementById('contact-icon-email');
  if (contactEmailLink) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (isMobile) {
      // Changing the link to mailto: which triggers the default native mail app (e.g. Gmail) on mobile devices
      contactEmailLink.href = 'mailto:abdelaziz.bougrich@gmail.com';
      contactEmailLink.removeAttribute('target'); // Removing target="_blank" since it's unnecessary for app links
    }
  }

});
