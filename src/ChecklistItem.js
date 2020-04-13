import React, { Component } from "react";
// import ContentEditable from 'react-contenteditable'

export default class ChecklistItem extends Component {
  constructor(props) {
    super(props);
    // this.contentEditable = React.createRef();
    // this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      active: false
    };
  }

  // toggleClass() {
  //     const currentState = this.state.active;
  //     this.setState({ active: !currentState });
  // };

  // componentDidMount() {
  //   if(this.props.task.editable) {
  //     this.contentEditable.current.focus();
  //     this.focusTextInput()
  //   }
  // }

  // componentDidUpdate() {
  //   this.contentEditable.current.focus();
  // }

  // updateChecklistContent = evt => {
  //   // this.setState({checkListItem: evt.target.value});
  //   this.props.updateTask( evt.target.value);
  // };

  // setEditable = () => {
  //   this.focusTextInput()
  //   this.props.toggleEditable()
  //
  //   // this.setState({
  //   //   editing: !this.state.editing
  //   // })
  //
  // }

  // focusTextInput = () => {
  //   var range = document.createRange();
  //   var sel = window.getSelection();
  //   range.setStart(this.contentEditable.current.firstChild, this.contentEditable.current.firstChild.length);
  //   range.collapse(true);
  //   sel.removeAllRanges();
  //   sel.addRange(range);
  //   this.contentEditable.current.focus()
  // }

  updateAllContent = id => {
    this.props.updateContent(this.props.content);
    this.props.updateLink(this.props.linkUrl);
    this.props.updateActiveState(this.props.id);
    console.log(this.props.id);
    // this.toggleClass();
  };

  render() {
    return (
      <div
        className="checklistItem swiper-no-swiping"
        data-state={this.props.active ? "active" : null}
        onClick={() => this.updateAllContent()}
      >
        <p dangerouslySetInnerHTML={{ __html: this.props.title }} />
        <div className="checklistItemArrow" />
      </div>
    );
  }
}
