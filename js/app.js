'use strict';

let busProducts = [

  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];

const buttonsDisplay = document.getElementById('buttons');
let resultsButton ;
const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

let leftProductIndex = 0;
let centerProductIndex = 0;
let rightProductIndex = 0;
const clickCounter = 25;


function Bus(name) {
  this.name = name;
  this.image = `./Images/${name}.jpg`;
  this.image2 = `./Images/${name}.png`;
  this.image3 = `./Images/${name}.gif`;
  this.clicks = 0;
  this.shown = 0;
  Bus.all.push(this);
}

Bus.all = [];
Bus.counter = 1;

for (let i = 0; i < busProducts.length; i++) {
  new Bus(busProducts[i]);
}

function renderNewProduct() {
  let leftIndex = randomNumber(0, Bus.all.length - 1);



  switch (leftIndex) {
  case 14:

    leftImage.src = Bus.all[leftIndex].image2;
    leftImage.alt = Bus.all[leftIndex].name;
    leftProductIndex = leftIndex;
    break;

  case 17:
    leftImage.src = Bus.all[leftIndex].image3;
    leftImage.alt = Bus.all[leftIndex].name;
    leftProductIndex = leftIndex;
    break;

  default:
    leftImage.src = Bus.all[leftIndex].image;
    leftImage.alt = Bus.all[leftIndex].name;
    leftProductIndex = leftIndex;

  }

  let centerIndex;

  do {
    centerIndex = randomNumber(0, Bus.all.length - 1);
  } while (leftIndex === centerIndex);

  switch (centerIndex) {

  case 14:
    centerImage.src = Bus.all[centerIndex].image2;
    centerImage.alt = Bus.all[centerIndex].name;
    centerProductIndex = centerIndex;
    break;

  case 17:
    centerImage.src = Bus.all[centerIndex].image3;
    centerImage.alt = Bus.all[centerIndex].name;
    centerProductIndex = centerIndex;
    break;

  default:
    centerImage.src = Bus.all[centerIndex].image;
    centerImage.alt = Bus.all[centerIndex].name;
    centerProductIndex = centerIndex;

  }


  let rightIndex;

  do {
    rightIndex = randomNumber(0, Bus.all.length - 1);
  } while (leftIndex === rightIndex || centerIndex === rightIndex);

  switch (rightIndex) {

  case 14:
    rightImage.src = Bus.all[rightIndex].image2;
    rightImage.alt = Bus.all[rightIndex].name;
    rightProductIndex = rightIndex;
    break;

  case 17:
    rightImage.src = Bus.all[rightIndex].image3;
    rightImage.alt = Bus.all[rightIndex].name;
    rightProductIndex = rightIndex;
    break;

  default:
    rightImage.src = Bus.all[rightIndex].image;
    rightImage.alt = Bus.all[rightIndex].name;
    rightProductIndex = rightIndex;

  }


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

  for(let i = 0; i < busProducts.length; i++) {

    const resultsListItem = document.createElement('li');
    resultsList.appendChild(resultsListItem);
    resultsListItem.textContent = `${busProducts[i].name} clicked ${busProducts[i].clicks} times.`;
  }


}
renderNewProduct();

// buttonsDisplay.innerHTML = 'View results';
// buttonsDisplay.addEventListener('click', showResults);



