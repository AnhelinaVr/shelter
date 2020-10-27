let burger = document.querySelector('#menu__toggle');
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__toggle')) {
        if (burger.checked)
            disableScroll();
        else
            enableScroll();
    }
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');
    if (burger.checked) {
        document.querySelector('.logo_burger').style.display = 'block';
        document.querySelector('.logo').style.display = 'none';
    }

}

function enableScroll() {
    document.body.style.overflow = null;
    overlay.classList.remove('active');
    if (!burger.checked) {
        document.querySelector('.logo_burger').style.display = 'none';
        document.querySelector('.logo').style.display = 'block';
    }
}

let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', '../pets.json');
request.onload = () => { console.log(request.response) };
fetch('../pets.json').then(res => res.json()).then(list => {
    pets = list;

    fullPetsList = (() => {
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
            const newPets = pets;

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);


    for (let i = 0; i < (fullPetsList.length / 6); i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if (item.name === stepList[j].name && (ind !== j)) {
                    document.querySelector("#pets").children[(i * 6) + j].style.border = '5px solid red';
                }
            })
        }
    }
});


var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    slidesPerGroup: 3,
    breakpoints: {
        1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
    },
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
});


request.send();

const createPets = (petsList) => {
    for (let i = 0; i < petsList.length; i++) {
        swiper.appendSlide(createCard(petsList[i]));
    }
}


createCard = (pet) => {
    let card = document.createElement('div');
    card.classList.add('pets__card');

    card.innerHTML += `<img src="${ pet.img }">`;
    card.innerHTML += `<h4 class="pets__card_title">${ pet.name }</h4>  `;
    card.innerHTML += `<button class="button button__big button__big_secondary button__learn-more">Learn more</button>`;

    let slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.appendChild(card);
    return slide;
}



const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;


    list = sort6recursively(list);

    return list;
}

const sort6recursively = (list) => {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }

    return list;
}



function getItemSlide() {
    console.log(swiper.activeIndex);
}






const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');


overlay.addEventListener('click', () => {
    if (burger.checked) {
        burger.checked = false;
    }
    closeModal();
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal();
    })
});

function openModal() {
    modal.classList.add('active');
    disableScroll();
}

function closeModal() {
    modal.classList.remove('active');
    modal.querySelector('.modal-body').innerHTML = '';
    enableScroll();
}

let pet__name = document.createElement('h3');
pet__name.classList.add('pet__name');
let pet__type = document.createElement('h4');
pet__type.classList.add('pet__type');
let pet__description = document.createElement('h5');
pet__description.classList.add('pet__description');
let pet__characteristics = document.createElement('ul');
pet__characteristics.classList.add('pet__characteristics')
let pets__card_modal = document.createElement('div');
pets__card_modal.classList.add('pets__card_modal');

document.querySelector('.pets__slider').addEventListener('click', (e) => {
    if (e.target.offsetParent.classList.contains('pets__card') || e.target.classList.contains('pets__card')) {
        let pet__name = document.createElement('h3');
        pet__name.classList.add('pet__name');
        let pet__type = document.createElement('h4');
        pet__type.classList.add('pet__type');
        let pet__description = document.createElement('h5');
        pet__description.classList.add('pet__description');
        let pet__characteristics = document.createElement('ul');
        pet__characteristics.classList.add('pet__characteristics')
        let pets__card_modal = document.createElement('div');
        pets__card_modal.classList.add('pets__card_modal');
        pets__card_modal.appendChild(pet__name);
        pets__card_modal.appendChild(pet__type);
        pets__card_modal.appendChild(pet__description);
        pets__card_modal.appendChild(pet__characteristics);
        modal.querySelector('.modal-body').appendChild(pets__card_modal);
        openModal();
        let pet;
        if (e.target.classList.contains('pets__card')) {
            pet = pets.find(pet => pet.name === e.target.children[1].textContent);
            pet__name.innerText = pet.name;
        } else pet = pets.find(pet => pet.name === e.target.parentElement.children[1].textContent);
        pet__name.innerText = pet.name;

        pet__type.innerText = `${pet.type} - ${pet.breed}`;
        pet__description.innerText = pet.description;
        let pet_medical = ['<b>Parasites: </b>' + pet.parasites.join(', '), '<b>Diseases: </b>' + pet.diseases.join(', '), '<b>Inoculations: </b>' + pet.inoculations.join(', '), '<b>Age: </b>' + pet.age];
        pet__characteristics.innerHTML = '';
        let pet__img = document.createElement('img');
        pet__img.classList.add('modal__img');
        pet__img.src = pet.img;
        pet__img.alt = pet.name;
        modal.querySelector('.modal-body').insertBefore(pet__img, pets__card_modal);
        for (let i = 3; i >= 0; i--) {
            let li = document.createElement('li');
            pet__characteristics.appendChild(li);
            // console.log(li);
            li.innerHTML = pet_medical[i];
        }
    }
});

function goToPetsPage() {
    document.location.href = "../pets/pets.html";
}