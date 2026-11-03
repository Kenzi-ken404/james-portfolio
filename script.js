
const skillsGrid = document.getElementById("skillsGrid");
const skillsPrev = document.getElementById("skillsPrev");
const skillsNext = document.getElementById("skillsNext");

const allSkills = Array.from(
    skillsGrid.querySelectorAll(".skill-card")
);

let skillsStart = 0;
let isSliding = false;

function visibleSkillsCount() {
    if (window.innerWidth <= 500) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4;
}

function showSkills(animate = false, direction = 1) {
    const count = visibleSkillsCount();
    const maxStart = Math.max(0, allSkills.length - count);

    skillsStart = Math.max(0, Math.min(skillsStart, maxStart));

    const oldVisible = allSkills.filter(
        card => !card.hidden
    );

    const newVisible = allSkills.slice(
        skillsStart,
        skillsStart + count
    );

    if (!animate) {
        allSkills.forEach(card => {
            card.hidden = !newVisible.includes(card);
            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
        });

        skillsPrev.disabled = skillsStart === 0;
        skillsNext.disabled = skillsStart >= maxStart;
        return;
    }

    isSliding = true;
    skillsPrev.disabled = true;
    skillsNext.disabled = true;

    // Animate the current cards out.
    oldVisible.forEach(card => {
        card.style.transition =
            "opacity 220ms ease, transform 220ms ease";
        card.style.opacity = "0";
        card.style.transform =
            `translateX(${direction * -35}px)`;
    });

    setTimeout(() => {
        // Swap cards after the exit animation.
        allSkills.forEach(card => {
            card.hidden = !newVisible.includes(card);
        });

        // Place new cards just outside their starting position.
        newVisible.forEach(card => {
            card.style.transition = "none";
            card.style.opacity = "0";
            card.style.transform =
                `translateX(${direction * 35}px)`;
        });

        // Apply the starting position before animating.
        void skillsGrid.offsetWidth;

        // Slide the new cards into place.
        newVisible.forEach((card, index) => {
            card.style.transition =
                `opacity 450ms ease ${index * 45}ms, ` +
                `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 45}ms`;

            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
        });

        setTimeout(() => {
            allSkills.forEach(card => {
                card.style.transition = "";
                card.style.opacity = "";
                card.style.transform = "";
            });

            isSliding = false;
            skillsPrev.disabled = skillsStart === 0;
            skillsNext.disabled = skillsStart >= maxStart;
        }, 650);
    }, 230);
}

skillsNext.addEventListener("click", () => {
    if (isSliding) return;

    const maxStart = Math.max(
        0,
        allSkills.length - visibleSkillsCount()
    );

    if (skillsStart >= maxStart) return;

    skillsStart = Math.min(
        skillsStart + visibleSkillsCount(),
        maxStart
    );

    showSkills(true, 1);
});

skillsPrev.addEventListener("click", () => {
    if (isSliding || skillsStart <= 0) return;

    skillsStart = Math.max(
        0,
        skillsStart - visibleSkillsCount()
    );

    showSkills(true, -1);
});

window.addEventListener("resize", () => {
    if (!isSliding) {
        showSkills(false);
    }
});

showSkills(false);


document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");

    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute("href");

            if (!id || !id.startsWith("#")) return null;

            return document.querySelector(id);
        })
        .filter(section => section !== null);

    function updateNavbar() {

        let currentSection = sections[0];

        const activationPoint = 200;

        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;

            if (position <= activationPoint) {
                currentSection = section;
            }
        });

        // Always activate the last section at the bottom
        if (window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5) {
            currentSection = sections[sections.length - 1];
        }

        navLinks.forEach(link => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            link.classList.toggle(
                "active",
                target === currentSection
            );
        });
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    window.addEventListener("load", updateNavbar);
    window.addEventListener("resize", updateNavbar);

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            setTimeout(updateNavbar, 100);
        });
    });

    updateNavbar();

});

