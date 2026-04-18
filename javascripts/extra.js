/* ============================================================
   Game Combat 2D — extra.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Wrap key cells in <kbd> ── */
  const KEY = /^(A|D|S|W|J|K|L|Espacio|Flecha\s.+|Numpad\s\d+)$/i;
  document.querySelectorAll('table td').forEach(td => {
    const t = td.textContent.trim();
    if (KEY.test(t) && !td.querySelector('kbd,code')) {
      td.innerHTML = `<kbd>${t}</kbd>`;
    }
  });

  /* ── Add title prefix to admonitions for IDE feel ── */
  document.querySelectorAll('.admonition-title').forEach(el => {
    const parent = el.closest('.admonition');
    if (!parent) return;
    const cls = [...parent.classList].find(c =>
      ['note','info','tip','success','warning','caution','danger','error','abstract','check'].includes(c)
    );
    if (cls && !el.dataset.prefixed) {
      el.textContent = `// ${el.textContent}`;
      el.dataset.prefixed = '1';
    }
  });

});