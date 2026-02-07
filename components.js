/**
 * Shared UI Components for Quartermaster Store
 * Royal Heritage Edition
 */

const Components = {
    config: {
        logo: 'images/LOGO.jpg',
        typingSpeed: 50,
        revealThreshold: 0.1,
        version: '1.0.3',
        patchNotes: {
            '1.0.3': {
                title: 'System Update v1.0.3',
                date: 'February 7, 2026',
                changes: [
                    'Implemented new automated Patch Notes system.',
                    'Fixed critical bug where auto-updates were not triggering correctly.',
                    'Enhanced update robustness with automatic restart and install.',
                    'Polished modal transitions and UI interactions.'
                ]
            },
            '1.0.2': {
                title: 'Aesthetic Refinement v1.0.2',
                date: 'February 7, 2026',
                changes: [
                    'Smoothed all bevels and corners for a cleaner look.',
                    'Updated status badges to a modern pill-shaped design.',
                    'Refined card and button borders for better definition.',
                    'Optimized shadows for improved depth and focus.'
                ]
            }
        },
        themes: {
            royal: {
                name: 'Royal Blue',
                colors: {
                    '--primary-royal-blue': '#001a4d',
                    '--royal-blue-deep': '#000d26',
                    '--primary-scarlet': '#8b0000',
                    '--accent-gold': '#c9a227',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #001a4d 0%, #000d26 40%, #020408 100%)'
                }
            },
            scarlet: {
                name: 'Imperial Scarlet',
                colors: {
                    '--primary-royal-blue': '#4d0000',
                    '--royal-blue-deep': '#260000',
                    '--primary-scarlet': '#ff1a1a',
                    '--accent-gold': '#ffcc00',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #4d0000 0%, #260000 40%, #080202 100%)'
                }
            },
            emerald: {
                name: 'Emerald Guard',
                colors: {
                    '--primary-royal-blue': '#003311',
                    '--royal-blue-deep': '#001a09',
                    '--primary-scarlet': '#006622',
                    '--accent-gold': '#99ffbb',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #003311 0%, #001a09 40%, #020804 100%)'
                }
            },
            midnight: {
                name: 'Midnight Onyx',
                colors: {
                    '--primary-royal-blue': '#111111',
                    '--royal-blue-deep': '#000000',
                    '--primary-scarlet': '#333333',
                    '--accent-gold': '#ffffff',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #1a1a1a 0%, #0a0a0a 40%, #000000 100%)'
                }
            },
            navy: {
                name: 'Navy Guard',
                colors: {
                    '--primary-royal-blue': '#000080',
                    '--royal-blue-deep': '#000033',
                    '--primary-scarlet': '#ff0000',
                    '--accent-gold': '#ffd700',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #000080 0%, #000033 40%, #00001a 100%)'
                }
            },
            purple: {
                name: 'Royal Purple',
                colors: {
                    '--primary-royal-blue': '#4b0082',
                    '--royal-blue-deep': '#2e004d',
                    '--primary-scarlet': '#9400d3',
                    '--accent-gold': '#daa520',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #4b0082 0%, #2e004d 40%, #1a0029 100%)'
                }
            },
            forest: {
                name: 'Royal Forest',
                colors: {
                    '--primary-royal-blue': '#013220',
                    '--royal-blue-deep': '#001a09',
                    '--primary-scarlet': '#8b0000',
                    '--accent-gold': '#c5b358',
                    '--body-bg': 'radial-gradient(ellipse 120% 80% at 50% -10%, #013220 0%, #001a09 40%, #000a04 100%)'
                }
            }
        }
    },

    init() {
        this.renderNav();
        this.renderFooter();
        this.initScrollProgress();
        this.applyRevealAnimations();
        this.initTypingEffect();
        this.initCustomCursor();
        this.initSharedInteractions();
        this.initParallax();
        this.initBackToTop();
        this.initImageZoom();
        this.initThemeSystem();
        this.initPatchNotes();
    },

    initPatchNotes() {
        const lastSeenVersion = localStorage.getItem('last-seen-version');
        const currentVersion = this.config.version;

        if (lastSeenVersion !== currentVersion) {
            const notes = this.config.patchNotes[currentVersion];
            if (notes) {
                this.renderPatchNotesModal(notes);
            }
            localStorage.setItem('last-seen-version', currentVersion);
        }
    },

    renderPatchNotesModal(notes) {
        const modal = document.createElement('div');
        modal.className = 'patch-notes-modal-overlay';
        modal.innerHTML = `
            <div class="patch-notes-modal glass-card reveal">
                <div class="patch-notes-header">
                    <img src="${this.config.logo}" alt="System Logo" class="patch-logo">
                    <div class="patch-header-text">
                        <h2>${notes.title}</h2>
                        <span class="patch-date">${notes.date}</span>
                    </div>
                </div>
                <div class="patch-content">
                    <h3>Imperial Directives & Updates</h3>
                    <ul class="patch-list">
                        ${notes.changes.map(change => `<li><span class="patch-bullet">◈</span> ${change}</li>`).join('')}
                    </ul>
                </div>
                <div class="patch-footer">
                    <button class="btn-primary patch-close">Understood</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add small delay to trigger CSS transitions if needed, 
        // though 'reveal' class handles initial entrance
        setTimeout(() => modal.classList.add('active'), 10);

        const closeBtn = modal.querySelector('.patch-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.style.opacity = '0';
            modal.style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 400);
        });
    },

    initThemeSystem() {
        const savedTheme = localStorage.getItem('site-theme') || 'royal';
        this.setTheme(savedTheme);

        // Click-to-toggle system settings
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.theme-trigger');
            const dropdown = document.querySelector('.theme-dropdown');
            const option = e.target.closest('.theme-option');

            if (trigger) {
                dropdown.classList.toggle('active');
            } else if (option) {
                const themeKey = option.getAttribute('data-theme');
                this.setTheme(themeKey);
                dropdown.classList.remove('active');
            } else if (dropdown && dropdown.contains(e.target)) {
                // Clicking inside dropdown but not on an option - do nothing to keep it open
            } else {
                if (dropdown) dropdown.classList.remove('active');
            }
        });
    },

    setTheme(key) {
        const theme = this.config.themes[key];
        if (!theme) return;

        Object.entries(theme.colors).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
        });

        localStorage.setItem('site-theme', key);
        this.showNotification(`Imperial theme: ${theme.name} active`, 'success');
        
        // Update active state in UI
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-theme') === key);
        });
    },

    initScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = scrolled + "%";
        });
    },

    initImageZoom() {
        let overlay = document.querySelector('.zoom-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'zoom-overlay';
            overlay.innerHTML = '<img src="" alt="Zoomed Image">';
            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 400);
            });
        }

        const zoomedImg = overlay.querySelector('img');

        document.addEventListener('click', (e) => {
            const img = e.target.closest('.reg-card img');
            if (img) {
                if (img.src.includes('placeholder.png')) return;
                zoomedImg.src = img.src;
                overlay.style.display = 'flex';
                overlay.offsetHeight;
                overlay.classList.add('active');
            }
        });
    },

    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-banner');
            if (hero) {
                hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
            }
        });
    },

    initBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'back-to-top';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            background: var(--glass-bg);
            border: 1.5px solid var(--accent-gold);
            color: var(--accent-gold-bright);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 999;
            display: none;
            backdrop-filter: blur(10px);
            transition: all 0.3s var(--spring-easing);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                btn.style.display = 'block';
                setTimeout(() => btn.style.opacity = '1', 10);
            } else {
                btn.style.opacity = '0';
                setTimeout(() => btn.style.display = 'none', 300);
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px)';
            btn.style.background = 'var(--glass-glow)';
            btn.style.borderColor = 'var(--primary-scarlet)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.background = 'var(--glass-bg)';
            btn.style.borderColor = 'var(--glass-border)';
        });
    },

    initCustomCursor() {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = document.createElement('div');
        const follower = document.createElement('div');
        cursor.className = 'cursor-dot';
        follower.className = 'cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        document.body.style.cursor = 'none';

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Click ripple effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
            follower.classList.add('clicking');
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
            follower.classList.remove('clicking');
        });

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.25;
            cursorY += (mouseY - cursorY) * 0.25;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animate);
        };
        animate();

        const updateHoverState = (isHover) => {
            if (isHover) {
                follower.classList.add('hovering');
            } else {
                follower.classList.remove('hovering');
            }
        };

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .glass-card, input, select, textarea, .reg-card, .showcase-card')) {
                updateHoverState(true);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .glass-card, input, select, textarea, .reg-card, .showcase-card')) {
                updateHoverState(false);
            }
        });
    },

    initTypingEffect() {
        const title = document.getElementById('typing-title');
        if (!title) return;

        const text = title.getAttribute('data-text') || "Welcome to the Unknown's Quartermaster";
        let i = 0;
        title.textContent = ""; 
        
        const type = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(type, this.config.typingSpeed);
            }
        };

        setTimeout(type, 500);
    },

    initSharedInteractions() {
        // Handle image errors globally
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = this.config.logo;
            }
        }, true);
    },

    showNotification(message, type = 'success') {
        const notify = document.createElement('div');
        notify.className = `message ${type}`;
        notify.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 25px;
            z-index: 10001;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        notify.textContent = message;
        document.body.appendChild(notify);

        setTimeout(() => {
            notify.style.transform = 'translateY(0)';
            notify.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            notify.style.transform = 'translateY(100px)';
            notify.style.opacity = '0';
            setTimeout(() => notify.remove(), 400);
        }, 3000);
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Specification copied to HQ clipboard!');
        });
    },

    renderNav() {
        let navContainer = document.querySelector('header.main-nav-container');
        if (!navContainer) {
            navContainer = document.createElement('header');
            navContainer.className = 'main-nav-container';
            document.body.prepend(navContainer);
        }

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navContainer.innerHTML = `
            <nav class="main-nav">
                <a href="index.html" class="nav-brand">
                    <img src="${this.config.logo}" alt="Logo">
                    <span>Quartermaster Store</span>
                </a>
                
                <div class="nav-controls">
                    <button class="nav-toggle" aria-label="Toggle navigation">
                        <span class="hamburger"></span>
                    </button>
                </div>

                <div class="nav-links">
                    <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}"><span>Home</span></a>
                    <a href="uniforms.html" class="${currentPath === 'uniforms.html' ? 'active' : ''}"><span>Uniforms</span></a>
                    <div class="nav-dropdown">
                        <a href="uniform-regulations.html" class="${currentPath.includes('regulations') ? 'active' : ''}"><span>Regulations</span></a>
                        <div class="dropdown-content">
                            <a href="uniform-regulations.html">Overview</a>
                            <a href="faces-regulations.html">Face Regulations</a>
                            <a href="hairs-regulations.html">Hair Regulations</a>
                            <a href="ranks-regulations.html">Rank Insignias</a>
                            <a href="dress-orders.html">Orders of Dress</a>
                            <a href="non-ceremonial-regulations.html">Non-Ceremonial</a>
                        </div>
                    </div>
                    <a href="awards.html" class="${currentPath === 'awards.html' ? 'active' : ''}"><span>Awards</span></a>
                    <a href="recipients.html" class="${currentPath === 'recipients.html' ? 'active' : ''}"><span>Recipients</span></a>
                    <a href="commission.html" class="${currentPath === 'commission.html' ? 'active' : ''}"><span>Pricing</span></a>
                    <a href="orders.html" class="${currentPath === 'orders.html' ? 'active' : ''}"><span>Orders</span></a>
                </div>
            </nav>
        `;

        // Separate System Controls to avoid layout interference
        let systemControls = document.querySelector('.system-controls');
        if (!systemControls) {
            systemControls = document.createElement('div');
            systemControls.className = 'system-controls';
            document.body.appendChild(systemControls);
        }

        systemControls.innerHTML = `
            <div class="theme-selector-wrapper">
                <button class="theme-trigger" aria-label="System Themes">
                    <span class="theme-trigger-icon">🏛️</span>
                </button>
                <div class="theme-dropdown">
                    <div class="theme-header">System Aesthetics</div>
                    <div class="theme-option" data-theme="royal" style="--theme-preview: #001a4d;">
                        <span class="theme-name">Royal Blue</span>
                    </div>
                    <div class="theme-option" data-theme="scarlet" style="--theme-preview: #8b0000;">
                        <span class="theme-name">Imperial Scarlet</span>
                    </div>
                    <div class="theme-option" data-theme="emerald" style="--theme-preview: #004d1a;">
                        <span class="theme-name">Emerald Guard</span>
                    </div>
                    <div class="theme-option" data-theme="midnight" style="--theme-preview: #111111;">
                        <span class="theme-name">Midnight Onyx</span>
                    </div>
                    <div class="theme-option" data-theme="navy" style="--theme-preview: #000080;">
                        <span class="theme-name">Navy Guard</span>
                    </div>
                    <div class="theme-option" data-theme="purple" style="--theme-preview: #4b0082;">
                        <span class="theme-name">Royal Purple</span>
                    </div>
                    <div class="theme-option" data-theme="forest" style="--theme-preview: #013220;">
                        <span class="theme-name">Royal Forest</span>
                    </div>
                </div>
            </div>
        `;

        // Toggle mobile menu
        const toggle = navContainer.querySelector('.nav-toggle');
        const links = navContainer.querySelector('.nav-links');
        
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Theme selector persistence fix
        const themeTrigger = systemControls.querySelector('.theme-trigger');
        const themeDropdown = systemControls.querySelector('.theme-dropdown');
        let hideTimeout;

        const showDropdown = () => {
            clearTimeout(hideTimeout);
            themeDropdown.classList.add('active');
        };

        const hideDropdown = () => {
            hideTimeout = setTimeout(() => {
                themeDropdown.classList.remove('active');
            }, 300); // Small delay to allow moving mouse to dropdown
        };

        themeTrigger.addEventListener('mouseenter', showDropdown);
        themeTrigger.addEventListener('mouseleave', hideDropdown);
        themeDropdown.addEventListener('mouseenter', showDropdown);
        themeDropdown.addEventListener('mouseleave', hideDropdown);
        
        // Mobile toggle for theme selector
        themeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            themeDropdown.classList.remove('active');
        });
    },



    renderFooter() {
        let footerContainer = document.querySelector('footer.footer-container');
        if (!footerContainer) {
            footerContainer = document.createElement('div');
            footerContainer.className = 'footer-container';
            document.body.appendChild(footerContainer);
        }

        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-profile">
                        <div class="profile-card">
                            <img src="${this.config.logo}" alt="Quartermaster" class="profile-img">
                            <div class="profile-info">
                                <div class="profile-name">Quartermaster</div>
                                <div class="profile-handle">Official System</div>
                                <div class="status-badge" style="margin-bottom: 0; margin-top: 10px; padding: 4px 10px; font-size: 0.65rem;">
                                    <span class="status-dot"></span>
                                    Operational
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-info">
                        <h4>Quartermaster Store</h4>
                        <p>The premier destination for British Army elite uniforms and equipment. Managed by the Unknown's Quartermaster Corps.</p>
                        <p class="copyright" style="margin-top: 20px; font-size: 0.8rem; color: var(--text-muted);">
                            © ${new Date().getFullYear()} Quartermaster Store. Approved for use by TruSnooze.
                        </p>
                    </div>
                    
                    <div class="footer-links">
                        <div class="footer-link-group">
                            <h4>Navigation</h4>
                            <a href="index.html">Home</a>
                            <a href="uniforms.html">Uniforms</a>
                            <a href="uniform-regulations.html">Regulations</a>
                            <a href="awards.html">Awards</a>
                        </div>
                        <div class="footer-link-group">
                            <h4>Resources</h4>
                            <a href="orders.html">Orders</a>
                            <a href="commission.html">Pricing</a>
                            <a href="https://www.roblox.com/users/8310005469/profile?friendshipSourceType=PlayerSearch" target="_blank">HQ Profile</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    },

    applyRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: this.config.revealThreshold });

        document.querySelectorAll('.glass-card, section, .page-header, .showcase-card, .stat-box, .medal-card').forEach((el) => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    },

    // Global Search Filter Utility
    filterElements(query, selector) {
        const elements = document.querySelectorAll(selector);
        const lowQuery = query.toLowerCase();
        elements.forEach(el => {
            const text = el.textContent.toLowerCase();
            el.style.display = text.includes(lowQuery) ? '' : 'none';
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Components.init());
