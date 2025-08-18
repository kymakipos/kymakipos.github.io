//Virtual Book V1.06
const prevButtons = document.querySelectorAll(".page-turn-button.left");
const nextButtons = document.querySelectorAll(".page-turn-button.right");
const coverImage = document.getElementById("coverImage");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");
const loadingIcon = document.getElementById("loadingIcon"); 
const pages = ["img/cover.png", "img/page01.png", "img/page02.png", "img/page03.png", "img/page04.png", "img/page05.png", "img/page06.png", 
               "img/page07.png", "img/page08.png", "img/page09.png", "img/page10.png", "img/page11.png", "img/page12.png", "img/page13.png", 
               "img/page14.png", "img/page15.png", "img/page16.png"];

let currentPage = 0;
let imagesLoaded = 0;
const totalImages = pages.length;

function preloadImages(callback) {
    loadingIcon.style.display = "flex";
    prevButtons.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.5";
    });
    nextButtons.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.5";
    });
    pages.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                loadingIcon.style.display = "none";
                callback();
            }
        };
        img.onerror = () => console.error(`Failed to load image: ${src}`);
        imagesLoaded++; // still count errored images
        if (imagesLoaded === totalImages) {
            loadingIcon.style.display = "none";
            callback();
        }
    });
}
function enableButtons() {
    prevButtons.forEach(btn => {
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    });
    nextButtons.forEach(btn => {
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    });
}

function positionGif() {
    const gifImage = document.getElementById("properfly");
    const rightImage = document.getElementById("rightImage");
    if (gifImage.style.display === "block") {
        const rightImageRect = rightImage.getBoundingClientRect(); 
        const centerImagesRect = rightImage.offsetParent.getBoundingClientRect(); 
        const gifWidth = rightImageRect.width * 0.55;
        const gifLeft = rightImageRect.left - centerImagesRect.left + rightImageRect.width / 2;
        const gifTop = rightImageRect.top - centerImagesRect.top + rightImageRect.height * 0.768;
        gifImage.style.left = `${gifLeft}px`;
        gifImage.style.top = `${gifTop}px`;
        gifImage.style.width = `${gifWidth}px`;
        gifImage.style.height = "auto";
        //gifImage.style.transform = "translate(-50%, -50%)";

        const parentRect = gifImage.offsetParent.getBoundingClientRect();
        console.log("Offset Parent Dimensions:", parentRect);
        console.log("GIF Position:", gifImage.style.left, gifImage.style.top);
    }
}
window.addEventListener("resize", positionGif);
function updatePages() {
    const gifImage = document.getElementById("properfly");
    if (currentPage === 0) {
        // cover
        coverImage.style.display = "block";
        leftImage.style.display = "none";
        rightImage.style.display = "none";
        prevButtons.forEach(btn => btn.style.visibility = "hidden");
        nextButtons.forEach(btn => btn.style.visibility = "visible");
        gifImage.style.display = "none";
    } else if (currentPage >= pages.length - 1) {
        // last page
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButtons.forEach(btn => btn.style.visibility = "visible");
        nextButtons.forEach(btn => btn.style.visibility = "hidden");
        gifImage.style.display = "none";
    } else {
        // two-page layout
        coverImage.style.display = "none";
        leftImage.src = pages[currentPage - 1];
        rightImage.src = pages[currentPage];
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        prevButtons.forEach(btn => btn.style.visibility = "visible");
        nextButtons.forEach(btn => btn.style.visibility = "visible");

        if (currentPage >= 8 && currentPage <= 9) {
            gifImage.style.display = "block";
            positionGif();
        } else {
            gifImage.style.display = "none";
        }
    }
}
nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
      currentPage += 2;
      updatePages();
    }
  });
});
prevButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 2;
      updatePages();
    }
  });
});
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && currentPage < pages.length - 1) {
        currentPage += 2;
        updatePages();
    } else if (event.key === "ArrowLeft" && currentPage > 0) {
        currentPage -= 2;
        updatePages();
    }
});
// hover effect for the left page
leftImage.addEventListener("mouseenter", () => {
    if (currentPage >= 8 && currentPage <= 9) {
        leftImage.src = "img/page07en.png";
    }
});
leftImage.addEventListener("mouseleave", () => {
    if (currentPage >= 8 && currentPage <= 9) { // restore original left page
        leftImage.src = pages[currentPage - 1];
    }
});
preloadImages(() => {
    enableButtons();
    updatePages();
});