
// Background image selection
const backgroundImageCount = 5;

var backgroundImageElement = document.getElementById("backgroundImage");
var randomImage = Math.random() * (backgroundImageCount - 1) + 1;
backgroundImageElement.style.setProperty("background-image", `url(./img/backgrounds/${randomImage.toFixed(0)}.jpg)`)