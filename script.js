'use strict';
const grid = document.querySelector('#work-grid');
const filters = document.querySelector('.filters');
const dialog = document.querySelector('#art-dialog');
let selectedSeries = '全部作品';
let currentIndex = 0;
let returnFocus;
const visibleWorks = () => portfolio.works.filter(w => selectedSeries === '全部作品' || w.series === selectedSeries);
function renderWorks() {
  grid.replaceChildren();
  visibleWorks().forEach((work, i) => {
    const article = document.createElement('article');
    article.className = 'work-card';
    const button = document.createElement('button');
    button.className = 'work-image';
    button.setAttribute('aria-label', `查看示例作品：${work.title}`);
    const img = document.createElement('img');
    img.src = work.image; img.alt = work.alt; img.loading = 'lazy'; img.width = 700; img.height = 850;
    button.append(img);
    const mark = document.createElement('span'); mark.className = 'work-number'; mark.textContent = `0${i + 1} / 示例作品 ↗`; button.append(mark);
    button.addEventListener('click', () => openWork(work.id));
    const heading = document.createElement('h3'); heading.textContent = work.title;
    const year = document.createElement('span'); year.textContent = work.year;
    const titleRow = document.createElement('div'); titleRow.className = 'work-title'; titleRow.append(heading, year);
    const meta = document.createElement('p'); meta.textContent = `${work.medium} · ${work.size}`;
    article.append(button, titleRow, meta); grid.append(article);
  });
}
['全部作品', ...new Set(portfolio.works.map(w => w.series))].forEach(series => {
  const button = document.createElement('button'); button.textContent = series;
  button.setAttribute('aria-pressed', String(series === selectedSeries));
  button.addEventListener('click', () => {
    selectedSeries = series;
    filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    renderWorks();
  }); filters.append(button);
});
function updateDialog() {
  const work = portfolio.works[currentIndex];
  const img = document.querySelector('#dialog-image'); img.src = work.image; img.alt = work.alt;
  document.querySelector('#dialog-title').textContent = work.title;
  document.querySelector('#dialog-series').textContent = work.series;
  const meta = document.querySelector('#dialog-meta'); meta.replaceChildren();
  [['年份', work.year], ['材料', work.medium], ['尺寸', work.size]].forEach(([label, value]) => {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value; meta.append(dt, dd);
  });
  document.querySelector('#dialog-description').textContent = work.description;
}
function openWork(id) {
  currentIndex = portfolio.works.findIndex(w => w.id === id);
  if (currentIndex < 0) return;
  returnFocus = document.activeElement; updateDialog(); dialog.showModal(); document.body.classList.add('modal-open');
}
document.querySelector('[data-open]').addEventListener('click', e => openWork(e.currentTarget.dataset.open));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus(); });
function stepWork(step) { currentIndex = (currentIndex + step + portfolio.works.length) % portfolio.works.length; updateDialog(); }
document.querySelector('#previous-work').addEventListener('click', () => stepWork(-1));
document.querySelector('#next-work').addEventListener('click', () => stepWork(1));
dialog.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); stepWork(e.key === 'ArrowLeft' ? -1 : 1); } });
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); } });
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) nav.querySelectorAll('a').forEach(a => { if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -55% 0px' });
document.querySelectorAll('main > section').forEach(s => observer.observe(s));
const contact = document.querySelector('#contact-links');
for (const [label, value] of [['邮箱', portfolio.contact.email], ['wechat', portfolio.contact.wechat]]) {
  const row = document.createElement('div'); row.className = 'contact-row';
  const name = document.createElement('span'); name.textContent = label; row.append(name);
  const valid = label === '邮箱' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : /^https:\/\/(www\.)?wechat\.com\/[^\s]+$/i.test(value);
  const target = document.createElement(valid ? 'a' : 'span'); target.textContent = valid ? (label === '邮箱' ? value : '访问 wechat ↗') : '待填写';
  if (valid) { target.href = label === '邮箱' ? 'mailto:' + value : value; if (label === 'wechat') { target.target = '_blank'; target.rel = 'noopener noreferrer'; } }
  row.append(target); contact.append(row);
}
document.querySelector('#year').textContent = new Date().getFullYear();
renderWorks();
