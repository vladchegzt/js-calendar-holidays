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
    const btnPresets = document.querySelectorAll('button[data-presetdays]');
    const resultList = document.getElementById('diff-list');

    const alertAudio = new Audio('../img/toasty.mp3');
    let resultValue = 0;

    function toggleBtnPresetsDisabled(disabled) {
        btnPresets.forEach(button => {
            if (disabled) {
                button.setAttribute('disabled', 'disabled');
            } else {
                button.removeAttribute('disabled');
            }
        });
    }

    function formatDate(date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${monthNames[monthIndex]} ${day} ${year}`;
    }
    
    function renderResultItem(start, end, result) {
        let createdEl = `
            <div class='result-diff-item'>
                <div>${start}</div>
                <div>${end}</div>
                <div>${result}</div>
            </div>
        `
        return createdEl
    }

    //inputs checker
    const datesChecker = () => {
        //enable/disable main result btn
        resultBtn.disabled = inputStart.value.trim() === '' || inputEnd.value.trim() === '';

        //toggle dates, if end earlier than start
        if (inputStart.value.trim() !== '' && inputEnd.value.trim() !== '') {
            const startDate = new Date(inputStart.value);
            const endDate = new Date(inputEnd.value);
    
            if (startDate > endDate) {
                showAlert('toasty')
                inputStart.value = endDate.toISOString().split('T')[0];
                inputEnd.value = startDate.toISOString().split('T')[0];
            }
        }
        toggleBtnPresetsDisabled(inputStart.value.trim() === '');
    };

    //listener for changing inputs
    inputsDates.forEach(item => {
        item.addEventListener('change', (event)=> {
            if(item === inputStart) {
                inputEnd.disabled = inputStart.value.trim() === '' ? true : false;
                inputStart.classList.remove('pulse')
            }
            datesChecker()
        });
    });

    //add presets value to end date
    btnPresets.forEach(item => {
        item.addEventListener('click', (event)=> {
            const daysVal = parseInt(item.dataset.presetdays);
            if (!isNaN(daysVal)) {
                const startDate = new Date(inputStart.value);
                const endDate = new Date(startDate.getTime() + daysVal * 24 * 60 * 60 * 1000);
                inputEnd.value = endDate.toISOString().split('T')[0];
            }
        });
    });
    

    //generate final result
    const countFinalResult = (start, end, dimension = 'days') => {
        start = new Date(start.value);
        end = new Date(end.value);
        dimension = dimension.toLowerCase();

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const startFormatted = formatDate(start);
        const endFormatted = formatDate(end);
        const diffMiliseconds = Math.floor(end.getTime() - start.getTime());

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

        const diffTxt = `${dimensionActions[dimension].action()} ${dimensionActions[dimension].text}`;
        const li = renderResultItem(startFormatted, endFormatted, diffTxt);
        resultList.insertAdjacentHTML('afterbegin', li);
    }

    //CTA Btn click
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

    function showAlert(alertId) {
        const el = document.getElementById(alertId);
        el.classList.add('show')
        alertAudio.play()
        setTimeout(function(){
            el.classList.remove('show')
        }, 3200)
    }
});
