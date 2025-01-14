document.addEventListener('DOMContentLoaded', () => {
   
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');

    if (isLoggedIn === 'true' && username) {
       
        document.getElementById('welcomeMessage').textContent = `Hello, ${username}`;
    } else {
   
        loadPage('loginPage');
    }


    document.getElementById('planTripButton').addEventListener('click', () => {
        loadPage('planningPage');
    });
});
