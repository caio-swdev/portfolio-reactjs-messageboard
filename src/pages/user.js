import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Message from "../components/message/Message";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import MessageSkeleton from "../util/MessageSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    messageIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const messageId = this.props.match.params.messageId;

    if (messageId) this.setState({ messageIdParam: messageId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { messages, loading } = this.props.data;
    const { messageIdParam } = this.state;

    const messagesMarkup = loading ? (
      <MessageSkeleton />
    ) : messages === null ? (
      <p>No messages from this user</p>
    ) : !messageIdParam ? (
      messages.map(message => (
        <Message key={message.messageId} message={message} />
      ))
    ) : (
      messages.map(message => {
        if (message.messageId !== messageIdParam)
          return <Message key={message.messageId} message={message} />;
        else
          return (
            <Message key={message.messageId} message={message} openDialog />
          );
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {messagesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
