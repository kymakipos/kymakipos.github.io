document.addEventListener("DOMContentLoaded", function () {
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

    let isDragging = false, startX, startY, lastX = 0, lastY = 0;

    // Open overlay
    smallImage.addEventListener("click", () => {
        overlay.classList.add("active");
        smallImage.style.display = "none"; 
    });

    // Close overlay
    closeButton.addEventListener("click", () => {
        overlay.classList.remove("active");
        smallImage.style.display = "block"; 
    });

    // Dragging functionality
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
});