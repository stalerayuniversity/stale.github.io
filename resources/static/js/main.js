document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.querySelector('.language-select');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = languageDropdown.querySelectorAll('li');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const copy = document.querySelector('.logos-slide').cloneNode(true);
    const logo = document.querySelector('.logos');

    logo.appendChild(copy);

    let isAnimating = false;

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Add language-specific class to the html element
        document.documentElement.classList.remove('lang-en', 'lang-pl');
        document.documentElement.classList.add(`lang-${lang}`);

        // Update the text content of language-select
        languageSelect.querySelector('span').textContent = lang.toUpperCase();

        // Update the text on the page according to the selected language
        translatePage(lang);
    }

    function translatePage(lang) {
        const translations = {
            'en': {
                'title': 'MOODpl - Corporate Gifts',
                'btn-home': 'Main Page',
                'btn-shop': 'Shop',
                'btn-portfolio': 'Portfolio',
                'btn-delivery': 'Delivery & Payment',
                'btn-contact': 'Contact',
                'btn-blog': 'Blog',
                'faq': 'FAQ',
                'about': 'About Us',
                'personal-data': 'Consent to Process Personal Data',
                'confidentiality-policy': 'Privacy Policy',
                'login-btn': 'Log In',
                'hero h1': 'Corporate Gifts for <span style="color: #FFA6AD;">the Best Team</span>',
                'text-top': 'One vendor',
                'text-top-1': 'on all requests',
                'text-middle': 'Manufactured <strong>in Ukraine</strong>',
                'text-middle-1': '<strong>and Poland</strong>',
                'text-bottom': 'Worldwide Delivery',
                'text-bottom-1': 'and control at every',
                'text-bottom-2': 'stage',
                'leave-application': 'Leave a request',
                'ideas-title': 'Relevant ideas',
                'idea-text-1': 'Merch',
                'idea-text-2': 'Welcome Pack',
                'idea-text-3': 'Get Well Boxes',
                'idea-text-4': 'Food Mood',
                'idea-text-5': 'Bags',
                'idea-text-6': 'Birthday Boxes',
                'trust-title': 'Top Companies <strong>Trust Us</strong>',
                'view-cases-btn':'View the cases',
                'about-title':'<strong>MOODpl</strong> is <highlight>like Google</highlight> <br />in the world of gifts',
                'about-text-1':'<strong>We will suggest the best ideas</strong><br>for any occasion.',
                'about-text-2':'<strong>We brand everything</strong><br>We will put any logo or print <br>on all goods.',
                'about-text-3':'<strong>Large assortment</strong><br>We will find anything you can\'t.',
                'how h2': 'How does it work?',
                'step-title-1': 'Pick',
                'step-title-2': 'Approve',
                'step-title-3': 'Check',
                'step-title-4': 'Order',
                'step-title-5': 'Get',
                'step-text-1': 'Your ideas + our <br>ideas + large <br>assortment of the <br>website.',
                'step-text-2': 'We will send you <br>sample products <br>so that you can be <br>sure of their quality.',
                'step-text-3': 'Before starting <br>production we<br> will agree on the visualization <br>of the gift with you.',
                'step-text-4': 'We sign <br>the contract and <br>discuss the issue <br>of prepayment.',
                'step-text-5': 'We deliver - <br>and you receive <br>delighted reactions.'
            },

            'pl': {
                'title': 'MOODpl - Prezenty Korporacyjne',
                'btn-home': 'Strona główna',
                'btn-shop': 'Sklep',
                'btn-portfolio': 'Portfolio',
                'btn-delivery': 'Dostawa i płatność',
                'btn-contact': 'Kontakt',
                'btn-blog': 'Blog',
                'faq': 'FAQ',
                'about': 'O nas',
                'personal-data': 'Zgoda na przetwarzanie danych osobowych',
                'confidentiality-policy': 'Polityka prywatności',
                'login-btn': 'Zaloguj się',
                'hero h1': 'Upominki firmowe dla <span style="color: #FFA6AD;">najlepszego zespołu</span>',
                'text-top': 'Jeden Wykonawca',
                'text-top-1': 'na wszystkie prośby',
                'text-middle': 'Produkcja <strong>w Ukrainie</strong>',
                'text-middle-1': '<strong>i Polsce</strong>',
                'text-bottom': 'Dostawa na Cały Świat',
                'text-bottom-1': 'i kontrola na każdym',
                'text-bottom-2': 'etapie',
                'leave-application': 'Złożyć wniosek',
                'ideas-title': 'Aktualne Pomysły',
                'idea-text-1': 'Merch',
                'idea-text-2': 'Welcome Pack',
                'idea-text-3': 'Get Well Boxes',
                'idea-text-4': 'Food Mood',
                'idea-text-5': 'Bags',
                'idea-text-6': 'Birthday Boxes',
                'trust-title': 'Najlepsze Firmy <strong>Nam Zaufają</strong>',
                'view-cases-btn':'Zobacz przypadki',
                'about-title':'<strong>MOODpl</strong> jest <highlight>jak Google</highlight> <br />w świecie prezentów',
                'about-text-1':'<strong>Zaproponujemy najlepsze pomysły</strong><br>na każdą okazję.',
                'about-text-2':'<strong>Brandujemy wszystko</strong><br>Umieścimy każde logo lub nadruk <br>na wszystkich produktach.',
                'about-text-3':'<strong>Duży asortyment</strong><br>Znajdziemy wszystko, czego nie możesz.',
                'how h2': 'Jak to działa?',
                'step-title-1': 'Wybierz',
                'step-title-2': 'Dotknij',
                'step-title-3': 'Zobacz',
                'step-title-4': 'Zamówienie',
                'step-title-5': 'Odbiór',
                'step-text-1': 'Nasze aktualne <br>oferty + <br>duży asortyment <br>na stronie.',
                'step-text-2': 'Wyślemy Ci <br>przykładowe produkty, <br>abyś mógł być <br>pewien ich jakości.',
                'step-text-3': 'Przed rozpoczęciem <br>produkcji <br>uzgodnimy z Tobą <br>wizualizację upominku.',
                'step-text-4': 'Podpisujemy <br>umowę i <br>omawiamy kwestię <br>przedpłaty.',
                'step-text-5': 'My dostarczamy - <br>Ty otrzymujesz <br>zachwycone reakcje.'
            }
        };

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            el.innerHTML = translations[lang][el.getAttribute('data-translate-key')];
        });
    }

    // Set initial language from localStorage
    const initialLang = localStorage.getItem('language') || 'pl';
    setLanguage(initialLang);

    languageOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            languageDropdown.classList.remove('open');
            setTimeout(() => {
                languageDropdown.style.display = 'none';
                languageSelect.classList.remove('open');
                isAnimating = false;
            }, 500);
        });
    });

    // Remaining event listeners for dropdown menu animation
    languageSelect.addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;
        if (languageDropdown.classList.contains('open')) {
            languageDropdown.classList.remove('open');
            setTimeout(() => {
                languageDropdown.style.display = 'none';
                languageSelect.classList.remove('open');
                isAnimating = false;
            }, 500);
        } else {
            languageDropdown.style.display = 'block';
            setTimeout(() => {
                languageDropdown.classList.add('open');
                languageSelect.classList.add('open');
                isAnimating = false;
            }, 150);
        }
    });

    document.addEventListener('click', function (event) {
        if (!languageSelect.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.classList.remove('open');
            setTimeout(() => {
                languageDropdown.style.display = 'none';
                languageSelect.classList.remove('open');
            }, 500);
        }
        if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 300);
        }
    });

    // Handle dropdown hover to open smoothly
    dropbtn.addEventListener('mouseover', function () {
        if (isAnimating) return;
        isAnimating = true;
        dropdownContent.style.display = 'block';
        setTimeout(() => {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.transform = 'translateY(0)';
            isAnimating = false;
        }, 150);
    });

    dropbtn.addEventListener('mouseleave', function () {
        if (isAnimating) return;
        isAnimating = true;
        setTimeout(() => {
            if (!dropdownContent.matches(':hover')) {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    dropdownContent.style.display = 'none';
                    isAnimating = false;
                }, 300);
            } else {
                isAnimating = false;
            }
        }, 300);
    });

    dropdownContent.addEventListener('mouseleave', function () {
        if (isAnimating) return;
        isAnimating = true;
        setTimeout(() => {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
                isAnimating = false;
            }, 300);
        }, 300);
    });

    dropbtn.addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
                isAnimating = false;
            }, 300);
        } else {
            dropdownContent.style.display = 'block';
            setTimeout(() => {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.transform = 'translateY(0)';
                isAnimating = false;
            }, 150);
        }
    });

    // Intersection Observer for triggering animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.line-bck-1, .dotted-line-white-1, .hero-button, .bottle-left, .dotted-line, .hoodie, .small-gift, .headphones, .white-bottle, .about-box, .dotted-line-about').forEach(step => {
        observer.observe(step);
    });
});
