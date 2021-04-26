import axios from "axios";
import React, { Component } from "react";
import background from "../assets/backgroundLogin.jpg";
import md5 from "md5";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class signUp extends Component {
  registerUser = async (e) => {
    e.preventDefault();

    const { username, password, repeatpassword } = e.target.elements;
    if (password.value == repeatpassword.value) {
      const newUser = {
        username: username.value,
        password: md5(password.value),
      };

      /* User exits */
      const userExist = await axios.post(
        "http://localhost:1500/user/searchUserByName",
        newUser
      );

      console.log(userExist.data);
      if (userExist.data.length === 0) {
        console.log("added");
        axios
          .post("http://localhost:1500/user/signUp", newUser)
          .then(() => {
            const newFollower = {
              userToFollow: cookies.get("id"),
              userFollower: cookies.get("id"),
            };

            axios
              .post("http://localhost:1500/user/addFollower", newFollower)
              .then(() => {
                window.location.href = "/signIn";
              });
          })
          .catch((err) => console.log(err));
      } else {
        alert("user exist");
      }
    } else {
      alert("passwords not match");
    }
  };

  render() {
    return (
      <div className="container-sign">
        <div className="logForm">
          <form onSubmit={this.registerUser} method="post">
            <h3>Registrarse</h3>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              autoComplete="off"
              id=""
              required
            />{" "}
            <br />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              autoComplete="off"
              id=""
              required
            />{" "}
            <br />
            <input
              type="password"
              name="repeatpassword"
              placeholder="Repetir contraseña"
              autoComplete="off"
              id=""
              required
            />{" "}
            <br />
            <button type="submit">Entrar</button> <br />
            <span className="alreadyHaveAccount">
              Ya tienes cuenta? <a href="/signIn">Inicia sesion</a>
            </span>
          </form>
        </div>
        <div className="formImage">
          <div className="">
            <h1>
              feno<span>book</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
