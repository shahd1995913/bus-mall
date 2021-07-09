'use strict';
const parent = document.getElementById('sec-one');
const rightImage = document.getElementById('right-image');
const leftImage = document.getElementById('left-image');
const midImage = document.getElementById('mid-image');

const maxAttempts = 25;
let counter = 0;
let allName = [];
let allVote = [];
let allShown = [];


function Product(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    this.time = 0;
    Product.all.push(this);
    allName.push(this.name);
}
Product.all = [];

//images
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


let leftIndex = 0;
let rightIndex = 0;
let midIndex = 0;
let leftIndex1;
let rightIndex1;
let midIndex1;
///clickphoto
parent.addEventListener('click', handleClick);
let btn;
function handleClick(event) {
    counter++;

    if (maxAttempts >= counter) {

        if (event.target.id === 'left-image') {
            Product.all[leftIndex].vote++;

        } else if (event.target.id === 'right-image') {
            Product.all[rightIndex].vote++;

        } else if (event.target.id === 'mid-image') {
            Product.all[midIndex].vote++;

        } else {
            counter--;
            return
        }



        renderThreeImages();
    } else {
        btn = document.getElementById('bt');
        saveToLs();

        btn.addEventListener('click', handCl);
        parent.removeEventListener('click', handleClick);
    }




}
//listShow
let li;
function renderList() {
    const ul = document.getElementById('unList');
    for (let i = 0; i < Product.all.length; i++) {

        allVote.push(Product.all[i].vote);
        allShown.push(Product.all[i].time);
        li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Product.all[i].name} has this number of votes ${Product.all[i].vote} and shown ${Product.all[i].time} times`
        // console.log(li);
    }
    btn.removeEventListener('click', handCl);
}


//button
function handCl() {
    renderList();
    gettingChart();


}

//render images
function renderThreeImages() {
    leftIndex1 = leftIndex;
    rightIndex1 = rightIndex;
    midIndex1 = midIndex;
    
    leftIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();
    midIndex = generateRandomIndex();
        let indexes = [leftIndex, rightIndex, midIndex];
    let pIndexes = [leftIndex1, rightIndex1, midIndex1];
    while (intersection(indexes, pIndexes).length !== 0 || leftIndex === rightIndex || leftIndex === midIndex || rightIndex === midIndex) {
        leftIndex = generateRandomIndex();
        rightIndex = generateRandomIndex();
        midIndex = generateRandomIndex();
        indexes = [leftIndex, rightIndex, midIndex];
    }

    leftImage.src = Product.all[leftIndex].source;
    rightImage.src = Product.all[rightIndex].source;
    midImage.src = Product.all[midIndex].source;


    Product.all[leftIndex].time++;
    Product.all[rightIndex].time++;
    Product.all[midIndex].time++;
}


renderThreeImages();

function generateRandomIndex() {
    return Math.floor(Math.random() * Product.all.length);

}

/////////////
function intersection(a, b) {

    let result = [];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                result.push(a[i]);
            }
        }
    }

    return result;
}
/////////////////chartJs
function gettingChart() {
    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allName,
            datasets: [{
                label: '# of Votes',
                data: allVote,
                backgroundColor: [
                   
                ],
                borderColor: [
                    
                ],
                borderWidth: 13
            } ,  
            
            {
                label: '# of Shown',
                data: allShown,
                backgroundColor: [
                    
                ]
            }]
        },
    })
}

///////localStorage
function saveToLs() {


    const convertedArr = JSON.stringify(Product.all);

    localStorage.setItem('objects', convertedArr);

}
function getFromLs() {
    const data = localStorage.getItem('objects');
    console.log(data);

    const parsedOrder = JSON.parse(data);
    console.log(parsedOrder);
    if (parsedOrder) {


        Product.all = parsedOrder;


    }

}
getFromLs();





























// 'use strict';
// // // name
// // var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
// //  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

// //  // path
// // var allProductSrc = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 
// // 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg',
// // 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', , 'img/water-can.jpg', 'img/wine-glass.jpg'];


// var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 
// 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 
// 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
// var allProductSrc = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', 
// './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', 
// './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', 
// './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png',
//  './img/tauntaun.jpg', './img/unicorn.jpg', './img/water-can.jpg', './img/wine-glass.jpg'];


//  //get id
// var productContainer = document.getElementById('allProducts');
// var buttonLinks = document.getElementById('buttonLinks');
// var stats = document.getElementById('stats');


// var leftImgTag = document.getElementById('left');
// var middleImgTag = document.getElementById('center');
// var rightImgTag = document.getElementById('right');

// var totalClicks = 0;
// //holds all products instantiated
// Product.allProducts = [];
// //holds 6 values
// Product.checkDupes = [];

// // //store products already on the page
// var leftProduct = null;
// var middleProduct = null;
// var rightProduct = null;

// function Product(name, src) {
//   this.name = name;
//   this.src = src;
//   this.clicks = 0;
 
//   this.timesShown = 0;
//   Product.allProducts.push(this);
// }


// function save()
// {


// let data1=JSON.stringify(Product.allProducts);
// localStorage.setItem('Busdata',data1);


// }




// function callData()
// {

// let loadData2 =localStorage.getItem('Busdata');
// if(loadData2){


// let loadData3 = JSON.parse(loadData2);
// Product.allProducts = loadData3;



// }


// }

// callData()

// function instantiateProducts () {
//   for(var i = 0; i < allProductNames.length; i++) {
//     new Product(allProductNames[i], allProductSrc[i]);
//   }
// }

// function randomNumber() {
//   return Math.floor(Math.random() * Product.allProducts.length);
// }

// function displayProducts() {
//   //generate array of random # that correlates with each index
//   while (Product.checkDupes.length < 6) {
//     var number = randomNumber();
//     // if the number is not in the array, then that image has not been shown,
//     //so push the number into the array
//     if (!Product.checkDupes.includes(number)) {
//       Product.checkDupes.push(number);
//     }
//     //do this until the array is at 6 numbers again
//     //all 6 numbers are unique
//   }

//   leftImgTag.src = Product.allProducts[Product.checkDupes[0]].src;

//    Product.allProducts[Product.checkDupes[0]].timesShown++;

//   leftProduct = Product.allProducts[Product.checkDupes[0]];

//   middleImgTag.src = Product.allProducts[Product.checkDupes[1]].src;
//   Product.allProducts[Product.checkDupes[1]].timesShown++;
//   middleProduct = Product.allProducts[Product.checkDupes[1]];

//   rightImgTag.src = Product.allProducts[Product.checkDupes[2]].src;
//   Product.allProducts[Product.checkDupes[2]].timesShown++;
//   rightProduct = Product.allProducts[Product.checkDupes[2]];

//   //only keep the last 3 numbers because the first 3 have been used
//   //these 3 nums will now be at the beginning of checkDupes
//   Product.checkDupes = Product.checkDupes.slice(3, 6);
// }






// function renderChart() {
//   var canvasEl = document.createElement('canvas');
//   canvasEl.setAttribute = ('id', 'productChart');
//   chartContainer.style.width = '500px';
//   chartContainer.style.height = '500px';
//   chartContainer.appendChild(canvasEl);

//   var buttonEl = document.createElement('a');
//   buttonEl.textContent = 'Chart';
//   buttonEl.setAttribute('class', 'btn');
//   buttonEl.href = '#chartContainer';
//   buttonLinks.appendChild(buttonEl);

//   var ctx = canvasEl.getContext('2d');
//   var votes = [];
//   var names = [];
//   for(var i = 0; i < Product.allProducts.length; i++) {
//     votes[i] = Product.allProducts[i].clicks;
//     names[i] = Product.allProducts[i].name;
//   }

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: names,
//       datasets: [{
//         data: votes,
//         label: 'Votes',
//         borderWidth: 2
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       title: {
//         display: true,
//         text: 'Votes Per Product',
//         fontSize: 50
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true,
//             stepSize: 1
//           }
//         }]
//       }
//     }
//   });
// }






// function renderStats() {
//   var h1El = document.createElement('h1');
//   h1El.textContent = 'Stats';
//   stats.appendChild(h1El);

//   var buttonEl = document.createElement('a');
//   buttonEl.textContent = 'Stats';
//   buttonEl.setAttribute('class', 'btn');
//   buttonEl.href = '#statsContainer';
//   buttonLinks.appendChild(buttonEl);

//   for (var i = 0; i < Product.allProducts.length; i++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = Product.allProducts[i].clicks + ' votes for ' + Product.allProducts[i].name + " ------ " +  'Number of Shown image' + Product.allProducts[i].timesShown; 
//     stats.appendChild(liEl);
//   }
// }



// // function checkStorage () {
// //   if(localStorage.setProducts) {
// //     var stringifyProducts = localStorage.getItem('setProducts');
// //     Product.allProducts = JSON.parse(stringifyProducts);
// //   } else {
   
// //   }
// // }


// instantiateProducts();

// var handleClick = function(event) {
//   if (event.target === productContainer) {
//     return alert('click on an image, please');
//   }
//   totalClicks++;
//   var clickedProduct = event.target;
//   if (clickedProduct.id === 'left') {
//     leftProduct.clicks++;
//   }
//   if (clickedProduct.id === 'center') {
//     middleProduct.clicks++;
//   }
//   if (clickedProduct.id === 'right') {
//     rightProduct.clicks++;
//   }

//   if(totalClicks === 20) {
//     productContainer.removeEventListener('click', handleClick);
//     renderStats();
//     renderChart();
//     localStorage.setItem('setProducts', JSON.stringify(Product.allProducts));
//   }
//   displayProducts();
//  save();
// };

// //checkStorage();
// displayProducts();

// productContainer.addEventListener('click', handleClick);