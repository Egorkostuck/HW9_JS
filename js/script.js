const IDS = {
    TODO_INPUT: 'todoInput',
    TODO_BUTTON: 'todoButton',
    TODO_CONTAINER: 'todoContainer'
};

//selectors
const todoInputEl = () => document.getElementById(IDS.TODO_INPUT);
const todoButtonEl = () => document.getElementById(IDS.TODO_BUTTON);
const todoContainerEl = () => document.getElementById(IDS.TODO_CONTAINER);

//functions
const addInputClass = () => {    
    todoInputEl().classList.add('todo-input-border');

    todoInputEl().addEventListener('click', removeInputClass);
};

const removeInputClass = event => {
    const idElement = todoInputEl().id;
    let item = event.currentTarget;
    const idParentElement = item.id;
    if(idElement !== idParentElement){
        todoInputEl().classList.remove('todo-input-border');
    }
};
const addTodo = event => {

    event.preventDefault();

    const addTodoDiv = document.createElement('div');
    addTodoDiv.classList.add('div-todo');
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="icon-ok"></i>';
    completedButton.id = 'completeBtn';
    completedButton.classList.add('complete-btn');
    addTodoDiv.appendChild(completedButton);

    const newTodoItem = document.createElement('li');
    newTodoItem.innerHTML = todoInputEl().value;
    newTodoItem.classList.add('li-todo');
    addTodoDiv.appendChild(newTodoItem);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="icon-trash"></i>' ;
    deleteButton.classList.add('delete-btn');
    deleteButton.id = 'deleteBtn';
    addTodoDiv.appendChild(deleteButton);

    todoContainerEl().appendChild(addTodoDiv);

    todoInputEl().value = '';

    const changeLiTodo = document.querySelector('.li-todo');

    const changeTodoItem = event => {
        event.preventDefault();

        const defaultLi = changeLiTodo.innerHTML;
        if (changeLiTodo) {
            const title = prompt('Change ToDo list: ', defaultLi);
            if (title !== null){
                if (!title) {
                    changeTodoItem(event);
                    return;
                }
                changeLiTodo.innerHTML = title;
            }
        }
    };

    changeLiTodo.addEventListener('click', changeTodoItem);
};

const deleteItem = event => {
    const item = event.target;
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.remove();
    }
};

const completeItem = event => {
    const item = event.target;
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

const onTodoListHandler = event => {
const item = event.target;
const id = item.id;

switch (id) {
case 'deleteBtn': {
deleteItem(event);
break;
}
case 'completeBtn': {
completeItem(event);
break;
}
}
};

//EventListener
todoInputEl().addEventListener("click", addInputClass);
todoButtonEl().addEventListener('click', addTodo);
todoContainerEl().addEventListener('click', onTodoListHandler);
todoInputEl().addEventListener('click', removeInputClass);