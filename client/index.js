async function userLogout() {
    const response = await fetch(`${API_URL}auth/logout`, {
        method: 'POST'
    });
    const data = await response.json();
    if (data.status === 'success') {
        localStorage.clear()
        setTimeout(() => {
            window.location.href = "/client/login.html";
        }, 1000);
    }
}

function userAuth(){
    var userid = localStorage.getItem("userID");

    if(!userid){
        window.location.href = "/client/login.html";
    }
}

userAuth();