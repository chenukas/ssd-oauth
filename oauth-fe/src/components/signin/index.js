import React from "react";
import "./styles.css";
import signin from '../../images/signin.svg';

const Signin = () => {
  return (
    <div classname="container">
      <div className="row">
        <div className="col-8" style={{ marginTop: '6rem'}}>
            <div className="sign-topic">
                All your Photos
                <br/>
                in one place.
            </div>
            <div>
            <img src={signin} className="svg-icon" alt="signin" />
          </div>
        </div>
        <div className="col-4" style={{ marginTop: '10rem'}}>
          <div class="card-container1" style={{ width: "18rem" }}>
            <div className="fw-bold fs-4" style={{ textAlign: "left" }}>
              Welcome!
              <div className="fs-5 fw-normal">
                Login to your account or register with google
              </div>
            </div>
            <br/>
            <a
              class="btn btn-outline-dark"
              href="/users/googleauth"
              role="button"
              style={{ textTransform: "none" }}
            >
              <img
                width="20px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Signin with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
