/**
 * main.js
 * JavaScript functionality for Santhosh's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Splash Screen Logic --- */
    const splashScreen = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-portfolio');
    const splashAboutBtn = document.querySelector('.splash-about-btn');

    const exitSplash = () => {
        splashScreen.classList.add('fade-out');
        document.body.classList.remove('splash-active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    };

    if (enterBtn) {
        enterBtn.addEventListener('click', exitSplash);
    }

    if (splashAboutBtn) {
        splashAboutBtn.addEventListener('click', (e) => {
            exitSplash();
            // The link's default behavior will then trigger the smooth scroll
        });
    }

    // Lock scroll and hide main content while splash is active
    document.body.classList.add('splash-active');
    document.body.style.overflow = 'hidden';

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 26, 44, 0.8)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(17, 26, 44, 0.4)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* --- Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Create mobile menu dynamically
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(17, 26, 44, 0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '2rem';
        navLinks.style.textAlign = 'center';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

        hamburger.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            hamburger.innerHTML = isVisible ? '<i class="ph ph-list"></i>' : '<i class="ph ph-x"></i>';
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
                hamburger.innerHTML = '<i class="ph ph-list"></i>';
            });
        });
    }

    /* --- Typing Animation for Title --- */
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['ML Engineer', 'AI Researcher', 'Data Scientist', 'Python Developer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 70 : 120; // Slightly faster for modern feel

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing animation
        setTimeout(type, 1000);
    }

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Scroll Reveal Animation --- */
    // Simple intersection observer to fade in items on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and cards
    const elementsToReveal = document.querySelectorAll('.section-title, .glass-card, .skill-category, .pipeline-item, .pipeline-dot');

    elementsToReveal.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
        observer.observe(el);
    });

    /* --- Certificate Modal --- */
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalPdf = document.getElementById("modal-pdf");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".close-modal");

    // Add click event to all certification cards
    document.querySelectorAll('.clickable-cert').forEach(card => {
        card.addEventListener('click', function () {
            const certPath = this.getAttribute('data-cert');
            const certTitle = this.querySelector('h4').innerText;

            modal.style.display = "block";
            captionText.innerHTML = certTitle;

            // Check file type
            if (certPath.toLowerCase().endsWith('.pdf')) {
                modalImg.style.display = "none";
                modalPdf.style.display = "block";
                modalPdf.src = certPath;
            } else {
                modalPdf.style.display = "none";
                modalImg.style.display = "block";
                modalImg.src = certPath;
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        modalPdf.src = ""; // Clear iframe to stop lingering processes
    });

    // Close modal when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalPdf.src = "";
        }
    });

    /* --- Chat Assistant Logic --- */
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Toggle Chat
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Handle Suggestions
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.textContent;
            handleUserMessage(question);
        });
    });

    // Handle Send
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    function handleUserMessage(text) {
        // Add User Message
        addMessage(text, 'user');

        // Show Typing Indicator
        showTypingIndicator();

        // Simulate AI Response
        setTimeout(() => {
            const response = getAIResponse(text);
            hideTypingIndicator();
            addMessage(response, 'assistant');
        }, 1500);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);

        // Scroll to bottom
        const chatBody = document.getElementById('chat-body');
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        let indicator = document.querySelector('.typing-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(indicator);
        }
        indicator.style.display = 'block';
        const chatBody = document.getElementById('chat-body');
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    function getAIResponse(input) {
        const query = input.toLowerCase();

        if (query.includes('skill') || query.includes('expert')) {
            return "Santhosh is highly skilled in Python, SQL, Deep Learning, and Generative AI. He also works with FastAPI, LangChain, RAG, and Computer Vision! 💻";
        }
        if (query.includes('hunger bot') || query.includes('telegram')) {
            return "The Hunger Bot is an AI Telegram Food Assistant he built! It uses Python and AI to help users find and order food seamlessly. 🍔🤖";
        }
        if (query.includes('intern') || query.includes('experience')) {
            return "Santhosh has interned at Spinacle and Here and Now AI, focusing on building intelligent applications, chatbots, and predictive ML models! 🚀";
        }
        if (query.includes('contact') || query.includes('email') || query.includes('phone')) {
            return "You can reach Santhosh at santhoshsudhakar09@gmail.com or call him at +91 9444204260. He's based in Chennai! 📍";
        }
        if (query.includes('project')) {
            return "He has worked on some cool projects like a Cloud-Based Digital Twin for EV batteries, Nova Voice AI Assistant, and a RAG-based Chatbot! 🛠️";
        }
        if (query.includes('education') || query.includes('college')) {
            return "He is pursuing B.Tech in AI & Data Science at Rajalakshmi Institute of Technology (2023-2027) with an 8.0 CGPA! 🎓";
        }

        return "That's a great question! I'm specifically trained on Santhosh's professional profile. Try asking about his projects, skills, or experience! 😊";
    }

});
