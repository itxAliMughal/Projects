import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Back() {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: "Not Found",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotFound(true);
      }
    });
  }, []);

  return (
    <div className="App">
      {notFound && (
        <h2>
          <Link to="/">This page is not found back to home</Link>
        </h2>
      )}
    </div>
  );
}

export default Back;
