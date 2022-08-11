# To-Do Lists

[LIVE DEMO](https://brandenge.github.io/to-do-list/)

Version 1.0.15

Created by: Branden Ge

This website implements a simple to-do-list application. You can save information in a list format.

All data is saved in a single nested data structure which is an array of obects that represent to-do lists, which further contain an array of tasks within each to-do list object. This object is saved on the user's computer locally using the Storage API in the browser (using localStorage methods). This serves as a simple database so that the data persists across sessions and page refreshes without the use of a separate traditional database.

All the data for the website is stored in a single key-value pair (the key is named 'to_do_lists'). The value is the entire data structure saved as a JSON string. Data manipulations are done by parsing the JSON string, directly manipulating the data structure using JavaScript, and then re-saving the updated data structure as a JSON string again.

Various inputs and buttons provide the user interface to allow the user to fully manipulate the data from the webpage.

The background color of the name of the currently selected list of tasks (on the tasks page) is animated using the Web Animations browser API using the keyframe object format for the keyframes.
