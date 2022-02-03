const showMovBtn = document.getElementById('show-all');
const findMovBtn = document.getElementById('find-movie');
const revMovBtn = document.getElementById('rev-movie');
const findRevBtn = document.getElementById('find-review');
const addBox = document.getElementById('add-box');
const addMovBtn = document.getElementById('add-mov');
const instBox = document.getElementById('hide');
const forms = document.getElementsByTagName('form');
const findMovie = document.getElementById('find');
const addMovie = document.getElementById('add-movie');
const revMovie = document.getElementById('review');
const findRev = document.getElementById('find-rev');
const dispBox = document.getElementById('display-box');
const display = document.getElementById('display');

const hide = el => {
    if(el.style){
        el.setAttribute('style', 'display: none');
    } else {return};
}

const show = el => {
    el.setAttribute('style', 'display: flex');
}

const empty = el => {
    el.innerHTML = ''; 
}

const start = () => {
    for(let i=0; i<forms.length; i++){
        hide(forms[i]);
    }
    hide(dispBox);
}

const makeMovCard = movie => {
    const movCard = document.createElement('div');
    movCard.setAttribute('class', 'card');
    const movTitle = document.createElement('h3');
    const movDesc = document.createElement('p');
    movDesc.setAttribute('class', 'desc-text')
    movTitle.innerHTML = `${movie.title}`
    movDesc.innerHTML = `${movie.description}`
    movCard.appendChild(movTitle);
    movCard.appendChild(movDesc);
    display.appendChild(movCard);
    show(display); 
}

const makeRevCard = data => {
    console.log(data);
    // empty(display);
    
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
        review.innerHTML = `"${item}"`
        revCard.appendChild(review);
    })
    display.appendChild(revCard);
    show(display); 
}

const getAllMovies = () => {
    fetch('/api/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response)=> response.json())
    .then((data) => data.forEach(movie => {makeMovCard(movie)}))
    .catch((err) => {if(err){throw err}})
}

const getOneMovie = inpt => {
    fetch(`/api/movies/${inpt}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response)=> response.json())
    .then((data) => data.forEach(movie => {makeMovCard(movie)}))
    .catch((err) => {if(err){throw err}})
}

const getMovRev = inpt => {
    fetch(`/api/reviews/${inpt}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response)=> response.json())
    .then((data) => {makeRevCard(data)})
    .catch((err) => {if(err){throw err}})
}

const postOneMovie = movieObj => {
    fetch('/api/movies/add-movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj)
    }).then((response)=> response.json())
    .then(data=>{
        alert(data.status);
        getOneMovie(movieObj.movie);
    })
}

const postRev = movieObj => {
    fetch('/api/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj)
    }).then((response)=> response.json())
    .then((data) => {
        console.log(data);
        alert(data.status)
        console.log(movieObj.movie)
        getMovRev(movieObj.movie)
    })
    .catch((err) => {if(err){throw err}})
}

showMovBtn.addEventListener('click', event => {
    event.preventDefault();
    start();
    hide(instBox);
    empty(display);
    show(addBox);
    show(dispBox);
    getAllMovies()
})

findRevBtn.addEventListener('click', event => {
    event.preventDefault();
    start();
    hide(instBox);
    show(dispBox);
    if(display.innerHTML === ''){
        hide(dispBox);
    }
    show(findRev);
})

findMovBtn.addEventListener('click', event => {
    event.preventDefault();
    start();
    hide(instBox);
    hide(dispBox);
    show(findMovie);
})

revMovBtn.addEventListener('click', event => {
    event.preventDefault();
    start();
    hide(instBox);
    hide(dispBox);
    show(revMovie);
})

addMovBtn.addEventListener('click', event => {
    event.preventDefault();
    hide(dispBox);
    hide(addBox);
    show(addMovie);
})

findMovie.addEventListener('submit', event =>{
    event.preventDefault();
    const movTitle = document.getElementById('find-inpt')
    // hide(findMovie);
    empty(display);
    show(dispBox);
    getOneMovie(movTitle.value);
    movTitle.value = '';
})

addMovie.addEventListener('submit', event => {
    event.preventDefault();
    const movTitle = document.getElementById('add-title-inpt');
    const movDesc = document.getElementById('desc-inpt');
    const movieObj = {
        movie: movTitle.value,
        description: movDesc.value
    }
    hide(addMovie);
    empty(display);
    show(dispBox);
    postOneMovie(movieObj);
    movTitle.value = '';
    movDesc.value = '';
})

findRev.addEventListener('submit', event =>{
    event.preventDefault();
    const revTitle = document.getElementById('find-rev-inpt')
    console.log(revTitle.value);
    hide(findRev);
    empty(display);
    show(dispBox);
    getMovRev(revTitle.value);
    revTitle.value = '';
})

revMovie.addEventListener('submit', event => {
    event.preventDefault();
    const movieInpt = document.getElementById('rev-title-inpt');
    const revInpt = document.getElementById('rev-inpt');
    const movieObj = {
        movie: movieInpt.value,
        review: revInpt.value
    }
    hide(revMovie);
    empty(display);
    show(dispBox);
    postRev(movieObj)
    movieInpt.value = '';
    revInpt.value = '';
})

start();