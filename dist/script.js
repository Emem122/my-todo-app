const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters .filter-button");
const taskList = document.querySelector(".task-list");
const addBtn = document.querySelector(".add-btn button");

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector(".filters span.active").classList.remove("active");
		btn.classList.add("active");
		showTodo(btn.id);
	});
});

function showTodo(filter) {
	let li = "";
	if (todos) {
		todos.forEach((todo, id) => {
			let isCompleted = todo.status == "completed" ? "checked" : "";
			if (filter == todo.status || filter == "all") {
				li += `
        <li class="task text-lg pb-2 pt-4 px-1 flex items-center justify-between border-b-[1px] border-b-neutral-300">
          <input type="checkbox" name="checkbox" onclick="updateStatus(this)" id="${id}" ${isCompleted} />
          <label for="${id}" ${isCompleted}><p>${todo.name}</p></label>
          <ul class="task-menu flex gap-5 text-xl">
            <li onclick="editTask(${id},'${todo.name}')">
              <p class="emoji-white">&#128395;</p>
            </li>
            <li onclick="deleteTask(${id})">
              <p class="emoji-white">&#128465;</p>
            </li>
          </ul>
        </li>
        `;
			}
		});
	}

	taskList.innerHTML =
		li || `<div class="mt-5 py-5 text-lg bg-neutral-900 text-neutral-500 rounded-md text-center">No Task Here</div>`;
}

showTodo("all");

function editTask(taskId, taskName) {
	editId = taskId;
	isEditedTask = true;
	taskInput.value = taskName;
}

function deleteTask(deleteId) {
	todos.splice(deleteId, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	// showTodo("all");
	if (document.querySelector(".filters #completed").classList.contains("active")) {
		showTodo("completed");
	} else if (document.querySelector(".filters #active").classList.contains("active")) {
		showTodo("active");
	} else {
		showTodo("all");
	}
}

function updateStatus(selectedTask) {
	let taskName = selectedTask.nextElementSibling;
	if (selectedTask.checked) {
		taskName.classList.add("checked");
		todos[selectedTask.id].status = "completed";
	} else {
		taskName.classList.remove("checked");
		todos[selectedTask.id].status = "active";
	}
	localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", (e) => {
	let userTask = taskInput.value.trim();
	if (e.key == "Enter" && userTask) {
		if (!isEditedTask) {
			if (!todos) {
				todos = [];
			}
			let taskInfo = { name: userTask, status: "active" };
			todos.unshift(taskInfo);
		} else {
			isEditedTask = false;
			todos[editId].name = userTask;
		}
		taskInput.value = "";
		localStorage.setItem("todo-list", JSON.stringify(todos));
		if (document.querySelector(".filters #completed").classList.contains("active")) {
			showTodo("completed");
		} else if (document.querySelector(".filters #active").classList.contains("active")) {
			showTodo("active");
		} else {
			showTodo("all");
		}
	}
});

addBtn.addEventListener("click", () => {
	let userTask = taskInput.value.trim();
	if (userTask) {
		if (!isEditedTask) {
			if (!todos) {
				todos = [];
			}
			let taskInfo = { name: userTask, status: "active" };
			todos.unshift(taskInfo);
		} else {
			isEditedTask = false;
			todos[editId].name = userTask;
		}
		taskInput.value = "";
		localStorage.setItem("todo-list", JSON.stringify(todos));
		if (document.querySelector(".filters #completed").classList.contains("active")) {
			showTodo("completed");
		} else if (document.querySelector(".filters #active").classList.contains("active")) {
			showTodo("active");
		} else {
			showTodo("all");
		}
	}
});
