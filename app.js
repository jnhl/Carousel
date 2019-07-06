const wrapper = document.querySelector('.carousel-wrapper');
const carousel = document.querySelectorAll('.carousel-wrapper .carousel');
const portraits = document.querySelectorAll('.carousel-photo');
const names = document.querySelectorAll('.name');
const next = document.querySelector('#nextBtn');
const prev = document.querySelector('#prevBtn');

let counter = 1;
const size = carousel[0].clientWidth;

wrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';

next.addEventListener('click', () => {
    if (counter < carousel.length - 3) {
        wrapper.style.transition = "transform 1s ease-in-out";
        counter++;
        wrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

prev.addEventListener('click', () => {
    if (counter > 0) {
        wrapper.style.transition = "transform 1s ease-in-out";
        counter--;
        wrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

function populateReviews() {
    fetch('https://randomuser.me/api/?results=6&inc=name,picture')
        .then(response => response.json())
        .then(updateProfile)
        .catch(error => console.log(error))
}

function updateProfile(profile) {
    let x = 0;
    let y = 0;
    portraits.forEach(e => {
        e.src = profile.results[x].picture.thumbnail;
        x++;
    })

    names.forEach(e => {
        e.innerHTML = createFullname(profile.results[y].name)
        y++;
    })
    return 1;
}

function createFullname(name) {
    return name.first.charAt(0).toUpperCase() + name.first.slice(1) + " " + name.last.charAt(0).toUpperCase() + name.last.slice(1);
}

populateReviews();