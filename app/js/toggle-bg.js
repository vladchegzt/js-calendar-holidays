window.addEventListener("load", function() {

    const html = document.documentElement
    const mainBtn = document.getElementById('toggle')
    const messageElem = document.getElementById('last-updated')
    const spanTextElement = document.querySelector('#toggle span')
    let currentTheme = html.classList.contains('dark') ? 'dark' : 'light'
    let statusObj =  {theme: currentTheme,date: undefined,textMessage: undefined, spanMessage: undefined};  

    // //create date in desired format
    function getCurrentDateTime() {
        const now = new Date()
    
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = now.getFullYear()
        
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
    
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    }

    if(localStorage.getItem('pageStatus')) {
        const parsedObject = JSON.parse(localStorage.getItem('pageStatus'))
        console.log(parsedObject)

        currentTheme = parsedObject.theme
        html.classList.remove('light', 'dark')
        html.classList.add(currentTheme)
        spanTextElement.textContent = parsedObject.spanMessage
        messageElem.textContent = `${parsedObject.textMessage} ${parsedObject.date}`
    }

    mainBtn.addEventListener('click', event => {
        let isLight = currentTheme === 'light'
        const currentDateTime = getCurrentDateTime()
    
        spanTextElement.textContent = isLight ? 'Turn on' : 'Turn off'
        html.classList.remove(isLight ? 'light' : 'dark')
        html.classList.add(isLight ? 'dark' : 'light')
        currentTheme = isLight ? 'dark' : 'light'

        statusObj.theme = currentTheme
        statusObj.date = currentDateTime
        statusObj.textMessage = isLight ? 'Last turn on:' : 'Last turn off:'
        statusObj.spanMessage = isLight ? 'Turn on' : 'Turn off'
        messageElem.textContent = `${statusObj.textMessage} ${statusObj.date}`

        localStorage.setItem('pageStatus', JSON.stringify(statusObj));
        
    })

    // function updatePageState(isLight) {
    //     const currentDateTime = getCurrentDateTime();
    //     const themeClass = isLight ? 'light' : 'dark';

    //     spanTextElement.textContent = isLight ? 'Turn on' : 'Turn off';
    //     html.classList.remove('light', 'dark');
    //     html.classList.add(themeClass);
    //     currentTheme = themeClass;

    //     const textMessage = isLight ? 'Last turn on:' : 'Last turn off:';
    //     const spanMessage = isLight ? 'Turn on' : 'Turn off';
        
    //     messageElem.textContent = `${textMessage} ${currentDateTime}`;

    //     const statusObj = {
    //         theme: currentTheme,
    //         date: currentDateTime,
    //         textMessage,
    //         spanMessage
    //     };

    //     localStorage.setItem('pageStatus', JSON.stringify(statusObj));
    // }

    // if (localStorage.getItem('pageStatus')) {
    //     const storedObject = JSON.parse(localStorage.getItem('pageStatus'));
    //     currentTheme = storedObject.theme;
    //     updatePageState(currentTheme === 'light');
    // }

    // mainBtn.addEventListener('click', event => {
    //     const isLight = currentTheme === 'light';
    //     updatePageState(!isLight);
    // });



});
