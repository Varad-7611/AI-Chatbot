// Initialize particles Moving Backgroung
particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.1 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
  
  // Function to show a specific section and hide others
  function showSection(sectionId) {

    // Array of all section IDs including the hero view and additional sections
    const sections = ['hero', 'about', 'login', 'signup'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (id === sectionId) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
  }
  
  // Attach click events to nav-links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Handle signup form submission
  function handleSignup(event) {

    event.preventDefault(); // Prevent default form submission
  
    // 
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    
    // Simulate a successful signup process 
    alert('Sign up successful! A confirmation email has been sent to you.');
    
    
    form.reset();
    showSection('hero');
  }
  
  