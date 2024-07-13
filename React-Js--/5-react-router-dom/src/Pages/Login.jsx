import React from "react";

function Login({ isUserLogin, setIsUserLogin }) {
  return (
    <div>
      {/* <h2>Login</h2> */}
      <button
        style={{
          backgroundColor: "Green",
          color: "#fff",
          borderRadius: "100px",
          padding: "20px 30px",
          border: "none",
          margin: "260px 750px",
        }}
        onClick={() => {
          setIsUserLogin(!isUserLogin);
        }}
      >
        LogIn
      </button>
    </div>
  );
}

export default Login;
