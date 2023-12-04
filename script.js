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
        const divTaskFinish = document.createElement("div");
            const tdCancelTaskButton = document.createElement("button");
            tdCancelTaskButton.setAttribute("name","cancelTaskButton");
            tdCancelTaskButton.setAttribute("onclick","finishTask(this)");
            tdCancelTaskButton.innerText = "❌";
            const tdResolveTaskButton = document.createElement("button");
            tdResolveTaskButton.setAttribute("name","resolveTaskButton");
            tdResolveTaskButton.setAttribute("onclick","finishTask(this)") ;
            tdResolveTaskButton.innerText = "✅";
        divTaskFinish.appendChild(tdResolveTaskButton);
        divTaskFinish.appendChild(tdCancelTaskButton);
        const tdDeleteTaskButton = document.createElement("button");
        tdDeleteTaskButton.setAttribute("onclick","deleteTask(this)") ;
        tdDeleteTaskButton.innerText = "🗑️";
    tdTaskConfig.appendChild(divTaskFinish);
    tdTaskConfig.appendChild(tdDeleteTaskButton);

    const tdTaskStatus = document.createElement("td");
    tdTaskStatus.innerText = "To Do";
    const tdTaskCreated = document.createElement("td");
    tdTaskCreated.innerText = getCurrentDatetime();
    
    tdNum.innerText = taskNumber;
    tdTask.innerText = taskName;
    row.appendChild(tdNum);
    row.appendChild(tdTask);
    row.appendChild(tdTaskStatus);
    row.appendChild(tdTaskCreated);
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

let finishTask = (button) => {
    // console.log(getCurrentDatetime())
    let tab = document.getElementById('tasktable');
    tab.rows[button.parentNode.parentNode.parentNode.rowIndex].cells[document.getElementById("taskEndedCol").cellIndex].innerText = getCurrentDatetime();
    // console.log(button.name);
    let finishedStatus = "Completed";
    if (button.name == "cancelTaskButton") {finishedStatus = "Cancelled"};
    tab.rows[button.parentNode.parentNode.parentNode.rowIndex].cells[document.getElementById("taskStatusCol").cellIndex].innerText = finishedStatus;
    button.parentNode.remove();
}

let deleteTask = (button) => {
    let tab = document.getElementById('tasktable');
    tab.deleteRow(button.parentNode.parentNode.rowIndex);
}