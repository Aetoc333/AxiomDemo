import React, { Component } from "react";
import ContentEditable from "react-contenteditable";

export default class ChecklistItem extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      editing: false,
      checkListItem: this.props.label
    };
  }

  componentDidMount() {
    if (this.props.task.editable) {
      this.contentEditable.current.focus();
      this.focusTextInput();
    }
  }

  componentDidUpdate() {
    this.contentEditable.current.focus();
  }

  updateChecklistContent = evt => {
    // this.setState({checkListItem: evt.target.value});
    this.props.updateTask(evt.target.value);
  };

  setEditable = () => {
    this.focusTextInput();
    this.props.toggleEditable();

    // this.setState({
    //   editing: !this.state.editing
    // })
  };

  focusTextInput = () => {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(
      this.contentEditable.current.firstChild,
      this.contentEditable.current.firstChild.length
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    this.contentEditable.current.focus();
  };

  updateChecklistImem = () => {
    this.setState({
      checkListItem: !this.state.on
    });
  };

  render() {
    return (
      <div
        className="checklistItem swiper-no-swiping"
        status={this.props.task.complete ? "done" : "undone"}
      >
        <div className="checkbox" onClick={this.props.toggleComplete} />
        <ContentEditable
          className="checkListItemLabel"
          innerRef={this.contentEditable}
          html={this.props.task.task} // innerHTML of the editable div
          disabled={!this.props.task.editable} // use true to disable editing
          onChange={this.updateChecklistContent} // handle innerHTML change
          tagName="p"
        />
        <div className="checkListItemEditables">
          <div
            className="checkListItemEdit"
            status={this.props.task.editable ? "save" : ""}
            onClick={this.setEditable}
          />
          <div className="checkListItemDelete" onClick={this.props.onDelete} />
        </div>
      </div>
    );
  }
}
