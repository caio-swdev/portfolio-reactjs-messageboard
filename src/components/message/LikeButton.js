import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeMessage, unlikeMessage } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedMessage = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.messageId === this.props.messageId
      )
    )
      return true;
    else return false;
  };
  likeMessage = () => {
    this.props.likeMessage(this.props.messageId);
  };
  unlikeMessage = () => {
    this.props.unlikeMessage(this.props.messageId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedMessage() ? (
      <MyButton tip="Undo like" onClick={this.unlikeMessage}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeMessage}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired,
  likeMessage: PropTypes.func.isRequired,
  unlikeMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeMessage,
  unlikeMessage
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
