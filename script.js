/* ============================================================
   CHEIRO VERDE — comportamento da página
   Sem dependências externas, JS puro.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile: abre/fecha o painel de navegação ----
     O estado "aberto/fechado" fica em duas fontes que precisam
     ficar sincronizadas: o atributo aria-expanded do botão (pra
     leitores de tela) e o data-open do próprio menu (pro CSS). */
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');

  function fecharMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('data-open', 'false');
  }

  function alternarMenu() {
    const aberto = menu.getAttribute('data-open') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!aberto));
    menu.setAttribute('data-open', String(!aberto));
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', alternarMenu);

    // Fecha o menu assim que a pessoa toca em algum link,
    // para não ficar um painel aberto cobrindo a seção pra onde ela foi.
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', fecharMenu);
    });

    // Fecha o menu se a tela for redimensionada para o layout
    // de desktop (onde o menu vira barra horizontal fixa).
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 960) fecharMenu();
    });
  }

  /* ---- Sombra na barra fixa ao rolar a página ----
     Só um toque sutil de profundidade quando sai do topo,
     sem animação repetida em cada seção. */
  const topbar = document.getElementById('topbar');
  function atualizarSombraTopbar() {
    if (window.scrollY > 8) {
      topbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.35)';
    } else {
      topbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.25)';
    }
  }
  atualizarSombraTopbar();
  window.addEventListener('scroll', atualizarSombraTopbar, { passive: true });

  /* ---- Ano do rodapé ----
     Evita ter que lembrar de atualizar o HTML todo ano. */
  const anoEl = document.querySelector('.rodape__ano');
  if (anoEl) {
    anoEl.textContent = `© ${new Date().getFullYear()} Cheiro Verde`;
  }
});
