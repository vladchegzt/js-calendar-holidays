window.addEventListener("load", function() {
    // 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval  
    // Вона виводить в консоль число кожну секунду, 
    // починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'
    
    detonatorTimer(3);
 
    function detonatorTimer(delay) {
        let counter = delay;
        const timer = setInterval(() => {
            if (counter > 0) {
                console.log(counter)
                counter--
                return
            }
            if(counter === 0) {
                console.log('BOOM!')
                clearInterval(timer)
            }
        }, 1000)
    }

    // 2. Напишіть функцію detonatorTimer(delay) 
    // використовуючи вкладений setTimeout 
    detonatorTimer2(3);


    function detonatorTimer2(delay) {
        if (delay > 0) {
            console.log(delay)
            delay--
            setTimeout(detonatorTimer2, 1000, delay)
            return
        }
        if(delay === 0) {
            console.log('BOOM!')
        }

    }

    //3
    let character = {
        name: "Barbie",
        age: 30,
        role: "Developer", 
        location: "New York",
        greet() {
            console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
        },
        getLocation () { 
            console.log(`My location is ${this.location}.`);
        }
    }

    let securedSelfGreet = character.greet.bind(character);
    let securedSelfChangeLocation = character.getLocation.bind(character);
    
    // character.greet = function () { //не перезапише securedSelfGreet
    //     console.log(111) 
    // }
    
    setTimeout(securedSelfGreet, 1000); 
    setTimeout(securedSelfChangeLocation, 2000); 


    // 5. Напишіть функцію-декоратор яка вповільнює виконання довільної 
    // функції на вказану кількість секунд.

    // function someFunction // тут напишіть довільну функцію яка робить 
    // якусь роботу зі своїми аргументами та виводить результат в консоль
    function someFunction (x, y) {
        return console.log(`Result someFunction is ${x + y}`)
    }

    function slower(func, seconds) {
        return function (...args) {
            console.log(`Chill out, you will get your result in ${seconds} seconds`);
            setTimeout(() => {
                func(...args);
            }, seconds * 1000);
        }
    }
    
    // обгортаєте свою довільну функцію 'someFunction' в декоратор і задає значення вповільнення
    let slowedSomeFunction = slower(someFunction, 5); 
    
    slowedSomeFunction(2, 6)
    
    // виведе в консоль "Chill out, you will get you result in 5 seconds
    //...через 5 секунд виведе результат роботи 'someFunction'



});
