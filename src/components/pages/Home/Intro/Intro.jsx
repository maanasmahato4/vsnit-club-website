import homeIcon from '../../../../images/logo.jpg';
import Button from 'react-bootstrap/Button';
import Lottie from 'lottie-react';
import arrowIcon from '../../../../lottie/left-arrow.json';
import contact from '../../../../lottie/call.json';
import { useNavigate } from 'react-router-dom';
import './intro.css';

function Intro() {
    const navigate = useNavigate();
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };
    return (
        <section className="h-100 pt-4 pt-sm-0 pt-lg-5 intro_bg bg-image" id="intro">
            <div className="d-flex flex-column flex-lg-row justify-content-evenly">
                <img src={homeIcon} alt="logo" className='icon rounded shadow-lg mx-auto my-3 my-md-5' />
                <div className='my-auto mx-auto text-center px-4 ms-lg-5'>
                    <h1 className='intro-h1 text-white'>Vsn IT Club</h1>
                    <h3 className='intro-h3 text-white'>Creating ideas with technology and imagination</h3>
                    <Button variant="primary" className='d-flex flex-row mx-auto mt-4 mt-sm-0 p-2 px-4 shadow-lg' onClick={() => navigate('/events')}><p className='my-auto intro-button'>Want to see what we are doing?</p><Lottie animationData={arrowIcon} style={{ height: '3rem' }} /></Button>
                </div>
            </div>
            <Button variant='light' className='shadow-lg rounded ms-1 ms-md-5 my-4' onClick={scrollToBottom}>
                <Lottie animationData={contact} className="lottie mx-auto my-auto" />
            </Button>
        </section>
    )
}

export default Intro;