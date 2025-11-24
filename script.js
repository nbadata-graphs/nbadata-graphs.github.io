document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelectorAll('.team-logo');
  const graphImage = document.getElementById('graphImage');

  logos.forEach(logo => {
    logo.addEventListener('click', () => {
      // Changer le graphique
      const graphSrc = logo.getAttribute('data-graph');
      graphImage.src = graphSrc;
      graphImage.alt = `Graphique ${logo.alt}`;

      // Ajouter une classe “sélectionné” pour le logo actif
      logos.forEach(l => l.classList.remove('active'));
      logo.classList.add('active');
    });

    // Animation hover
    logo.addEventListener('mouseenter', () => {
      logo.classList.add('hovered');
    });
    logo.addEventListener('mouseleave', () => {
      logo.classList.remove('hovered');
    });
  });
});
