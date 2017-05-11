$(function(){
	console.log(localStorage.getItem['userName']);
	if((localStorage.getItem['userName'] === null) || (typeof localStorage.getItem['userName'] === 'undefined')) {
		console.log(localStorage.getItem['userName']);
		//window.location.assign("/login");
	}
	else {
		console.log(localStorage.getItem['userName']);
	}
})

function sendMessage() {
    console.log("making call");
    var userName = 'armaan';
    var message = 'adada';
    $.ajax({
        url: "http://localhost:8080/qlik/api/post",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: {
            author: userName,
            text: message
        },
        success: function(result) {
        	console.log(result);
        },
        error: function(error) {
        	console.log(error);
        }
    });
}

function getMessages() {
    console.log("making call to get messages");
    setTimeout(function(){
        //alert(t1 + "-" + t2);
        //$( "tbody" ).empty();
        //$( ".btn-lyft" ).remove();
        //$( ".btn-uber" ).remove();
        // Getting uber and lyft taxi data
        $.ajax({
            url: "http://localhost:8080/qlik/api/message",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            success: function(result) {
                console.log(result);
            }
        });
    }, 400);
}