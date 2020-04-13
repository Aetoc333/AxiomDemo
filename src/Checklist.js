import React, { Component } from "react";
import shortid from "shortid";
import ChecklistItem from "./ChecklistItem";

export default class Checklist extends Component {
  state = {
    valueContent: "",
    productLink: "",
    active: false,
    currentId: 0
  };

  componentDidMount() {}

  componentDidUpdate() {}

  updateValueContent = content => {
    this.setState({ valueContent: content });
  };

  updateProductLink = link => {
    this.setState({ productLink: link });
  };

  setCurrentItem = id => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    this.setState({ currentId: id });
  };

  render() {
    return (
      <div className="phaseDataWrap">
        <div className="phaseCheckList">
          <h3>XI Solutions</h3>
          <div className="checklistItems">
            {this.props.solutions.map(solution => (
              <ChecklistItem
                title={solution.xiSolutionTitle}
                key={solution.id}
                id={solution.id}
                content={solution.content.html}
                linkUrl={solution.productLink}
                updateContent={this.updateValueContent}
                updateLink={this.updateProductLink}
                active={this.state.currentId == solution.id ? true : false}
                updateActiveState={this.setCurrentItem}
              />
            ))}
          </div>
        </div>
        <div className="phaseOutcomes">
          <h3>Value</h3>
          <div
            className="xiSolutionValueContent"
            dangerouslySetInnerHTML={{ __html: this.state.valueContent }}
          />
          {this.state.productLink && (
            <a
              className="productLink"
              target="_blank"
              href={this.state.productLink}
            >
              View Solution
            </a>
          )}
        </div>
      </div>
    );
  }
}

// <div className="checklistItems">
//   {this.props.tasks.map(task => (
//     <ChecklistItem
//     task={task}
//     key={task.id}
//     ></ChecklistItem>
//   ))}
//
// </div>
