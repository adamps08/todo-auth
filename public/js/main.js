const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const startButton = document.querySelectorAll('.start');
const stopButton = document.querySelectorAll('.stop');
const resetButton = document.querySelectorAll('.reset');

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Timer Functionallity

async function startTimer(todoId) {
    try {
        const response = await fetch('/todos/startTimer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todoIdFromJSFile: todoId,
            }),
        });

        if (response.ok) {
            // Handle success
            console.log('Timer started successfully.');
        } else {
            // Handle error
            console.error('Failed to start the timer.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

async function stopTimer(todoId) {
    try {
        const response = await fetch('/todos/stopTimer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todoIdFromJSFile: todoId,
            }),
        });

        if (response.ok) {
            console.log('Timer stopped successfully.');
        } else {
            console.error('Failed to stop the timer.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

async function resetTimer(todoId) {
    try {
        const response = await fetch('/todos/resetTimer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todoIdFromJSFile: todoId,
            }),
        });

        if (response.ok) {
            console.log('Timer reset successfully.');
        } else {
            console.error('Failed to reset the timer.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

function updateTimerDisplay(todoId, elapsedTime) {
    const timerElement = document.querySelector(`[data-timer-id="${todoId}"]`);

    const seconds = Math.floor(elapsedTime % 60);
    const minutes = Math.floor((elapsedTime / 60) % 60);
    const hours = Math.floor(elapsedTime / 3600);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerElement.textContent = formattedTime;
}

document.querySelectorAll('.task').forEach((task) => {
    const todoId = task.querySelector('.start-timer').getAttribute('data-timer-id');
    // setInterval(() => {
    //     fetch(`/todos/getTimer/${todoId}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const { elapsedTime } = data;
    //             updateTimerDisplay(todoId, elapsedTime);
    //         });
    // }, 1000);
    task.querySelector('.start-timer').addEventListener('click', () => {
        startTimer(todoId);
    });
    task.querySelector('.stop-timer').addEventListener('click', () => {
        stopTimer(todoId);
    });
    task.querySelector('.reset-timer').addEventListener('click', () => {
        resetTimer(todoId);
    });
});


window.addEventListener('load', () => {
    //switch statement

    const personalisation = document.getElementById('switch');

    let day;

    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;

    }

    personalisation.innerHTML = "Hi there, happy " + day + "!";
})