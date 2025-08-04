// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Special animation for stat cards
                if (entry.target.classList.contains('stat-card')) {
                    setTimeout(() => {
                        animateStatCard(entry.target);
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card, .about-text, .hero-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Stat Card Animation
    function animateStatCard(card) {
        const statNumber = card.querySelector('.stat-number');
        const finalNumber = statNumber.textContent;
        
        // Extract number and suffix
        let number = parseInt(finalNumber.replace(/\D/g, ''));
        let suffix = finalNumber.replace(/\d/g, '');
        
        let current = 0;
        const increment = number / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                statNumber.textContent = finalNumber;
                clearInterval(timer);
            } else {
                statNumber.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
        });
    });

    // Testimonial Card Interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Appointment Booking Functionality
    const bookingButtons = document.querySelectorAll('.cta-button, .nav-cta-btn');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            showBookingModal();
        });
    });

    // Learn More Button
    const learnMoreBtn = document.querySelector('.cta-button-outline');
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to services section
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Service Links
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            showServiceModal(serviceName);
        });
    });

    // Booking Modal
    function showBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Book Your Appointment</h3>
                <form class="booking-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="service">Preferred Service</label>
                        <select id="service" name="service" required>
                            <option value="">Select a service</option>
                            <option value="microsuction">Microsuction</option>
                            <option value="irrigation">Ear Irrigation</option>
                            <option value="manual">Manual Removal</option>
                            <option value="consultation">Consultation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Preferred Date</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Preferred Time</label>
                        <select id="time" name="time" required>
                            <option value="">Select a time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="notes">Additional Notes (Optional)</label>
                        <textarea id="notes" name="notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="cta-button">Book Appointment</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Form submission
        const form = modal.querySelector('.booking-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const appointmentData = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Appointment request submitted successfully! We will contact you shortly to confirm.', 'success');
            document.body.removeChild(modal);
            
            // In a real application, you would send this data to a server
            console.log('Appointment Data:', appointmentData);
        });
        
        // Set minimum date to today
        const dateInput = modal.querySelector('#date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Service Information Modal
    function showServiceModal(serviceName) {
        const serviceInfo = {
            'Microsuction': {
                description: 'The gold standard for ear wax removal using gentle suction under microscopic guidance.',
                benefits: ['Completely safe and comfortable', 'No water involved', 'Immediate results', 'Suitable for all ear types'],
                duration: '15-30 minutes',
                price: '£80'
            },
            'Ear Irrigation': {
                description: 'A water-based cleaning method that gently flushes out ear wax and debris.',
                benefits: ['Gentle and effective', 'Suitable for most patients', 'Quick procedure', 'Immediate relief'],
                duration: '10-20 minutes',
                price: '£60'
            },
            'Manual Removal': {
                description: 'Careful manual extraction using specialized medical instruments.',
                benefits: ['Precise removal', 'Ideal for stubborn wax', 'Customized approach', 'Expert technique'],
                duration: '20-40 minutes',
                price: '£90'
            }
        };
        
        const info = serviceInfo[serviceName] || serviceInfo['Microsuction'];
        
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${serviceName}</h3>
                <p class="service-description">${info.description}</p>
                <div class="service-details">
                    <div class="detail-item">
                        <strong>Duration:</strong> ${info.duration}
                    </div>
                    <div class="detail-item">
                        <strong>Price:</strong> ${info.price}
                    </div>
                </div>
                <div class="service-benefits">
                    <h4>Benefits:</h4>
                    <ul>
                        ${info.benefits.map(benefit => <li>${benefit}</li>).join('')}
                    </ul>
                </div>
                <button class="cta-button" onclick="this.closest('.service-modal').remove(); showBookingModal();">Book This Service</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = notification ${type};
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #374151;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(55, 65, 81, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1f2937';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#374151';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage && scrolled < window.innerHeight) {
            const speed = scrolled * 0.2;
            heroImage.style.transform = translateY(${speed}px);
        }
    });

    // Medical Image Placeholder Interactions
    const medicalImages = document.querySelectorAll('.medical-image-placeholder');
    
    medicalImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Form Validation Helper
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });
        
        return isValid;
    }

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.booking-modal, .service-modal');
            modals.forEach(modal => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        }
        
        // Enter key on focused buttons
        if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
            document.activeElement.click();
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Additional scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);

    // Initialize animations for elements already in view
    const elementsInView = document.querySelectorAll('.hero-content, .hero-image');
    elementsInView.forEach(el => {
        el.classList.add('fade-in-up');
    });

    // Loading Screen (optional)
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
});

// CSS for Modals
const modalStyles = `
.booking-modal, .service-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    background: none;
    border: none;
}

.close-modal:hover {
    color: #374151;
}

.booking-form, .service-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #6366f1;
}

.service-description {
    color: #6b7280;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.detail-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
}

.service-benefits h4 {
    margin-bottom: 0.5rem;
    color: #374151;
}

.service-benefits ul {
    list-style: none;
    padding-left: 0;
}

.service-benefits li {
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.service-benefits li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
}

@media (max-width: 480px) {
    .modal-content {
        padding: 1.5rem;
        margin: 10px;
    }
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);