$( document ).ready(function() {
// JQUERY READY START

// Background Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.control_prev');
    const nextButton = document.querySelector('.control_next');
    let currentSlide = 0;
    let slideInterval;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
        });
        slides[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Initialize
    updateSlides();
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slideshow if on homepage
if (document.querySelector('.background_slideshow')) {
    initSlideshow();
}

/* // Define image frormat for slideshow on homepage
window.addEventListener('DOMContentLoaded', setSlideFormat);
window.addEventListener('resize', setSlideFormat);
function setSlideFormat() {
    const slide = document.querySelector('.slide.active img'); // Get the <img> inside .slide
    if (!slide) return; // Guard clause in case the element isn't found

    if (window.innerWidth > 810) {
        slide.setAttribute("class", "mobile"); 
    } else {
        slide.setAttribute("class", "desktop"); 
    }
}
     */
    
// Logo hover effects
document.getElementById("logo").onmouseover = function(){
   if (window.innerWidth > 480) { // Only show on hover for desktop
      document.getElementById("navbar_container").style["display"] = "block";
      if (document.body.classList.contains("project_page")) {
         document.getElementById("logo").src = "../img/Tom_Logo_White.png";
      }
   }
}

document.getElementById("navbar_container").onmouseleave = function(){
   if (window.innerWidth > 480) { // Only hide on leave for desktop
      document.getElementById("navbar_container").style["display"] = "none";
      if (document.body.classList.contains("project_page")) {
         document.getElementById("logo").src = "../img/Tom_Logo_White.png";
      }
   }
}

// Initialize gallery if on project page
if (document.querySelector('.project_gallery')) {
    // Dynamically set gallery height based on .project_content height
    function setGalleryHeight() {
        const gallery = document.querySelector('.project_gallery');
        const content = document.querySelector('.project_content');
        if (!gallery || !content) return;
        // Only run on mobile/tablet
        if (window.innerWidth > 810) {
            gallery.style.height = '';
            return;
        }
        const contentRect = content.getBoundingClientRect();
        const contentHeight = contentRect.height;
        gallery.style.height = `calc(100% - ${contentHeight}px)`;
    }
    // On load and resize
    window.addEventListener('resize', setGalleryHeight);
    setGalleryHeight();
    // Observe content height changes
    const content = document.querySelector('.project_content');
    if (window.ResizeObserver && content) {
        const ro = new ResizeObserver(setGalleryHeight);
        ro.observe(content);
    }

    const gallery = document.querySelector('.project_gallery');
    const sliderDot = document.querySelector('.slider_dot');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Mouse wheel scrolling
    gallery.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            this.scrollLeft += 100;
        } else {
            this.scrollLeft -= 100;
        }
        e.preventDefault();
    });

    // Mouse down event
    gallery.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - this.offsetLeft;
        scrollLeft = this.scrollLeft;
    });

    // Mouse up event (on document to ensure it's always caught)
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Mouse move event
    gallery.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - this.offsetLeft;
        const walk = (x - startX) * 2;
        this.scrollLeft = scrollLeft - walk;
    });

    function updateSliderPosition() {
        const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
        const scrollPosition = gallery.scrollLeft;
        const percentage = scrollPosition / scrollWidth;
        
        sliderDot.style.left = `${percentage * 100}%`;
    }

    gallery.addEventListener('scroll', updateSliderPosition);
    updateSliderPosition();
}

// Mobile menu toggle
function setupMobileMenu() {
    const logo = document.getElementById('logo');
    const navbar = document.getElementById('navbar_container');
    const logoLink = logo.parentElement;

    if (window.innerWidth <= 810) { // Updated to include tablet breakpoint
        // Mobile/Tablet behavior
        logoLink.href = "#";
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            //navbar.classList.toggle('visible'); THIS IS THE OLD BEHAVIOR THAT WAS BROKEN
            document.getElementById("navbar_container").style["display"] = "block";
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && !logo.contains(event.target)) {
                //navbar.classList.remove('visible'); THIS IS THE OLD BEHAVIOR THAT WAS BROKEN
                document.getElementById("navbar_container").style["display"] = "none";
            }
        });
    } else {
        // Desktop behavior
        logoLink.href = "file:///C:/Users/uat/Desktop/Frontend%20course/Uat%20ponto%20com%20Prod%201/index.html";
        logo.removeEventListener('click', function() {});
    }
}

// Initial setup
setupMobileMenu();

// Update on window resize
window.addEventListener('resize', setupMobileMenu);

// JQUERY READY ENDS
});