// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all components
    setupLoadingScreen();
    setupNavigation();
    setupParallaxEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupSmoothScrolling();
    setupHamburgerMenu();
    optimizeVideoLoading();
}

// ===== LOADING SCREEN =====
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        navbar.classList.add('visible');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroContent = document.querySelector('.hero-content'); // ヒーローコンテンツを取得
    const scrollIndicator = document.querySelector('.scroll-indicator'); // スクロールインジケーターを取得
    
    // 初期状態でHomeリンクをアクティブに設定
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
    
    // Handle scroll effects on navbar
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // ヒーローコンテンツの表示/非表示制御
        if (heroContent) {
            if (scrollTop > 200) {
                heroContent.style.opacity = '0';
                heroContent.style.visibility = 'hidden';
                heroContent.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            } else {
                heroContent.style.opacity = '1';
                heroContent.style.visibility = 'visible';
                heroContent.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            }
        }
        
        // スクロールインジケーターの表示/非表示制御
        if (scrollIndicator) {
            if (scrollTop > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
                scrollIndicator.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
                scrollIndicator.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== HAMBURGER MENU =====
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('setupHamburgerMenu called');
    console.log('hamburger:', hamburger);
    console.log('navMenu:', navMenu);
    
    if (!hamburger || !navMenu) {
        console.error('ハンバーガーメニューまたはナビメニューが見つかりません');
        return;
    }
    
    // ハンバーガーメニュークリック
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('ハンバーガーメニューがクリックされました');
        
        // トグル
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log('hamburger active:', hamburger.classList.contains('active'));
        console.log('navMenu active:', navMenu.classList.contains('active'));
    });
    
    // メニューリンククリックでメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('メニューリンクがクリックされました');
            
            // メニューを閉じる
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // スムーススクロール
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Homeの場合は一番上に移動
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 背景クリックでメニューを閉じる
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== PARALLAX EFFECTS =====
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    // Hero title animation
    const heroTitleLines = document.querySelectorAll('.hero-title-line');
    
    // Trigger animations when page loads
    setTimeout(() => {
        heroTitleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = `slideInUp 1s ease forwards`;
            }, index * 300);
        });
    }, 500);
    
    // Work items hover effects
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Homeの場合は一番上に移動
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== FORM HANDLING =====
function setupFormHandling() {
    const form = document.querySelector('.form');
    
    // フォームが存在しない場合は処理をスキップ
    if (!form) {
        console.log('フォーム要素が見つかりません。setupFormHandlingをスキップします。');
        return;
    }
    
    const formInputs = form.querySelectorAll('input, textarea');
    
    // Floating label effects
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (field.value.trim() === '') {
                isValid = false;
                field.style.borderColor = '#e74c3c';
                
                setTimeout(() => {
                    field.style.borderColor = '#eee';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('メッセージを送信しました。ありがとうございます！', 'success');
            
            // Reset form
            form.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        } else {
            showNotification('必須項目を入力してください。', 'error');
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== VIDEO OPTIMIZATION =====
function optimizeVideoLoading() {
    const video = document.querySelector('.earth-video');
    if (!video) return;

    // 動画要素の初期設定を最適化
    video.style.opacity = '0.9'; // 最初から表示
    video.style.transition = 'opacity 0.3s ease';

    // より積極的な事前読み込み
    video.preload = 'auto';
    video.load();

    // 動画の読み込み状態を監視
    video.addEventListener('loadstart', () => {
        console.log('動画の読み込み開始');
    });

    video.addEventListener('loadedmetadata', () => {
        console.log('動画メタデータ読み込み完了');
        video.style.opacity = '0.9';
    });

    video.addEventListener('loadeddata', () => {
        console.log('動画の最初のフレーム読み込み完了');
        video.style.opacity = '0.9';
    });

    video.addEventListener('canplay', () => {
        console.log('動画の再生準備完了');
        video.style.opacity = '0.9';
        // 自動再生を確実に開始
        video.play().catch(e => console.log('自動再生制限:', e));
    });

    video.addEventListener('canplaythrough', () => {
        console.log('動画の完全読み込み完了');
    });

    // エラーハンドリング
    video.addEventListener('error', (e) => {
        console.error('動画読み込みエラー:', e);
        // フォールバック表示
        const fallback = video.querySelector('.earth-sphere-container');
        if (fallback) {
            fallback.style.display = 'block';
        }
    });

    // ネットワーク接続状況に応じた最適化
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') {
            // 高速回線の場合、より積極的に読み込み
            video.preload = 'auto';
        }
    }

    // ページの可視性変更時の処理
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            video.play().catch(e => console.log('再生エラー:', e));
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-item, .contact-item').forEach(el => {
    observer.observe(el);
}); 