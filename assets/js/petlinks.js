const LOGGED_IN_PAGE = ["",]

function checkLoggedIn() {
    if (sessionStorage.getItem("userData")) { // Logged In
        // If in login or register page kick.
        if (window.location.href.includes("login")) {
           window.location.href = "/dashboard";
        }
    } else {
        
        // Kick them out if they're in a LOGGED IN only page otherwise do nothing
    }
}