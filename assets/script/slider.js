"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const prev = document.querySelector(".prev"),
          next = document.querySelector(".next"),
          box = document.querySelector(".gallery__box");

    let index = 0;

    function btnPrev() {
        if(document.documentElement.clientWidth > 690) {
            index += 60;
            box.style = `transform: perspective(1300px) rotateY(${index}deg)`;
        }
        if (document.documentElement.clientWidth < 690) {
            index += 60;
            box.style = `transform: perspective(4600px) rotateY(${index}deg)`;
        }
    }

    function btnNext() {
        if(document.documentElement.clientWidth > 690) {
            index -= 60;
            box.style = `transform: perspective(1300px) rotateY(${index}deg)`;
        }
        if (document.documentElement.clientWidth < 690) {
            index -= 60;
            box.style = `transform: perspective(4600px) rotateY(${index}deg)`;
        }
    }

    if (prev && next && box) {
        prev.addEventListener('click', btnPrev);
        next.addEventListener('click', btnNext);
    }

    // Инициализация Swiper слайдера
    if (document.querySelector('.mySwiper')) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 3000,
            },
        });
    }
});

// Функция для загрузки изображений в слайдеры с бэкенда
async function loadSliderImages() {
    try {
        // Замените на ваш endpoint API
        const response = await fetch('https://your-backend-api.com/images');
        const images = await response.json();
        
        // Обновление 3D слайдера
        const galleryBox = document.querySelector('.gallery__box');
        if (galleryBox) {
            galleryBox.innerHTML = '';
            
            images.forEach((image, i) => {
                const div = document.createElement('div');
                div.style = `--i:${i+1};`;
                div.innerHTML = `
                    <div class="gallery__container-title">
                        <a href="${image.link || '#'}"><h4 class="gallery__slide">${image.title}</h4></a>
                    </div>
                    <img src="${image.url}" alt="${image.title}">
                `;
                galleryBox.appendChild(div);
            });
        }
        
        // Обновление Swiper слайдера
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
            swiperWrapper.innerHTML = '';
            
            images.forEach(image => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `<img src="${image.url}" alt="${image.title}">`;
                swiperWrapper.appendChild(slide);
            });
            
            // Переинициализация Swiper
            if (typeof swiper !== 'undefined') {
                swiper.update();
            }
        }
        
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }
}
