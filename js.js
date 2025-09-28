document.addEventListener('DOMContentLoaded', () => {
    
    // ========================= 1. MODO OSCURO/CLARO =========================
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    function toggleMode() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            modeToggle.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            modeToggle.textContent = 'Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Cargar el tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        modeToggle.textContent = 'Modo Oscuro';
    }

    modeToggle.addEventListener('click', toggleMode);


    // ========================= 2. MENÚ HAMBURGUESA =========================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); 
        });

        // Ocultar el menú al hacer clic en un enlace (solo en móvil)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { 
                    navLinks.classList.remove('active');
                }
            });
        });
    }


    // ========================= 3. CARRUSEL DE TESTIMONIOS =========================
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const nextButton = document.querySelector('.carousel-nav .next');
    const prevButton = document.querySelector('.carousel-nav .prev');
    let currentIndex = 0;

    const updateCarousel = () => {
        if (!track || slides.length === 0) return;
        
        const containerWidth = track.parentElement.clientWidth; 
        
        track.style.transform = `translateX(-${currentIndex * containerWidth}px)`; 
    };

    if (track) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateCarousel();
        });

        // Ajustar el carrusel al redimensionar la ventana
        window.addEventListener('resize', updateCarousel);
        
        updateCarousel(); 
    }


    // ========================= 4. CONTADOR Y FORMULARIO =========================
    // Contador del Reto Grimorio 2025 (Animado)
    const challengeCounter = document.getElementById('challenge-counter');
    let currentCount = 154; 
    let lastTime = 0;
    const intervalTime = 5000; 

    if (challengeCounter) {
        const animateCount = (timestamp) => {
            if (!lastTime) lastTime = timestamp;

            const elapsed = timestamp - lastTime;

            if (elapsed > intervalTime) {
                currentCount += Math.floor(Math.random() * 5); 
                
                challengeCounter.textContent = String(currentCount).padStart(4, '0');
                
                if (currentCount > 9999) {
                    currentCount = 9999; 
                    challengeCounter.textContent = "9999+";
                    return; 
                }
                
                lastTime = timestamp;
            }

            requestAnimationFrame(animateCount);
        };
        
        requestAnimationFrame(animateCount); 
    }
    
    // Simulación de envío de formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const button = contactForm.querySelector('button[type="submit"]');
            button.textContent = 'Enviando...';
            button.disabled = true;

            setTimeout(() => {
                alert('Mensaje enviado. ¡Gracias por contactarnos! (Simulación)');
                contactForm.reset();
                button.textContent = 'Enviar Mensaje';
                button.disabled = false;
            }, 1500); 
        });
    }
});