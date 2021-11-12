const apiUrl = '/server/';
const TOKEN_NAME = 'rttoken';
const setToken = (str) => {
    localStorage.setItem(TOKEN_NAME, str);
}
const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
}
const getHeader = () => {
    let token = getToken(),
        rt = {};
    rt[TOKEN_NAME] = token;
    return rt;
}