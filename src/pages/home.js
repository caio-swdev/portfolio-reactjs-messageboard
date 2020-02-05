import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Message from "../components/message/Message";
import Profile from "../components/profile/Profile";
import MessageSkeleton from "../util/MessageSkeleton";

import { connect } from "react-redux";
import { getMessages } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {
    const { messages, loading } = this.props.data;
    let recentMessagesMarkup = !loading ? (
      messages.map(message => (
        <Message key={message.messageId} message={message} />
      ))
    ) : (
      <MessageSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentMessagesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getMessages: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getMessages })(home);
