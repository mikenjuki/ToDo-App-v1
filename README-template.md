# Todo app solution

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is a simple Todo app built using TypeScript, Next.js 13, and Tailwind CSS. The app allows users to create, update, and delete todos. It also includes a filter option to view todos based on their completion status.

### Screenshot

![Desktop Light](../todo-v2/public/assets/images/todo-ss-001.png)
![Mobile Dark](../todo-v2/public/assets/images/todo-ss-002.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

I started by setting up the project structure and installing the necessary dependencies. Then, I created the basic layout of the app using Tailwind CSS classes.

Next, I implemented the context using the createContext hook and set up the initial state and reducer. The context provides access to the todo list, theme, and filter options. I also use typescript to manage my types.

I then created the TodoItem component to display individual todos. The component receives the todo data as props and allows users to update and delete todos.

Next, I implemented the functionality to add new todos using an input form. Users can enter a todo description and press enter to add it to the list.

I also implemented the update and delete functionality for each todo item. Users can mark a todo as complete or incomplete, and they can delete a todo by clicking the delete button. And also you can edit a to do if you made a mistake.

To filter the todos based on completion status, I added filter buttons for "All", "Active", and "Completed". Clicking on these buttons updates the filter state, and the todo list is dynamically filtered based on the selected filter.

Also to manage my notes storage i used Firebase firestore to save my to dos.

### Built with

- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Tailwind CSS
- Firebase

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)
