let currentTaskNumber = 1;

let addTask = () => {
    let taskName = document.getElementById("taskname");
    if (taskName.value) {
        insertTaskToTable(currentTaskNumber, taskName.value);
        currentTaskNumber += 1;
        taskName.value = "";
    } else {
        alert("Please Input Your Task");
    }
}

let insertTaskToTable = (taskNumber, taskName) => {
    const row = document.createElement("tr");
    const tdNum = document.createElement("td");
    const tdTask = document.createElement("td");

    const tdTaskConfig = document.createElement("td");
    const tdDelTaskButton = document.createElement("button");
    tdDelTaskButton.setAttribute("onclick","deleteTask(this)");
    tdDelTaskButton.innerText = "❌";
    const tdResolveTaskButton = document.createElement("button");
    tdResolveTaskButton.setAttribute("onclick","resolveTask(this)") ;
    tdResolveTaskButton.innerText = "✅";
    tdTaskConfig.appendChild(tdResolveTaskButton);
    tdTaskConfig.appendChild(tdDelTaskButton);

    const tdTaskStatus = document.createElement("td");
    tdTaskStatus.innerText = "To Do";

    tdNum.innerText = taskNumber;
    tdTask.innerText = taskName;
    row.appendChild(tdNum);
    row.appendChild(tdTask);
    row.appendChild(tdTaskStatus);
    row.appendChild(document.createElement("td"));
    row.appendChild(tdTaskConfig);
    document.getElementById("tasktable").appendChild(row);
    // alert("Task Added: " + taskName);
}

let getCurrentDatetime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let minute = 0
    if(today.getMinutes() < 10) {minute = "0"+today.getMinutes()} else {minute = today.getMinutes()}  
    let time = today.getHours() + ":" + minute + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime
}

let resolveTask = (button) => {
    console.log(getCurrentDatetime())
    let tab = document.getElementById('tasktable');
    tab.rows[button.parentNode.parentNode.rowIndex].cells[document.getElementById("taskEndedCol").cellIndex].innerText = getCurrentDatetime();
    tab.rows[button.parentNode.parentNode.rowIndex].cells[document.getElementById("taskStatusCol").cellIndex].innerText = "Completed";
    button.remove();
}

let deleteTask = (button) => {
    let tab = document.getElementById('tasktable');
    tab.deleteRow(button.parentNode.parentNode.rowIndex);
}