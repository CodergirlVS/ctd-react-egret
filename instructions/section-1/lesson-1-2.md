[< Back to Overview](../../README.md)

# Lesson 1.2: React Components

This assignment will teach you the following:

- React DOM
- Component Definition
- Component Instantiation
- React Components

---

## Instructions

### Getting Started:

Merge your pull request from the previous lesson (if you haven't already):

[View tutorial](https://github.com/Code-the-Dream-School/common-instructions/blob/main/common/how-to-merge.md)

Checkout your main branch and pull changes:

    git checkout main
    git pull

Create a new local branch to work on separate from the `main` branch:

    git checkout -b lesson-1-2

Now, open the project directory in your code editor and continue to the next section.

### Task List:

#### Move List into New "Todo List" Component

- [x] Inside `/src` directory, create a new file called `TodoList.js`
- [x] Open `/src/TodoList.js`
- [x] Create a new functional React component (see below)
  - [x] Import `React` from "react" npm package
  - [x] Declare a function named `TodoList`
  - [x] Export `TodoList` function as default module
- [x] Add a multi-line return statement to your `TodoList` function (this is where we will insert JSX)
  - hint: use parenthesis for multi-line return
- [ ] Move list JSX from `App.js` to `TodoList.js` (see below)
  - [x] Open `/src/App.js`
  - [x] Cut (copy and remove) the entire list element (`<ul>`) code
  - [x] Open `/src/TodoList.js`
  - [x] Inside the multi-line return, paste the list element (`<ul>`) code
- [x] Move `todoList` array from `App.js` to `TodoList.js` (see below)
  - [x] Open `/src/App.js`
  - [x] Cut (copy and remove) the entire `todoList` variable declaration
  - [x] Open `/src/TodoList.js`
  - [x] Below the import, paste the `todoList` variable
- [x] Refactor `App.js` to use new `TodoList` component (see below)
  - [x] Open `/src/App.js`
  - [x] Below `React`, import `TodoList`
  - [x] Below the level-one heading, use the `TodoList` component
- [x] Run your application and view in browser
  - [x] Verify that your Todo List still appears correctly

#### Create "Add Todo Form" Component

- [x] Inside `/src` directory, create a new file called `AddTodoForm.js`
- [x] Open `/src/AddTodoForm.js`
- [x] Create a new functional React component (see below)
  - [x] Import `React` from "react" npm package
  - [x] Declare a function named `AddTodoForm`
  - [x] Export `AddTodoForm` function as default module
- [x] Add a multi-line return statement to your `AddTodoForm` function (this is where we will insert JSX)
  - hint: use parenthesis for multi-line return
- [x] Write JSX for "Add Todo" form (see below)
  - [x] Create a `<form>` element
  - [x] Inside the `<form>` element, create a `<label>` element with text "Title"
  - [x] Next, create a text `<input>` element with `id` "todoTitle"
  - [x] Add `htmlFor` attribute to `<label>` element with same value as `id` above
  - [x] Next, create a submit `<button>` element with text "Add"
- [x] Use `AddTodoForm` component in `App.js` (see below)
  - [x] Open `/src/App.js`
  - [x] Below `React`, import `AddTodoForm`
  - [x] Below the level-one heading, use the `AddTodoForm` component
- [x] Run your application and view in browser
  - [x] Verify that "Add Todo" form appears below heading

#### Final Result

![Example Todo Application](../assets/section-1/lesson-1-2-result.png)

### Final Step:

Check the status of your local repository to double-check the changes you made:

    git status

Stage the file(s) that you edited:

    git add .

Check the status again and notice that the changes from before are now staged:

    git status

Create a commit for the changes you made and add a message describing the changes you made:

> Note: Replace `<message>` with your message

    git commit -m "<message>"

Push your commit to the remote repository (visible in GitHub):

    git push

Check the log to make sure your commit has been published:

    git log --oneline

Create a pull request and submit:

[View instructions](https://github.com/Code-the-Dream-School/common-instructions/blob/main/common/how-to-pull-request.md)

---

Created by [Code the Dream](https://www.codethedream.org)
