"use strict";

// 1. Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку: 
// Рішення має працювати незалежно від конкретних значень в масиві імен

const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];
let initials, lettersArr;

lettersArr = userNames.map(function(item, index){
    return item.split(' ').map(function(userInitialWord){
        return userInitialWord.charAt(0)
    })
});

initials = lettersArr.map(function(item){
   return item.join('.')
});

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

// 2. Задача на фільтрування масиву
// Реалізуйте фільтрування імен які починаються з голосної двома способами:
// через умовну конструкцію
// через вбудований метод масивів
// Рішення має працювати незалежно від конкретних значень в масиві імен

const userNames2 = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];
let filteredNames2 = [];

//2.1 перший спосіб
for (let item of userNames2) {
    if(/^[аеиоуюяіїє]/i.test(item)) {
        filteredNames2.push(item)
    }
}

console.log(filteredNames2);

// 2.2 Другий спосіб
const userNames3 = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];

let filteredNames3 = [];

filteredNames3 = userNames3.filter(function(item){
    return /^[аеиоуюяіїє]/i.test(item)
});

console.log(filteredNames3); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']

// 3. Задача на розворот числа:
const currentMaxValue = 4589;
let reverseMaxValue;

let reverseMaxValueString = String(currentMaxValue).split("").map((num)=>{
    return Number(num)
}).reverse().join('');

reverseMaxValue = parseFloat(reverseMaxValueString);

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

//4. Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:
const resultsArray = [1, 4, [2, [5, [1]]]];
let productOfArray, flatResultsArray;

flatResultsArray = resultsArray.flat(Infinity)

productOfArray = flatResultsArray.reduce(function(accumulator, item) {
    return accumulator * item;
  }, 1);

console.log(productOfArray); // 40