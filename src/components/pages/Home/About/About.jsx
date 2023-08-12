import team from '../../../../images/ourgroup.jpg';
import Button from 'react-bootstrap/Button';
import Lottie from 'lottie-react';
import arrowIcon from '../../../../lottie/left-arrow.json';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    return (
        <section className="my-5 mx-auto" style={{ width: '92%' }} id="aboutus">
            <div className='d-flex flex-wrap justify-content-around rounded shadow-sm p-3 mx-auto' style={{ backgroundColor: 'rgb(248, 245, 245)' }}>
                <h1 className='text-center home-h1'>About Us</h1>
                <div className='d-flex flex-wrap justify-content-between w-100 h-100'>
                    <img src={team} alt="Biraj Karki" className='my-3 my-md-5 rounded shadow-lg mx-auto h-100' style={{ width: '90%' }} />
                    <div className="w-100 p-md-5">
                        <p className='home-h3 text-left'>The VS NIKETAN Education Foundation is associated with the VSN IT Club. The VSN IT Club aims to provide young people with a platform where they may discuss ideas, hone their problem-solving skills, and promote technological society through various projects, patents, and research papers. To keep students learning and provide them with the resources they need to put their ideas into practice, we will plan a variety of expert lectures, workshops, mentorship programs, and competitions throughout the year.</p>
                        <p className='home-h3 text-left'>In today's environment of rapid change, programming skills are essential competencies that may be applied to and integrated into a wide range of disciplines and domains. Therefore, it is crucial to teach these skills to young minds. The VSN IT CLUB aims to create a coding culture in higher education by interacting with every student who is passionate about computers and coding. The motto of the club is "Create-Build-Innovate."</p>
                        <p className='home-h3 text-left'>To accomplish our goal, we are providing students with a platform where they can learn most effectively through a "Community Learning" setting.</p>
                        <Button variant="primary" className='d-flex flex-row intro-button shadow-lg m-2' onClick={() => navigate('/ourgroup')}><p className='my-auto home-button ms-5'>Take a look at our team</p><Lottie animationData={arrowIcon} style={{ height: '3rem', color: 'white' }} /></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About