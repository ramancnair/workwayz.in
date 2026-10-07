/**
 * Workwayz.in - Interactive Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalTabs();
  initCopyButtons();
  initFeatureTabs();
  initFaqAccordion();
  initLightbox();
  initMobileMenu();
});

/* ----------------------------------------------------
   1. Quick Install Terminal Tabs
   ---------------------------------------------------- */
const terminalData = {
  npx: {
    command: 'npx workwayz@latest',
    output: `<span class="success">✓ Checking Node.js environment...</span><br>
<span class="success">✓ Launching Workwayz Web Setup Wizard...</span><br>
<span class="prompt-symbol">→</span> Open <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a> to complete the 3-minute setup.`
  },
  docker: {
    command: 'docker run -d -p 3000:3000 --name workwayz workwayz/app:latest',
    output: `<span class="success">✓ Pulling workwayz/app:latest container image...</span><br>
<span class="success">✓ Container started (ID: 8fa42b91c0e3)</span><br>
<span class="prompt-symbol">→</span> Workwayz instance running on <span style="color:#6ee7b7">port 3000</span>.`
  },
  compose: {
    command: 'curl -sSL https://workwayz.in/docker-compose.yml | docker compose up -d',
    output: `<span class="success">✓ Starting Supabase Database & Auth stack...</span><br>
<span class="success">✓ Connecting optional Ollama local AI server...</span><br>
<span class="success">✓ Workwayz core server is ready on http://localhost:3000.</span>`
  },
  git: {
    command: 'git clone https://github.com/ramancnair/Workwayz.git && cd workwayz && npm install && npm run dev',
    output: `<span class="success">✓ Cloned repository into ./workwayz</span><br>
<span class="success">✓ Installed dependencies in 4.2s</span><br>
<span class="prompt-symbol">→</span> Ready in dev mode: <span style="color:#6ee7b7">http://localhost:3000</span>`
  }
};

function initTerminalTabs() {
  const tabs = document.querySelectorAll('.term-tab-btn');
  const cmdSpan = document.getElementById('terminal-cmd-text');
  const outputDiv = document.getElementById('terminal-output-text');
  const copyBtn = document.getElementById('term-copy-btn');

  if (!tabs.length || !cmdSpan) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-mode');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (terminalData[mode]) {
        cmdSpan.textContent = terminalData[mode].command;
        if (outputDiv) {
          outputDiv.innerHTML = terminalData[mode].output;
        }
        if (copyBtn) {
          copyBtn.setAttribute('data-clipboard', terminalData[mode].command);
        }
      }
    });
  });
}

/* ----------------------------------------------------
   2. Copy to Clipboard
   ---------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-target], .copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) {
        const targetId = btn.getAttribute('data-copy-target');
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) textToCopy = targetEl.textContent.trim();
        } else {
          // fallback to terminal text
          const termCmd = document.getElementById('terminal-cmd-text');
          if (termCmd) textToCopy = termCmd.textContent.trim();
        }
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  });
}

/* ----------------------------------------------------
   3. Feature Showcase Tabs
   ---------------------------------------------------- */
function initFeatureTabs() {
  const tabBtns = document.querySelectorAll('.feature-tab-btn');
  const panels = document.querySelectorAll('.feature-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   4. FAQ Accordion
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ----------------------------------------------------
   5. Screenshot Lightbox
   ---------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal || !modalImg) return;

  document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const title = trigger.getAttribute('data-lightbox-title') || 'Workwayz Interface Preview';

      modalImg.src = src;
      if (modalTitle) modalTitle.textContent = title;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------
   6. Mobile Menu Drawer
   ---------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('active');
    const isOpen = drawer.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });
}
