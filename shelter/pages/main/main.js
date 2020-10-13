let burger = document.querySelector('#menu__toggle');
document.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.classList.contains('menu__toggle')) {
        if (burger.checked) {
            enableScroll()
            disableScroll();
        } else {
            enableScroll();
        }
    }

});

function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
    document.body.style.overflow = null;
}