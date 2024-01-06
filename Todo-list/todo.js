let form = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo");
let todoList = document.querySelector(".list-group");
let firstCardBody = document.querySelectorAll(".card-body")[0];
let secondCardBody = document.querySelectorAll(".card-body")[1];
let filter = document.querySelector("#filter");
let clearButton = document.querySelector("#clear-todos");

eventListeners();


function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",deleteAllTodos);
}
function deleteAllTodos(deleteAllTodos){
    if(confirm("tümünü silmek istediğinize emin misiniz?")){
        todoList.innerHTML= " " ;
        localStorage.removeItem("todos");
    }

}
function filterTodos(e){
    let filter = e.target.value.toLowerCase();
    let lists = document.querySelectorAll(".list-group-item");


    lists.forEach(function(lists){
        let text = lists.textContent.toLocaleLowerCase();
        if (text.indexOf(filter) === -1){
            lists.setAttribute("style","display: none !important");
        }else{
            lists.setAttribute("style","display: block");
        }

    });

}
function deleteTodo(e){
   if(e.target.className === "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo başarıyla Silindi");
   }

}
function deleteTodosFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo, index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    const todos = getTodosFromStorage();
    todos.forEach(function(e , index){
        if(e === newTodo){
            showAlert("danger","Bu isimde bir todo mevcut..."); //Aynı isimli todo silme 
            e.parentElement.remove();
            todos.splice(index,1);
            localStorage.setItem("todos",JSON.stringify(todos)); 
        }
    });
    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo yazınız....");
    }else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo); 
        showAlert("success","Todo başarıyla eklendi");
         
    }
      
    
    
    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;


    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type , message){
    let alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    window.setTimeout(function(){
        alert.remove();
    }, 2000);
}

function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "" ;

}
