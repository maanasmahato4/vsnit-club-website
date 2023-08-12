import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { BsFillHouseFill, BsCalendarEvent, BsPeopleFill, BsYoutube, BsAwardFill } from 'react-icons/bs';


function ForSmallScreen() {
    return (
        <div className='sticky-top' >
            <Navbar className='shadow-sm bg-white' variant="danger">
                <Nav className="d-flex flex-row justify-content-between mx-auto">
                    <Nav.Item><Link className='nav-link mx-sm-5 bg-white' to="/"><BsFillHouseFill size={24} /></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-sm-5 bg-white' to="/ourgroup"><BsPeopleFill size={24} /></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-sm-5 bg-white' to="/events"><BsCalendarEvent size={24} /></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-sm-5 bg-white' to="/workshops"><BsYoutube size={24} /></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-sm-5 bg-white' to="/winners"><BsAwardFill size={24} /></Link></Nav.Item>
                </Nav>
            </Navbar>
        </div>
    )
}

export default ForSmallScreen;