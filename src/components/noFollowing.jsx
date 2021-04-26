import React, { Component } from "react";

import axios from "axios";
import Cookies from "universal-cookie";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const cookies = new Cookies();

export default class noFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
    };
  }

  follow = (props) => {
    const newFollower = {
      userToFollow: this.props.id,
      userFollower: cookies.get("id"),
    };

    this.setState({
      follow: true,
    });
    console.log(newFollower);

    axios
      .post("http://localhost:1500/user/addFollower", newFollower)
      .then(() => {
        console.log("follow send");
        this.props.added();
      })
      .catch((err) => console.log("err"));
  };

  render() {
    let className = "user-card-tofollow";
    return (
      <React.Fragment>
        {this.state.follow == false && (
          <section>
            <div className="">
              <div className={className}>
                <img src={this.props.avatar} alt="" />
                <h5>{this.props.userName}</h5>
                <p>{this.props.followers} seguidores</p>
                <button className="BtnNotFollow" onClick={this.follow}>
                  Seguir
                </button>
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}
