import { useContext } from 'react';
import WinnersA from './adminComp/pages/Winners';
import TeamA from './adminComp/pages/Team';
import YoutubeA from './adminComp/pages/Youtube';
import EventsA from './adminComp/pages/Events';
import Messages from './adminComp/pages/Messages';
import { Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TeamContextProvider } from '../context/Team.context';
import { WinnersContextProvider } from '../context/winners.context';
import { EventsContextProvider } from '../context/Events.context';
import { YoutubeContextProvider } from '../context/youtube.context';
import { AdminContext } from '../context/admin.context';
import { auth } from '../firebase/firebase.config';
import { signOut } from 'firebase/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';



function Admin() {
    const navigate = useNavigate();
    const { setAdminState } = useContext(AdminContext);

    const LogOut = async () => {
        await signOut(auth).then(() => console.log('logged out'));
        setAdminState(null)
        navigate('/')
    }

    return (
        <div>
            <Navbar className='shadow-sm bg-white' variant="danger">
                <Nav className="d-flex flex-column flex-md-row justify-content-between mx-auto">
                    <Nav.Item><Link className='nav-link mx-1 mx-sm-3 bg-white' to="/accessvsnadmin/team">Team</Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-1 mx-sm-3 bg-white' to="/accessvsnadmin/youtube">Youtube</Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-1 mx-sm-3 bg-white' to="/accessvsnadmin/winners">Winners</Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-1 mx-sm-3 bg-white' to="/accessvsnadmin/events">Events</Link></Nav.Item>
                    <Nav.Item><Link className='nav-link mx-1 mx-sm-3 bg-white' to="/accessvsnadmin/messages">Messages</Link></Nav.Item>
                    <Nav.Item><Button className=' mx-1 mx-sm-3' variant="primary" onClick={() => LogOut()}>Log Out</Button></Nav.Item>
                </Nav>
            </Navbar>


            <Routes>
                <Route path='' element={
                    <div className='text-center p-5 m-5'>
                        <h2>You are in Admin Panel</h2>
                        <h3>Click any routes above to get access to the data of that route</h3>
                    </div>} />
                <Route path='team' element={<TeamContextProvider> <TeamA /></TeamContextProvider>} />
                <Route path='youtube' element={<YoutubeContextProvider><YoutubeA /></YoutubeContextProvider>} />
                <Route path='winners' element={<WinnersContextProvider><WinnersA /></WinnersContextProvider>} />
                <Route path='events' element={<EventsContextProvider><EventsA /></EventsContextProvider>} />
                <Route path='messages' element={<Messages />} />
            </Routes>
        </div>

    )
}

export default Admin