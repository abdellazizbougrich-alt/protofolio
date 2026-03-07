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
  // 3. LANGUAGE SWITCHER
  // ==========================================================
  const langBtns = document.querySelectorAll('.lang-btn');
  
  const setLanguage = (lang) => {
    // Save preference
    localStorage.setItem('preferred_lang', lang);
    
    // Update active button state
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Toggle visibility of .lang elements
    const langElements = document.querySelectorAll('.lang');
    langElements.forEach(el => {
      if (el.classList.contains(lang)) {
        el.style.display = ''; // Show Element
      } else {
        el.style.display = 'none'; // Hide Element
      }
    });
  };

  // Initialize with saved language or default to 'en'
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

  // Listen for clicks on language buttons
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
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
  // 7. CONTACT FORM SIMULATION
  // ==========================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const successMsg = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation check
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Simulate sending
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        successMsg.textContent = "Thank you! Your message has been sent successfully.";
        successMsg.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 5000);
      }, 1500); // 1.5s simulated loading
    });
  }
});
