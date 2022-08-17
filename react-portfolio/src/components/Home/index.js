import Menubar from '../Menubar';
import BottomLinks from '../BottomLinks';
import pathing from '../../assets/images/pathing.gif'
import { NavLink } from 'react-router-dom';
import './index.scss';
const Home = () => {
    return (
        <div className="home-page">
            <Menubar />
            <div>
                <h1>Hi, I'm Cameron<br></br>
                </h1>
                <h2>I am a Computer Programming and Analysis Graduate from Seneca College</h2>
                <h3>Projects:</h3>
                <nav className = "projects">
                    <NavLink exact = "true" activeclassname="active" to='/pathing'>
                        <h4>2D Pathing Visualizer</h4>
                        <img src={pathing} width="90%" height="90%" alt="2D pathing Visualizer"></img>
                    </NavLink>
                </nav>
            </div>
            <BottomLinks />
        </div>

    );
};

export default Home;