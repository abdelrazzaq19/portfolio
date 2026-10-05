/* MENU SHOW */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })

        // Close menu after choosing a link (mobile)
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('show'))
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/* ACTIVE LINK */
const currentPage = location.pathname.split('/').pop() || 'index.html'
document.querySelectorAll('.nav__link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active')
        link.setAttribute('aria-current', 'page')
    }
})

/* FOOTER YEAR */
document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear()
})

/* REVEAL ON SCROLL */
const revealItems = document.querySelectorAll('.reveal')

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })

    revealItems.forEach(item => observer.observe(item))
} else {
    revealItems.forEach(item => item.classList.add('is-visible'))
}

/*----- ANIMATE (home page intro) -----*/
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (window.gsap && document.querySelector('.overlay') && !reduceMotion) {
    // OVERLAY
    gsap.to('.first', { duration: 1, delay: 0.2, top: '-100%', ease: 'expo.inOut' })
    gsap.to('.second', { duration: 1, delay: 0.35, top: '-100%', ease: 'expo.inOut' })
    gsap.to('.third', { duration: 1, delay: 0.5, top: '-100%', ease: 'expo.inOut' })

    // IMG
    gsap.from('.home__img', { opacity: 0, duration: 1.2, delay: 1.1, x: 40, ease: 'expo.out' })

    // INFORMATION
    gsap.from('.anime-text', { opacity: 0, duration: 1.2, delay: 1, y: 24, ease: 'expo.out', stagger: 0.1 })

    // NAV
    gsap.from('.nav__logo', { opacity: 0, duration: 1, delay: 1.2, y: -12, ease: 'expo.out' })
    gsap.from('.nav__item', { opacity: 0, duration: 1, delay: 1.2, y: -12, ease: 'expo.out', stagger: 0.06 })
} else {
    document.querySelectorAll('.overlay').forEach(el => el.remove())
}
