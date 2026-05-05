

function formatUsername(username) {
    if (!username) return username;
    return username.slice(0, 1)[0].toUpperCase();
}

export { formatUsername };