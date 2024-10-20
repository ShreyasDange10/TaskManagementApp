let userID = localStorage.getItem("userID");

async function getCategories() {
    const response = await fetch(
        `${API_URL}category/get-categories`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ); 

    const responseData = await response.json();

    // Check if the response contains the expected data
    if (responseData?.data) {
        return responseData.data.map(val => ({
            name: val?.name,
            catID: val?._id
        }));
    } else {
        console.error("No categories found");
        return [];
    }
}

async function populateCategories() {
    const catSelect = document.getElementById("categories");

    // Wait for the categories to be fetched
    const cat = await getCategories()
    

    // Loop through the category names and add them as options
    cat.forEach(catVal => {
        var opt = document.createElement("option");
        opt.value = catVal?.catID;
        opt.innerText = catVal?.name;
        catSelect.appendChild(opt);
    });
}

// Call the function to populate the select element
populateCategories();



async function addTask(){
    var name = document.getElementById("name").value.trim();
    var description = document.getElementById("description").value.trim();
    var status = document.getElementById("status").value;
    var categoryID = document.getElementById("categories").value
  
   
    const data = {name, description, categoryID, status, userID}

    const response = await fetch(
        `${API_URL}task/add-task`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const responseData = await response.json();
    console.log("resp",response);

    if(responseData.code == 200){
        alert("Task Added Successfully");
        window.location.reload();
    }else{
        alert("Something went wrong");
    }
}

async function getAlltasks(){
    const response = await fetch(
        `${API_URL}task/get-task`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const responseData = await response.json();
    console.log("resp", responseData.data);

    if (responseData.code == 200) {
        console.log("Task Data fetched Successfully");

        var tableData = document.getElementById("taskTableData");

        responseData?.data.forEach((rowData, index) => {
            console.log(rowData, 'rowData');
            
                if(rowData.userID == userID){
                    let newRow = document.createElement("tr");
        
                    let srNoCell = document.createElement("td");
                    srNoCell.textContent = " ♦ "; 
                    newRow.appendChild(srNoCell);
        
                    let taskNameCell = document.createElement("td");
                    taskNameCell.textContent = rowData.name;  
                    newRow.appendChild(taskNameCell);

                    let taskDescCell = document.createElement("td");
                    taskDescCell.textContent = rowData.description;  
                    newRow.appendChild(taskDescCell);

                    let taskCatCell = document.createElement("td");
                    taskCatCell.textContent = rowData.categoryID.name;  
                    newRow.appendChild(taskCatCell);

                    // Create a select element for status
        let taskStatCell = document.createElement("td");
        let statusSelect = document.createElement("select");
        statusSelect.classList.add("form-select");
        statusSelect.id = "selectStat"
        statusSelect.addEventListener("change",() => {
            editTask(rowData?._id);  
        })

        // Create options for the select element
        const statuses = ["pending", "in-progress", "completed"];
        statuses.forEach(status => {
            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if ( option.value === rowData.status) {
                option.selected = true; // Set the current status as selected
            }
            statusSelect.appendChild(option);
        });

        // Append the select element to the task status cell
        taskStatCell.appendChild(statusSelect);
        newRow.appendChild(taskStatCell);
        
          
                    let actionCell = document.createElement("td");
                    let deleteButton = document.createElement("button");
                    // let editButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    // editButton.textContent = "Edit";
                    deleteButton.classList.add("btn");  
                    deleteButton.classList.add("btn-danger");  
                    // editButton.classList.add("me-2");  
                    // editButton.classList.add("btn");  
                    // editButton.classList.add("btn-secondary");  
                    deleteButton.addEventListener("click", () => {
                        deleteTask(rowData?._id, newRow);  
                    });
                    // editButton.addEventListener("click", () => {
                    //     editTask(rowData?._id, newRow);  
                    // });
        
                    // actionCell.appendChild(editButton);
                    actionCell.appendChild(deleteButton);
                    newRow.appendChild(actionCell);
        
                    tableData.appendChild(newRow);
                }
            
        });
    } else {
        alert("Something went wrong");
    }
}

async function deleteTask(taskID, rowElement) {
    console.log(taskID, 'taskID')
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        const response = await fetch(`${API_URL}task/delete-task/${taskID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (result.code == 200) {

            alert("Task deleted successfully.");

            rowElement.remove();
            window.location.reload();
        } else {
            alert("Failed to delete the task.");
        }
    }
}

getAlltasks();

async function editTask(taskID) {
    // Assuming you have the necessary HTML elements to get the new values
    var newStatus = document.getElementById("selectStat").value; // New status from the select input
   console.log(newStatus,"newStatus")
    
    const data = {
        status: newStatus,
    };

    const response = await fetch(
        `${API_URL}task/update-task/${taskID}`, // Assuming your API requires taskID in the URL
        {
            method: "PATCH", // Use PUT for updates
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const responseData = await response.json();
    console.log("resp", response);

    if (responseData.code == 200) {
        alert("Task Updated Successfully");
        // window.location.reload(); // Refresh to see updated task list
    } else {
        alert("Something went wrong");
    }
}
