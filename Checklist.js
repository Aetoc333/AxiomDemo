import React, { Component } from "react";
import shortid from "shortid";
import ChecklistItem from "./ChecklistItem";

export default class Checklist extends Component {
  state = {
    tasks: [],
    count: 0
  };

  componentDidMount() {
    this.addDefaultTask();
  }

  componentDidUpdate() {}

  addDefaultTask = () => {
    this.props.tasks.map(task =>
      this.addTask({
        id: shortid.generate(),
        task: task,
        complete: false,
        editable: false
      })
    );
  };

  addTask = task => {
    this.setState(state => ({
      tasks: [...state.tasks, task]
    }));
  };

  /* createNewTask = () => {
    this.addTask({
      id: shortid.generate(),
      task: "Edit New Task",
      complete: false,
      editable: true
    });
    console.log(this.state.tasks);
  };
*/
  toggleComplete = id => {
    this.setState(state => ({
      tasks: state.tasks.map(task => {
        if (task.id === id) {
          // suppose to update
          return {
            ...task,
            complete: !task.complete
          };
        } else {
          return task;
        }
      })
    }));
  };

  toggleEditable = id => {
    this.setState(state => ({
      tasks: state.tasks.map(task => {
        if (task.id === id) {
          // suppose to update
          return {
            ...task,
            editable: !task.editable
          };
        } else {
          return task;
        }
      })
    }));
  };

  updateTask = (id, newtask) => {
    this.setState(state => ({
      tasks: state.tasks.map(task => {
        if (task.id === id) {
          // suppose to update
          return {
            ...task,
            task: newtask
          };
        } else {
          return task;
        }
      })
    }));
  };

  handleDeleteTask = id => {
    this.setState(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  };

  render() {
    return (
      <div className="phaseCheckList">
        <h3>XI Solutions</h3>
        <div className="checklistItems">
          {this.state.tasks.map(task => (
            <ChecklistItem
              task={task}
              key={task.id}
              editable={task.editable}
              toggleComplete={() => this.toggleComplete(task.id)}
              toggleEditable={() => this.toggleEditable(task.id)}
              updateTask={newtask => this.updateTask(task.id, newtask)}
              onDelete={() => this.handleDeleteTask(task.id)}
            />
          ))}
        </div>
        <div className="taskProgressWrap">
          <p>{this.props.phase} Progress</p>

          {this.state.tasks.map((task, index) => (
            <div
              className="taskProgressItem"
              status={
                index < this.state.tasks.filter(task => task.complete).length
                  ? "done"
                  : "undone"
              }
              key={task.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
