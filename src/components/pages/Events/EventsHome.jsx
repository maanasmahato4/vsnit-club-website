import Button from "react-bootstrap/Button";
import Lottie from 'lottie-react';
import arrowIcon from '../../../lottie/left-arrow.json';
import { Link } from 'react-router-dom';
import './events.css';

function EventsHome() {
    return (
        <section className="p-4">
            <div className="my-5 shadow-lg rounded p-5 text-white completed">
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Completed Events</h1>
                    <h3 style={{ fontSize: '1.1rem' }}>Want to see what events we have completed so far? Click the button below.</h3>
                </div>
                <Link to="/events/completed" style={{ textDecoration: 'none' }}> <Button variant="primary" className='d-flex flex-row mt-5 p-2 shadow-lg'><p className='my-auto intro-button'>Go to events</p><Lottie animationData={arrowIcon} style={{ height: '5vh' }} /></Button></Link>
            </div>
            <div className="my-5 shadow-lg rounded p-5 text-white ongoing">
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Ongoing Events</h1>
                    <h3 style={{ fontSize: '1.1rem' }}>Want to see what events we are organizing right now? Click the button below.</h3>
                </div>
                <Link to="/events/ongoing" style={{ textDecoration: 'none' }}><Button variant="success" className='d-flex flex-row mt-5 p-2 shadow-lg'><p className='my-auto intro-button'>Go to events</p><Lottie animationData={arrowIcon} style={{ height: '5vh' }} /></Button></Link>
            </div>
            <div className="my-5 shadow-lg rounded p-5 text-white planned">
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Planned Events</h1>
                    <h3 style={{ fontSize: '1.1rem' }}>Want to see what events we have planned for future? Click the button below.</h3>
                </div>
                <Link to="/events/planned" style={{ textDecoration: 'none' }}><Button variant="danger" className='d-flex flex-row mt-5 p-2 shadow-lg'><p className='my-auto intro-button'>Go to events</p><Lottie animationData={arrowIcon} style={{ height: '5vh' }} /></Button></Link>
            </div>
        </section>
    )
}

export default EventsHome