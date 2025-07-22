let slideIndex = 1;
let slideTimer;

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  showSlides(slideIndex);
  startAutoSlide();
});

// Main slideshow function
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  // Hide all slides with fade out
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('fade');
    slides[i].style.display = "none";
  }
  
  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  
  // Show current slide and activate corresponding dot with fade in
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add('fade');
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
}

// Next/Previous controls
function changeSlide(n) {
  clearTimeout(slideTimer);
  slideIndex += n;
  showSlides(slideIndex);
  startAutoSlide();
}

// Current slide (for dots)
function currentSlide(n) {
  clearTimeout(slideTimer);
  slideIndex = n;
  showSlides(slideIndex);
  startAutoSlide();
}

// Auto-advance slides
function nextSlide() {
  slideIndex++;
  showSlides(slideIndex);
  startAutoSlide();
}

// Start auto-slide timer
function startAutoSlide() {
  slideTimer = setTimeout(nextSlide, 6000); // Change slide every 6 seconds
}

// Pause slideshow on hover
document.addEventListener('DOMContentLoaded', function() {
  const slideshowContainer = document.querySelector('.slideshow-container');
  
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', function() {
      clearTimeout(slideTimer);
    });
    
    slideshowContainer.addEventListener('mouseleave', function() {
      startAutoSlide();
    });
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (event.key === 'ArrowRight') {
    changeSlide(1);
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
  const slideshowContainer = document.querySelector('.slideshow-container');
  
  if (slideshowContainer) {
    slideshowContainer.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].screenX;
    });
    
    slideshowContainer.addEventListener('touchend', function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    });
  }
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1);
    } else {
      // Swipe right - previous slide
      changeSlide(-1);
    }
  }
}

// Preload images for better performance
function preloadImages() {
  const slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    const img = slides[i].querySelector('img');
    if (img && img.src) {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    }
  }
}

// Initialize preloading when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);
