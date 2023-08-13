window.addEventListener("load", function() {

    //спроба пошуку елемента з текстом
    // const allElements = document.getElementsByTagName('*');

    // function findElByText(text) {
    //     const elementsWithText = [];
    //     for (let i = 0; i < allElements.length; i++) {
    //         if (allElements[i].textContent.includes(text)) {
    //             elementsWithText.push(allElements[i]);
    //         }
    //     }
    //     return elementsWithText
    // }

    // const elNavigationByDom = findElByText('Навігація по DOM дереву')


    //  console.log(elNavigationByDom);

    // Завдання 1
    const headerTitle = document.getElementById('headerTwo');
    const firstSection = document.querySelector('section')

    const listItems = document.querySelectorAll('ul li');
    let itemFive = null;

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent === 'Пункт 5') {
            itemFive = listItems[i];
            break;
        }
    }

    const divLevel = document.querySelector('.hatredLevelBlock');
});
