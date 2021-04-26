import React, { Component } from "react";
import NavBar from "../../common/navBar";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/boy-cartoon-avatar.png";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FloatingEdit from "../../common/floatingEdit";
import "./profile.css";

class Profile extends Component {
  state = {
    mediaList: [],
    username: "vickyverma4u10",
    floatingClass: "float-off",
  };

  getData = async (accessToken) => {
    const response = await axios.get(
      "https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
        accessToken
    );

    let mediaList = response["data"]["data"];
    this.setState({ mediaList });
  };

  toggleFloat = () => {
    this.props.history.push("/");
  };

  handleSearch = () => {
    return;
  };

  componentDidMount() {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken === "") {
      this.props.history.push("/");
    }
    this.getData(accessToken);
  }

  openFloat = () => {
    if (this.state.floatingClass === "float-off") {
      this.setState({ floatingClass: "float-on" });
    } else {
      this.setState({ floatingClass: "float-off" });
    }
  };

  handleUsernameUpdate = (username) => {
    this.setState({ username });
    this.setState({ floatingClass: "float-off" });
  };

  render() {
    return (
      <div>
        <NavBar
          avatarIcon
          onSearch={this.handleSearch}
          toggleFloat={this.toggleFloat}
        />
        <div className="main">
          <Avatar
            src={logo}
            className="main-avatar"
            style={{ width: "80px", height: "80px" }}
          />
          <div className="sub-main">
            <h3>vickyverma4u10</h3>
            <div className="sub2-main">
              <p>Posts: {this.state.mediaList.length}&nbsp;&nbsp;</p>
              <p>Follows: 4&nbsp;&nbsp;</p>
              <p>Followed by: 6&nbsp;&nbsp;</p>
            </div>
            <div style={{ display: "flex" }}>
              <p>{this.state.username}</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.openFloat}
              >
                <EditRoundedIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="floatContainer">
          <div className={this.state.floatingClass}>
            <FloatingEdit onUpdate={this.handleUsernameUpdate}></FloatingEdit>
          </div>
        </div>
        <div style={{ padding: 80 }}>
          <Grid container className="container" spacing={2}>
            {this.state.mediaList.map((item) => (
              <Grid key={item.id} item md={4} className="gridItem">
                <Card raised>
                  <CardMedia
                    image={item.media_url}
                    className="media"
                  ></CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Profile;
