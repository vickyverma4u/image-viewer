import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/boy-cartoon-avatar.png";
import "./home.css";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Home extends Component {
  state = { mediaList: [] };

  getData = async (accessToken) => {
    const response = await axios.get(
      "https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
        accessToken
    );

    let mediaList = response["data"]["data"];

    for (let item of mediaList) {
      item["liked"] = false;
    }

    this.setState({ mediaList });
  };

  dateToString = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate =
      date.getDate().toString() +
      "/" +
      date.getMonth().toString() +
      "/" +
      date.getFullYear().toString() +
      " " +
      date.getHours().toString() +
      ":" +
      date.getMinutes().toString() +
      ":" +
      date.getSeconds().toString();

    return formattedDate;
  };

  handleLike = (item) => {
    const tempState = { ...this.state };
    for (let i in tempState["mediaList"]) {
      if (tempState["mediaList"][i].id === item.id) {
        tempState["mediaList"][i].liked = !item.liked;
      }
    }
    this.setState({ tempState });
  };

  componentDidMount() {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken === "") {
      this.props.history.push("/");
    }
    this.getData(accessToken);
  }

  render() {
    return (
      <Grid container className="container" spacing={8}>
        {this.state.mediaList.map((item) => (
          <Grid key={item.id} item md={5}>
            <Card raised>
              <CardHeader
                avatar={<Avatar src={logo} className="avatar"></Avatar>}
                title={item.caption}
                subheader={this.dateToString(item.timestamp)}
              ></CardHeader>
              <CardMedia image={item.media_url} className="media"></CardMedia>
              <CardContent>{item.caption}</CardContent>
              <CardActions>
                <IconButton onClick={() => this.handleLike(item)}>
                  {item.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  <p>&nbsp;&nbsp;{item.liked ? 1 : 0} likes</p>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Home;
