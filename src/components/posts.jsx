import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import Post from "./smallComponents/post";
import FormPoster from "./formPoster";
import Alert from "./smallComponents/alert";
import NoFollowing from "./noFollowing";
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";

const cookies = new Cookies();

export default class posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      images: [
        "https://image.flaticon.com/icons/png/128/2922/2922510.png",
        "https://image.flaticon.com/icons/png/128/2922/2922515.png",
        "https://image.flaticon.com/icons/png/128/2922/2922565.png",
        "https://image.flaticon.com/icons/png/128/2922/2922656.png",
        "https://image.flaticon.com/icons/png/128/2922/2922715.png",
        "https://image.flaticon.com/icons/png/128/2922/2922546.png",
        "https://image.flaticon.com/icons/png/128/2922/2922532.png",
        "https://image.flaticon.com/icons/png/128/2922/2922522.png",
        "https://image.flaticon.com/icons/png/128/2922/2922575.png",
        "https://image.flaticon.com/icons/png/128/2922/2922624.png",
        "https://image.flaticon.com/icons/png/128/2922/2922671.png",
      ],
      avatarOfPost: "",
      haveAvatar: false,
      user: [],
      userFollowing: [],
      peopleToFollow: [],
    };
  }

  componentDidMount() {
    this.userData();
    this.getPeopleToFollow();
  }

  userData = () => {
    const userToSearch = {
      id: cookies.get("id"),
    };

    axios
      .post("http://localhost:1500/user/searchUser", userToSearch)
      .then((res) => {
        this.setState({
          user: res.data,
          userFollowing: res.data.following,
        });
        this.getPosts();
      });
  };

  getPosts = () => {
    axios
      .post("http://localhost:1500/dashboard", this.state.userFollowing)
      .then((res) => {
        const postsApi = res.data;
        this.setState({
          posts: postsApi,
        });
      })
      .catch((err) => console.log(err));

    const prueba = cookies.get("avatar");

    if (prueba == "undefined") {
      this.setState({
        haveAvatar: false,
      });
    } else {
      this.setState({
        haveAvatar: true,
      });
    }
  };

  renderPosts = () => {
    return this.state.posts.map((post) => {
      let datePost = post.createdAt.slice(0, 10);

      const usersLikes = post.likesUsers;
      let likeOrDont = usersLikes.includes(cookies.get("username"));

      return (
        <Post
          type="usersLikes"
          user={post.user}
          body={post.body}
          avatar={post.avatarUser - 1}
          idPost={post._id}
          date={datePost}
          likes={post.likes}
          liked={likeOrDont}
          usersLikes={usersLikes}
        />
      );
    });
  };

  addPost = (e) => {
    e.preventDefault();
    const newPost = {
      body: e.target.elements.body.value,
      user: cookies.get("username"),
      avatarUser: cookies.get("avatar"),
    };
    console.log(newPost);
    axios
      .post("http://localhost:1500/dashboard/add", newPost)
      .then((window.location.href = "/dashboard/posts"))
      .catch((err) => console.log(err));
  };

  getPeopleToFollow = () => {
    const user = {
      id: cookies.get("id"),
    };

    if (this.state.peopleToFollow.length == 0) {
      axios
        .post("http://localhost:1500/user/NotFollowing", user)
        .then((res) => {
          this.setState({
            peopleToFollow: res.data,
          });
        });
    }
  };

  addedFollower = () => {
    this.userData();
  };

  render() {
    return (
      <div className="containerPosts ">
        <FormPoster addPost={this.addPost} />

        {/* Advise of select avatar */}
        {this.state.haveAvatar == false && (
          <div className="">
            <Alert />
          </div>
        )}

        {this.state.userFollowing.length >= 1 && (
          <h3 className="headerwelcome">
            <div className="">
              Bienvenido, <strong>{cookies.get("username")}</strong>
            </div>
            <Link to="/dashboard/myUser">
              <button className="buttonMyProfile">Ver mi perfil</button>
            </Link>
          </h3>
        )}

        {this.renderPosts()}

        {this.state.userFollowing.length >= 1 && (
          <React.Fragment>
            <h4 className="yetNotFollowing">
              ¡Sigue a para ver sus publicaciones!
            </h4>
            <div className="container-user-card">
              <NoFollowing
                avatar={this.state.images[3]}
                userName="Novak"
                followers="2"
                id="607421931233fd3e643600a4"
                added={this.addedFollower}
              />
              <NoFollowing
                avatar={this.state.images[1]}
                userName="Martín"
                followers="1"
                id="607421ad1233fd3e643600a5"
                added={this.addedFollower}
              />
              <NoFollowing
                avatar={this.state.images[2]}
                userName="Titan"
                followers="4"
                id="607421b71233fd3e643600a6"
                added={this.addedFollower}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
