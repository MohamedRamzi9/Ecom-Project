# What is this library ?
This library is a simple collection of files each containing usefull functionnalities in web development, from ui creation to storage and request handling.


# How is it structured ?
the library is structured as a collection of self contained files, each file contains functionnalities related to a specific topic. Each file is named after the topic it covers, the list of files is as follows :

## Dom.js
this file contains the following functionnalities :
- ### element class 
this class is wrapper around the native DOM element, it provides a simple way to create and manipulate DOM elements
- ### make_element function
this is helper function to create an element, then there are functions that have the same name of the common used elements like div(), button(), ect.
- ### get_element_by_... functions
these functions retreive DOM elements and return them as element class objects.

## Storage.js
this file contains functions to handle local storage like setting, getting and removing items from local storage. 

## Request.js
this file contains functions to handle send `POST` requests using the fetch API.

## WebSocket.js
this file contains functions to create a websocket connection and send messages to the server.

## demos
this folder contains multiple examples of how to use the library, each example is self contained and can be run independently.