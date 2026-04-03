# todo-list

This is a todo list that was created using HTML, CSS, and JavaScript. It provides an interface similar in structure to a file explorer, where users have the ability to create an organized system of projects containing checklists of tasks. It provides intuitive interfaces for users to do the following:
- Create new projects
- Delete an existing project
- Rename an existing project
- Toggle the view of any individual project and its tasks
- Toggle the view of all existing projects at once
- Add a new task to a project with a name, description, date, and priority
- Mark an existing task as complete
- Delete an existing task from a project
- Expand an existing task to see all of its details
- Modify any detail of an existing task through its expanded view

These interfaces are provided through a concise GUI, which contains a sidebar for toggling/creating projects, and a main content section for displaying all open projects, or displaying an expanded task. Tasks are organized by date groups, which are displayed in order within their project. The priority of a task is indicated through the color of its checkbox, which changes from cooler to warmer colors as its priority increases. 

This project demonstrates proficient use of HTML, CSS, and JavaScript. It utilizes ES6 modules to divide the application into multiple different segments, each of which serve a clear, distinct purpose and follow the single-responsibility principle, while additionally allowing for the separation of application logic and DOM manipulation. These modules are bundled together with an HTML template and CSS stylesheets through the use of Webpack.