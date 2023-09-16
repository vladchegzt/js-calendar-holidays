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
    const radioDaysType = document.querySelectorAll('input[name="daysType"]');
    const btnPresets = document.querySelectorAll('button[data-presetdays]');
    const resultList = document.getElementById('diff-list');

    const alertAudio = new Audio('../img/toasty.mp3');
    let resultValue = 0;

    if(localStorage.getItem('results') !== null) {
        const results = JSON.parse(localStorage.getItem('results'))
        for (let item of results) {
            let li = renderResultItem(item.start, item.end, item.result, item.id)
            resultList.insertAdjacentHTML('afterbegin', li);
        }
    } 

    function filterDatesByDaysType(start, end, daysType) {
        const filteredDates = [];
        const currentDate = new Date(start);
    
        while (currentDate <= end) {
            if (daysType === 'alldays' ||
                (daysType === 'workdays' && currentDate.getDay() >= 1 && currentDate.getDay() <= 5) ||
                (daysType === 'weekends' && (currentDate.getDay() === 0 || currentDate.getDay() === 6))) {
                filteredDates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return filteredDates;
    }

    function formatDate(date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${monthNames[monthIndex]} ${day} ${year}`;
    }

    function generateId() {
        return Date.now().toString(); 
    }


    function storeResultInLocaleStorage(start, end, result, id) {
        let results;
        const request = { id: id, start:start, end:end, result: result },
        arrLength = 10;

        if(localStorage.getItem('results') !== null) {
            results = JSON.parse(localStorage.getItem('results'))
        }else {
            results = []
        }
        results.push(request)

        if (results.length > arrLength) {
            results.shift();
        }

        console.log(results)

        localStorage.setItem('results', JSON.stringify(results))
    }
    
    function renderResultItem(start, end, result, id) {
        let createdEl = `
            <div class='result-diff-item' data-id='${id}'>
                <div>${start}</div>
                <div>${end}</div>
                <div>${result}</div>
            </div>
        `
        return createdEl
    }

    //enable/disable inputs and presets
    function datesChecker () {
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
        //set present enable, if startdate selected
        btnPresets.forEach(button => {
            if (inputStart.value.trim() === '') {
                button.setAttribute('disabled', 'disabled');
            } else {
                button.removeAttribute('disabled');
            }
        });
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
            datesChecker()
        });
    });
    

    //generate final result
    const countFinalResult = (start, end, dimension = 'days', daysType = 'alldays') => {
        start = new Date(start.value);
        end = new Date(end.value);
        start.setDate(start.getDate() + 1);
        dimension = dimension.toLowerCase();

        const startFormatted = formatDate(start);
        const endFormatted = formatDate(end);

        const filteredDates = filterDatesByDaysType(start, end, daysType);
        const totalDiff = filteredDates.reduce((acc, currentDate) => {
            const nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + 1);
            const diff = nextDate - currentDate;
            return acc + diff;
        }, 0);

        const resultId = generateId()

        // convert to desirable dimension
        const dimensionActions = {
            days: {
                text: 'дні(-в)',
                action: () => Math.floor(totalDiff / (1000 * 60 * 60 * 24)),
            },
            hours: {
                text: 'годин(-и)',
                action: () => Math.floor(totalDiff / (1000 * 60 * 60)),
            },
            minutes: {
                text: 'хвилин(-и)',
                action: () => Math.floor(totalDiff / (1000 * 60)),
            },
            seconds: {
                text: 'секунд(-и)',
                action: () => Math.floor(totalDiff / 1000 * 60),
            },
        }

        const diffTxt = `${dimensionActions[dimension].action()} ${dimensionActions[dimension].text}`;
        const li = renderResultItem(startFormatted, endFormatted, diffTxt, resultId);
        resultList.insertAdjacentHTML('afterbegin', li);

        storeResultInLocaleStorage(startFormatted, endFormatted, diffTxt, resultId)
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
        let daysType;
        for (const radioButton of radioDaysType) {
            if (radioButton.checked) {
                daysType = radioButton.value;
                break;
            }
        }
        countFinalResult(inputStart, inputEnd, dimension, daysType);
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

     // Create instance for different tabs group
     function initializeTabs(container) {
        const listTabs = container.querySelectorAll('.tabs-list li');

        if (listTabs.length !== 0) {
            listTabs.forEach((tab, index) => {
                const tabLink = tab.querySelector('.js-tab-link');
                tabLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    showTab(index);
                });
            });
        }

        function showTab(tabNumber) {
            listTabs.forEach((tab, index) => {
                tab.classList.remove('active');

                const tabContent = container.querySelector('.tab-content');
                if (tabContent) {
                    const tabPane = tabContent.children[index];
                    if (tabPane) {
                        tabPane.classList.remove('active');
                    }
                }

                if (index === tabNumber) {
                    tab.classList.add('active');
                    if (tabContent) {
                        const tabPane = tabContent.children[index];
                        if (tabPane) {
                            tabPane.classList.add('active');
                        }
                    }
                }
            });
        }
    }

    // Init tabs
    const tabContainers = document.querySelectorAll('.js-tab-container');
    tabContainers.forEach((container) => initializeTabs(container));
    //end tabs
});
