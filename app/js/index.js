window.addEventListener("load", function() {
    // 1. Напишіть функцію addThemAll
    // Вона буде знаходити суму усіх своїх аргументів незалежно від їх кількості
       
    // вирішив працювати і з string і з float.
    function addThemAllFloat (...nums) {
        let arr = nums.map((item, index) => {
            return +item;
        });
        return arr.reduce((accumulator, item) => {return accumulator + item}, 0);
    }   
    console.group();
    console.log(addThemAllFloat(1,' 8.22',-3));
    console.log(addThemAllFloat(1,2,13));
    console.log(addThemAllFloat(1,2,'13'));
    console.groupEnd('Task 1');

    // 2. Задача на використання замикання. 
    console.group();
    console.log(multiply(2)(-2));
    console.log(multiply('4')('3'));
    console.log(multiply(4)(3));
    console.groupEnd();

    function multiply(a) {
        return function(b) {
          return +a * +b;
        };
    }

    // /3. Напишіть функцію яка буде використовуватись для сортування масиву фільмів 
    console.group();
    const movies = [
        {
            movieName: 'The Thing',
            releaseYear: 1982,
            directedBy: 'Carpenter',
            runningTimeInMinutes: 109,
        },
        {
            movieName: 'Aliens',
            releaseYear: 1986,
            directedBy: 'Cameron',
            runningTimeInMinutes: 137,
        },
        {
            movieName: 'Men in Black',
            releaseYear: 1997,
            directedBy: 'Sonnenfeld',
            runningTimeInMinutes: 98,
        },
        {
            movieName: 'Predator',
            releaseYear: 1987,
            directedBy: 'McTiernan',
            runningTimeInMinutes: 107,
        },
    ];
    
    function byProperty(property, direction) {
        if(direction === '>') { 
            return function (a,b) {
                if(a[property] > b[property]) return 1;
                if(a[property] === b[property]) return 0;
                if(a[property] < b[property]) return -1;
            }
        }
        return function (a, b) {
            if (a[property] < b[property]) return 1;
            if (a[property] === b[property]) return 0;
            if (a[property] > b[property]) return -1;
        };
    }

    console.log(movies.toSorted(byProperty('releaseYear', '<'))); 
    // виведе масив фільмів посортованих по року випуску, від старішого до новішого
    console.log(movies.toSorted(byProperty('runningTimeInMinutes', '<'))); 
    // // виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
    console.log(movies.toSorted(byProperty('movieName', '>'))); 
    // виведе масив фільмів посортованих по назві, в алфавітному порядку
    console.groupEnd();

    // 4. Напишіть функцію яка відфільтрує масив унікальних значень
    const userNames = ['Петро', 'Емма', 'Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена', 'Емма'];

    function filterUnique(array) {
        const uniqNames = new Set();
        for (let item of array) {
            uniqNames.add(item)
        }
        return uniqNames
    }
    console.group();
    console.log(filterUnique(userNames));
    console.groupEnd();

});


