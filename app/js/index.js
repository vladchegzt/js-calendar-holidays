window.addEventListener("load", function() {
    // 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval  
    // Вона виводить в консоль число кожну секунду, 
    // починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'
    
    // detonatorTimer(3);
 
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

});
