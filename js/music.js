document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".lyric-dropdown-button");

    buttons.forEach(button => {
        const lyrics = button.nextElementSibling; // assumes lyrics-text is right after button
        const arrow = button.querySelector(".down-arrows");

        button.addEventListener("click", () => {
            if (lyrics.style.maxHeight) {
                // Closing
                lyrics.style.maxHeight = null;
                arrow.classList.remove("flipped");
            } else {
                // Opening
                lyrics.style.maxHeight = lyrics.scrollHeight + "px";
                arrow.classList.add("flipped");
            }
        });
    });
});