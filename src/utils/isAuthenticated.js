// Can be improved
export default function isAuthenticated() {
    var token = localStorage.getItem('token');

    return token;
}