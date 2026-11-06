
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. SKILLS CAROUSEL
    // =====================================

    const skillsGrid = document.getElementById("skillsGrid");
    const skillsPrev = document.getElementById("skillsPrev");
    const skillsNext = document.getElementById("skillsNext");

    if (skillsGrid && skillsPrev && skillsNext) {

        const skills = Array.from(
            skillsGrid.querySelectorAll(".skill-card")
        );

        let skillsStart = 0;

        function getVisibleSkills() {
            if (window.innerWidth <= 500) return 1;
            if (window.innerWidth <= 900) return 2;
            return 4;
        }

        function showSkills() {
            const count = getVisibleSkills();
            const maxStart = Math.max(0, skills.length - count);

            skillsStart = Math.min(skillsStart, maxStart);

            skills.forEach((skill, index) => {
                skill.hidden = index < skillsStart ||
                               index >= skillsStart + count;
            });

            skillsPrev.disabled = skillsStart === 0;
            skillsNext.disabled = skillsStart >= maxStart;
        }

        skillsNext.addEventListener("click", function () {
            skillsStart += getVisibleSkills();
            showSkills();
        });

        skillsPrev.addEventListener("click", function () {
            skillsStart -= getVisibleSkills();
            showSkills();
        });

        window.addEventListener("resize", showSkills);

        showSkills();
    }


    // =====================================
    // 2. NAVBAR ACTIVE SECTION
    // =====================================

    const navLinks = document.querySelectorAll(".nav-links a");

    function updateNavbar() {
        let currentSection = null;

        navLinks.forEach(link => {
            const section = document.querySelector(
                link.getAttribute("href")
            );

            if (section &&
                section.getBoundingClientRect().top <= 200) {
                currentSection = section;
            }
        });

        // Activate the last section at the bottom
        if (window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5) {
            currentSection = document.querySelector(
                navLinks[navLinks.length - 1].getAttribute("href")
            );
        }

        navLinks.forEach(link => {
            const section = document.querySelector(
                link.getAttribute("href")
            );

            link.classList.toggle(
                "active",
                section === currentSection
            );
        });
    }

    window.addEventListener("scroll", updateNavbar);
    window.addEventListener("resize", updateNavbar);

    navLinks.forEach(link => {
        link.addEventListener("click", updateNavbar);
    });

    updateNavbar();


    // =====================================
    // 3. PROJECTS CAROUSEL
    // =====================================

    const projectsWindow = document.getElementById("projectsWindow");
    const projectsGrid = document.getElementById("projectsGrid");
    const projectsPrev = document.getElementById("projectsPrev");
    const projectsNext = document.getElementById("projectsNext");
    const pageIndicator = document.getElementById("projectsPageIndicator");

    if (projectsWindow && projectsGrid &&
        projectsPrev && projectsNext) {

        function updateProjects() {
            const card = projectsGrid.querySelector(".project-card");
            const gap = parseFloat(
                getComputedStyle(projectsGrid).gap
            ) || 0;

            const step = card
                ? card.offsetWidth + gap
                : projectsWindow.clientWidth;

            const maxScroll = projectsWindow.scrollWidth -
                              projectsWindow.clientWidth;

            const currentPage = Math.round(
                projectsWindow.scrollLeft / step
            ) + 1;

            const totalPages = Math.ceil(
                maxScroll / step
            ) + 1;

            projectsPrev.disabled = projectsWindow.scrollLeft <= 2;
            projectsNext.disabled = projectsWindow.scrollLeft >= maxScroll - 2;

            if (pageIndicator) {
                pageIndicator.textContent =
                    currentPage + " / " + totalPages;
            }
        }

        function moveProjects(direction) {
            const card = projectsGrid.querySelector(".project-card");
            const gap = parseFloat(
                getComputedStyle(projectsGrid).gap
            ) || 0;

            const step = card
                ? card.offsetWidth + gap
                : projectsWindow.clientWidth;

            projectsWindow.scrollLeft += direction * step;

            updateProjects();
        }

        projectsPrev.addEventListener("click", function () {
            moveProjects(-1);
        });

        projectsNext.addEventListener("click", function () {
            moveProjects(1);
        });

        projectsWindow.addEventListener("scroll", updateProjects);
        window.addEventListener("resize", updateProjects);

        updateProjects();
    }

});
