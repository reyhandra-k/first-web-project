let currentTaskNumber = 1;

let loadTasks = () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    currentTaskNumber = savedTasks.length + 1;
    let tableColumns = [];
    if (savedTasks[0]) {tableColumns = Object.keys(savedTasks[0])};

    // console.log(savedTasks);
    // console.log(savedTasks[0])
    // console.log(Object.keys(savedTasks[0]));

    savedTasks.forEach((task) => {    
        const row = document.createElement("tr");
        tableColumns.forEach((col) => {
            // console.log(col);
            const dat = document.createElement("td");
            // console.log(task[col]);
            dat.innerHTML = task[col];
            row.appendChild(dat);
            document.getElementById("taskTable").appendChild(row);
        });
    });
};

document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
})

let saveTasks = () => {
    let tasks = [];
    let tableRows = document.getElementById("taskTable").rows;

    for (let i = 1; i < tableRows.length; i++) {
        let task = {
            taskNumber: tableRows[i].cells[0].innerHTML,
            taskName: tableRows[i].cells[1].innerHTML,
            taskStatus: tableRows[i].cells[2].innerHTML,
            taskCreated: tableRows[i].cells[3].innerHTML,
            taskDeadline: tableRows[i].cells[4].innerHTML,
            taskEnded: tableRows[i].cells[5].innerHTML,
            tdTaskConfig: tableRows[i].cells[6].innerHTML
        };
        // console.log(task.taskName);
        // console.log(task.taskDeadline);
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Task Saved!")
    console.log(document.getElementById("taskTable").rows[0].cells.length)
};

   
let addTask = () => {
    let taskName = document.getElementById("taskname");
    if (taskName.value) {
        insertTaskToTable(currentTaskNumber, taskName.value);
        saveTasks();
        currentTaskNumber += 1;
        taskName.value = "";
    } else {
        alert("Please Input Your Task");
    }
}

document.getElementById("addTaskButton").addEventListener("click",addTask);

let insertTaskToTable = (taskNumber, taskName) => {
    const row = document.createElement("tr");
    const tdNum = document.createElement("td");
    const tdTask = document.createElement("td");

    const tdTaskConfig = document.createElement("td");
        const divTaskFinish = document.createElement("div");
            const tdCancelTaskButton = document.createElement("button");
            tdCancelTaskButton.setAttribute("name","cancelTaskButton");
            // tdCancelTaskButton.setAttribute("onclick","finishTask(this)");
            tdCancelTaskButton.innerText = "❌";
            const tdResolveTaskButton = document.createElement("button");
            tdResolveTaskButton.setAttribute("name","completeTaskButton");
            // tdResolveTaskButton.setAttribute("onclick","finishTask(this)") ;
            tdResolveTaskButton.innerText = "✅";
        divTaskFinish.appendChild(tdResolveTaskButton);
        divTaskFinish.appendChild(tdCancelTaskButton);
        const tdDeleteTaskButton = document.createElement("button");
        tdDeleteTaskButton.setAttribute("name","deleteTaskButton");
        // tdDeleteTaskButton.setAttribute("onclick","deleteTask(this)") ;
        tdDeleteTaskButton.innerText = "🗑️";
    tdTaskConfig.appendChild(divTaskFinish);
    tdTaskConfig.appendChild(tdDeleteTaskButton);

    const tdTaskStatus = document.createElement("td");
    tdTaskStatus.innerText = "To Do";

    const tdTaskCreated = document.createElement("td");
    tdTaskCreated.innerText = getCurrentDatetime();

    const tdTaskDeadline = document.createElement("td");
    const inputTaskDeadline = document.createElement("input")
    inputTaskDeadline.setAttribute("type","date");
    tdTaskDeadline.appendChild(inputTaskDeadline);

    tdNum.innerText = taskNumber;
    tdTask.innerText = taskName;
    row.appendChild(tdNum);
    row.appendChild(tdTask);
    row.appendChild(tdTaskStatus);
    row.appendChild(tdTaskCreated);
    row.appendChild(tdTaskDeadline);
    row.appendChild(document.createElement("td"));
    row.appendChild(tdTaskConfig);
    document.getElementById("taskTable").appendChild(row);
    // alert("Task Added: " + taskName);
}

document.getElementById("taskTable").addEventListener("click", function(event) {
    // console.log(event.target.name);
    if (event.target.name === "cancelTaskButton" || event.target.name === "completeTaskButton") {
        finishTask(event.target);
        saveTasks();
    } else if (event.target.name === "deleteTaskButton") {
        deleteTask(event.target);
        saveTasks();
    }    
})

let getCurrentDatetime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let minute = 0
    if(today.getMinutes() < 10) {minute = "0"+today.getMinutes()} else {minute = today.getMinutes()}  
    let time = today.getHours() + ":" + minute + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime
}

let finishTask = (button) => {
    // console.log(getCurrentDatetime())
    let tab = document.getElementById('taskTable');
    tab.rows[button.parentNode.parentNode.parentNode.rowIndex].cells[document.getElementById("taskEndedCol").cellIndex].innerText = getCurrentDatetime();
    // console.log(button.name);
    let finishedStatus = "Completed";
    if (button.name == "cancelTaskButton") {finishedStatus = "Cancelled"};
    tab.rows[button.parentNode.parentNode.parentNode.rowIndex].cells[document.getElementById("taskStatusCol").cellIndex].innerText = finishedStatus;
    button.parentNode.remove();
}

let deleteTask = (button) => {
    let tab = document.getElementById('taskTable');
    tab.deleteRow(button.parentNode.parentNode.rowIndex);
}

