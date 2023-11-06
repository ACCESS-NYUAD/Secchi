$(document).ready(function () {
  const $carousel = $(".carousel");
  const $slides = $carousel.find(".carousel-slide");
  const $buttons = $carousel.find(".carousel-button");

  let currentIndex = 0;

  function showSlide(index) {
    $slides.removeClass("active");
    $slides.eq(index).addClass("active");
    $slides.css("opacity", 0);
    $slides.eq(index).css("opacity", 1);
    $buttons.removeClass("active");
    $buttons.eq(index).addClass("active");
  }

  showSlide(currentIndex);

  $buttons.click(function () {
    const buttonIndex = $(this).index();
    currentIndex = buttonIndex;
    showSlide(currentIndex);
  });

  setInterval(function () {
    currentIndex = (currentIndex + 1) % $slides.length;
    showSlide(currentIndex);
  }, 4000);
});