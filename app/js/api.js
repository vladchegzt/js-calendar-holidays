window.addEventListener("load", function() {
    /**
     * tab 2 functional
    **/
    const select = document.getElementById('countrySelect');
    const selectDates = document.getElementById('datesCalendar');
    const form = document.getElementById('api-form');
    const submitBtn = document.getElementById('request-btn');
    const resultsContainer = document.getElementById('calendar-results');
    const resultsCountDiv = document.getElementById('results-counter');
    const calendarLoader = document.getElementById('calendar-loader');
    let sortOrder = 'ascend';

    const currentYear = new Date().getFullYear();
    const apiKey = "ar5bYt3EcTtZfETTuhkNF4KodgYf98LP";
    const baseUrl = "https://calendarific.com/api/v2";
    const countriesUrl = `${baseUrl}/countries?api_key=${apiKey}`;

    for (let year = 2001; year <= 2049; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        if (year === currentYear) {
            option.selected = true;
        }
        selectDates.appendChild(option);
    }

    function createError(errMessage) {
        return `<div class="error error-countries">
                    <span>Щось пішло не так</span>
                    <span>Деталі: ${errMessage}</span>
                </div>`;
    }

    //create dropdown with countries
    fetch(countriesUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.meta.code === 200) {
                const countriesArr = data.response.countries;
                const optionDefault = document.createElement('option');
                select.appendChild(optionDefault)
                // console.log(data.response.countries[0])
                countriesArr.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country['iso-3166'];
                    option.text = country.country_name;
                    select.appendChild(option);
                });
    
                $(select).select2({
                    minimumResultsForSearch: 0,
                    width: $(this).data('width'),
                    placeholder: "Оберіть країну",
                });
            } else {
                throw new Error(data.message);
            }
        })
        .catch((err) => {
            console.error('error:' + err);
            const div = createError(err);
            form.innerHTML = div;
        })
        .finally(() => {
            document.getElementById('countries-loader').style.display = 'none'
        });

    $(selectDates).select2({
        minimumResultsForSearch: 0,
        width: $(this).data('width')
    });

    //enable date select if country selected
    $(select).on('change', function() {
        if ($(this).val()) {
            $(selectDates).prop('disabled', false).trigger('change');
            submitBtn.disabled = false
        } else {
            $(selectDates).prop('disabled', true).trigger('change');
            submitBtn.disabled = true
        }
    });

    function renderResult (counter, name, date) {
        return `<div class="result-calendar-item result-diff-item">
            <div class="result-col">${counter}</div>
            <div class="result-col">${name}</div>
            ${date}
        </div>`
    }

    function formatDateToISO(isoDate) {
        const date = new Date(isoDate);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Додаємо 1, так як місяці починаються з 0
        const day = String(date.getDate()).padStart(2, '0');
        return `<div data-iso='${year}-${month}-${day}'>${year}-${month}-${day}</div>`;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        submitBtn.disabled = true
        calendarLoader.style.display = 'flex'
        resultsContainer.innerHTML = ''
        const country = select.value
        const year = selectDates.value
        const url = `${baseUrl}/holidays?api_key=${apiKey}&country=${country}&year=${year}`
        fetch(url)
            .then((response)=> {
                return response.json();
            })
            .then((data)=> {
                if(data.meta.code === 200) {
                    const arr = data.response.holidays;
                    console.log(arr)
                    arr.forEach((holiday, index) =>{
                        const { name } = holiday;
                        const date = formatDateToISO(holiday.date.iso);
                        const div = renderResult(index+1, name, date)
                        resultsContainer.innerHTML += div
                    })
                    resultsCountDiv.innerHTML = data.response.holidays.length;
                    sortOrder = 'ascend'
                } else {
                    throw new Error(data.message);
                }
            })
            .catch((err) => {
                console.error('error submit:' + err)
                const div = createError(err)
                resultsContainer.innerHTML = div;
            })
            .finally( () =>{
                setTimeout(()=>{
                    submitBtn.disabled = false
                    calendarLoader.style.display = 'none'
                },100)
            })
    })

    function changeSortOrder() {
        if (sortOrder === 'ascend') {
            sortOrder = 'descend';
        } else {
            sortOrder = 'ascend';
        }
        
        const resultItems = Array.from(resultsContainer.querySelectorAll('.result-calendar-item'));
        const sortedItems = resultItems.sort((a, b) => {
            const isoA = a.querySelector('[data-iso]').getAttribute('data-iso');
            const isoB = b.querySelector('[data-iso]').getAttribute('data-iso');
            
            if (sortOrder === 'ascend') {
                return isoA.localeCompare(isoB);
            } else {
                return isoB.localeCompare(isoA);
            }
        });
        
        sortedItems.forEach(item => {
            resultsContainer.appendChild(item);
        });
    }
    
    resultsContainer.addEventListener('click', function (event) {
        const target = event.target;
        
        if (target.getAttribute('data-iso')) {
            changeSortOrder();
        }
    });


});
