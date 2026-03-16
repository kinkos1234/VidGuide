/* VidGuide — main.js */

const PAGES = [
  { id: 'part0', file: 'content/part0-preparation.md', label: 'PART 0', title: '시작하기 전에', desc: '도구 준비와 핵심 원칙' },
  { id: 'part1', file: 'content/part1-start.md', label: 'PART 1', title: '시작', desc: '이야기의 출발점' },
  { id: 'part2', file: 'content/part2-scenario.md', label: 'PART 2', title: '시나리오 작성', desc: '7단계 워크플로우와 프로덕션 문서' },
  { id: 'part3', file: 'content/part3-visualization.md', label: 'PART 3', title: '시각화', desc: '이미지·비디오 생성과 립싱크' },
  { id: 'part4', file: 'content/part4-editing.md', label: 'PART 4', title: '편집과 완성', desc: '13가지 편집 원리와 사운드' },
  { id: 'part5', file: 'content/part5-release.md', label: 'PART 5', title: '개봉', desc: 'FilmFreeway 출품 전략' },
];

/* ---- Markdown → HTML (lightweight) ---- */
function md(src) {
  let html = src;

  // Code blocks (``` ... ```)
  html = html.replace(/```([^\n]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<div class="code-wrapper"><button class="copy-btn" onclick="copyCode(this)">Copy</button><pre><code class="language-${lang}">${escaped}</code></pre></div>`;
  });

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)*)/gm, (_, header, sep, body) => {
    const ths = header.split('|').filter(c=>c.trim()).map(c=>`<th>${c.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const tds = row.split('|').filter(c=>c.trim()).map(c=>`<td>${inlineMd(c.trim())}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquotes (handle multi-line)
  html = html.replace(/^(?:>\s?(.+)\n?)+/gm, (match) => {
    const lines = match.split('\n').map(l => l.replace(/^>\s?/, '')).join(' ');
    return `<blockquote><p>${inlineMd(lines)}</p></blockquote>`;
  });

  // Admonitions (MkDocs-style !!! )
  html = html.replace(/^!!!\s+(\w+)\s+"([^"]+)"\n((?:\s{4}.+\n?)*)/gm, (_, type, title, body) => {
    return `<div class="callout"><strong>${title}</strong><p>${inlineMd(body.replace(/^\s{4}/gm,'').trim())}</p></div>`;
  });
  html = html.replace(/^!!!\s+(\w+)\s+"([^"]+)"$/gm, (_, type, title) => {
    return `<div class="callout"><strong>${title}</strong></div>`;
  });

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Unordered lists
  html = html.replace(/^((?:\s*[-*]\s.+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const indent = line.match(/^(\s*)/)[1].length;
      const text = line.replace(/^\s*[-*]\s+/, '');
      return `<li>${inlineMd(text)}</li>`;
    }).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^((?:\s*\d+\.\s.+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const text = line.replace(/^\s*\d+\.\s+/, '');
      return `<li>${inlineMd(text)}</li>`;
    }).join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs (remaining text blocks)
  html = html.replace(/^(?!<[a-z/])((?:.+\n?)+)/gm, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.startsWith('<')) return match;
    return `<p>${inlineMd(trimmed)}</p>\n`;
  });

  return html;
}

function inlineMd(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/→/g, '→');
}

/* ---- Copy code ---- */
window.copyCode = function(btn) {
  const code = btn.parentElement.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
  });
};

/* ---- Load content page ---- */
async function loadPage(pageId) {
  const idx = PAGES.findIndex(p => p.id === pageId);
  if (idx === -1) return;
  const page = PAGES[idx];

  // Fetch markdown
  const base = document.querySelector('meta[name="base-url"]')?.content || '';
  const res = await fetch(base + page.file);
  const text = await res.text();
  const html = md(text);

  // Render hero
  const heroEl = document.getElementById('article-hero');
  if (heroEl) {
    heroEl.innerHTML = `
      <div class="article-hero-label">${page.label}</div>
      <h1 class="article-hero-title">${page.title}</h1>
      <p class="article-hero-desc">${page.desc}</p>
      <hr class="article-hero-divider">
    `;
  }

  // Render content
  const contentEl = document.getElementById('article-body');
  if (contentEl) contentEl.innerHTML = html;

  // Build TOC
  buildTOC();

  // Render pagination
  const navEl = document.getElementById('article-pagination');
  if (navEl) {
    let prevHtml = '';
    let nextHtml = '';
    if (idx > 0) {
      const prev = PAGES[idx - 1];
      prevHtml = `<a href="?p=${prev.id}" class="article-nav-link prev" data-page="${prev.id}">
        <span class="article-nav-label">← 이전</span>
        <span class="article-nav-title">${prev.label}. ${prev.title}</span>
      </a>`;
    } else {
      prevHtml = '<div></div>';
    }
    if (idx < PAGES.length - 1) {
      const next = PAGES[idx + 1];
      nextHtml = `<a href="?p=${next.id}" class="article-nav-link next" data-page="${next.id}">
        <span class="article-nav-label">다음 →</span>
        <span class="article-nav-title">${next.label}. ${next.title}</span>
      </a>`;
    }
    navEl.innerHTML = prevHtml + nextHtml;
    navEl.querySelectorAll('[data-page]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.dataset.page;
        history.pushState(null, '', `?p=${id}`);
        loadPage(id);
        window.scrollTo(0, 0);
      });
    });
  }

  // Highlight active nav
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Fade-in
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

  // Title
  document.title = `${page.title} — VidGuide`;
}

/* ---- TOC Builder ---- */
function buildTOC() {
  const tocEl = document.getElementById('toc-list');
  if (!tocEl) return;
  const headings = document.querySelectorAll('#article-body h2, #article-body h3');
  if (headings.length === 0) { tocEl.innerHTML = ''; return; }

  let html = '';
  headings.forEach((h, i) => {
    const id = 'section-' + i;
    h.id = id;
    const cls = h.tagName === 'H3' ? 'toc-h3' : '';
    html += `<a href="#${id}" class="${cls}">${h.textContent}</a>`;
  });
  tocEl.innerHTML = html;

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocEl.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        const link = tocEl.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = height > 0 ? (scrolled / height * 100) + '%' : '0%';
  }, { passive: true });
}

/* ---- Fade-in Observer ---- */
function initFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.innerHTML = menu.classList.contains('open')
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ---- SPA nav for cards ---- */
function initCardNav() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page = el.dataset.page;
      window.location.href = `page.html?p=${page}`;
    });
  });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initFadeIn();
  initMobileMenu();
  initCardNav();

  // If on content page, load from query param
  const params = new URLSearchParams(window.location.search);
  const pageId = params.get('p');
  if (pageId && document.getElementById('article-body')) {
    loadPage(pageId);
  }

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const p = new URLSearchParams(window.location.search).get('p');
    if (p && document.getElementById('article-body')) loadPage(p);
  });
});
