function removeToken() {
    return localStorage.removeItem("token")
}

function getToken() {
    const t = localStorage.getItem("token")
    if(t!=null) {
        return JSON.parse(localStorage.getItem("token"))
    }
    return null
}

createTokenFacebook = async(facebookToken) => {
    const response = await fetch(USERME_API_URL + '/token',
        {
            method: 'POST',
            body: JSON.stringify({ 'facebookToken': facebookToken }),
            headers: { 'Content-Type': 'application/json' }
        }
    );
    if (response.status != 200) {
        return "Invalid Facebook token"
    } else {
        const responseJson = await response.json();
        localStorage.setItem('token', JSON.stringify(responseJson));
        return null
    }
}


createTokenPassword = async(email, password) => {
    const response = await fetch(USERME_API_URL + '/token',
        {
            method: 'POST',
            body: JSON.stringify({ 'email': email, 'password': password }),
            headers: { 'Content-Type': 'application/json' }
        }
    );
    if (response.status != 200) {
        return "Invalid user/password combination"
    } else {
        const responseJson = await response.json();
        localStorage.setItem('token', JSON.stringify(responseJson));
        return null
    }
}

refreshToken = async ()=> {
    const token = getToken()
    if(token==null) {
        return "Token not found"
    }
    const response = await fetch(USERME_API_URL + '/token/refresh',
        {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token.refreshToken }
        }
    );
    const responseJson = await response.json();
    if (response.status != 200) {
        return "Could not refresh token. err=" + await response.json()
    }
    localStorage.setItem('token', JSON.stringify(responseJson));
    return null
}

function keepTokenRefreshed() {
    window.setInterval(async function() {
        console.log("Refreshing token")
        const err = await refreshToken()
        if(err!=null) {
            console.log("Error refreshing token. err=" + err)
        }
        console.log("Token refreshed successfully")
    }, 60000)
}
