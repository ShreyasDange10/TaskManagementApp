async function userLogin(){
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    if (!email || !password) {
        displayAlert('Please fill out all fields.', 'alert-danger');
        return;
    }

    const data = {
        email,
        password
    };

    try {
        const response = await fetch(
            `${API_URL}auth/login`,
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

        if(responseData.code === 200){
            localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userID', responseData.data._id);
                    localStorage.setItem('userInfo', JSON.stringify(responseData.data));             
                    localStorage.setItem("X-Authorization",JSON.stringify(responseData.data.token))
                    localStorage.setItem("name",responseData.data.name);

                    window.location.href = "categories.html"
        }
    } catch (error) {
        console.log("Error during login:", error);
    }


}
async function userRegister(){
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var username = document.getElementById('username').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!email || !password || !username || !confirmPassword) {
        displayAlert('Please fill out all fields.', 'alert-danger');
        return;
    }

    const data = {
        email,
        password,
        username,
        confirmPassword
    };

    try {
        const response = await fetch(
            `${API_URL}auth/signup`,
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

        if(responseData.code === 201){
           

                    window.location.href = "/client/login.html"
        }
    } catch (error) {
        console.log("Error during registering:", error);
    }


}

