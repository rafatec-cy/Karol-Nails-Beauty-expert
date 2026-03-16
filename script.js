/* ============================================================
   GLAMOUR NAILS STUDIO — JavaScript Principal
   ============================================================
   
   Este archivo contiene toda la lógica interactiva del sitio:
   1. Configuración editable (imágenes, WhatsApp, etc.)
   2. Carrusel automático con controles
   3. Galería con lightbox
   4. Navbar con efecto scroll
   5. Menú hamburguesa móvil
   6. Animaciones al scroll
   7. Botón flotante de WhatsApp
   
   INSTRUCCIONES PARA EDITAR:
   ─────────────────────────────────────────────────────────────
   Busca las secciones marcadas con "CONFIGURACIÓN" para cambiar
   imágenes, número de WhatsApp y otros datos editables.
   
============================================================ */

/* ============================================================
   ★ CONFIGURACIÓN DEL CARRUSEL ★
   ─────────────────────────────────────────────────
   Para agregar o quitar imágenes del carrusel:
   1. Agrega tus fotos a la carpeta "carrucel/"
   2. Agrega el nombre del archivo al array de abajo
   3. Para quitar una imagen, elimina su nombre del array
   
   Ejemplo: Si agregas "nueva-foto.jpg" a la carpeta,
   agrega 'nueva-foto.jpg' al final del array.
============================================================ */
const carouselImages = [
    'carrucel/04108eb6-9ddb-48a8-9174-cb7342754a38.jpg',
    'carrucel/25d2c235-e25b-4bcb-98fd-f6f0495541b8.jpg',
    'carrucel/337cb26c-d565-4caf-8ea2-2f8a70d2302b.jpg',
    'carrucel/6e5947f5-8616-431c-b95f-4fb6b27d5cff.jpg',
    'carrucel/7904ee9c-4b41-4fc8-879f-7ac3fa5b838b.jpg',
    'carrucel/9549cc90-c988-492c-9068-a1b70db05c71.jpg',
    'carrucel/d86f5dfb-b946-4648-8b16-b212f92bbd70.jpg',
    'carrucel/e81d8c5d-e161-421e-9b2f-4b990cfc0f33.jpg',
    'carrucel/fd30fbf2-747c-42b9-a328-c611b5b77930.jpg'
];

/* ============================================================
   ★ CONFIGURACIÓN DE LA GALERÍA ★
   ─────────────────────────────────────────────────
   Para agregar o quitar imágenes de la galería:
   1. Agrega tus fotos a la carpeta "imagenes/"
   2. Agrega el nombre del archivo al array de abajo
   3. Para quitar una imagen, elimina su nombre del array
   
   Ejemplo: Si agregas "diseño-nuevo.jpg" a la carpeta,
   agrega 'diseño-nuevo.jpg' al final del array.
============================================================ */
const galleryImages = [
    'imagenes/1.jpeg',
    'imagenes/2.jpeg',
    'imagenes/3.jpeg',
    'imagenes/4.jpeg',
    'imagenes/6.jpeg',
    'imagenes/7.jpeg',
    'imagenes/8.jpeg',
    'imagenes/10.jpeg',
    'imagenes/11.jpeg',
    'imagenes/12.jpeg',
    'imagenes/13.jpeg',
    'imagenes/14.jpeg',
    'imagenes/15.jpeg',
    'imagenes/19.jpeg',
    'imagenes/20.jpeg',
    'imagenes/21.jpeg',
    'imagenes/24.jpeg',
    'imagenes/28.jpeg'
];

/* ============================================================
   ★ CONFIGURACIÓN DE WHATSAPP ★
   ─────────────────────────────────────────────────
   Cambia el número de WhatsApp y el mensaje predeterminado aquí.
   
   NÚMERO: Escribe el número con código de país, sin espacios,
           sin signos + ni guiones.
           Ejemplo Colombia: 573001234567
   
   MENSAJE: El texto que se envía al abrir el chat.
            Puedes usar %20 para espacios o escribir normal.
============================================================ */
const WHATSAPP_NUMBER = '573001234567';   // ← CAMBIA ESTE NÚMERO
const WHATSAPP_MESSAGE = '¡Hola! Me gustaría agendar una cita 💅';  // ← CAMBIA ESTE MENSAJE

