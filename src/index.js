import './style.css';

const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=rN5IKM7FbnQBTTK5M0cENyNfFf1KjBE5OPiA94nf';

/*
Ulises JS
*/
import MainCards from './modules/add-cards.js';

document.addEventListener('DOMContentLoaded', MainCards.displayCards(baseUrl));

/*
Addisu JS
*/
