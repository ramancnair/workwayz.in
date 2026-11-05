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
  initDocsScrollSpy();
});

/* ----------------------------------------------------
   1. Quick Install Terminal Tabs
   ---------------------------------------------------- */
const terminalData = {
  npx: {
    command: 'npx workwayz@latest',
    output: `<span class="success">✓ Checking Node.js v20+ environment...</span><br>
<span class="success">✓ Starting Workwayz with Zero-Config Local Embedded Database (~/.workwayz)...</span><br>
<span class="prompt-symbol">→</span> Open <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a> to launch the In-App Setup Wizard.`
  },
  npm: {
    command: 'npm install -g workwayz && workwayz',
    output: `<span class="success">✓ Installed workwayz CLI globally...</span><br>
<span class="success">✓ Persisting configuration & local database in ~/.workwayz...</span><br>
<span class="prompt-symbol">→</span> Workwayz is live at <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a>`
  },
  docker: {
    command: 'docker run -d -p 3000:3000 -v workwayz-data:/app/data --name workwayz-web --restart always workwayz/workwayz:latest',
    output: `<span class="success">✓ Pulling workwayz/workwayz:latest production container from Docker Hub...</span><br>
<span class="success">✓ Mounted persistent volume workwayz-data:/app/data...</span><br>
<span class="prompt-symbol">→</span> Container <span style="color:#6ee7b7">workwayz-web</span> running on <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a>`
  },
  custom: {
    command: 'npm install --prefix "D:\\Apps\\Workwayz" workwayz && npx --prefix "D:\\Apps\\Workwayz" workwayz',
    output: `<span class="success">✓ Installed Workwayz into custom directory D:\\Apps\\Workwayz...</span><br>
<span class="success">✓ Tip: Pass --data-dir "D:\\Apps\\Workwayz\\data" for custom DB storage...</span><br>
<span class="prompt-symbol">→</span> Ready at <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a>`
  },
  git: {
    command: 'git clone https://github.com/ramancnair/Workwayz.git && cd Workwayz && npm install && npm run dev',
    output: `<span class="success">✓ Cloned repository into ./Workwayz...</span><br>
<span class="success">✓ Installed dependencies & Next.js 16 App Router...</span><br>
<span class="prompt-symbol">→</span> Ready in developer mode: <a href="http://localhost:3000" target="_blank" style="color:#6ee7b7">http://localhost:3000</a>`
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

/* ----------------------------------------------------
   7. Docs Sidebar Scroll-Spy & Search Filter
   ---------------------------------------------------- */
function initDocsScrollSpy() {
  const navLinks = document.querySelectorAll('.docs-nav-link');
  const searchInput = document.getElementById('docs-search-input');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.docs-nav-group').forEach(group => {
        let groupVisible = false;
        group.querySelectorAll('li').forEach(li => {
          const text = li.textContent.toLowerCase();
          if (!q || text.includes(q)) {
            li.style.display = '';
            groupVisible = true;
          } else {
            li.style.display = 'none';
          }
        });
        group.style.display = groupVisible ? '' : 'none';
      });
    });
  }

  if (!navLinks.length) return;

  const headings = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    return id ? document.getElementById(id) : null;
  }).filter(Boolean);

  if (!headings.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = headings[0].id;
    for (const h of headings) {
      if (h.offsetTop <= scrollPos) {
        currentId = h.id;
      }
    }
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
