
# backend
- make a `get_dict` method in `Task` class that returns all the attributes that should be sent to the frontend
- modify the tasks list to now contain a list `List` objects each having a list of `Task` objects
- remove the `__eq__` method in `Task` and use `filter` method to find the task to be updated
- modify the request handlers to use the new data structure
- add a new request handler to create a new list, modify and delete a list 
- refactor the code 

# frontend
- make the `edit` button work by converting the task name to an input field and sending a request to update the task name
- add a new list form to create a new list
- modify all the requests to send the list id as well
- add a delete list button
- add a modify list name button
