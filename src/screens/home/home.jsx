import React, { Component, Fragment } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/boy-cartoon-avatar.png";
import NavBar from "../../common/navBar";
import "./home.css";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FloatingMenu from "../../common/floatingMenu";

class Home extends Component {
  state = {
    mediaList: [],
    searchTerm: "",
    comment: "",
    floatingMenu: "float-off",
  };

  getData = async (accessToken) => {
    const response = await axios.get(
      "https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
        accessToken
    );

    let mediaList = response["data"]["data"];

    for (let item of mediaList) {
      item["liked"] = false;
      item["shown"] = true;
      item["comment"] = [];
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

  handleSearch = (e) => {
    const tempState = { ...this.state };
    tempState.searchTerm = e.target.value.toLowerCase();

    if (tempState.searchTerm === "") {
      for (let i in tempState["mediaList"]) {
        tempState["mediaList"][i].shown = true;
      }
      this.setState(tempState);
      return;
    }

    for (let i in tempState["mediaList"]) {
      if (
        tempState["mediaList"][i]["caption"]
          .toLowerCase()
          .indexOf(tempState.searchTerm) !== -1
      ) {
        tempState["mediaList"][i].shown = true;
      } else {
        tempState["mediaList"][i].shown = false;
      }
    }
    this.setState(tempState);
  };

  handleCommentChange = (e) => {
    const comment = e.target.value;
    this.setState({ comment });
    console.log(comment);
  };

  addCommentHandler = (id) => {
    const tempState = { ...this.state };
    for (let i in tempState["mediaList"]) {
      if (tempState["mediaList"][i]["id"] === id) {
        tempState["mediaList"][i].comment.push(this.state.comment);
      }
    }

    this.setState(tempState);
  };

  toggleFloat = () => {
    let float = this.state.floatingMenu;
    if (float === "float-off") {
      float = "float-on";
    } else {
      float = "float-off";
    }
    console.log(float);
    this.setState({ floatingMenu: float });
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
      <Fragment>
        <NavBar
          searchBar
          avatarIcon
          onSearch={this.handleSearch}
          toggleFloat={this.toggleFloat}
        />
        <div className={this.state.floatingMenu}>
          <FloatingMenu></FloatingMenu>
        </div>

        <div style={{ padding: 40 }}>
          <Grid container className="container" spacing={10}>
            {this.state.mediaList.map((item) =>
              item.shown ? (
                <Grid key={item.id} item md={5} className="gridItem">
                  <Card raised>
                    <CardHeader
                      avatar={<Avatar src={logo} className="avatar"></Avatar>}
                      title={item.username}
                      subheader={this.dateToString(item.timestamp)}
                    ></CardHeader>
                    <CardMedia
                      image={item.media_url}
                      className="media"
                    ></CardMedia>
                    <CardContent>
                      <p>{item.caption}</p>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => this.handleLike(item)}>
                        {item.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        <p>&nbsp;&nbsp;{item.liked ? 1 : 0} likes</p>
                      </IconButton>
                    </CardActions>
                    <div className="comment">
                      {item.comment.map((comment) => (
                        <p>
                          <strong>vickyverma4u: </strong>
                          {comment}
                        </p>
                      ))}
                    </div>
                    <div className="add-comment">
                      <FormControl margin="normal" style={{ width: "80%" }}>
                        <InputLabel htmlFor="comment">Add a comment</InputLabel>
                        <Input
                          id="comment"
                          name="comment"
                          type="text"
                          onChange={this.handleCommentChange}
                        ></Input>
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.addCommentHandler(item.id)}
                      >
                        ADD
                      </Button>
                    </div>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Home;
