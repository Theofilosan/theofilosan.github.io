document.addEventListener("DOMContentLoaded", function() {
    const statement = document.querySelector('.hero-statement');
    if (statement) {
        const text = statement.textContent;
        statement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                statement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        }
        
        // Use Intersection Observer to start the animation only when the section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500); // Small delay before starting
                    observer.unobserve(statement);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statement);
    }
});
