document.addEventListener("DOMContentLoaded", function() {
    const dropdownIcon = document.querySelector(".dropdown-icon");
    const links = document.querySelectorAll("#mobile-codex, #mobile-bloom, #mobile-ref, #mobile-music");
    const nav = document.querySelector(".navigation-bar");
    const panel = document.querySelector(".mobile-dropdown");

    dropdownIcon.addEventListener("click", function() {
        links.forEach(link => {
            if (link.style.display === "flex") {
                link.style.display = "none";
            } else {
                link.style.display = "flex";
                link.style.zIndex = "1000";
            }
        });
    });

    function positionPanel() {
    if (!window.matchMedia("(max-width: 768px)").matches) return;

        const iconRect = dropdownIcon.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        const left = iconRect.left - navRect.left;
        const top = iconRect.bottom - navRect.top;

        panel.style.left = `${left - 15}px`;
        panel.style.top = `${top}px`;
        panel.style.width = `${iconRect.width}px`; // match icon width
    }

    dropdownIcon.addEventListener("click", (e) => {
        e.stopPropagation();            // don't trigger document click
        positionPanel();                // align right before showing
        panel.classList.toggle("open"); // show/hide links
    });
    document.addEventListener("click", (e) => {
        if (panel.classList.contains("open") && !panel.contains(e.target)) {
            panel.classList.remove("open");
            links.forEach(link => {
                link.style.display = "none";
            });
        }
    });
    window.addEventListener("resize", () => {
        if (panel.classList.contains("open")) positionPanel();
    });
});