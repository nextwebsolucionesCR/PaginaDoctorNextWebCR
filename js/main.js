/* =========================================
   UI & BEHAVIOR (Mobile Menu & Scroll)
   ========================================= */

// Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// Fade Up Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

/* =========================================
   START: Theme Toggle Logic (Dark/Light Mode)
   Based on pasosmodooscuro.txt
   ========================================= */
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

let initialTheme = 'light';
if (savedTheme === 'dark' || savedTheme === 'light') {
  initialTheme = savedTheme;
} else {
  initialTheme = systemPrefersDark ? 'dark' : 'light';
}

document.body.classList.toggle('dark-mode', initialTheme === 'dark');

function updateThemeUI(isDark) {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (themeIcon) {
    themeIcon.classList.toggle('fa-sun', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
  }
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(isDark));
    themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

updateThemeUI(initialTheme === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeUI(isDark);
  });
}

if (!savedTheme && window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = (e) => {
    const isDark = e.matches;
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeUI(isDark);
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
}


/* =========================================
   START: Internationalization (i18n) Logic
   Based on pasosmultilenguage.txt
   ========================================= */

const translations = {
  es: {
    nav_logo: "Dr. Ramón",
    nav_home: "Inicio",
    nav_about: "Quién soy",
    nav_exp: "Experiencia",
    nav_institutions: "Instituciones",
    nav_contact: "Contacto",
    nav_privacy: "Privacidad",

    hero_title1: "Respirar es",
    hero_title2: "Vivir Mejor",
    hero_sub: "Atención neumológica integral basada en 20 años de experiencia, profesionalismo y profunda empatía. Tu salud pulmonar en manos expertas.",
    btn_agenda: "Agendar Consulta",
    hero_badge: "Especialista Neumólogo",
    hero_years: "Años de<br>Experiencia",
    hero_float_title: "Atención Premium",
    hero_float_sub: "Salud Respiratoria",
    scroll_down: "Deslizar",

    sec_about: "Quién Soy",
    about_title: "Dr. Ramón Zeledón Quirós",
    about_subtitle: "Especialista en Neumología",
    about_badge: "Años de excelencia médica",
    about_p1: "Soy el Dr. Ramón Zeledón Quirós. Con más de 20 años de experiencia, me esfuerzo para que mis pacientes sean atendidos no solo desde la profesión, sino también desde la experiencia, el profesionalismo y la empatía.",
    about_p2: "A lo largo de los años, mi trayectoria me ha aportado métodos de aprendizaje avanzados permitiéndome ser un profesional sumamente completo, dedicado a la salud respiratoria integral.",

    sec_exp: "Experiencia",
    exp_1: "25 años de experiencia médica",
    exp_2: "Licenciatura en especialización de Neurólogo/Neumólogo",
    exp_3: "Cursos de aprovechamiento de recursos humanos",
    exp_4: "Cursos de Inteligencia Artificial aplicados a la medicina",
    exp_5: "Cursos de salud de la Universidad Nacional",
    btn_institutions: "Ver Instituciones Asociadas",

    sec_contact: "Contacto",
    form_name: "Nombre completo",
    form_name_ph: "Tu nombre",
    form_email: "Correo electrónico",
    form_email_ph: "ejemplo@correo.com",
    form_phone: "Teléfono",
    form_phone_ph: "+506 0000 0000",
    form_query: "Consulta",
    form_query_ph: "¿En qué te puedo ayudar?",
    form_submit: "Enviar Mensaje",

    footer_rights: "Todos los derechos reservados.",

    inst_title: "Instituciones En Las Que He Trabajado",
    inst_sub: "Brindando atención médica especializada en los principales centros médicos del país.",
    dir_label: "Dirección:",
    btn_maps: "Google Maps",
    btn_waze: "Waze",

    priv_title: "Política de Privacidad",
    priv_notice: "Aviso Importante sobre Inteligencia Artificial",
    priv_text1: "Las imágenes y fotografías utilizadas en esta página web para ilustrar diversos escenarios (incluyendo, pero no limitándose a personal, pacientes, e instalaciones generales) han sido generadas o complementadas utilizando inteligencia artificial.",
    priv_text2: "Estas imágenes son meramente representativas y estéticas, utilizadas con fines ilustrativos. No buscan suplantar la identidad de nadie, y cualquier parentesco visual, parecido o coincidencia con personas reales (ya sean vivas o fallecidas) o lugares reales es puramente accidental y coincidencia."
  },
  en: {
    nav_logo: "Dr. Ramón",
    nav_home: "Home",
    nav_about: "About Me",
    nav_exp: "Experience",
    nav_institutions: "Institutions",
    nav_contact: "Contact",
    nav_privacy: "Privacy",

    hero_title1: "Breathing is",
    hero_title2: "Living Better",
    hero_sub: "Comprehensive pulmonology care based on 20 years of experience, professionalism, and deep empathy. Your lung health in expert hands.",
    btn_agenda: "Schedule Appointment",
    hero_badge: "Pulmonology Specialist",
    hero_years: "Years of<br>Experience",
    hero_float_title: "Premium Care",
    hero_float_sub: "Respiratory Health",
    scroll_down: "Scroll Down",

    sec_about: "About Me",
    about_title: "Dr. Ramón Zeledón Quirós",
    about_subtitle: "Pulmonology Specialist",
    about_badge: "Years of medical excellence",
    about_p1: "I am Dr. Ramón Zeledón Quirós. With over 20 years of experience, I strive to treat my patients not only from a professional standpoint but also through experience, professionalism, and empathy.",
    about_p2: "Over the years, my career has provided me with advanced learning methods, allowing me to be a highly complete professional dedicated to comprehensive respiratory health.",

    sec_exp: "Experience",
    exp_1: "25 years of medical experience",
    exp_2: "Degree in Neurologist/Pulmonologist specialization",
    exp_3: "Human resources development courses",
    exp_4: "Artificial Intelligence courses applied to medicine",
    exp_5: "Health courses from the National University",
    btn_institutions: "View Associated Institutions",

    sec_contact: "Contact",
    form_name: "Full Name",
    form_name_ph: "Your name",
    form_email: "Email address",
    form_email_ph: "example@email.com",
    form_phone: "Phone",
    form_phone_ph: "+506 0000 0000",
    form_query: "Query",
    form_query_ph: "How can I help you?",
    form_submit: "Send Message",

    footer_rights: "All rights reserved.",

    inst_title: "Associated Institutions",
    inst_sub: "Providing specialized medical care in the country's main medical centers.",
    dir_label: "Address:",
    btn_maps: "Google Maps",
    btn_waze: "Waze",

    priv_title: "Privacy Policy",
    priv_notice: "Important Notice on Artificial Intelligence",
    priv_text1: "The images and photographs used on this website to illustrate various scenarios (including, but not limited to staff, patients, and general facilities) have been generated or supplemented using artificial intelligence.",
    priv_text2: "These images are purely representative and aesthetic, used for illustrative purposes. They do not seek to impersonate anyone, and any visual resemblance or coincidence with real people (living or dead) or real places is purely accidental."
  },
  pt: {
    nav_logo: "Dr. Ramón",
    nav_home: "Início",
    nav_about: "Sobre Mim",
    nav_exp: "Experiência",
    nav_institutions: "Instituições",
    nav_contact: "Contato",
    nav_privacy: "Privacidade",

    hero_title1: "Respirar é",
    hero_title2: "Viver Melhor",
    hero_sub: "Atenção pneumológica integral baseada em 20 anos de experiência, profissionalismo e profunda empatia. Sua saúde pulmonar em mãos especializadas.",
    btn_agenda: "Agendar Consulta",
    hero_badge: "Especialista em Pneumologia",
    hero_years: "Anos de<br>Experiência",
    hero_float_title: "Atendimento Premium",
    hero_float_sub: "Saúde Respiratória",
    scroll_down: "Deslizar",

    sec_about: "Sobre Mim",
    about_title: "Dr. Ramón Zeledón Quirós",
    about_subtitle: "Especialista em Pneumologia",
    about_badge: "Anos de excelência médica",
    about_p1: "Sou o Dr. Ramón Zeledón Quirós. Com mais de 20 anos de experiência, esforço-me para que meus pacientes sejam atendidos não apenas profissionalmente, mas também com experiência, profissionalismo e empatia.",
    about_p2: "Ao longo dos anos, minha trajetória proporcionou-me métodos avançados de aprendizado, permitindo-me ser um profissional extremamente completo e dedicado à saúde respiratória integral.",

    sec_exp: "Experiência",
    exp_1: "25 anos de experiência médica",
    exp_2: "Licenciatura em especialização de Neurologista/Pneumologista",
    exp_3: "Cursos de aproveitamento de recursos humanos",
    exp_4: "Cursos de Inteligência Artificial aplicados à medicina",
    exp_5: "Cursos de saúde da Universidade Nacional",
    btn_institutions: "Ver Instituições Associadas",

    sec_contact: "Contato",
    form_name: "Nome completo",
    form_name_ph: "Seu nome",
    form_email: "Correio eletrônico",
    form_email_ph: "exemplo@correio.com",
    form_phone: "Telefone",
    form_phone_ph: "+506 0000 0000",
    form_query: "Consulta",
    form_query_ph: "Como posso ajudar?",
    form_submit: "Enviar Mensagem",

    footer_rights: "Todos os direitos reservados.",

    inst_title: "Instituições Associadas",
    inst_sub: "Oferecendo atendimento médico especializado nos principais centros médicos do país.",
    dir_label: "Endereço:",
    btn_maps: "Google Maps",
    btn_waze: "Waze",

    priv_title: "Política de Privacidade",
    priv_notice: "Aviso Importante sobre Inteligência Artificial",
    priv_text1: "As imagens e fotografias usadas neste site para ilustrar vários cenários (incluindo, mas não se limitando a funcionários, pacientes e instalações gerais) foram geradas ou complementadas com inteligência artificial.",
    priv_text2: "Estas imagens são puramente representativas e estéticas, utilizadas para fins ilustrativos. Não procuram fazer-se passar por ninguém, e qualquer semelhança visual ou coincidência com pessoas reais (vivas ou falecidas) ou locais reais é puramente acidental."
  },
  fr: {
    nav_logo: "Dr. Ramón",
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_exp: "Expérience",
    nav_institutions: "Institutions",
    nav_contact: "Contact",
    nav_privacy: "Confidentialité",

    hero_title1: "Respirer c'est",
    hero_title2: "Mieux Vivre",
    hero_sub: "Des soins pneumologiques complets fondés sur 20 ans d'expérience, de professionnalisme et d'une profonde empathie. La santé de vos poumons entre des mains expertes.",
    btn_agenda: "Prendre Rendez-vous",
    hero_badge: "Spécialiste en Pneumologie",
    hero_years: "Années<br>d'Expérience",
    hero_float_title: "Soins Premium",
    hero_float_sub: "Santé Respiratoire",
    scroll_down: "Faire défiler",

    sec_about: "À Propos",
    about_title: "Dr. Ramón Zeledón Quirós",
    about_subtitle: "Spécialiste en Pneumologie",
    about_badge: "Années d'excellence médicale",
    about_p1: "Je suis le Dr Ramón Zeledón Quirós. Avec plus de 20 ans d'expérience, je m'efforce de traiter mes patients non seulement d'un point de vue professionnel, mais aussi avec expérience, professionnalisme et empathie.",
    about_p2: "Au fil des ans, ma carrière m'a fourni des méthodes d'apprentissage avancées, me permettant d'être un professionnel extrêmement complet dédié à la santé respiratoire globale.",

    sec_exp: "Expérience",
    exp_1: "25 ans d'expérience médicale",
    exp_2: "Licence en spécialisation Neurologue/Pneumologue",
    exp_3: "Cours de développement des ressources humaines",
    exp_4: "Cours d'Intelligence Artificielle appliqués à la médecine",
    exp_5: "Cours de santé de l'Université Nationale",
    btn_institutions: "Voir les Institutions Associées",

    sec_contact: "Contact",
    form_name: "Nom complet",
    form_name_ph: "Votre nom",
    form_email: "Courriel",
    form_email_ph: "exemple@courriel.com",
    form_phone: "Téléphone",
    form_phone_ph: "+506 0000 0000",
    form_query: "Question",
    form_query_ph: "Comment puis-je vous aider?",
    form_submit: "Envoyer le Message",

    footer_rights: "Tous droits réservés.",

    inst_title: "Institutions Associées",
    inst_sub: "Fournir des soins médicaux spécialisés dans les principaux centres médicaux du pays.",
    dir_label: "Adresse:",
    btn_maps: "Google Maps",
    btn_waze: "Waze",

    priv_title: "Politique de Confidentialité",
    priv_notice: "Avis Important sur l'Intelligence Artificielle",
    priv_text1: "Les images et photographies utilisées sur ce site pour illustrer divers scénarios ont été générées ou complétées à l'aide de l'intelligence artificielle.",
    priv_text2: "Ces images sont purement représentatives et esthétiques, utilisées à des fins d'illustration. Elles ne cherchent à usurper l'identité de personne, et toute ressemblance ou coïncidence avec des personnes réelles est purement fortuite."
  },
  zh: {
    nav_logo: "拉蒙医生 (Dr. Ramón)",
    nav_home: "主页",
    nav_about: "关于我",
    nav_exp: "背景经验",
    nav_institutions: "合作机构",
    nav_contact: "联系",
    nav_privacy: "隐私",

    hero_title1: "呼吸就是",
    hero_title2: "更好的生活",
    hero_sub: "基于 20 年的经验、专业精神和深刻的同理心，提供全面的呼吸系统护理。您的肺部健康交由专家掌控。",
    btn_agenda: "安排预约",
    hero_badge: "呼吸科专家",
    hero_years: "年的<br>经验",
    hero_float_title: "优质护理",
    hero_float_sub: "呼吸健康",
    scroll_down: "向下滑动",

    sec_about: "关于我",
    about_title: "Dr. Ramón Zeledón Quirós",
    about_subtitle: "呼吸科专家",
    about_badge: "年卓越医疗经验",
    about_p1: "我是 Ramón Zeledón Quirós 医生。凭借超过 20 年的经验，我努力不仅从专业的角度，而且通过经验、专业精神和同理心来治疗我的患者。",
    about_p2: "多年来，我的职业生涯为我提供了先进的学习方法，使我成为一名极其全面的专业人士，致力于全面的呼吸健康。",

    sec_exp: "背景经验",
    exp_1: "25 年医疗经验",
    exp_2: "神经科/呼吸科专业学位",
    exp_3: "人力资源开发课程",
    exp_4: "应用于医学的人工智能课程",
    exp_5: "国立大学的健康课程",
    btn_institutions: "查看合作机构",

    sec_contact: "联系",
    form_name: "全名",
    form_name_ph: "你的名字",
    form_email: "电子邮件",
    form_email_ph: "example@email.com",
    form_phone: "电话",
    form_phone_ph: "+506 0000 0000",
    form_query: "咨询",
    form_query_ph: "我能帮你什么？",
    form_submit: "发送信息",

    footer_rights: "版权所有。",

    inst_title: "合作机构",
    inst_sub: "在该国的主要医疗中心提供专业医疗服务。",
    dir_label: "地址:",
    btn_maps: "谷歌地图",
    btn_waze: "Waze",

    priv_title: "隐私政策",
    priv_notice: "关于人工智能的重要通知",
    priv_text1: "本网站上用于说明各种场景（包括但不限于员工、患者和一般设施）的图像和照片是使用人工智能生成或补充的。",
    priv_text2: "这些图像纯粹具有代表性和美感，仅用于说明目的。他们不寻求冒充任何人，任何视觉上的相似、再现、或者与真实人物（无论在世与否）或真实地点的巧合纯属偶然。"
  }
};

const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = langToggleBtn ? langToggleBtn.querySelector('.lang-text') : null;

const availableLangs = Object.keys(translations);
const DEFAULT_LANG = translations.es ? 'es' : (availableLangs[0] || 'es');

let currentLang = localStorage.getItem('language') || DEFAULT_LANG;
if (!translations[currentLang]) currentLang = DEFAULT_LANG;

function getText(lang, key) {
  if (translations[lang] && translations[lang][key] != null) return translations[lang][key];
  if (translations[DEFAULT_LANG] && translations[DEFAULT_LANG][key] != null) return translations[DEFAULT_LANG][key];
  return null;
}

function updateLanguage(lang) {
  if (!translations[lang]) lang = DEFAULT_LANG;

  // Text Content
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const value = getText(lang, key);
    if (value == null) return;

    if (value.includes('<')) {
      element.innerHTML = value;
      return;
    }

    let textNodeFound = false;
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        node.textContent = value;
        textNodeFound = true;
      }
    });

    if (!textNodeFound && element.children.length === 0) {
      element.textContent = value;
    } else if (!textNodeFound && element.tagName === 'LI' && element.querySelector('i')) {
      element.innerHTML = element.querySelector('i').outerHTML + " " + value;
    }
  });

  // Input Placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const value = getText(lang, key);
    if (value == null) return;
    element.placeholder = value;
  });

  if (langTextSpan) {
    langTextSpan.textContent = lang.toUpperCase();
  }

  localStorage.setItem('language', lang);
  currentLang = lang;
}

updateLanguage(currentLang);

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    const idx = availableLangs.indexOf(currentLang);
    const nextLang = availableLangs[(idx + 1) % availableLangs.length] || DEFAULT_LANG;
    updateLanguage(nextLang);
  });
}

/* =========================================
   ANTI-INSPECTION LOGIC
   ========================================= */
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  // Disable F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
  // Disable Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
  // Disable Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
  }
  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
});
