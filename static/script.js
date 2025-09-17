const accessStyle = getComputedStyle(document.documentElement);
const carouselPositionVar = "--carousel-position";
const carouselControlLeft = document.querySelector(".carousel-control#left");
const carouselControlRight = document.querySelector(".carousel-control#right")
const carouselLength = document.querySelector(".carousel").children.length;
const setStyle = document.documentElement.style;

document.addEventListener("DOMContentLoaded", () => {
    toggleCarouselControls(Number(accessStyle.getPropertyValue(carouselPositionVar)));
    window.addEventListener("resize", () => {
        scrollCarousel(0);
    });
    
    carouselControlLeft.addEventListener("click", () => {
        scrollCarousel(-1);
    });
    carouselControlRight.addEventListener("click", () => {
        scrollCarousel(1);
    });
});


function scrollCarousel(direction) {
    let currentPosition = Number(accessStyle.getPropertyValue(carouselPositionVar));
    const carouselVisibleLength = Number(accessStyle.getPropertyValue("--carousel-visible-images"));

    if (currentPosition >= carouselLength - carouselVisibleLength) currentPosition = carouselLength - carouselVisibleLength;

    setStyle.setProperty(carouselPositionVar, currentPosition + direction);
    toggleCarouselControls(currentPosition + direction, carouselVisibleLength);
}

function toggleCarouselControls(position, visibleLength) {
    position === 0 ? carouselControlLeft.setAttribute("disabled", "") : carouselControlLeft.removeAttribute("disabled");
    position === carouselLength - visibleLength ?
        carouselControlRight.setAttribute("disabled", "") : carouselControlRight.removeAttribute("disabled");
}
