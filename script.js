document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // (Smooth scrolling removed as site is now multi-page)

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Voice Assistant Logic
    const voiceBtn = document.getElementById('voice-btn');
    if (voiceBtn) {
        const voiceIcon = voiceBtn.querySelector('i');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            let isListening = false;

            const speak = (text) => {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1;
                utterance.pitch = 1;
                synth.speak(utterance);
            };

            const handleCommand = (command) => {
                command = command.toLowerCase();
                console.log("Voice Command:", command);
                
                if (command.includes('home')) {
                    speak("Going home");
                    window.location.href = 'index.html';
                } else if (command.includes('about')) {
                    speak("Here is some information about Lavanya.");
                    window.location.href = 'about.html';
                } else if (command.includes('skills')) {
                    speak("These are the technical skills.");
                    window.location.href = 'skills.html';
                } else if (command.includes('project')) {
                    speak("Here are the projects.");
                    window.location.href = 'projects.html';
                } else if (command.includes('education')) {
                    speak("Going to education details.");
                    window.location.href = 'education.html';
                } else if (command.includes('contact')) {
                    speak("Navigating to contact page.");
                    window.location.href = 'contact.html';
                } else if (command.includes('hello') || command.includes('hi')) {
                    speak("Hello! I am your portfolio voice assistant. You can say 'go to about', 'show my skills', or 'projects'.");
                } else {
                    speak("I didn't quite catch that. Try saying 'about' or 'projects'.");
                }
            };

            voiceBtn.addEventListener('click', () => {
                if (isListening) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });

            recognition.onstart = () => {
                isListening = true;
                voiceBtn.classList.add('listening');
                voiceIcon.classList.remove('fa-microphone');
                voiceIcon.classList.add('fa-microphone-slash');
            };

            recognition.onspeechend = () => {
                recognition.stop();
            };

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript;
                handleCommand(command);
            };

            recognition.onend = () => {
                isListening = false;
                voiceBtn.classList.remove('listening');
                voiceIcon.classList.remove('fa-microphone-slash');
                voiceIcon.classList.add('fa-microphone');
            };

            recognition.onerror = (event) => {
                console.error('Speech error:', event.error);
                isListening = false;
                voiceBtn.classList.remove('listening');
                voiceIcon.classList.remove('fa-microphone-slash');
                voiceIcon.classList.add('fa-microphone');
                
                if (event.error !== 'no-speech') {
                    speak("Sorry, I encountered an error. Please try again.");
                }
            };
        } else {
            voiceBtn.style.display = 'none';
            console.warn("Speech recognition not supported in this browser.");
        }
    }
});
