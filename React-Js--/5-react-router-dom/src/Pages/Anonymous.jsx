import React from "react";
import Swal from "sweetalert2";

function Anonymous() {
  Swal.fire({
    title: "Not Found",
    text: "This Url is not found",
    icon: "question",
  });
}

export default Anonymous;
