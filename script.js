// Petit script pour charger les images (lazy), afficher la date de mise à jour et gérer le modal

function updateLastUpdated(){
  // Si tu veux: remplacer par une date injectée dynamiquement depuis ton script de génération
  const el = document.getElementById('lastUpdated');
  const now = new Date();
  el.textContent = now.toLocaleString('fr-FR', {year:'numeric',month:'2-digit',day:'2-digit', hour:'2-digit', minute:'2-digit'});
}

function lazyLoad(){
  const imgs = document.querySelectorAll('img.lazy');
  imgs.forEach(img => {
    const src = img.getAttribute('data-src');
    if(!src) return;
    // Charge l'image et remplace src
    const tmp = new Image();
    tmp.onload = () => {
      img.src = src;
      img.classList.remove('lazy');
    }
    tmp.onerror = () => {
      // image manquante => image de placeholder
      img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#101827" /><text x="50%" y="50%" fill="#9aa4b2" font-size="20" dominant-baseline="middle" text-anchor="middle">Image introuvable</text></svg>';
    }
    tmp.src = src + '?v=' + Date.now(); // force refresh si même nom (cache-busting)
  });
}

function setupModal(){
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('figure.card');
    if(!card) return;
    const img = card.querySelector('img');
    if(!img) return;
    modalImg.src = img.src || img.getAttribute('data-src');
    modalCaption.textContent = card.querySelector('figcaption')?.textContent || '';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
}

// refresh button to reload images (useful after a git update)
function setupRefresh(){
  const btn = document.getElementById('refreshBtn');
  btn.addEventListener('click', () => {
    lazyLoad();
    updateLastUpdated();
  });
}

// init
document.addEventListener('DOMContentLoaded', () => {
  updateLastUpdated();
  lazyLoad();
  setupModal();
  setupRefresh();
});
