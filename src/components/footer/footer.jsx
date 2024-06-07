import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <footer style={{ textAlign: "center" }} class="text-center">
			<p><em>Gimme Tasks! App</em></p>
			{/* <p><em><a href="https://github.com/yevheniiairapetian" target="_blank">Yevhenii Airapetian, 2024</a></em></p> */}
            
        
<div className="footer-links-container">
        
        <Link to='https://www.linkedin.com/in/yevheniiairapetian/' target="_blank" rel="noopener"><LinkedInIcon className="footer-links" /></Link>
        <Link to='https://github.com/yevheniiairapetian' target="_blank" rel="noopener"><GitHubIcon className="footer-links" /></Link>
        <Link to='https://yevheniiairapetian.com/' target="_blank" rel="noopener"><OpenInBrowserIcon className="footer-links" /></Link>
        
        </div>

        </footer>
    )
    
}