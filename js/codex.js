// JavaScript for handling page turning
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const coverImage = document.getElementById("coverImage");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");
// Array of images for the codex
const pages = ["img/cover.png", "img/page01.png", "img/page02.png", "img/page03.png", "img/page04.png", "img/page05.png", "img/page06.png", "img/page07.png", "img/page08.png", "img/page09.png", "img/page10.png", "img/page11.png"];
let currentPage = 0;
// Function to update the displayed pages
function updatePages() {
    const gifImage = document.getElementById("properfly");
    if (currentPage === 0) {
        // Show cover only
        coverImage.style.display = "block";
        leftImage.style.display = "none";
        rightImage.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "block";
        if (gifImage) gifImage.style.display = "none"; // Hide gif
    } else if (currentPage >= pages.length - 1) {
        // Last page
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButton.style.display = "block";
        nextButton.style.display = "none";
        if (gifImage) gifImage.style.display = "none"; // Hide gif
    } else {
        // Normal two-page layout
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButton.style.display = "block";
        nextButton.style.display = "block";

        // Show gif on the fourth set of pages
        if (currentPage >= 8 && currentPage <= 9) {
            gifImage.style.display = "block";

            // Position gif relative to rightImage
            const rightImageRect = rightImage.getBoundingClientRect();
            gifImage.style.left = `${rightImageRect.left + rightImageRect.width * 0.25}px`;
            gifImage.style.top = `${rightImageRect.top + rightImageRect.height * 0.75}px`;
            gifImage.style.width = `${rightImageRect.width * 0.5}px`;
        } else {
            gifImage.style.display = "none";
        }
    }
}
// Event listeners for buttons
nextButton.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
        currentPage += 2;
        updatePages();
    }
});
prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage -= 2; 
        updatePages();
    }
});
// Add hover effect for the left page
leftImage.addEventListener("mouseenter", () => {
    if (currentPage >= 8 && currentPage <= 9) { // Ensure it's the fourth set of pages
        leftImage.src = "img/page07enphon.png";
    }
});
leftImage.addEventListener("mouseleave", () => {
    if (currentPage >= 8 && currentPage <= 9) { // Restore original left page
        leftImage.src = pages[currentPage - 1];
    }
});
// Initialize with the cover
updatePages();