# qlik-assignment-ui
Simple UI built with Bootstrap and JQuery for qlik-assignment

## Deployment
It is a simple UI and can be run as a server using python simple http server. Make sure you have python 2.7 installed in your system.
Clone the directory, open command line, navigate to directory and type
```
python -m SimpleHTTPServer
```
You can access it using browser at
```
http://localhost:8000/
```

If your qlik-assinment application service is running on localhost too, this app willl interact with it.
Make sure to change the url if the application service is running with a different address.

**Note:** You might get a cross-origin error while using this app with the service. 
In that case, please install the CORS plugin for your browser and it will fix it


## Implementation
* Asks you to login with a username when index page loads.
The username uses local storage of browser as this is a simple app and we do not have a login service.
* Once logged in, the navigation bar has a button that opens a modal to post a message. 
* Clicking on the username on navigation bar, click messages to view all messages in another modal.
* The message can be selected from the list of displayed messages and on click will display extra information about.
* You can also delete the message once you are viewing the extra information by clicking the delete button.

All the requests use Ajax for making rest calls.


*Might have little glitches as focus was only on implementing rest endpoints.*
