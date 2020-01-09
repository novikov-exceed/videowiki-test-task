import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { createID } from "../../../../services/helpers";
import styles from "./PostCreator.module.css"
import { connect } from "react-redux";
import { createPost } from "../../../redux/actions/posts/create";

// Component for creating a new post
class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: `# Intro\nGo ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You can type the Markdown syntax, use the toolbar, or use shortcuts like cmd-b or ctrl-b.\n## Lists\nUnordered lists can be started using the toolbar or by typing *  , -  , or +  . Ordered lists can be started by typing 1. .\n\n#### Unordered\n* Lists are a piece of cake\n* They even auto continue as you type\n* A double enter will end them\n* Tabs and shift-tabs work too\n\n#### Ordered\n1. Numbered lists...\n2. ...work too!`,
    };
  }
  
  // state update
  handleChange = value => {
    this.setState({ text: value, });
  };
  
  // saving a post to the DB
  submitPost = () => {
    this.props.createPost({
      text: this.state.text,
    }).then(res => {
      if (res.success) {
        this.props.history.push(`/`);
      }
    }).catch(error => {
      console.log("err", error);
    });
  };
  
  // render forms for creating and editing a post
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.submit}>
          <button className={styles.button} onClick={this.submitPost}>
            Publish
          </button>
        </div>
        <SimpleMDE
          className={styles.content}
          value={this.state.text}
          onChange={this.handleChange}
          options={{ status: false }}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { createPost }
)(PostCreator);