const showMovBtn = document.getElementById('show-all');
const findMovBtn = document.getElementById('find-movie');
const revMovBtn = document.getElementById('rev-movie');
const findRevBtn = document.getElementById('find-review');
const instBox = document.getElementById('hide');
const forms = document.getElementsByTagName('form');
const findMovie = document.getElementById('find');
const revMovie = document.getElementById('review');
const findRev = document.getElementById('find-rev');
const dispBox = document.getElementById('display-box');
const display = document.getElementById('display');

const start = () => {
    for(let i=0; i<forms.length; i++){
        forms[i].setAttribute('style', 'display: none');
    }
    dispBox.setAttribute('style', 'display: none');
}

const makeMovCard = movie => {
    display.innerHTML = ''; 
    const movCard = document.createElement('div');
    movCard.setAttribute('class', 'card');
    const movTitle = document.createElement('h3');
    const movDesc = document.createElement('p');
    movTitle.innerHTML = `${movie.title}`
    movDesc.innerHTML = `${movie.description}`
    movCard.appendChild(movTitle);
    movCard.appendChild(movDesc);
    display.appendChild(movCard);
}

const makeRevCard = data => {
    console.log(data);
    display.innerHTML = '';
    
    const revCard = document.createElement('div');
    revCard.setAttribute('class', 'card');

    const movTitle = document.createElement('h3');
    movTitle.innerHTML = `${data[0].title}`
    revCard.appendChild(movTitle);

    const revArr = [];
    data.forEach(item => {
        const rev = item.review;
        revArr.push(rev)})
    revArr.forEach(item=>{
        const review = document.createElement('p');
        review.setAttribute('class', 'rev-text')
        review.innerHTML = `${item}`
        revCard.appendChild(review);
    })
    display.appendChild(revCard);
}

const getAllMovies = () => {
    fetch('/api/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response.json())
    .then((data) => data.forEach(movie => {makeMovCard(movie)}))
    .catch((err) => {if(err){throw err}})
}

const getMovRev = (inpt) => {
    fetch(`/api/reviews/${inpt}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response.json())
    .then((data) => {makeRevCard(data)})
    .catch((err) => {if(err){throw err}})
}

showMovBtn.addEventListener('click', (event => {
    event.preventDefault();
    instBox.setAttribute('style', 'display: none');
    dispBox.setAttribute('style', 'display: flex');
    getAllMovies()
}))

findRevBtn.addEventListener('click', (event => {
    event.preventDefault();
    instBox.setAttribute('style', 'display: none');
    findRev.setAttribute('style', 'display: flex; margin-top: 10rem');
    // dispBox.setAttribute('style', 'display: flex');
    // getMovRev()
}))

findRev.addEventListener('submit', event =>{
    event.preventDefault();
    const revTitle = document.getElementById('find-rev-inpt')
    console.log(revTitle.value);
    findRev.setAttribute('style', 'display: none');
    dispBox.setAttribute('style', 'display: flex');
    getMovRev(revTitle.value);
})

start();