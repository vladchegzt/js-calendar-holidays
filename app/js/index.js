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

    // validation listeners
    const disablingResultBtn = () => {
        resultBtn.disabled = inputStart.value.trim() === '' || inputEnd.value.trim() === '';
    };

    inputsDates.forEach(item => {
        item.addEventListener('change', (event)=> {
            // console.log(el)
            if(item === inputStart) {
                inputEnd.disabled = inputStart.value.trim() === '' ? true : false;
            }
            disablingResultBtn()
        });
    });

    const countFinalResult = (start, end, dimension = 'days') => {
        start = new Date(start.value).getTime();
        end = new Date(end.value).getTime();
        dimension = dimension.toLowerCase();
        let result;

        const diffMiliseconds = Math.floor(end - start);

        // convert to desirable dimension
        const dimensionActions = {
            days: {
                text: 'дні(-в)',
                action: () => Math.floor(diffMiliseconds / (1000 * 60 * 60 * 24)),
            },
            hours: {
                text: 'годин',
                action: () => Math.floor(diffMiliseconds / (1000 * 60 * 60)),
            },
            minutes: {
                text: 'хвилин',
                action: () => Math.floor(diffMiliseconds / (1000 * 60)),
            },
            seconds: {
                text: 'секунд',
                action: () => Math.floor(diffMiliseconds / 1000 * 60),
            },
        }

        // check if provided @dimension exist in obj
        if (Object.keys(dimensionActions).includes(dimension)) {
            result = `Різниця – ${dimensionActions[dimension].action()} ${dimensionActions[dimension].text}`;
        } else {
            result = `Різниця – ${dimensionActions.days.action()} ${dimensionActions.days.text}`;
        }
        // return result;
        resultElement.textContent = result;
    }

    resultBtn.addEventListener('click', () => {
        countFinalResult(inputStart, inputEnd, 'days');
    })

    
    console.log();
    disablingResultBtn();
});
