/**
 * WODNIOK.DE & FLOORBALL CLOCK - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initManualTOC();
  initPlatformTabs();
  initLightbox();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* User Manual Table of Contents (TOC) Active Link Tracking */
function initManualTOC() {
  const navLinks = document.querySelectorAll('.manual-nav a');
  const sections = document.querySelectorAll('.manual-section');

  if (navLinks.length === 0 || sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* Platform Screenshots Tabs Switcher */
function initPlatformTabs() {
  const tabs = document.querySelectorAll('.platform-tab-btn');
  const panels = document.querySelectorAll('.platform-screenshots-panel');

  if (tabs.length === 0 || panels.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPlatform = tab.getAttribute('data-platform');

      // Update active tab button
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show matching panel
      panels.forEach(panel => {
        if (panel.getAttribute('id') === `platform-${targetPlatform}`) {
          panel.classList.add('active');
          panel.hidden = false;
        } else {
          panel.classList.remove('active');
          panel.hidden = true;
        }
      });
    });
  });
}

/* Lightbox / Fullscreen Image Zoom Viewer */
function initLightbox() {
  let lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Vergrößerter Screenshot');
    lightbox.innerHTML = `
      <button class="lightbox-close-btn" aria-label="Schließen">&times;</button>
      <div class="lightbox-container">
        <img class="lightbox-img" src="" alt="Screenshot Vorschau">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');

  function openLightbox(src, alt, captionText) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Vergrößerter Screenshot';
    if (captionText && captionText.trim().length > 0) {
      lightboxCaption.textContent = captionText.trim();
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.textContent = '';
      lightboxCaption.style.display = 'none';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click on any screenshot gallery item opens lightbox
  document.addEventListener('click', (e) => {
    // If inside an open lightbox, close it
    if (e.target.closest('#lightbox-modal')) {
      closeLightbox();
      return;
    }

    const item = e.target.closest('.screenshot-gallery-item, .screenshot-img-box, .app-screenshot-hero');
    if (item) {
      const img = item.tagName.toLowerCase() === 'img' ? item : item.querySelector('img');
      const caption = item.querySelector('.screenshot-caption');
      if (img) {
        openLightbox(img.src, img.alt, caption ? caption.textContent : img.alt);
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}


