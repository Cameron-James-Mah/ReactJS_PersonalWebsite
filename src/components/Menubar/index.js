import './index.scss'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser,  faEnvelope} from '@fortawesome/free-solid-svg-icons'


const Menubar = () => (
    <div className = 'nav-bar'>
        <nav>
            <NavLink exact = "true" activeclassname="active" className = "home-link" to='/'>
                <FontAwesomeIcon icon={faHome} color = "#4d4d4e"/>
            </NavLink>
            <NavLink exact = "true" activeclassname="active" className="about-link"to='/about'>
                <FontAwesomeIcon icon={faUser} color = "#4d4d4e"/>
            </NavLink>
            <NavLink exact = "true" activeclassname="active" className="contact-link"to='/contact'>
                <FontAwesomeIcon icon={faEnvelope} color = "#4d4d4e"/>
            </NavLink>
        </nav>
        
    </div>
)

export default Menubar;