/* ============================================================
   ★ CONFIGURACIÓN DEL CARRUSEL AUTOMÁTICO ★
   ─────────────────────────────────────────────────
   Cambia el tiempo entre cada transición (en milisegundos).
   4000 = 4 segundos
============================================================ */
const CAROUSEL_INTERVAL = 4000;  // ← Tiempo en milisegundos


/* ════════════════════════════════════════════════════════════
   A PARTIR DE AQUÍ NO NECESITAS EDITAR NADA
   (a menos que quieras personalizar la funcionalidad)
   ════════════════════════════════════════════════════════════ */


/* ============================================================
   INICIALIZACIÓN — Se ejecuta cuando el DOM está listo
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initGallery();
    initNavbar();
    initHamburger();
    initScrollAnimations();
    initWhatsApp();
    initSmoothScroll();
});


/* ============================================================
   1. CARRUSEL
   ─────────────────────────────────────────────────────────────
   Carrusel con transición suave, cambio automático,
   flechas y puntos indicadores.
============================================================ */
let currentSlide = 0;
let carouselTimer;
let isCarouselTransitioning = false;

function initCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!carouselInner || !dotsContainer) return;
    
    // Generar slides dinámicamente a partir del array de imágenes
    carouselImages.forEach(function(src, index) {
        // Crear slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Glamour Nails Studio - Imagen ' + (index + 1);
        img.loading = index === 0 ? 'eager' : 'lazy'; // Carga inmediata solo la primera
        
        slide.appendChild(img);
        carouselInner.appendChild(slide);
        
        // Crear punto indicador
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ir a imagen ' + (index + 1));
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    // Eventos de las flechas
    var prevBtn = document.getElementById('carouselPrev');
    var nextBtn = document.getElementById('carouselNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // Iniciar cambio automático
    startAutoPlay();
    
    // Pausar al pasar el mouse sobre el carrusel
    var carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Soporte para swipe en móvil
    initCarouselSwipe();
}

// Ir a un slide específico
function goToSlide(index) {
    if (isCarouselTransitioning || index === currentSlide) return;
    isCarouselTransitioning = true;
    
    var carouselInner = document.getElementById('carouselInner');
    var slides = carouselInner.querySelectorAll('.carousel-slide');
    var dots = document.querySelectorAll('.carousel-dot');
    
    // Quitar clase active del slide actual
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Actualizar índice y agregar clase active
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Mover el carrusel con transform
    carouselInner.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    
    // Resetear temporizador de transición
    setTimeout(function() {
        isCarouselTransitioning = false;
    }, 800);
}

// Slide siguiente
function nextSlide() {
    var next = (currentSlide + 1) % carouselImages.length;
    goToSlide(next);
}

// Slide anterior
function prevSlide() {
    var prev = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
    goToSlide(prev);
}

// Auto-play del carrusel
function startAutoPlay() {
    stopAutoPlay();
    carouselTimer = setInterval(nextSlide, CAROUSEL_INTERVAL);
}

function stopAutoPlay() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

// Swipe táctil para móvil
function initCarouselSwipe() {
    var carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    var startX = 0;
    var endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX;
        var diff = startX - endX;
        
        // Si el swipe es mayor a 50px, cambiar slide
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();  // Swipe izquierda = siguiente
            } else {
                prevSlide();  // Swipe derecha = anterior
            }
        }
    }, { passive: true });
}


/* ============================================================
   2. GALERÍA CON LIGHTBOX
   ─────────────────────────────────────────────────────────────
   Grid de imágenes con efecto hover y lightbox al click.
============================================================ */
let currentLightboxIndex = 0;

function initGallery() {
    var galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Generar items de la galería dinámicamente
    galleryImages.forEach(function(src, index) {
        var item = document.createElement('div');
        item.className = 'gallery-item';
        // Animación escalonada de entrada
        item.style.animationDelay = (index * 0.05) + 's';
        
        var img = document.createElement('img');
        img.src = src;
        img.alt = 'Diseño de uñas ' + (index + 1);
        img.loading = 'lazy'; // Carga diferida para rendimiento
        
        item.appendChild(img);
        
        // Click para abrir lightbox
        item.addEventListener('click', function() {
            openLightbox(index);
        });
        
        galleryGrid.appendChild(item);
    });
    
    // Eventos del lightbox
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    var lightbox = document.getElementById('lightbox');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            lightboxPrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            lightboxNext();
        });
    }
    
    // Cerrar lightbox al hacer click fuera de la imagen
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }
    
    // Cerrar lightbox con tecla Escape, navegar con flechas
    document.addEventListener('keydown', function(e) {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev();
        } else if (e.key === 'ArrowRight') {
            lightboxNext();
        }
    });
}

