const leftValue = document.querySelectorAll('.rates a');
const rightValue = document.querySelectorAll('.notRates a');
const mineValue = document.querySelector('.mineValue input');
const notMineValue = document.querySelector('.notMineValue input');
const leftResult = document.querySelector('.leftResult');
const rightResult = document.querySelector('.rightResult');
let base = '';
let symbols = '';
let tempString = {};



const getData = async () => {

    if( base !== '' && symbols !== '' ){

        const response = await fetch(`https://api.exchangerate.host/latest?base=${ base }&symbols=${ symbols }`);
        const data = await response.json();
        tempString = data;

        notMineValue.value = +mineValue.value * tempString.rates[ `${symbols}` ];
        leftResult.textContent = `1 ${ base } = ${ tempString.rates[ `${symbols}` ] } ${ symbols }`;
        rightResult.textContent = `1 ${ symbols } = ${ 1/tempString.rates[ `${symbols}` ] } ${ base }`;

    }else{ return; }

}

leftValue.forEach( (rate) => {

    if( rate.classList.contains('active') ){

        base = rate.textContent;
        getData();

    }

    rate.addEventListener('click', (element) => {

        let current = document.querySelector(".rates .active");

        current.classList.remove("active");
        rate.classList.add('active');
        element.preventDefault();
        base = rate.textContent;
        getData();

    })
})

rightValue.forEach( (rate) => {

    if(rate.classList.contains('active')){

        symbols = rate.textContent;
        getData();

    }

    rate.addEventListener( 'click', (element) => {

        let current = document.querySelector(".notRates .active");

        current.classList.remove("active");
        rate.classList.add('active');
        element.preventDefault();
        symbols = rate.textContent;
        getData();

    })
})

mineValue.addEventListener('input', (element) => {

    console.log( element.target.value );
    notMineValue.value = +element.target.value * tempString.rates[ `${symbols}` ];

    if(mineValue.value[0] == 0 && mineValue.value[1] == 0){

        mineValue.value = element.target.value.slice(1);

    }

    if(mineValue.value === ''){

        notMineValue.value = '';

    }
   
})

notMineValue.addEventListener('input', (element) => {

    mineValue.value = +element.target.value / tempString.rates[ `${symbols}` ];

    if(notMineValue.value === ''){

        mineValue.value = '';

    }
})

getData();