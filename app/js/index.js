'use strict';
// 1. Задача про обчислення різниці часу
// Напишіть функцію яка буде буде приймати 3 параметри
// — початкову дату (string)
// — кінцеву дату (string)
// — розмірність ('days',  'hours', 'minutes', seconds)
// Функція повертатиме часовий період між цими датами згідно розмірності.
// Також вкажіть значення по замовчуванню для всіх цих параметрів (на ваш вибір).
// Функція має коректно працювати навіть якщо початкова дата пізніше ніж кінцева дата.
// Приклади:
// durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds')  // поверне '86400 seconds'
// durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days')  // поверне '362 days'

const durationBetweenDates = (start = '30 Aug 2021', end = '03 Sep 2022', dimension = 'days') => {
    start = new Date(start).getTime();
    end = new Date(end).getTime();

    let result;

    //check if @start earlier then @end
    if (start > end) {
        [start, end] = [end, start];
    }

    const diffMiliseconds = Math.floor(end - start);

    // convert to desirable dimension
    const dimensionActions = {
        days: () => Math.floor(diffMiliseconds / (1000 * 60 * 60 * 24)),
        hours: () => Math.floor(diffMiliseconds / (1000 * 60 * 60)),
        minutes: () => Math.floor(diffMiliseconds / (1000 * 60)),
        seconds: () => Math.floor(diffMiliseconds / 1000),
    }

    // check if provided @dimension exist in obj
    if (Object.keys(dimensionActions).includes(dimension)) {
        result = console.log(`Difference is ${dimensionActions[dimension]()} ${dimension}`);
    } else {
        result = console.log(`Difference is ${dimensionActions.days()} days`)
    }
    return result;
}

durationBetweenDates('28 Aug 2006', '29 Aug 2006', 'seconds');
durationBetweenDates('28 Aug 2006', '29 Aug 2006', 'minutes');
durationBetweenDates('05 Aug 2004', '01 Aug 2005', 'hours');
durationBetweenDates('05 Sep 2006', '01 Jan 2006', 'days');
durationBetweenDates('05 Aug 2006', '01 Aug 2006', 'SOkIabLE');

//   2. Задача про перетворення об'єкту
// Допустимо у вас є об'єкт, у якому кожен ключ - це назва товару (одинм словом), 
// а значення - його ціна.
// Напишіть функцію яка буде всі ключі переводити у нижній регістр, 
// а всі ціни буде заокруглювати до двох знаків після коми.
const priceData = {
    donuT: 23.3,
    chocolATE: 12.3443,
    FISH: 203,
    AppLe: 1.23
}

const optimizer = (data) => {
    let result = {};
    
    if (typeof data === 'object' && data !== null) {
        for (let key in data) {
            const lowerKey = key.toLowerCase();
            const fixedValue = data[key].toFixed(2);
            result[lowerKey] = fixedValue;
        }
    } else {
        result = 'Please, provide an object.'
    }

    return result;
}

console.log(optimizer(priceData));

// 3. Задача про рекурсію 
// Напишіть функцію яка рекурсивно буде знаходити суму всіх непарних додатніх 
// чисел до якогось числа.
const recursiveOddSumTo = (x) => {
    if (x < 1) {
        return 0;
    }
    if (x % 2 === 1) {
        return x + recursiveOddSumTo(x - 2);
    }
    return recursiveOddSumTo(x - 1);
};

console.log(`Recursive sum is: ${recursiveOddSumTo(0)}`);
console.log(`Recursive sum is: ${recursiveOddSumTo(1)}`);
console.log(`Recursive sum is: ${recursiveOddSumTo(10)}`);

//   4. Задача про ітерацію
// Напишіть функцію яка ітеративно (в циклі) 
// буде знаходити суму всіх непарних додатніх чисел до якогось числа.
const iterativeOddSumTo = (x) => {
    let result = 0;

    if (x < 1) {
        return 0;
    }

    for(let i = 0; i <= x; i++) {
        if(i % 2 === 1) {
            result += i;
        }
    }

    return result;
};

console.log(`Iterative sum is: ${iterativeOddSumTo(0)}`);
console.log(`Iterative sum is: ${iterativeOddSumTo(1)}`);
console.log(`Iterative sum is: ${iterativeOddSumTo(10)}`);