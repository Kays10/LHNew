document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initForms();
});

function initNav() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  const openMobileNav = () => {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm(form)) {
        showFormSuccess(form);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    const errorEl = field.parentElement.querySelector('.error');
    
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = '#EF4444';
      if (errorEl) {
        errorEl.textContent = 'This field is required';
      }
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      isValid = false;
      field.style.borderColor = '#EF4444';
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid email address';
      }
    } else {
      field.style.borderColor = 'var(--color-border)';
      if (errorEl) {
        errorEl.textContent = '';
      }
    }
  });

  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormSuccess(form) {
  const formCard = form.closest('.form-card');
  if (!formCard) return;

  const successHTML = `
    <div class="form-success">
      <h3>Thank you!</h3>
      <p>We'll be in touch within 2 business days.</p>
    </div>
  `;

  form.style.display = 'none';
  formCard.insertAdjacentHTML('beforeend', successHTML);
}