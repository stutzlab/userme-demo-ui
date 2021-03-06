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

createTokenGoogle = async(googleAuthCode) => {
    const response = await fetch(USERME_API_URL + '/token',
        {
            method: 'POST',
            body: JSON.stringify({ 'googleAuthCode': googleAuthCode }),
            headers: { 'Content-Type': 'application/json' }
        }
    );
    if (response.status != 200) {
        return "Invalid Google token"
    } else {
        const responseJson = await response.json();
        localStorage.setItem('token', JSON.stringify(responseJson));
        return null
    }
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
    const t = getToken()
    if(t==null || !t.accessTokenExpiration) {
        console.log('Could not get token for auto refresh')
        return
    }
    const diff = Date.parse(t.accessTokenExpiration) - new Date().getTime()
    // const diff = 120000 + 10000
    console.log("Next token refresh scheduled in " + (diff-120000) + "ms")
    window.setTimeout(doRefresh, Math.max(diff-120000, 0))
}

async function doRefresh() {
    console.log("Refreshing token")
    const err = await refreshToken()
    if(err!=null) {
        console.log("Error refreshing token. err=" + err)
    }
    console.log("Token refreshed successfully")    

    const t = getToken()
    const diff = Date.parse(t.accessTokenExpiration) - new Date().getTime()
    // const diff = 120000 + 10000
    console.log("Next token refresh scheduled in " + (diff-120000) + "ms")
    window.setTimeout(doRefresh, Math.max(diff-120000, 0))
}

keepTokenRefreshed()
