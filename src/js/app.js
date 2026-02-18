"use strict";

$(document).ready(function () {
  const $widthSlider = $(".bc__width-slider-input");
  const $widthValue = $(".bc__width-slider-value");
  const $widthTrack = $(".bc__width-slider-track");
  const $heightRadios = $(".bc__height-radio");

  // Функция для получения значения ширины проезда по длине шлагбаума
  function getWidthByHeight(height) {
    const heightNum = parseFloat(height);
    // Значение сегмента напрямую соответствует значению слайдера
    return heightNum;
  }

  function updateSlider(value) {
    const min = parseFloat($widthSlider.attr("min"));
    const max = parseFloat($widthSlider.attr("max"));
    const percentage = ((value - min) / (max - min)) * 100;

    $widthValue.text(value.toFixed(1));
    $widthTrack.css("--slider-percentage", percentage + "%");
    $widthValue.css("left", percentage + "%");

    // Добавляем/удаляем классы для крайних значений
    $widthTrack.removeClass(
      "bc__width-slider-track--min bc__width-slider-track--max",
    );

    if (value <= min) {
      $widthTrack.addClass("bc__width-slider-track--min");
    } else if (value >= max) {
      $widthTrack.addClass("bc__width-slider-track--max");
    }
  }

  // Обработчик изменения слайдера (только обновляет отображение, не влияет на segments)
  $widthSlider.on("input", function () {
    const value = parseFloat($(this).val());
    updateSlider(value);
  });

  // Обработчик изменения сегмента длины шлагбаума (обновляет слайдер)
  $heightRadios.on("change", function () {
    const height = parseFloat($(this).val());
    const width = getWidthByHeight(height);

    // Обновляем слайдер
    $widthSlider.val(width);
    updateSlider(width);
  });

  // Инициализация при загрузке
  const initialValue = parseFloat($widthSlider.val());
  updateSlider(initialValue);

  // Обновление при изменении размера окна
  $(window).on("resize", function () {
    const value = parseFloat($widthSlider.val());
    updateSlider(value);
  });

  // Мобильное меню
  const tl = gsap.timeline({ paused: true });
  const openBtn = document.querySelector('.js-open-menu');
  const burgerLines = document.querySelectorAll('.bc__burger .line');
  const menuContainer = document.querySelector('ul.bc__header-menu--mobile-container');

  tl.set("ul.bc__header-menu--mobile-container", {
    display: "flex",
    backgroundColor: "transparent",
  })
    .to(
      "ul.bc__header-menu--mobile-container",
      {
        duration: 0.5,
        backgroundColor: "#ffffff",
        ease: "expo.inOut",
      },
      0,
    )
    .to(
      "div.bc__header-menu--mobile",
      {
        duration: 0.5,
        opacity: 1,
        ease: "expo.inOut",
      },
      0,
    )
    .from(
      "div.bc__header-menu--mobile li",
      {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.05,
        ease: "expo.inOut",
      },
      "-=0.25",
    );
  
  // Анимация бургера → крестик (параллельно с меню)
  tl.to(burgerLines[0], { duration: 0.3, rotation: 45, y: 5, ease: 'expo.inOut' }, 0)
    .to(burgerLines[1], { duration: 0.2, scaleX: 0, ease: 'expo.inOut' }, 0)
    .to(burgerLines[2], { duration: 0.3, rotation: -45, y: -5, ease: 'expo.inOut' }, 0);

  tl.reverse();
  openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tl.reversed(!tl.reversed());
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
      if (!menuContainer.contains(e.target) && !openBtn.contains(e.target)) {
          tl.reverse();
      }
  });
});
