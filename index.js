let contacts = JSON.parse(localStorage.getItem("contacts")) || []
let addressForm = document.getElementById("addressForm")
let contactList = document.getElementById("contactList")

addressForm.addEventListener("submit", function(event) {
    event.preventDefault()

    const firstName = document.getElementById("new-first-name").value.trim()
    const lastName = document.getElementById("new-last-name").value.trim()
    const phoneNumber = document.getElementById("new-phone-number").value.trim()
    const email = document.getElementById("new-email").value.trim()

    if (!firstName || !lastName || !phoneNumber || !email) {
        alert("Please fill in all fields")
        return
    }

    const newContact = {
        firstName,
        lastName,
        phoneNumber,
        email
    };

    contacts.push(newContact)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    addressForm.reset()
    displayContactList()
});

function displayContactList() {
    contactList.innerHTML = ''

    contacts.forEach((contact, index) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div>
                <strong>${contact.firstName} ${contact.lastName}</strong><br>
                Phone: ${contact.phoneNumber}<br>
                Email: ${contact.email}
            </div>
            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
        `
        contactList.appendChild(div)
    })
}

function deleteContact(index) {
    contacts.splice(index, 1)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    displayContactList()
}
displayContactList()

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
const taskForm = document.getElementById("taskForm")
const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("taskList")

taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const taskText = taskInput.value.trim()

    if (taskText !== "") {
        const newTask = { text: taskText, done: false }
        tasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        taskInput.value = ""
        displayTaskList()
    }
})

function displayTaskList() {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {
        const div = document.createElement("div")
        div.classList.toggle("done", task.done)

        div.innerHTML = `
            <span>${task.text}</span>
            <button class="done-btn" onclick="markAsDone(${index})">${task.done ? "Undo" : "Done"}</button>
            <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
        `;
        taskList.appendChild(div)
    });
}

function markAsDone(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks))
    displayTaskList()
}

function removeTask(index) {
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    displayTaskList()
}
displayTaskList()