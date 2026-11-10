document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. SKILLS CAROUSEL
       Shows 4 cards on desktop, 2 on tablet/phone
    ========================================= */
    const skillsGrid = document.getElementById("skillsGrid");
    const skillsPrev = document.getElementById("skillsPrev");
    const skillsNext = document.getElementById("skillsNext");
    const skillCards = skillsGrid.querySelectorAll(".skill-card");

    let firstCard = 0; // index of the first visible card

    function cardsPerPage() {
        if (window.innerWidth <= 900) {
            return 2;
        }
        return 4;
    }

    function showSkills() {
        const perPage = cardsPerPage();
        const lastStart = Math.max(0, skillCards.length - perPage);

        // keep firstCard between 0 and lastStart
        firstCard = Math.max(0, Math.min(firstCard, lastStart));

        // show only the cards inside the current page
        skillCards.forEach(function (card, index) {
            card.hidden = index < firstCard || index >= firstCard + perPage;
        });

        skillsPrev.disabled = firstCard === 0;
        skillsNext.disabled = firstCard >= lastStart;
    }

    skillsNext.addEventListener("click", function () {
        firstCard += cardsPerPage();
        showSkills();
    });

    skillsPrev.addEventListener("click", function () {
        firstCard -= cardsPerPage();
        showSkills();
    });

    window.addEventListener("resize", showSkills);
    showSkills();


    /* =========================================
       2. ACTIVE NAVBAR LINK
       Highlights the link of the section you are viewing
    ========================================= */
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {
        let currentId = "";

        // the last section that has reached the top of the screen
        navLinks.forEach(function (link) {
            const id = link.getAttribute("href");
            const section = document.querySelector(id);

            if (section && section.getBoundingClientRect().top <= 200) {
                currentId = id;
            }
        });

        // at the very bottom of the page, highlight the last link
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
        if (atBottom) {
            currentId = navLinks[navLinks.length - 1].getAttribute("href");
        }

        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === currentId);
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("resize", updateActiveLink);
    updateActiveLink();


    /* =========================================
       3. HAMBURGER MENU
    ========================================= */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navLinks");

    function setMenu(isOpen) {
        navMenu.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    }

    // open / close with the button
    menuToggle.addEventListener("click", function () {
        setMenu(!navMenu.classList.contains("open"));
    });

    // close when a link is clicked
    navMenu.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            setMenu(false);
        }
    });

    // close when clicking outside the navbar
    document.addEventListener("click", function (event) {
        if (!event.target.closest("#navbar")) {
            setMenu(false);
        }
    });

    // close with the Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenu(false);
        }
    });

    // close when the screen becomes desktop size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            setMenu(false);
        }
    });


    /* =========================================
       4. PROJECTS CAROUSEL
       Scrolls the window one card at a time
    ========================================= */
    const projectsWindow = document.getElementById("projectsWindow");
    const projectsGrid = document.getElementById("projectsGrid");
    const projectsPrev = document.getElementById("projectsPrev");
    const projectsNext = document.getElementById("projectsNext");

    // one step = width of one card + the gap between cards
    function getStep() {
        const card = projectsGrid.querySelector(".project-card");
        const gap = parseFloat(getComputedStyle(projectsGrid).gap) || 0;
        return card.offsetWidth + gap;
    }

    // disable the arrows at the start and the end
    function updateProjectArrows() {
        const maxScroll = projectsWindow.scrollWidth - projectsWindow.clientWidth;

        projectsPrev.disabled = projectsWindow.scrollLeft <= 2;
        projectsNext.disabled = projectsWindow.scrollLeft >= maxScroll - 2;
    }

    function moveProjects(direction) {
        projectsWindow.scrollLeft += direction * getStep();
        updateProjectArrows();
    }

    projectsPrev.addEventListener("click", function () {
        moveProjects(-1);
    });

    projectsNext.addEventListener("click", function () {
        moveProjects(1);
    });

    projectsWindow.addEventListener("scroll", updateProjectArrows);
    window.addEventListener("resize", updateProjectArrows);
    updateProjectArrows();


    /* =========================================
       5. CONTACT FORM
       Mockup only: shows the success box, nothing is sent
    ========================================= */
    const contactForm = document.querySelector(".contact-form-container form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();       // stop the page from reloading
        contactForm.reset();          // clear the fields
        window.location.hash = "sent"; // CSS shows the success box
    });

});