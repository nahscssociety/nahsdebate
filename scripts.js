document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
      // Add a slight delay for smoother transition
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 800);
    });
    
    // Animate on Scroll transitions using IntersectionObserver
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(elem => {
      observer.observe(elem);
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Toggle between hamburger and close icon
      const icon = navToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
          const icon = navToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate corresponding dot
      testimonialSlides[index].style.display = 'block';
      dots[index].classList.add('active');
    }
    
    // Initialize slider
    showSlide(currentSlide);
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', function() {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = testimonialSlides.length - 1;
      }
      showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
      currentSlide++;
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    });
    
    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(function() {
      currentSlide++;
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(function() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
          currentSlide = 0;
        }
        showSlide(currentSlide);
      }, 5000);
    });
    
    // Contact form validation and submit handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
          if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });
        
        if (isValid) {
          // Show success message (in production, you'd send the form data to the server)
          const formData = new FormData(contactForm);
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          
          // Disable button and change text to show processing
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          
          // Simulate form submission
          setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Create and show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            contactForm.appendChild(successMsg);
            
            // Remove success message after a few seconds
            setTimeout(() => {
              successMsg.remove();
            }, 5000);
          }, 1500);
        }
      });
      
      // Remove error class when user starts typing
      contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
          this.classList.remove('error');
        });
      });
    }
    
    // Add a theme toggle feature
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      const icon = themeToggle.querySelector('i');
      
      if (icon.classList.contains('fa-moon')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    // Dynamically update footer credits year
  document.getElementById('footerCredits').innerHTML = 
  `<p>&copy; ${new Date().getFullYear()} Built by the NAHS Computer Science Club. All rights reserved.</p>`
  });
=======
document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
      // Add a slight delay for smoother transition
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 800);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(elem => {
      observer.observe(elem);
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Toggle between hamburger and close icon
      const icon = navToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
          const icon = navToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate corresponding dot
      testimonialSlides[index].style.display = 'block';
      dots[index].classList.add('active');
    }
    
    // Initialize slider
    showSlide(currentSlide);
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', function() {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = testimonialSlides.length - 1;
      }
      showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
      currentSlide++;
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    });
    
    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(function() {
      currentSlide++;
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(function() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
          currentSlide = 0;
        }
        showSlide(currentSlide);
      }, 5000);
    });
    
    // Contact form validation and submit handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
          if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });
        
        if (isValid) {
          // Show success message (in production, you'd send the form data to the server)
          const formData = new FormData(contactForm);
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          
          // Disable button and change text to show processing
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          
          // Simulate form submission
          setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Create and show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            contactForm.appendChild(successMsg);
            
            // Remove success message after a few seconds
            setTimeout(() => {
              successMsg.remove();
            }, 5000);
          }, 1500);
        }
      });
      
      // Remove error class when user starts typing
      contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
          this.classList.remove('error');
        });
      });
    }
    
    // Add a theme toggle feature
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      const icon = themeToggle.querySelector('i');
      
      if (icon.classList.contains('fa-moon')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    // Dynamically update footer credits year
  document.getElementById('footerCredits').innerHTML = 
  `<p>&copy; ${new Date().getFullYear()} Built by the NAHS Computer Science Club. All rights reserved.</p>`
  });
