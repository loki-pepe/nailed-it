const accessStyle = getComputedStyle(document.documentElement);
const carouselPositionVar = "--carousel-position";
const carouselControlLeft = document.querySelector(".carousel-control#left");
const carouselControlRight = document.querySelector(".carousel-control#right")
const carouselLength = document.querySelector(".carousel").children.length;
const setStyle = document.documentElement.style;

document.addEventListener("DOMContentLoaded", () => {

    toggleCarouselControls(Number(accessStyle.getPropertyValue(carouselPositionVar)));
    
    carouselControlLeft.addEventListener("click", () => {
        scrollCarousel(-1);
    });
    carouselControlRight.addEventListener("click", () => {
        scrollCarousel(1);
    });
});


function scrollCarousel(direction) {
    const currentPosition = Number(accessStyle.getPropertyValue(carouselPositionVar));

    setStyle.setProperty(carouselPositionVar, currentPosition + direction);
    toggleCarouselControls(currentPosition + direction);
}

function toggleCarouselControls(position) {
    const carouselVisibleLength = Number(accessStyle.getPropertyValue("--carousel-visible-images"));

    position === 0 ? carouselControlLeft.setAttribute("disabled", "") : carouselControlLeft.removeAttribute("disabled");
    position === carouselLength - carouselVisibleLength ?
        carouselControlRight.setAttribute("disabled", "") : carouselControlRight.removeAttribute("disabled");
}
