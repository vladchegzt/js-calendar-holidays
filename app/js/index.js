window.addEventListener("load", function() {
    /**
     * tab 1 functional
    **/

    //dom elements
    const inputsDates = document.querySelectorAll('.date-range-item');
    const inputStart = document.getElementById('startDate');
    const inputEnd = document.getElementById('endDate');
    const resultBtn = document.getElementById('result-btn');

    const radioGroups = document.querySelectorAll('.js-radio-group');
    const radioDimension = document.querySelectorAll('input[name="dimension"]');
    const resultElement = document.getElementById('result-difference');
    let resultValue = 0;

    //inputs checker
    const datesChecker = () => {
        //enable/disable main result btn
        resultBtn.disabled = inputStart.value.trim() === '' || inputEnd.value.trim() === '';

        const startDate = new Date(inputStart.value);
        const endDate = new Date(inputEnd.value);
        // if (!isNaN(endDate) && isNaN(startDate)) {
        //     const newStartDate = new Date(endDate);
        //     newStartDate.setDate(endDate.getDate() - 2);

        //     inputStart.valueAsDate = newStartDate;
        // }

        if (startDate > endDate) {
            inputStart.value = inputEnd.value;
        }
    };

    //generate final result
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
        resultElement.textContent = result;
    }

    //listened for changing inputs
    inputsDates.forEach(item => {
        item.addEventListener('change', (event)=> {
            if(item === inputStart) {
                inputEnd.disabled = inputStart.value.trim() === '' ? true : false;
            }
            datesChecker()
        });
    });

    resultBtn.addEventListener('click', () => {
        let dimension;
        for (const radioButton of radioDimension) {
            if (radioButton.checked) {
                dimension = radioButton.value;
                break;
            }
        }
        console.log(dimension)
        countFinalResult(inputStart, inputEnd, dimension);
    })

    
    datesChecker();

    /**
     * styling and others
    **/

     //style for radio
     radioGroups.forEach(group => {
        const radioButtons = group.querySelectorAll('input[type="radio"]');
        
        radioButtons.forEach(radioButton => {
            radioButton.addEventListener('change', () => {
                const labels = group.querySelectorAll('label');
                labels.forEach(label => {
                    label.classList.remove('checked');
                });
                
                const label = radioButton.closest('label');
                label.classList.add('checked');
            });
        });
    });
});
