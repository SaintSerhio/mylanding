// assets/js/slider.js - улучшенная версия

// Глобальные переменные для управления слайдером
let currentRotation = 0;
let autoRotateInterval;
let isAutoRotate = true;

document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    loadSliderImages(); // Автоматическая загрузка при старте
});

// Инициализация всех слайдеров
function initializeSliders() {
    initialize3DSlider();
    initializeSwiperSlider();
}

// Инициализация 3D слайдера
function initialize3DSlider() {
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const box = document.querySelector(".gallery__box");

    if (prev && next && box) {
        prev.addEventListener('click', btnPrev);
        next.addEventListener('click', btnNext);
        
        // Автопрокрутка
        startAutoRotation();
        
        // Остановка автопрокрутки при наведении
        box.addEventListener('mouseenter', stopAutoRotation);
        box.addEventListener('mouseleave', startAutoRotation);
    }
}

// Инициализация Swiper слайдера
function initializeSwiperSlider() {
    if (document.querySelector('.mySwiper')) {
        window.swiper = new Swiper(".mySwiper", {
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
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }
}

// Функции управления 3D слайдером
function btnPrev() {
    rotateSlider(60);
}

function btnNext() {
    rotateSlider(-60);
}

function rotateSlider(degrees) {
    const box = document.querySelector('.gallery__box');
    if (!box) return;
    
    currentRotation += degrees;
    
    if (document.documentElement.clientWidth > 690) {
        box.style.transform = `perspective(1300px) rotateY(${currentRotation}deg)`;
    } else {
        box.style.transform = `perspective(4600px) rotateY(${currentRotation}deg)`;
    }
    
    // Сброс автопрокрутки при ручном управлении
    resetAutoRotation();
}

// Автопрокрутка
function startAutoRotation() {
    if (!isAutoRotate) return;
    
    stopAutoRotation(); // Останавливаем предыдущий интервал
    
    autoRotateInterval = setInterval(() => {
        rotateSlider(-60);
    }, 5000);
}

function stopAutoRotation() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
}

function resetAutoRotation() {
    stopAutoRotation();
    if (isAutoRotate) {
        startAutoRotation();
    }
}

// Основная функция загрузки изображений
async function loadSliderImages(category = null) {
    try {
        showLoadingState();
        
        // Формируем URL с учетом фильтра
        let apiUrl = 'api/images.php';
        if (category) {
            apiUrl += `?category=${encodeURIComponent(category)}`;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const images = await response.json();
        
        if (!images || images.length === 0) {
            throw new Error('No images received from API');
        }
        
        update3DSlider(images);
        updateSwiperSlider(images);
        
        hideLoadingState();
        
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
        handleLoadingError(error);
    }
}

// Обновление 3D слайдера
function update3DSlider(images) {
    const galleryBox = document.querySelector('.gallery__box');
    if (!galleryBox) return;
    
    galleryBox.innerHTML = '';
    
    images.forEach((image, index) => {
        const slideDiv = create3DSlide(image, index);
        galleryBox.appendChild(slideDiv);
    });
    
    // Сбрасываем rotation после обновления контента
    currentRotation = 0;
    galleryBox.style.transform = `perspective(1300px) rotateY(0deg)`;
}

// Создание слайда для 3D слайдера
function create3DSlide(image, index) {
    const div = document.createElement('div');
    div.style = `--i:${index + 1};`;
    div.className = 'gallery-slide';
    
    div.innerHTML = `
        <div class="gallery__container-title">
            <a href="${image.link || '#'}" target="_blank" class="slide-link">
                <h4 class="gallery__slide">${escapeHtml(image.title)}</h4>
            </a>
        </div>
        <img src="${image.url}" alt="${image.title}" 
             onerror="this.src='assets/images/placeholder.jpg'" 
             class="slide-image">
    `;
    
    return div;
}

// Обновление Swiper слайдера
function updateSwiperSlider(images) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;
    
    swiperWrapper.innerHTML = '';
    
    images.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="swiper-slide-content">
                <img src="${image.url}" alt="${image.title}" 
                     onerror="this.src='assets/images/placeholder.jpg'">
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
    
    // Переинициализация Swiper
    if (window.swiper) {
        window.swiper.update();
    }
}

// Состояния загрузки
function showLoadingState() {
    const galleryBox = document.querySelector('.gallery__box');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    if (galleryBox) {
        galleryBox.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Загрузка изображений...</p>
            </div>
        `;
    }
    
    if (swiperWrapper) {
        swiperWrapper.innerHTML = `
            <div class="swiper-slide">
                <div class="loading-placeholder">
                    <div class="spinner"></div>
                    <p>Загрузка...</p>
                </div>
            </div>
        `;
    }
}

function hideLoadingState() {
    // Убираем спиннеры загрузки
    const spinners = document.querySelectorAll('.loading-spinner, .loading-placeholder');
    spinners.forEach(spinner => spinner.remove());
}

function handleLoadingError(error) {
    const galleryBox = document.querySelector('.gallery__box');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    const errorMessage = `
        <div class="error-message">
            <p>⚠️ Не удалось загрузить изображения</p>
            <button onclick="loadSliderImages()" class="retry-btn">
                Попробовать снова
            </button>
        </div>
    `;
    
    if (galleryBox) {
        galleryBox.innerHTML = errorMessage;
    }
    
    if (swiperWrapper) {
        swiperWrapper.innerHTML = `
            <div class="swiper-slide">
                <div class="error-message">
                    <p>Ошибка загрузки</p>
                </div>
            </div>
        `;
    }
}

// Дополнительные функции
function showImageInfo(imageId) {
    // Здесь можно реализовать модальное окно с информацией об изображении
    alert(`Информация о проекте ID: ${imageId}`);
}

function filterByCategory(category) {
    loadSliderImages(category);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Экспорт функций для глобального использования
window.loadSliderImages = loadSliderImages;
window.filterByCategory = filterByCategory;
window.showImageInfo = showImageInfo;