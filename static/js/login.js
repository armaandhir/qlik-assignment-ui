$("#frm-login").submit(function(event) {
    event.preventDefault();
    //console.log($("#username").val());
    var userName = $("#username").val();
    if ((userName !== '') && (userName.length < 16)) {
    	localStorage.setItem('userName', userName);
    	console.log(userName);
        window.location.assign("/home");
    }
    else {
        $("#username").val('');
        alert('Username cannot be greater than 15 characters.');
    }
})