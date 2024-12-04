// JavaScript for handling page turning
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const coverImage = document.getElementById("coverImage");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");

// Array of images for the codex
const pages = ["img/cover.png", "img/page01.png", "img/page02.png", "img/page03.png", "img/page04.png", "img/page05.png", "img/page06.png", "img/page07.png", "img/page08.png"];
let currentPage = 0;

// Function to update the displayed pages
function updatePages() {
    if (currentPage === 0) {
        // Show cover only
        coverImage.style.display = "block";
        leftImage.style.display = "none";
        rightImage.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "block";
    } else if (currentPage >= pages.length - 1) {
        // Last page
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButton.style.display = "block";
        nextButton.style.display = "none";
    } else {
        // Normal two-page layout
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButton.style.display = "block";
        nextButton.style.display = "block";
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

// Initialize with the cover
updatePages();