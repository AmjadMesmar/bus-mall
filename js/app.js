'use strict';

let busProducts = [

  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

const buttonsDisplay = document.getElementById('buttons');
let resultsButton ;
//document.getElementById('buttons').style.color = '#FF8040';
const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

let leftProductIndex = 0;
let centerProductIndex = 0;
let rightProductIndex = 0;
const clickCounter = 25;


function Bus(name,image) {
  this.name = name;
  this.image = `./Images/${image}`;
  this.clicks = 0;
  this.shown = 0;
  Bus.all.push(this);
}

Bus.all = [];
Bus.counter = 1;

for (let i = 0; i < busProducts.length; i++){

  new Bus (getName(busProducts[i]),busProducts[i]);

}

function getName (fileName){
  return fileName.split('.').slice(0,-1).join('.');

  /*
 return fileName.split('.')[0];
 return fileName.split('.')[1];
  */

}

function renderNewProduct() {

  let leftIndex = randomNumber(0, Bus.all.length - 1);
  leftImage.src = Bus.all[leftIndex].image;
  leftImage.alt = Bus.all[leftIndex].name;
  leftProductIndex = leftIndex;


  let centerIndex;

  do {
    centerIndex = randomNumber(0, Bus.all.length - 1);
  } while (leftIndex === centerIndex);

  centerImage.src = Bus.all[centerIndex].image;
  centerImage.alt = Bus.all[centerIndex].name;
  centerProductIndex = centerIndex;

  let rightIndex;

  do {
    rightIndex = randomNumber(0, Bus.all.length - 1);
  } while (leftIndex === rightIndex || centerIndex === rightIndex);

  rightImage.src = Bus.all[rightIndex].image;
  rightImage.alt = Bus.all[rightIndex].name;
  rightProductIndex = rightIndex;



  Bus.all[leftIndex].shown++;
  Bus.all[centerIndex].shown++;
  Bus.all[rightIndex].shown++;

}


function handelClick(event) {

  if (Bus.counter <= clickCounter) {
    const clickedElement = event.target;
    if (clickedElement.id === 'leftImage' || clickedElement.id === 'centerImage' || clickedElement.id === 'rightImage') {
      if (clickedElement.id === 'leftImage') {
        Bus.all[leftProductIndex].clicks++;
      }

      if (clickedElement.id === 'centerImage') {
        Bus.all[centerProductIndex].clicks++;
      }

      if (clickedElement.id === 'rightImage') {
        Bus.all[rightProductIndex].clicks++;
      }

      Bus.counter++;
      renderNewProduct();

      console.log(Bus.all);
      if (Bus.counter === clickCounter){
        resultsButton = document.createElement('button');
        buttonsDisplay.appendChild(resultsButton);
        resultsButton.textContent = 'Show Results';
        resultsButton.id = 'results';
        resultsButton.onclick = showResults;
      }

    }
  }
}

imageSection.addEventListener('click', handelClick);

console.log(Bus.all);


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function showResults () {

  // resultsButton.parentNode.removeChild(resultsButton);

  const resultsList = document.createElement('ul');
  buttonsDisplay.appendChild(resultsList);

  for(let i = 0; i < Bus.all.length; i++) {

    const resultsListItem = document.createElement('li');
    resultsList.appendChild(resultsListItem);
    resultsListItem.textContent = `${Bus.all[i].name} was shown ${Bus.all[i].shown} times and was clicked ${Bus.all[i].clicks} times.`;
  }
  resultsButton.parentNode.removeChild(resultsButton);

  const resetButton = document.createElement('button');
  buttonsDisplay.appendChild(resetButton);
  resetButton.textContent = 'Reset voting';
  resetButton.id = 'reset';
  resetButton.onclick = resetVoting;
}

function resetVoting () {

  window.location.reload();
}
renderNewProduct();

// buttonsDisplay.innerHTML = 'View results';
// buttonsDisplay.addEventListener('click', showResults);



