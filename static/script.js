const accessStyle = getComputedStyle(document.documentElement);
const carousel = document.querySelector(".carousel");
const carouselPositionVar = "--carousel-position";
const carouselControlLeft = document.querySelector(".carousel-control#left");
const carouselControlRight = document.querySelector(".carousel-control#right")
const carouselLength = document.querySelector(".carousel").children.length;
const carouselTransitionVar = "--carousel-transition-time";
const carouselTransitionTime = accessStyle.getPropertyValue("--carousel-transition-time-setting");
const setStyle = document.documentElement.style;

let touchStartX = 0;
let touchEndX = 0;

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

    carousel.addEventListener("pointerdown", e => {
        touchStartX = e.clientX;
    });
    carousel.addEventListener("pointerup", e => {
        touchEndX = e.clientX;
        handleSwipe();
    });
});


function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
        scrollCarousel(-1);
    } else if (swipeDistance < -swipeThreshold) {
        scrollCarousel(1);
    }
}

function scrollCarousel(direction) {
    let currentPosition = Number(accessStyle.getPropertyValue(carouselPositionVar));
    const carouselVisibleLength = Number(accessStyle.getPropertyValue("--carousel-visible-images"));

    if (currentPosition >= carouselLength - carouselVisibleLength) currentPosition = carouselLength - carouselVisibleLength;
    
    let newPosition = currentPosition + direction;

    if (newPosition >= 0 && newPosition <= carouselLength - carouselVisibleLength) {
        if (direction !== 0) setStyle.setProperty(carouselTransitionVar, carouselTransitionTime);

        setStyle.setProperty(carouselPositionVar, currentPosition + direction);
        toggleCarouselControls(currentPosition + direction, carouselVisibleLength);

        setTimeout(() => {
            setStyle.setProperty(carouselTransitionVar, "none");
        }, 500);
    }
}

function toggleCarouselControls(position, visibleLength) {
    position === 0 ? carouselControlLeft.setAttribute("disabled", "") : carouselControlLeft.removeAttribute("disabled");
    position === carouselLength - visibleLength ?
        carouselControlRight.setAttribute("disabled", "") : carouselControlRight.removeAttribute("disabled");
}
