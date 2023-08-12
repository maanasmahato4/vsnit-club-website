import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import nav_logo from '../../../images/nav_logo.jpg';
function ForLargeScreen() {
    return (<Navbar className='shadow-sm bg-white sticky-top' expand="lg">
        <Container>
            <Navbar.Brand><img src={nav_logo} alt="logo" className='home-icon' /></Navbar.Brand>
            <div>
                <Nav className="d-flex flex-row ">
                    <Nav.Item><Link className='nav-link bg-white' to="/"><span className='nav-font'>Home</span></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link bg-white' to="/ourgroup"><span className='nav-font'>Team</span></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link bg-white' to="/events"><span className='nav-font'>Events</span></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link bg-white' to="/workshops"><span className='nav-font'>Youtube</span></Link></Nav.Item>
                    <Nav.Item><Link className='nav-link bg-whitet' to="/winners"><span className='nav-font'>Hall of Winners</span></Link></Nav.Item>
                </Nav>
            </div>
        </Container>
    </Navbar>
    )
}

export default ForLargeScreen;