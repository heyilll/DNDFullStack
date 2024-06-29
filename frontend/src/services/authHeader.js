const authHeader = () => {
    const user = JSON.parse(localStorage.getItem(`currentUser`));

    if (user && user.accessToken) {
        return {
            "x-access-token": user.accessToken
        }
    }
    else {
        return {};
    }
}

export default authHeader;