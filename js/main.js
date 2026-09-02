/**
 * WODNIOK.DE & FLOORBALL CLOCK - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScoreboardDemo();
  initManualTOC();
  initPlatformTabs();
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

/* Interactive Scoreboard Demo for Hero / Showcase */
function initScoreboardDemo() {
  const timeElem = document.getElementById('demo-timer');
  const homeScoreElem = document.getElementById('home-score');
  const guestScoreElem = document.getElementById('guest-score');
  const toggleTimerBtn = document.getElementById('btn-toggle-timer');
  const addHomeGoalBtn = document.getElementById('btn-home-plus');
  const addGuestGoalBtn = document.getElementById('btn-guest-plus');
  const resetDemoBtn = document.getElementById('btn-reset-demo');

  if (!timeElem) return;

  let totalSeconds = 20 * 60; // 20:00
  let isRunning = false;
  let timerInterval = null;
  let homeGoals = 3;
  let guestGoals = 2;

  function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeElem.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    if (toggleTimerBtn) {
      toggleTimerBtn.textContent = 'Pause';
      toggleTimerBtn.classList.add('btn-orange');
      toggleTimerBtn.classList.remove('btn-primary');
    }
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
        pauseTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    if (toggleTimerBtn) {
      toggleTimerBtn.textContent = 'Start';
      toggleTimerBtn.classList.add('btn-primary');
      toggleTimerBtn.classList.remove('btn-orange');
    }
  }

  if (toggleTimerBtn) {
    toggleTimerBtn.addEventListener('click', () => {
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  }

  if (addHomeGoalBtn && homeScoreElem) {
    addHomeGoalBtn.addEventListener('click', () => {
      homeGoals++;
      homeScoreElem.textContent = homeGoals;
    });
  }

  if (addGuestGoalBtn && guestScoreElem) {
    addGuestGoalBtn.addEventListener('click', () => {
      guestGoals++;
      guestScoreElem.textContent = guestGoals;
    });
  }

  if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', () => {
      pauseTimer();
      totalSeconds = 20 * 60;
      homeGoals = 0;
      guestGoals = 0;
      updateTimerDisplay();
      if (homeScoreElem) homeScoreElem.textContent = '0';
      if (guestScoreElem) guestScoreElem.textContent = '0';
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

