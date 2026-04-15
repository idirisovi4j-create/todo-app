const input = document.querySelector(".name");
const inputSur = document.querySelector(".surname");
const btn = document.querySelector("button");
const list = document.querySelector("#list");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodo () {
    list.innerHTML = "";
    todos.map((el,index) => {
        const li = document.createElement("li")

        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        span1.textContent = el.name;
        span2.textContent = el.surname;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = el.checked;


        if (el.checked) {
            li.style.textDecoration = "line-through";
        }else {
            li.style.textDecoration = "none";
        }

        li.append(span1,span2,check,deleteBtn);
        list.append(li);

        check.addEventListener("change", () => {
            todos[index].checked = !todos[index].checked;
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodo();
        });

        deleteBtn.addEventListener("click", () => {
            todos.splice(index,1);

            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodo();
        });
    });
}


btn.addEventListener("click", () => {
    const value1 = input.value;
    const value2 = inputSur.value;
    if (!value1 && !value2) {
      return;
    }

    todos.push({name: value1, surname: value2, checked: false});
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo();
    console.log(todos);
    input.value = "";
    inputSur.value = "";
});

renderTodo();

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});
inputSur.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});