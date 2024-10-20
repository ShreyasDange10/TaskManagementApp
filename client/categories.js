let userID = localStorage.getItem("userID");

async function addCategory(){
    var name = document.getElementById("name").value.trim();
    const data = { name, userID }

    const response = await fetch(
        `${API_URL}category/add-category`,
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
        alert("Category Added Successfully");
        window.location.reload();
    }else{
        alert("Something went wrong");
    }
};

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
    console.log("resp", responseData);

    if (responseData.code == 200) {
        console.log("Category Data fetched Successfully");

        var tableData = document.getElementById("categoryTableData");

        responseData?.data.forEach((rowData, index) => {
            console.log(rowData, 'rowData');
            
                if(rowData.userID == userID){
                    let newRow = document.createElement("tr");
        
                    let srNoCell = document.createElement("td");
                    srNoCell.textContent = " ♦ "; 
                    newRow.appendChild(srNoCell);
        
                    let categoryNameCell = document.createElement("td");
                    categoryNameCell.textContent = rowData.name;  
                    newRow.appendChild(categoryNameCell);
        
          
                    let deleteCell = document.createElement("td");
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.classList.add("btn");  
                    deleteButton.classList.add("btn-danger");  
                    deleteButton.addEventListener("click", () => {
                        deleteCategory(rowData?._id, newRow);  
                    });
        
                    deleteCell.appendChild(deleteButton);
                    newRow.appendChild(deleteCell);
        
                    tableData.appendChild(newRow);
                }
            
        });
    } else {
        alert("Something went wrong");
    }
}

async function deleteCategory(categoryId, rowElement) {
    console.log(categoryId, 'catID')
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
        const response = await fetch(`${API_URL}category/delete-category/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (result.code == 200) {

            alert("Category deleted successfully.");

            rowElement.remove();
            window.location.reload();
        } else {
            alert("Failed to delete the category.");
        }
    }
}

getCategories();