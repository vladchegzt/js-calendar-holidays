window.addEventListener("load", function() {
    
    /**
     * tab 1 functional
    **/

    //dom elements
    const inputsDates = document.querySelectorAll('.date-range-item');
    const inputStart = document.getElementById('startDate');
    const inputEnd = document.getElementById('endDate');
    const resultBtn = document.getElementById('result-btn');
    const resultElement = document.getElementById('result-difference');
    let resultValue = 0;

    inputsDates.forEach(item => {
        item.addEventListener('change', (event)=> {
            // console.log(el)
            if(item === inputStart) {
                inputEnd.disabled = inputStart.value.trim() === '' ? true : false;
            }
        });
    });

    const countFinalResult = (start, end, dimension = 'days') => {
        start = new Date(start.value).getTime();
        end = new Date(end.value).getTime();
        dimension = dimension.toLowerCase();
        let result;

        console.log(start)
        console.log(end)

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

    resultBtn.addEventListener('click', () => {
        countFinalResult(inputStart, inputEnd, 'days');
    })


    
    console.log();

    // setDisabledEndDate();
});
