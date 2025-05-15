"use strict";

window.addEventListener("DOMContentLoaded", () => {

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

    prev.addEventListener('click', btnPrev);
    next.addEventListener('click', btnNext);

})
