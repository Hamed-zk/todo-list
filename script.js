const todoInput=document.querySelector("#todo-input");
const todosContainer=document.querySelector(".todos");
const completedCount=document.querySelector(".completedCount")


let todos=[];  //ارایه که تودو به ان وارد می شود

todoInput.addEventListener("keyup",function (e) {
    if(e.key == "Enter" || e.keyCode == 13){
        todos.push({value:e.target.value , checked:false});
        newTodo(e.target.value);
        todoInput.value="";
        countComplted()
    }
})

function newTodo(value){
    const todo=document.createElement("div");
    const todoText=document.createElement("p");
    const todoCheckBox=document.createElement("input");
    const todoCheckBoxLable=document.createElement("label");
    const todoCross=document.createElement("span");

    let obj=todos.find((t)=> t.value == value)
    
    todoText.textContent=value;
    todoCheckBox.type="checkbox";
    todoCheckBox.name="checkbox"
    todoCheckBoxLable.htmlFor="checkbox";
    todoCheckBoxLable.addEventListener("click",function(e){
        if(todoCheckBox.checked){
            todoCheckBox.checked=false;
            todoText.style.textDecoration="none";
            todoCheckBoxLable.classList.remove("active");
            obj.checked=false;
            // console.log(todos);
            countComplted()
        }
        else{
            obj.checked=true;
            countComplted()
            // console.log(todos);
            todoCheckBox.checked=true;
            todoText.style.textDecoration="line-through";
            todoCheckBoxLable.classList.add("active");
        }
    })

    todoCross.textContent="X";
    todoCross.addEventListener("click",function(e){
        e.target.parentElement.remove();
        todos=todos.filter((t) => t !== obj);  //حذف از ارایه
        countComplted()
    })

    todo.classList.add("todo");
    todoCheckBoxLable.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckBox);
    todo.appendChild(todoCheckBoxLable);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);


    todosContainer.appendChild(todo);

}

function countComplted(){
    completedCount.textContent=`${
        todos.filter((t)=>t.checked === false).length
    } item left`;
}

function changeTheme(){
    document.body.classList.toggle("light");
}

function clearCompleted(){
    document.querySelectorAll(".todo").forEach((todo)=>{
        if (todo.querySelector("input").checked){
            todo.remove()
        }
    })
}

function showAll(){
    document.querySelectorAll(".filters div").forEach((d, i)=>{
        if (i===0){
            d.classList.add("filterActive")
        }
        else{
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display="grid";
    })
}

function filterCompleted(){
    document.querySelectorAll(".filters div").forEach((d, i)=>{
        if (i===2){
            d.classList.add("filterActive")
        }
        else{
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display="grid";
        if (!todo.querySelector("input").checked){
            todo.style.display="none";
        }
    })
}

function filterActive(){
    document.querySelectorAll(".filters div").forEach((d, i)=>{
        if (i===1){
            d.classList.add("filterActive")
        }
        else{
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display="grid";
        if (todo.querySelector("input").checked){
            todo.style.display="none";
        }
    })
}