// Abrir lightbox con la imagen seleccionada
function openLightbox(index) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var counter = document.getElementById('lightboxCounter');
    
    if (!lightbox || !lightboxImg) return;
    
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index];
    lightboxImg.alt = 'Diseño de uñas ' + (index + 1);
    
    if (counter) {
        counter.textContent = (index + 1) + ' / ' + galleryImages.length;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

// Cerrar lightbox
function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Lightbox: imagen anterior
function lightboxPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Lightbox: imagen siguiente
function lightboxNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Actualizar imagen del lightbox
function updateLightboxImage() {
    var lightboxImg = document.getElementById('lightboxImg');
    var counter = document.getElementById('lightboxCounter');
    
    if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        
        setTimeout(function() {
            lightboxImg.src = galleryImages[currentLightboxIndex];
            lightboxImg.alt = 'Diseño de uñas ' + (currentLightboxIndex + 1);
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    }
    
    if (counter) {
        counter.textContent = (currentLightboxIndex + 1) + ' / ' + galleryImages.length;
    }
}


/* ============================================================
   3. NAVBAR — Efecto al hacer scroll
   ─────────────────────────────────────────────────────────────
   Agrega la clase "scrolled" al navbar cuando se baja más de 80px.
   Esto cambia fondo, tamaño y sombra (ver style.css).
============================================================ */
function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Verificar posición inicial
    handleNavbarScroll();
    
    // Listener optimizado con requestAnimationFrame
    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Resaltar el link activo según la sección visible
function updateActiveNavLink() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    var scrollPos = window.scrollY + 150;
    
    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}


/* ============================================================
   4. MENÚ HAMBURGUESA (Móvil)
   ─────────────────────────────────────────────────────────────
   Abre/cierra el menú lateral en dispositivos móviles.
============================================================ */
function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    var navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle del menú
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}


/* ============================================================
   5. ANIMACIONES AL SCROLL
   ─────────────────────────────────────────────────────────────
   Detecta cuando los elementos entran en el viewport
   y les agrega la clase "animate-in" para activar la animación.
   Usa IntersectionObserver para rendimiento óptimo.
============================================================ */
function initScrollAnimations() {
    // Agregar clase animate-on-scroll a los elementos que queremos animar
    var elementsToAnimate = document.querySelectorAll(
        '.section-header, .service-category, .contact-card, .gallery-item'
    );
    
    elementsToAnimate.forEach(function(el) {
        if (!el.classList.contains('gallery-item')) {
            el.classList.add('animate-on-scroll');
        }
    });
    
    // Verificar si IntersectionObserver está disponible
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Solo animar una vez
                }
            });
        }, {
            threshold: 0.1,     // Se activa cuando el 10% del elemento es visible
            rootMargin: '0px 0px -50px 0px'  // Margen para activar un poco antes
        });
        
        elementsToAnimate.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback: mostrar todo sin animación
        elementsToAnimate.forEach(function(el) {
            el.classList.add('animate-in');
        });
    }
}


/* ============================================================
   6. WHATSAPP — Configuración de enlaces
   ─────────────────────────────────────────────────────────────
   Configura el botón flotante y los botones de "Agendar por
   WhatsApp" en las tarjetas de servicios.
============================================================ */
function initWhatsApp() {
    // Generar URL de WhatsApp
    var whatsappBaseUrl = 'https://wa.me/' + WHATSAPP_NUMBER;
    var whatsappUrl = whatsappBaseUrl + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    
    // Botón flotante
    var floatBtn = document.getElementById('whatsappFloat');
    if (floatBtn) {
        floatBtn.href = whatsappUrl;
    }
    
    // Botones "Agendar por WhatsApp" en las cards de servicios
    var agendarBtns = document.querySelectorAll('.btn-agendar');
    agendarBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var service = btn.getAttribute('data-service') || '';
            var message = '¡Hola! Me gustaría agendar una cita para ' + service + ' 💅';
            var url = whatsappBaseUrl + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank');
        });
    });
}


/* ============================================================
   7. SMOOTH SCROLL — Navegación suave
   ─────────────────────────────────────────────────────────────
   Navegación suave al hacer click en los enlaces del menú.
   (Complementa el CSS scroll-behavior: smooth)
============================================================ */
function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offsetTop = target.offsetTop - 70; // Compensar alto del navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
