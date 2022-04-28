import { BASE_URL } from "../App";

export class Authentication {
  constructor() {
    this.access_token = localStorage.getItem("access-token");
    this.refresh_token = localStorage.getItem("refresh-token");
  }
  async verifyOrUpdateToken() {
    // returns a promise
    if (this.refresh_token == null) {
      // context.setState({ redirect: "/login" });
      return {
        redirect: "/login",
        token: null,
      };
    } else {
      let verify = await fetch(BASE_URL + "api/token/verify/", {
        method: "POST",
        body: JSON.stringify({ token: this.access_token }),
        headers: {
          "Content-type": "Application/json",
        },
      });
      if (verify.status == 200) {
        console.log("access verified success");
        // context.setState({ token: this.access_token });
        return {
          redirect: null,
          token: this.access_token,
        };
      }
      // if access token is expired, use refresh token to get new access token
      let refresh = await fetch(BASE_URL + "api/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: this.refresh_token }),
        headers: {
          "Content-type": "Application/json",
        },
      });
      let refresh_data = await refresh.json();
      localStorage.setItem("access-token", refresh_data.access);
      // context.setState({ token: refresh_data.access });
      return {
        redirect: null,
        token: refresh_data.access,
      };
    }
  }
}
