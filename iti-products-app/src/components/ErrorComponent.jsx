import { useRouter } from "next/router";
import React from "react";

const ErrorComponent = () => {
  const router = useRouter();

  const goBack = () => {
    router.replace("/");
  };

  return (
    <div class="text-center mt-5">
      <h1 class="alert alert-danger">404 - Page Not Found</h1>
      <p>Oops! Something went wrong.</p>
      <button class="btn btn-dark" onClick={goBack}>
        Back to Home
      </button>
    </div>
  );
};

export default ErrorComponent;
