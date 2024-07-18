import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
// import "./welcome.css";
// import TodoSVG from '../assets/todo-svg.svg'
import $ from 'jquery';

export const WelcomeView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) =>
        $('#exampleModal4').fadeIn()
      );
  };

  const handleRegister = () => {
    

    if (registerInformation.email !== registerInformation.confirmEmail) {
      $('#exampleModal2').fadeIn();
      return;
    } else if (registerInformation.password !== registerInformation.confirmPassword) {
      $('#exampleModal3').fadeIn();
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        // alert(err.message));

        $('#exampleModal6').fadeIn();
        return;
      });
  };

  return (
    <>
      <div className="welcome">
        {/* <img src={TodoSVG} className="todo-svg" /> */}
        <h1>Gimme Task App</h1>
        <div className="login-register-container">
          {isRegistering ? (
            <>
              <form className="login-register-container" onSubmit={handleRegister}>
                <input
                  required


                  className="email-input"
                  type="email"

                  placeholder="Email"
                  value={registerInformation.email}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      email: e.target.value
                    })
                  }
                />
                <input
                  className="email-input"
                  type="email"
                  required
                  placeholder="Confirm Email"
                  value={registerInformation.confirmEmail}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmEmail: e.target.value
                    })
                  }
                />
                <input
                  className="password-input"
                  type="password"
                  required
                  minLength={8}
                  maxLength={16}
                  placeholder="Password"
                  value={registerInformation.password}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      password: e.target.value
                    })
                  }
                />
                <input
                  className="password-input"
                  type="password"
                  required
                  minLength={8}
                  maxLength={16}
                  placeholder="Confirm Password"
                  value={registerInformation.confirmPassword}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmPassword: e.target.value
                    })
                  }
                />
                <button className="sign-in-register-button" onClick={handleRegister}>Sign me up!</button>
                <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
              </form>
            </>
          ) : (
            <>
              <input
                className="email-input"
                type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
              <input
                className="password-input"
                type="password"
                onChange={handlePasswordChange}
                value={password}
                placeholder="Password"
              />
              <button className="sign-in-register-button" onClick={handleSignIn}>
                Log me in!
              </button>
              <button
                className="create-account-button"
                onClick={() => setIsRegistering(true)}
              >
                Register for free
              </button>



            </>
          )}
        </div>
      </div>
      <Footer />


      <div class="modal" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="dialog-paragraph">Email addresses must <em className='dialog-instructions'>be identical
              </em></p>
              <button onClick={() => { $('#exampleModal2').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div class="modal-footer">

            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="dialog-paragraph">Passwords must <em className='dialog-instructions'>be identical
              </em></p>
              <button onClick={() => { $('#exampleModal3').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div class="modal-footer">

            </div>
          </div>
        </div>




      </div>

      <div class="modal" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="dialog-paragraph">Login failed. Please <em className='dialog-instructions'>check your credentials, network connection or try again later
              </em></p>
              <button onClick={() => { $('#exampleModal4').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div class="modal-footer">

            </div>
          </div>
        </div>




      </div>


      <div class="modal" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="dialog-paragraph">Signup failed. Please <em className='dialog-instructions'>check your credentials, network connection or try again later
              </em></p>
              <button onClick={() => { $('#exampleModal6').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div class="modal-footer">

            </div>
          </div>
        </div>




      </div>

    </>
  );
}