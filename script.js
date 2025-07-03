// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll("a[href^=\"#\"]");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animateElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .product-card, .contact-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Staggered animations for grids
  const featureCards = document.querySelectorAll(".feature-card");
  const benefitCards = document.querySelectorAll(".benefit-card");
  const productCards = document.querySelectorAll(".product-card");

  function addStaggeredAnimation(elements, baseDelay = 100) {
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * baseDelay}ms`;
    });
  }

  addStaggeredAnimation(featureCards);
  addStaggeredAnimation(benefitCards);
  addStaggeredAnimation(productCards);

  // Hero stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + (target === 100 ? "%" : target === 0 ? "" : "+");
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (target === 100 ? "%" : target === 0 ? "" : "+");
      }
    }

    // Only animate if the element is visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(element);
  }

  // Trigger counter animation when hero is in view
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    const targets = [100, 0, 5]; // 100%, 0, 5+
    statNumbers.forEach((stat, index) => {
      animateCounter(stat, targets[index]);
    });
  }

  // Product card hover effects
  const productCards2 = document.querySelectorAll(".product-card");

  productCards2.forEach((card) => {
    const image = card.querySelector(".product-image img");

    card.addEventListener("mouseenter", function () {
      if (image) {
        image.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (image) {
        image.style.transform = "scale(1)";
      }
    });
  });

  // Platform button click tracking
  const platformBtns = document.querySelectorAll(".platform-btn");

  platformBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const platform = this.querySelector("span").textContent;

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // In a real app, this would redirect to the actual platform
      console.log(`Redirecting to ${platform}...`);
    });
  });

  // Parallax effect for hero background
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground && scrolled < window.innerHeight) {
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Animate hero elements on load
    const heroTitle = document.querySelector(".hero-title");
    const heroDescription = document.querySelector(".hero-description");
    const heroButtons = document.querySelector(".hero-buttons");

    if (heroTitle) {
      heroTitle.style.animation = "fadeInUp 1s ease-out 0.2s both";
    }
    if (heroDescription) {
      heroDescription.style.animation = "fadeInUp 1s ease-out 0.4s both";
    }
    if (heroButtons) {
      heroButtons.style.animation = "fadeInUp 1s ease-out 0.6s both";
    }
  });

  // Add scroll progress indicator
  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--brand-dark-green), var(--complementary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });

  // Quick View Modal Functionality
  const quickViewModal = document.getElementById("quickViewModal");
  const closeButton = document.querySelector(".modal .close-button");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductDescription = document.getElementById("modalProductDescription");
  const modalProductFeatures = document.getElementById("modalProductFeatures");
  const modalBuyAmazon = document.getElementById("modalBuyAmazon");
  const modalBuyFlipkart = document.getElementById("modalBuyFlipkart");

  const productsData = {
    "Rolled Oats": {
      image: "./images/rolled_oats.jpg",
      description: "High-fiber breakfast option for a healthy start to your day",
      features: [
        "100% NATURAL: Made with pure rolled oats without any preservatives or added sugar, offering wholesome nutrition in every serving",
        "NUTRITIONAL POWERHOUSE: Rich in protein, fibre, B vitamins, magnesium, zinc, iron and antioxidants for complete nourishment",
        "DIETARY FEATURES: Naturally gluten-free, vegan, and zero cholesterol, making it suitable for various dietary preferences and restrictions",
        "VERSATILE USAGE: Perfect for quick breakfasts, power snacks, and guilt-free desserts - simply scoop, cook, and enjoy",
        "STORAGE INFORMATION: Store in a cool, dry place away from sunlight; once opened, keep jar tightly sealed and consume within 30 days",
      ],
      amazonLink: "https://www.amazon.in/s?k=Graina+rolled+oats",
      flipkartLink: "https://www.mystore.in/en/seller/graina",
    },
    "Creamy Oats": {
      image: "./images/creamy_oats.jpeg",
      description: "Soft texture and fast-cook convenience for busy mornings",
      features: [
        "100% NATURAL: Made with pure oats without any preservatives or added sugar, offering wholesome nutrition in every serving",
        "NUTRITIONAL POWERHOUSE: Rich in protein, fibre, B vitamins, magnesium, zinc, iron and antioxidants for complete nourishment",
        "DIETARY FEATURES: Naturally gluten-free, vegan, and zero cholesterol, making it suitable for various dietary preferences and restrictions",
        "VERSATILE USAGE: Perfect for quick breakfasts, power snacks, and guilt-free desserts - simply scoop, cook, and enjoy",
        "STORAGE INFORMATION: Store in a cool, dry place away from sunlight; once opened, keep jar tightly sealed and consume within 30 days",
      ],
      amazonLink: "https://www.amazon.in/s?k=Graina+creamy+oats",
      flipkartLink: "https://www.mystore.in/en/seller/graina",
    },
    "Finger Millet (Ragi)": {
      image: "./images/finger_millet.jpg",
      description: "Rich in calcium and iron, perfect for traditional recipes",
      features: [
        "Placeholder: Detailed features for Finger Millet (Ragi).",
        "Placeholder: Additional benefits.",
      ],
      amazonLink: "https://www.amazon.in/s?k=Graina+finger+millet+ragi",
      flipkartLink: "https://www.mystore.in/en/seller/graina",
    },
    "Foxtail Millet (Korralu)": {
      image: "./images/foxtail_millet.webp",
      description: "Gluten-free superfood packed with essential nutrients",
      features: [
        "Placeholder: Detailed features for Foxtail Millet (Korralu).",
        "Placeholder: Additional benefits.",
      ],
      amazonLink: "https://www.amazon.in/s?k=Graina+foxtail+millet+korralu",
      flipkartLink: "https://www.mystore.in/en/seller/graina",
    },
    "Little Millet (Samalu)": {
      image: "./images/little_millet.jpg",
      description: "Small grain with big nutritional benefits for daily meals",
      features: [
        "Placeholder: Detailed features for Little Millet (Samalu).",
        "Placeholder: Additional benefits.",
      ],
      amazonLink: "https://www.amazon.in/s?k=Graina+little+millet+samalu",
      flipkartLink: "https://www.mystore.in/en/seller/graina",
    },
  };

  document.querySelectorAll(".quick-view-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productName = this.closest(".product-card").querySelector(".product-name").textContent;
      const product = productsData[productName];

      if (product) {
        modalProductName.textContent = productName;
        modalProductImage.src = product.image;
        modalProductDescription.textContent = product.description;

        modalProductFeatures.innerHTML = ""; // Clear previous features
        product.features.forEach((feature) => {
          const li = document.createElement("li");
          li.textContent = feature;
          modalProductFeatures.appendChild(li);
        });

        modalBuyAmazon.href = product.amazonLink;
        modalBuyFlipkart.href = product.flipkartLink;

        quickViewModal.classList.add("show");
      }
    });
  });

  closeButton.addEventListener("click", function () {
    quickViewModal.classList.remove("show");
  });

  window.addEventListener("click", function (event) {
    if (event.target == quickViewModal) {
      quickViewModal.classList.remove("show");
    }
  });
});


