let currentTaskNumber = 1;

function addTask() {
    let taskName = document.getElementById("taskname");
    if (taskName.value) {
        insertTaskToTable(currentTaskNumber, taskName.value);
        currentTaskNumber += 1;
        taskName.value = "";
    } else {
        alert("Please Input Your Task")
    }
}

function insertTaskToTable(taskNumber, taskName) {
    const row = document.createElement("tr");
    const tdNum = document.createElement("td");
    const tdTask = document.createElement("td");
    tdNum.innerText = taskNumber;
    tdTask.innerText = taskName;
    row.appendChild(tdNum);
    row.appendChild(tdTask);
    document.getElementById("tasktable").appendChild(row);
    alert("Task Added: " + taskName);
}