/**
 * Name:     Calvin Jun Zhong Lim
 * Date:     April 19, 2022
 * Section:  CSE 154 AB
 *
 * This is the JS to implement the UI for my to-do-list website. It generates
 * Add Task Cards when user clicks on the Add Task button
 * and Task Cards based on user inputs. It also updates the Task Cards based on
 * mouse click events from the user.
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  const ICON_PATH = "icon/";

  /**
   * This function runs when the DOM tree has finished constructing.
   * It creates an event listener on the Add Task button, and a future
   * event listener on #tasks-container (when the Task Cards are added).
   */
  function init() {
    let addTask = id("add-task");
    addTask.addEventListener("click", createTask);
    let tasksContainer = id("tasks-container");
    tasksContainer.addEventListener("click", updateTaskStatus);
  }

  /**
   * This function waits for user to click on the images: checked.png, unchecked.png,
   * and delete.png and updates the task card appropriately.
   * Clicking on checked.png means to revert the completed task back to incomplete.
   * Clicking on unchecked.png means that the task has just completed.
   * Clicking on delete.png removes the entire task card completely.
   * @param {object} event - an object based on Event
   */
  function updateTaskStatus(event) {
    let targetElement = event.target;
    let selector = "img";
    if (targetElement.localName === selector) {
      let card = targetElement.parentNode;
      if (targetElement.src.includes("delete.png")) {
        card.remove();
      } else if (targetElement.src.includes("unchecked.png")) {
        targetElement.src = ICON_PATH + "checked.png";
        targetElement.alt = "An unfilled circle with a tick mark inside.";
        card.classList.replace("task-incomplete", "task-complete");
      } else {
        targetElement.src = ICON_PATH + "unchecked.png";
        targetElement.alt = "An unfilled circle.";
        card.classList.replace("task-complete", "task-incomplete");
      }
    }
  }

  /**
   * This function runs when the user clicks on 'Add Task'.
   * It creates the Add Task Card, and adds task onto #tasks-container
   * when appropriate.
   */
  function createTask() {
    // create Add Task Card as a child under #tasks-container
    let tasksContainer = id("tasks-container");
    createAddTaskCard(tasksContainer);

    // As we add more tasks, we update each button with their appropriate callback functions.
    let cancelButtons = qsa(".add-task-card-cancel");
    for (let i = 0; i < cancelButtons.length; i++) {
      cancelButtons[i].addEventListener("click", removeAddTask);
    }

    let addTaskButtons = qsa(".add-task-card-add");
    for (let i = 0; i < addTaskButtons.length; i++) {
      addTaskButtons[i].addEventListener("click", addNewTask);
    }
  }

  /**
   * This function removes the Add Task Card when the cancel button is clicked by the user.
   * @param {object} event - an object based on Event
   */
  function removeAddTask(event) {
    let cancelButton = event.currentTarget;
    let addTaskCard = cancelButton.parentNode.parentNode;
    addTaskCard.remove();
  }

  /**
   * This function removes the Add Task Card, and adds a new Task Card under #tasks-container
   * when the add task button is clicked by the user.
   * @param {object} event - an object based on Event
   */
  function addNewTask(event) {
    let addTaskButton = event.currentTarget;
    let addTaskCard = addTaskButton.parentNode.parentNode;
    let textArea = addTaskButton.parentNode.previousElementSibling;
    let taskName = textArea.value;
    addTaskCard.remove();
    let tasksContainer = id("tasks-container");
    createNewTaskCard(tasksContainer, taskName);
  }

  /**
   * This function creates a new Task Card whenever a user clicks on the Add Task button
   * in the Add Task Card, provided that the textarea is not empty.
   * @param {object} parent - an object based on the element with #tasks-container
   * @param {string} taskName - a string containing the name of the task to be added
   */
  function createNewTaskCard(parent, taskName) {
    if (taskName !== "") {
      // card = <section class="task-card task-incomplete"> </section>
      let card = create("section");
      card.classList.add("task-card");
      card.classList.add("task-incomplete");

      // <section id="tasks-container"> card </section>
      parent.appendChild(card);

      // uncheckIcon = <img class="radio-button" src="icon/unchecked.png" alt="An unfilled circle.">
      let uncheckIcon = create("img");
      uncheckIcon.src = ICON_PATH + "unchecked.png";
      uncheckIcon.alt = "An unfilled circle.";
      uncheckIcon.classList.add("radio-button");

      // <section class="task-card task-incomplete"> uncheckIcon </section>
      card.appendChild(uncheckIcon);

      // task = <span>taskName</span>
      let task = create("span");
      task.textContent = taskName;

      // <section class="task-card task-incomplete"> uncheckIcon task </section>
      card.appendChild(task);

      // deleteIcon = <img class="delete-button" src="icon/delete.png" alt="A trashcan icon.">
      let deleteIcon = create("img");
      deleteIcon.src = ICON_PATH + "delete.png";
      deleteIcon.alt = "A trashcan icon.";
      deleteIcon.classList.add("delete-button");

      // <section class="task-card task-incomplete"> uncheckIcon task deleteIcon </section>
      card.appendChild(deleteIcon);
    }
  }

  /**
   * This function creates a new Add Task Card whenever the user clicks on Add Task button.
   * @param {object} parent - an object based on the element with #tasks-container
   */
  function createAddTaskCard(parent) {
    // create the section for the Add Task Card to be built upon
    let card = create("section");
    card.classList.add("add-task-card");

    // create textarea for user input
    let input = create("textarea");
    input.placeholder = "Task name goes here.";
    input.classList.add("input-text");
    card.appendChild(input);

    // create an area for buttons
    let options = create("div");
    options.classList.add("options-bar");
    card.appendChild(options);

    // create Cancel button
    let cancelButton = create("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("add-task-card-cancel");
    options.appendChild(cancelButton);

    // create Add Task button
    let addTaskButton = create("button");
    addTaskButton.textContent = "Add Task";
    addTaskButton.classList.add("add-task-card-add");
    options.appendChild(addTaskButton);

    // insert as first child
    parent.insertAdjacentElement("afterbegin", card);
  }

  /**
   * This is a helper function for getElementById.
   * @param {string} id - a string containing the id of an element, without #
   * @return {object} an object that contains the node of the element with the param id
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * This is a helper function for querySelectorAll.
   * @param {string} selector - a string containing the selector of the element/tag
   * @return {array} an array of objects that contains the node of the element with the param id
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * This is a helper function for createElement.
   * @param {string} tag - a string containing an element/tag
   * @return {object} an objects that contains the node of the element/tag
   */
  function create(tag) {
    return document.createElement(tag);
  }
})();