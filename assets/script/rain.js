"use strict";

window.addEventListener("DOMContentLoaded", () => {

    function randomNominal() {
        const nominal = "\u20B4\u20BD\u20BF\u20AC\u0024\u20BA\u20B9\u00A3\u20AA\u00A5";
        //const nominal = ("$¥£₪€₽");
        let letters = nominal[Math.floor(Math.random() * nominal.length)];
        return letters;
    }

    function rain() {
        let cloud = document.querySelector('.cloud');
        let e = document.createElement('div');
        e.classList.add('drop');
        cloud.appendChild(e);

        let left = Math.floor(Math.random() * 290);
        let size = Math.random() * 6.5;
        let duration = Math.random() * 1.8;

        e.innerText = randomNominal();
        e.style.left = left + 'px';
        e.style.fontSize = 12 + size + 'px';
        e.style.animationDuration = 1.2 + duration + 's';

        setTimeout(function() {
            cloud.removeChild(e)
        }, 2000)
    }

    setInterval(function() {
        rain()
        }, 30)
})