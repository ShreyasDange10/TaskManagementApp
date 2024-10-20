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
                    localStorage.setItem('userId', responseData.data._id);
                    localStorage.setItem('userInfo', JSON.stringify(responseData.data));             
                    localStorage.setItem("X-Authorization",JSON.stringify(responseData.data.token))
                    localStorage.setItem("name",responseData.data.name);

                    window.location.href = "index.html"
        }
    } catch (error) {
        console.log("Error during login:", error);
    }

    
}