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
        result = dimensionActions[dimension]();
        console.log(`Difference is ${result} ${dimension}`)
    } else {
        result = dimensionActions.days()
        console.log(`Difference is ${result} days`)
    }
}

durationBetweenDates('28 Aug 2006', '29 Aug 2006', 'seconds');
durationBetweenDates('28 Aug 2006', '29 Aug 2006', 'minutes');
durationBetweenDates('05 Aug 2004', '01 Aug 2005', 'hours');
durationBetweenDates('05 Sep 2006', '01 Aug 2006', 'days');
durationBetweenDates('05 Aug 2006', '01 Aug 2006', 'SOkIabLE');