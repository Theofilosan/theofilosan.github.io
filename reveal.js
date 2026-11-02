// Scroll reveals: sections fade and rise once as they enter the viewport.
// Respects prefers-reduced-motion and stays inert without IntersectionObserver.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.content-section .section-intro, .skill-card, .experience-item, .work-card, .more-grid > div');
    targets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    targets.forEach(el => observer.observe(el));
}
