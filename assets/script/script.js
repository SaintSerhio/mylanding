'use strict';
window.addEventListener("DOMContentLoaded", () => {

    const btnTab = document.querySelectorAll('.type'),
          tabContent = document.querySelectorAll('.site__info-content'),
          tabImages = document.querySelectorAll('.site__info-img'),
          parentBtn = document.querySelector('.site__type');

    function hidenTabContent () {
        tabContent.forEach(item => {
            item.classList.add('box__hide');
        });

        btnTab.forEach(item => {
            item.classList.remove('active');
        });

        tabImages.forEach(item => {
            item.classList.remove('box__show', 'box__fade');
        });
    }

    function showTabContent (i = 0) {
        tabContent[i].classList.remove('box__hide');
        btnTab[i].classList.add('active');
        tabImages[i].classList.add('box__show', 'box__fade');
    }

    hidenTabContent();
    showTabContent();

    parentBtn.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('type')) {
            btnTab.forEach((item, i) => {
                if (target == item) {
                    hidenTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const rightImg = document.querySelector(".content-bg__one"),
          leftImg = document.querySelector(".content-bg__two"),
          headImg = document.querySelector(".content-bg__head"),
          anchorBgHead = document.querySelector(".anchor__bg"),
          titleHead = document.querySelector(".about__text");

          function hideImg () {
            leftImg.style.marginLeft = '-1300px';
            rightImg.style.marginLeft = '1300px';
            titleHead.style.opacity = '0';
            headImg.style.opacity = '1';
            anchorBgHead.style.display = 'block';
          }

          function showImg () {
            leftImg.style.marginLeft = '';
            rightImg.style.marginLeft = '';
            leftImg.style.transitionDuration = '.8s';
            rightImg.style.transitionDuration = '.8s';
            titleHead.style.opacity = '1';
            headImg.style.opacity = '0';
            titleHead.style.transitionDuration = '1.2s';
            headImg.style.transitionDuration = '1s';
          }

          function hideAnchor () {
            anchorBgHead.style.display = 'none';
          }

          hideImg();
          setTimeout(hideAnchor, 2700);
          setTimeout(showImg, 2000);


    /*********burger menu*************/
    
    const burgerMenu = document.querySelector(".burger__menu-list"),
        checkMenu = document.querySelector(".burger-checkbox");

        checkMenu.addEventListener('change', () => {
            if(checkMenu.checked) {
                burgerMenu.classList.add('burger-show');
            } else {
                burgerMenu.classList.remove('burger-show');
            }
        })
    /***************modal*************/
    const btnModalTrigger = document.querySelectorAll('.header__contact'),
          modalWindow = document.querySelector('.modal__container'),
          modalCloseBtn = document.querySelector('.modal__close');

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    btnModalTrigger.forEach(item => {
        item.addEventListener('click', openModalWindow)
    });

    function closeModalWindow() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    //btnModalTrigger.addEventListener('click', openModalWindow);

    modalCloseBtn.addEventListener('click', closeModalWindow);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });

    const modalTimer = setTimeout(openModalWindow, 20000);

    function showModalScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModalWindow();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);


    const btnSubmit = document.querySelector('.btn__submit'),
          checkBox = document.querySelector('.btn__checkbox');
          
          btnSubmit.style.opacity = '0.5';
          checkBox.addEventListener('change', () => {
            if(checkBox.checked) {
                btnSubmit.disabled = false;
                btnSubmit.style.opacity = '1';
            } else {
                btnSubmit.disabled = true;
                btnSubmit.style.opacity = '0.5';
            }
        });


    function validateEmail(sEmail) {
        let reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
        
        if(!sEmail.match(reEmail)) {
            alert("Такой почты не бывает");
            return false;
            } else {
            return true;
            }
    };


      /*****light*****/

    const room = document.querySelector('.light__text-box');
    let lightSize = "transparent 100px, rgba(0, 0, 0, 0.55) 160px";
    let light = document.querySelector('.text__box-light');


    let x = room.clientWidth + 300;
    let y = room.offsetHeight + 100;
    let on = false;

    room.addEventListener('mousemove', (e) => spotLight(e));
    function spotLight(e) {
        light.style.background = `radial-gradient(circle at ${e.x / x * 100}% ${e.y / y *100}%, ${lightSize}`;
        room.style.cursor = 'none';
    };


    // Улучшенная плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Игнорируем ссылки только с #
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                smoothScrollToTarget(targetElement);
            }
        });
    });
});

function smoothScrollToTarget(targetElement, offset = 0) {
    // Рассчитываем позицию с учетом возможного фиксированного header'а
    const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
    const additionalOffset = offset || headerHeight + 20; // +20px для отступа
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - additionalOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(1000, Math.max(500, Math.abs(distance) / 2)); // Автоподбор длительности

    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        // Завершаем анимацию если достигли конца
        if (timeElapsed > duration) {
            window.scrollTo(0, targetPosition);
            return;
        }
        
        const progress = easeInOutCubic(timeElapsed, 0, 1, duration);
        const run = startPosition + distance * progress;
        
        window.scrollTo(0, run);
        requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Разные функции плавности
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}