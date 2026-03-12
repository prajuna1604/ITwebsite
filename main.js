document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  // Banner slider
  const bannerTrack = document.getElementById('sliderTrack');
  const bannerPrev = document.getElementById('prevBtn');
  const bannerNext = document.getElementById('nextBtn');
  const bannerDots = document.getElementById('dots');

  if (bannerTrack && bannerPrev && bannerNext && bannerDots) {
    const cards = Array.from(bannerTrack.children);
    const gap = 24; 
    let currentIndex = 0;

    function visibleCount() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, cards.length - visibleCount());
    }

    function stepWidth() {
      return cards[0].offsetWidth + gap;
    }

    function slideTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex()));
      bannerTrack.style.transform = `translateX(-${currentIndex * stepWidth()}px)`;
      updateDots();
    }

    function buildDots() {
      bannerDots.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('button');
        dot.className =
          `h-[3px] rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-blue-500' : 'w-6 bg-white/20'}`;
        dot.addEventListener('click', () => slideTo(i));
        bannerDots.appendChild(dot);
      }
    }

    function updateDots() {
      bannerDots.querySelectorAll('button').forEach((dot, i) => {
        dot.className =
          `h-[3px] rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-blue-500' : 'w-6 bg-white/20'}`;
      });
    }

    bannerPrev.addEventListener('click', () => slideTo(currentIndex - 1));
    bannerNext.addEventListener('click', () => slideTo(currentIndex + 1));

    window.addEventListener('resize', () => {
      buildDots();
      slideTo(Math.min(currentIndex, maxIndex()));
    });

    buildDots();
    slideTo(0);
  }
  // Dropdowns
  document.querySelectorAll("li.relative").forEach((item) => {
    const btn = item.querySelector(".solutionBtn, .companyBtn, .productsBtn, .lifeHereBtn");
    const dropdown = item.querySelector(".solutionDropdown, .companyDropdown, .productsDropdown, .lifeHereDropdown");
    if (!btn || !dropdown) return;

    let hoverTimeout;
    const open = () => { clearTimeout(hoverTimeout); dropdown.classList.remove("hidden"); };
    const close = () => { hoverTimeout = setTimeout(() => dropdown.classList.add("hidden"), 150); };

    btn.addEventListener("click", (e) => { e.stopPropagation(); dropdown.classList.toggle("hidden"); });
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    if (window.innerWidth >= 1024) {
      btn.addEventListener("mouseenter", open);
      dropdown.addEventListener("mouseenter", open);
      btn.addEventListener("mouseleave", close);
      dropdown.addEventListener("mouseleave", close);
    }
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".solutionDropdown, .companyDropdown, .productsDropdown, .lifeHereDropdown")
      .forEach(menu => menu.classList.add("hidden"));
  });
  // Careers slider
  const careerTrack = document.getElementById('careersliderTrack');
  const careerPrev = document.getElementById("careersprevBtn");
  const careerNext = document.getElementById("careersnextBtn");

  if (careerTrack && careerPrev && careerNext) {
    const slides = Array.from(careerTrack.children);
    let index = 0;

    function getSlideWidth() {
      const gap = parseInt(getComputedStyle(careerTrack).gap) || 0;
      return slides[0].offsetWidth + gap;
    }

    function updateSlider() {
      const width = getSlideWidth();
      careerTrack.style.transform = `translateX(-${index * width}px)`;
      careerTrack.style.transition = "transform 0.5s ease-in-out";
    }

    careerNext.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlider();
    });

    careerPrev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();

    // Mobile swipe
    let startX = 0, isDragging = false;
    careerTrack.addEventListener("touchstart", e => { startX = e.touches[0].clientX; isDragging = true; careerTrack.style.transition = "none"; });
    careerTrack.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      careerTrack.style.transform = `translateX(${-index * getSlideWidth() + deltaX}px)`;
    });
    careerTrack.addEventListener("touchend", e => {
      isDragging = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX > 50) index = (index - 1 + slides.length) % slides.length;
      else if (deltaX < -50) index = (index + 1) % slides.length;
      updateSlider();
    });
  }

// Testimonials slider
const testimonialTrack = document.querySelector(".testimonial-slider .slider-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

if (testimonialTrack && testimonialPrev && testimonialNext) {

  let index = 0;

  function getWidth() {
    const gap = parseInt(getComputedStyle(testimonialTrack).gap) || 0;
    return testimonialCards[0].offsetWidth + gap;
  }

  function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${index * getWidth()}px)`;
  }

  testimonialNext.addEventListener("click", () => {
    if (index < testimonialCards.length - 1) {
      index++;
    } else {
      index = 0;
    }
    updateSlider();
  });

  testimonialPrev.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = testimonialCards.length - 1;
    }
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);

}
  // mouse enter on carrrer links

  const links = document.querySelectorAll(".career-link");
const textEl = document.getElementById("careerText");
const imgEl = document.getElementById("careerImg");

links.forEach(link => {

  link.addEventListener("mouseenter", () => {
    textEl.textContent = link.dataset.text;
    imgEl.src = link.dataset.img;
    links.forEach(l => {
      l.classList.remove("font-bold", "border-black");
      l.classList.add("font-semibold");
    });

    link.classList.add("font-bold", "border-black");
  });

});
// blogs slide
const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        tabButtons.forEach(btn => {
          btn.classList.remove('active','text-white');
          btn.classList.add( 'text-gray-700');
        });
        this.classList.add('active','text-blue-600');
        this.classList.remove('bg-gray-100', 'text-gray-700');

        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.add('hidden');
          content.classList.remove('active');
        });

        // Show selected tab content
        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
          selectedContent.classList.remove('hidden');
          selectedContent.classList.add('active');
        }
      });
    });
const faqBtns = document.querySelectorAll(".faq-btn");

faqBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    const content = btn.nextElementSibling;

    // Close all other FAQ contents
    document.querySelectorAll(".faq-content").forEach(item => {
      if (item !== content) {
        item.classList.add("hidden");
      }
    });

    // Toggle current FAQ
    content.classList.toggle("hidden");

  });
});
    
});