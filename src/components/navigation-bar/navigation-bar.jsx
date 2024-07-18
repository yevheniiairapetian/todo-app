import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/App.css';
import { useState, useEffect } from "react";
import navigationCSS from './css/navigation.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth, db } from "./../../firebase.js";
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import { signOut, onAuthStateChanged } from "firebase/auth";
import css from "./../../../src/index.css";

export const NavigationBar = () => {
	
	const handleSignOut = () => {
		signOut(auth)
		  .then(() => {
			navigate("/");
		  })
		  .catch((err) => {
			$('#exampleModal5').fadeIn();
		  });
	  };
	
	  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
	  

	  
	return (
		<>
		<Navbar expanded={expanded} expand="lg" className="page-header bg-body-tertiary">
		<Container fluid>
		  <Navbar.Brand onClick={() => setExpanded(false)} as={Link} to="/">
		  <h4 className="homepage-h1" style={{ color: "#529fcc",  }}> Gimme Task App</h4>

			</Navbar.Brand>
		  <Navbar.Toggle onClick={() => {setExpanded(!expanded)}} aria-controls={`offcanvasNavbar-expand-lg`} />
		  <Navbar.Offcanvas
			id={`offcanvasNavbar-expand-lg`}
			aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
			placement="end"
		  >
			<Offcanvas.Header onClick={() => setExpanded(false)} closeButton>
			  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
				Menu
			  </Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
			  <Nav className="offcanv justify-content-end flex-grow-1 pe-3">
				<Nav.Link onClick={() => setExpanded(false)} as={Link} to='/'>Dashboard</Nav.Link>
				
<Nav.Link>
<FontAwesomeIcon title="Log out" className="" icon={faRightFromBracket} onClick={handleSignOut} style={{color: "#000000"}} /> 

</Nav.Link>
				

			  </Nav>
			  

			</Offcanvas.Body>

		  </Navbar.Offcanvas>
		</Container>
	  </Navbar>
	

      <div className="modal" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fs-5" id="exampleModalLabel"></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p style={{color:"whitesmoke"}} className="dialog-paragraph">Sign out failed. Please <em className='dialog-instructions'>check your network connection ot try again later
                </em> button.</p>
                <button onClick={() => { $('#exampleModal5').fadeOut() }} type="button" className="modal-button" data-bs-dismiss="modal">Alrighty!</button>
            </div>
            <div className="modal-footer">
              
            </div>
          </div>
        </div>
      </div>

</>

		
	);
};
