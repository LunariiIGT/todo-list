let toDoList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

renderToDo();

document.querySelector(".js-input").addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        addToDo()
    }
});

function renderToDo() {
    let listHTML = "";

    for (let i = 0; i < toDoList.length; i++) {
        listHTML += `<div class="item">
            <div class="item2"><button class="js-completeToDo ${toDoList[i].completed === 'not-complete' ? 'not-complete-but' : 'complete-but'}">
                ${toDoList[i].completed === 'complete' ? '✓' : ''}
            </button>
            <p class='list' id="${toDoList[i].completed === 'not-complete' ? 'not-complete' : 'complete'}">${toDoList[i].name}</p></div>
            <button class="js-deleteToDo" onClick="deleteToDo(${i})">✕</button>
        </div>`;
    }

    document.querySelector(".js-todo-list").innerHTML = listHTML;

    const completeButtons = document.getElementsByClassName("js-completeToDo");
    for (let i = 0; i < completeButtons.length; i++) {
        completeButtons[i].addEventListener("click", function () {
            completeToDo(i);
        });
    }
}


function addToDo() {
    const inputValue = document.querySelector(".js-input").value;
    if (inputValue.trim() !== '') {
        const newToDo = {
            name: inputValue,
            completed: 'not-complete'
        };
        toDoList.push(newToDo);
        localStorage.setItem('items', JSON.stringify(toDoList));
        renderToDo();
        document.querySelector(".js-input").value = "";
    }
}

function deleteToDo(index) {
    toDoList.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(toDoList));
    renderToDo();
}

function completeToDo(index) {
    const listItem = document.querySelectorAll('.list')[index];
    const completeButton = document.querySelectorAll('.js-completeToDo')[index];

    if (toDoList[index].completed === 'not-complete') {
        toDoList[index].completed = 'complete';
        listItem.id = "complete";
        completeButton.classList.remove('not-complete-but');
        completeButton.classList.add('complete-but');
        completeButton.innerHTML = "✓";
    } else {
        toDoList[index].completed = 'not-complete';
        listItem.id = "not-complete";
        completeButton.classList.remove('complete-but');
        completeButton.classList.add('not-complete-but');
        completeButton.innerHTML = "";
    }
    localStorage.setItem('items', JSON.stringify(toDoList));
}
