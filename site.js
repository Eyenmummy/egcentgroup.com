(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
  }
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length) {
    const dots = [...document.querySelectorAll('.hero-dots button')];
    const caption = document.querySelector('.slide-caption');
    let current = 0;
    const show = index => { current = (index + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === current)); dots.forEach((dot, i) => dot.classList.toggle('active', i === current)); if (caption) caption.textContent = slides[current].getAttribute('aria-label'); };
    document.querySelector('.hero-prev')?.addEventListener('click', () => show(current - 1));
    document.querySelector('.hero-next')?.addEventListener('click', () => show(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.slide))));
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => show(current + 1), 6500);
  }
  document.querySelectorAll('.listing-card').forEach(card => {
    const images = [...card.querySelectorAll('.listing-images img')];
    if (images.length < 2) return;
    let current = 0;
    const show = i => { current = (i + images.length) % images.length; images.forEach((img, n) => img.classList.toggle('active', n === current)); };
    card.querySelector('.slide-prev')?.addEventListener('click', () => show(current - 1));
    card.querySelector('.slide-next')?.addEventListener('click', () => show(current + 1));
    let touchX = 0;
    card.querySelector('.listing-media')?.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    card.querySelector('.listing-media')?.addEventListener('touchend', e => { const delta = e.changedTouches[0].clientX - touchX; if (Math.abs(delta) > 45) show(current + (delta < 0 ? 1 : -1)); }, { passive: true });
  });
  const filters = [...document.querySelectorAll('.filter-button')];
  if (filters.length) {
    const cards = [...document.querySelectorAll('.catalogue .listing-card')];
    const count = document.querySelector('.results-count');
    const showcase = document.querySelector('.category-showcase');
    const categories = Object.fromEntries(filters.map(button => [button.dataset.filter, button.textContent.trim()]));
    let collection = [], selectedIndex = 0, rotation;
    const showFeatured = index => {
      if (!showcase || !collection.length) return;
      selectedIndex = (index + collection.length) % collection.length;
      const card = collection[selectedIndex];
      const image = card.querySelector('.listing-images img');
      const displayImage = showcase.querySelector('.showcase-photo img');
      displayImage.src = image.src;
      displayImage.alt = image.alt || card.querySelector('h3').textContent;
      showcase.querySelector('.showcase-category').textContent = categories[card.dataset.category];
      showcase.querySelector('.showcase-title').textContent = card.querySelector('h3').textContent;
      showcase.querySelector('.showcase-location').textContent = card.querySelector('.listing-location').textContent;
      showcase.querySelector('.showcase-price').textContent = card.querySelector('.listing-price').textContent;
      const enquiry = card.querySelector('.listing-bottom a');
      const action = showcase.querySelector('.showcase-enquire');
      action.href = enquiry.href;
      action.textContent = card.dataset.category === 'shortlet' ? 'Book →' : 'Enquire →';
      showcase.querySelector('.showcase-position').textContent = `${String(selectedIndex + 1).padStart(2, '0')} / ${String(collection.length).padStart(2, '0')}`;
    };
    const restart = () => {
      clearInterval(rotation);
      if (collection.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        rotation = setInterval(() => showFeatured(selectedIndex + 1), 5500);
    };
    showcase?.querySelector('.showcase-prev')?.addEventListener('click', () => { showFeatured(selectedIndex - 1); restart(); });
    showcase?.querySelector('.showcase-next')?.addEventListener('click', () => { showFeatured(selectedIndex + 1); restart(); });
    showcase?.addEventListener('mouseenter', () => clearInterval(rotation));
    showcase?.addEventListener('mouseleave', restart);
    const apply = category => {
      const selected = Object.hasOwn(categories, category) ? category : 'all';
      let visible = 0;
      cards.forEach(card => { const show = selected === 'all' || card.dataset.category === selected; card.hidden = !show; if (show) visible++; });
      filters.forEach(button => { const active = button.dataset.filter === selected; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
      if (count) count.textContent = `${visible} ${visible === 1 ? 'property' : 'properties'} available to explore`;
      const empty = document.querySelector('.empty-results'); if (empty) empty.hidden = visible > 0;
      collection = selected === 'all' || selected === 'commercial' ? [] : cards.filter(card => card.dataset.category === selected);
      if (showcase) showcase.hidden = collection.length === 0;
      selectedIndex = 0;
      if (collection.length) showFeatured(0);
      restart();
    };
    filters.forEach(button => button.addEventListener('click', () => { const category = button.dataset.filter; history.replaceState(null, '', category === 'all' ? location.pathname : `#${category}`); apply(category); }));
    window.addEventListener('hashchange', () => apply(location.hash.slice(1)));
    apply(location.hash.slice(1));
  }
})();
