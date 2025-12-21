document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".grid-item a").forEach(link => {
        link.setAttribute("target", "_blank");
    });
    
    const smallImage = document.querySelector(".numRefSheet");
    let overlay = document.createElement("div");
    overlay.classList.add("image-overlay");
    overlay.innerHTML = `
        <button class="close-btn">&times;</button>
        <img src="img/geometryReference.png" class="full-image">
    `;
    document.body.appendChild(overlay);

    const fullImage = overlay.querySelector(".full-image");
    const closeButton = overlay.querySelector(".close-btn");

    fullImage.draggable = false;

    let isDragging = false, startX, startY, lastX = 0, lastY = 0;

    // open overlay
    smallImage.addEventListener("click", () => {
        overlay.classList.add("active");
        smallImage.style.display = "none"; 
    });

    // close overlay
    closeButton.addEventListener("click", () => {
        overlay.classList.remove("active");
        smallImage.style.display = "block"; 
    });

    // mouse dragging functionality
    fullImage.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - lastX;
        startY = e.clientY - lastY;
        fullImage.style.cursor = "grabbing";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        fullImage.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        lastX = e.clientX - startX;
        lastY = e.clientY - startY;
        fullImage.style.transform = `translate(${lastX}px, ${lastY}px)`;
    });

    // touch dragging functionality
    fullImage.addEventListener("touchstart", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.touches[0].clientX - lastX;
        startY = e.touches[0].clientY - lastY;
    });

    document.addEventListener("touchend", () => {
        isDragging = false;
    });

    document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        lastX = e.touches[0].clientX - startX;
        lastY = e.touches[0].clientY - startY;
        fullImage.style.transform = `translate(${lastX}px, ${lastY}px)`;
    });
});

//law doc functionality
document.addEventListener('DOMContentLoaded', () => {
    const thumbnail = document.querySelector('.pdf-thumb-img');
    const modal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const closeBtn = document.querySelector('.close-btn');
    const pdfPath = 'docs/Law_Understanding-Morality.pdf';
    let currentPage = 1;
    const totalPages = 3; 

    // open modal on thumbnail click
    thumbnail.addEventListener('click', () => {
        pdfViewer.src = `${pdfPath}#page=${currentPage}&toolbar=0`;
        modal.style.display = 'flex';
    });

    // close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        pdfViewer.src = ''; 
    });

    // close modal on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            pdfViewer.src = '';
        }
    });
});