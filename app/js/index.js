window.addEventListener("load", function() {
 
    const form = document.querySelector('.create-task-form')
    const taskInput = document.querySelector('.task-input')
    const filterInput = document.querySelector('.filter-input')
    const taskList = document.querySelector('.collection')
    const clearBtn = document.querySelector('.clear-tasks')


    form.addEventListener('submit', addtask)
    taskList.addEventListener('click', deleteTask)
    clearBtn.addEventListener('click', deleteAllTasks)
    filterInput.addEventListener('keyup', filterTasks)

    function showTasks() {
        if(localStorage.getItem('tasks') !== null) {
            const tasks = JSON.parse(localStorage.getItem('tasks'))
            tasks.forEach((task) => {
                const li = document.createElement('li')
                li.innerHTML = task

                const button = document.createElement('button');
                button.innerHTML= 'x';
                button.classList.add('btn-delete')
                li.append(button)

                taskList.append(li)
            })
        } 
    }

    showTasks()

    function addtask(event) {
        event.preventDefault()
        const value = taskInput.value
        const li = document.createElement('li')
        li.innerHTML = value

        const button = document.createElement('button');
        button.innerHTML= 'x';
        button.classList.add('btn-delete')
        li.append(button)
        
        taskList.append(li)
        storeTaskInLocaleStorage(value)
        taskInput.value = ''
    }

    function storeTaskInLocaleStorage(task) {
        let tasks;
        if(localStorage.getItem('tasks') !== null) {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }else {
            tasks = []
        }

        console.log(tasks)

        tasks.push(task)

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function deleteTask(event) {
        if(event.target.classList.contains('btn-delete')) {
            console.log(event.target)
            if(confirm('Are you sure?')) {
                event.target.closest('li').remove()
                removeTaskFromLocalStorage(
                    event.target.closest('li').firstChild.textContent
                )
            }
        }
    }

    function removeTaskFromLocalStorage(taskContent) { 
        const tasks = JSON.parse(localStorage.getItem('tasks'))

        const filteredTasks = tasks.filter(task => {
            return task !== taskContent
        })
        console.log(filteredTasks)

        localStorage.setItem('tasks', JSON.stringify(filteredTasks))
    }

    function deleteAllTasks() {
        if(confirm('Are you sure total delete?')) {
            taskList.innerHTML = ''
            removeAllFromLocalStorage()
        }
    }

    function removeAllFromLocalStorage() {
        localStorage.clear()
    }

    function filterTasks(event) {
        const tasks = taskList.querySelectorAll('li')
        const searchQuery = event.target.value.toLowerCase()
        // console.log(tasks)

        tasks.forEach(task => {
            const taskValue = task.firstChild.textContent.toLowerCase()
            if(taskValue.includes(searchQuery)){
                task.style.display = 'list-item'
            } else {
                task.style.display = 'none'
            }
        })
    }
});
