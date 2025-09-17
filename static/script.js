const carouselPositionVar = "--carousel-position";
const accessStyle = getComputedStyle(document.documentElement);
const setStyle = document.documentElement.style;

document.addEventListener("DOMContentLoaded", () => {
    
});

function scrollCarousel(direction) {
    const currentPosition = Number(accessStyle.getPropertyValue(carouselPositionVar));
    setStyle.setProperty(carouselPositionVar, currentPosition + direction);
}
