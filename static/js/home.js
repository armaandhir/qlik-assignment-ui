
$(window).on('load',function(){
    $('#messages-detail-container').hide();
    var userName = localStorage.getItem('userName', userName);
    console.log(userName);
    if(typeof userName === 'undefined'){
        $('#modal-login').modal('show');
    }
    else{
        $('#account-name').text(userName).append('<span class="caret"></span>');
    }
});

function login(){
    event.preventDefault();
    var userName = $("#username").val();
    if ((userName !== '') && (userName.length < 16) && (userName.length > 3)) {
    	console.log(userName);
        localStorage.setItem('userName', userName);
        $('#account-name').text(userName).append('<span class="caret"></span>');
        $('#modal-login').modal('hide');
    }
    else {
        $("#username").val('');
        alert('Username has to be atleast 4 characters long and smaller than 16 characters.');
    }
}

function sendMessage() {
    console.log("making call");
    var userName = $('#account-name').text();
    var message = $('#message-textarea').val();
    $.ajax({
        url: "http://localhost:8080/qlik/api/message",
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
    e.preventDefault();
}

function getMessages() {
    console.log("making call to get messages");
    setTimeout(function(){
        $.ajax({
            url: "http://localhost:8080/qlik/api/message",
            type: "GET",
            contentType: "application/json",
            success: function(result) {
                console.log(result);
				if(typeof result != undefined){
                    $('#messages-container').empty();
					for (var i=0; i<result.length; i++){
						console.log(result[i].id);
                        var messageBox = '<div class="col-md-12">';
                        if(result[i].author === $('#account-name').text()){
                            messageBox += '<a href="#" onclick="messageClick(this);" type="button" class="msg-box-right pull-right">';
                        }
                        else{
                            messageBox += '<a href="#" onclick="messageClick(this);" type="button" class="msg-box-left">';
                        }
                        messageBox += '<div id="' + result[i].id + '" style="display:none;"></div>' +
                                        '<div class="display-name">' + result[i].author + '</div>' + 
                                        '<div class="display-time pull-right">' + getDate(result[i].createdAt) + '</div>' +
                                        '<div class="display-text">' + result[i].text + '</div>' +
                                        '</button></div>';
                        $('#messages-container').append(messageBox);
                        /*
                        $('#messages-container').append(
                            '<div class="col-md-12">' +
                            '<a href="#" onclick="messageClick(this);" type="button" class="msg-box-left">' + 
                            '<div id="' + result[i].id + '" style="display:none;"></div>' +
                            '<div class="display-name">' + result[i].author + '</div>' + 
                            '<div class="display-time pull-right">' + getDate(result[i].createdAt) + '</div>' +
                            '<div class="display-text">' + result[i].text + '</div>' +
                            '</button></div>'
                        );  */
					}
				}
            } // end of success function
        });
    }, 400);
}

function getDate(timestamp) {
    var dt = new Date(timestamp);
    return dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate() + ' at ' + dt.getHours() + ':' + dt.getMinutes();
}

function messageClick(param) {
    console.log("message clicked");
    $('#messages-container').hide();
    $('#messages-detail-container').show();
    console.log($(param).children(":first").attr('id'));
    var urlId = 'http://localhost:8080/qlik/api/message/' + $(param).children(":first").attr('id');
    setTimeout(function(){
        $.ajax({
            url: urlId,
            type: "GET",
            contentType: "application/json",
            success: function(result) {
                console.log(result);
				if(typeof result != undefined){
                    $('#messages-detail-container').empty();
                    $('#messages-detail-container').append(
                        '<button type="button" class="btn btn-default" onclick="backButton();">Back</button><br><br>' +
                        '<div class="col-md-12">' +
                        '<p><strong>Author: </strong>' + result.author + '</p>' +
                        '<p><strong>Created At: </strong>' + getDate(result.createdAt) + '</p>' +
                        '<p><strong>Is Palindrome: </strong>' + result.isPalindrome + '</p>' +
                        '</div>' +
                        '<br><br>' +
                        '<button type="button" class="btn btn-danger" onclick="messageDelete('+result.id+');">Delete</button>'
                    );  
				}
            } // end of success function
        });
    }, 50);
}

function messageDelete(id){
    console.log("delete button clicked");
    var urlId = 'http://localhost:8080/qlik/api/message/' + id;
    setTimeout(function(){
        $.ajax({
            url: urlId,
            type: "DELETE",
            contentType: "application/json",
            success: function() {
                console.log("Deleted");
                $('#messages-container').empty();
                backButton();
                getMessages();
            }, // end of success function
            error: function(){
                console.log("could not delete with id: " + id);
                backButton();
            }
        });
    }, 200);
}

function backButton(){
    $('#messages-detail-container').hide();
    $('#messages-container').show();
}