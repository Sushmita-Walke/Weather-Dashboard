document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load saved tasks from local storage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Function to render tasks
    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("li");
            todoItem.className = "todo-item";
            todoItem.innerHTML = `
                <span>${todo}</span>
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todoList.appendChild(todoItem);
        });
    }

    // Add task
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo !== "") {
            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
            todoInput.value = "";
            renderTodos();
        }
    });

    // Delete task
    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    };

    // Initial render
    renderTodos();
});
