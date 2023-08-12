import { useContext } from 'react';
import { TeamContext } from '../../../context/Team.context';
import { Helmet } from "react-helmet";
import Lottie from 'lottie-react';
import page_loading from '../../../lottie/page_loading.json';

function OurGroup() {
    const { teamData } = useContext(TeamContext);

    const displayMembers = (position) => {
        return teamData.filter(data => { return data.position === position }).map((member) => {
            const { id, membername, position, fbUrl, grade, imgUrl } = member;
            return (
                <div key={id} style={{ width: '50vh' }} className="mx-auto p-1 my-4 rounded shadow-lg" >
                    <img variant="top" src={imgUrl} alt={membername} className="w-100 mb-3" />
                    <div>
                        <div className='d-flex flex-wrap justify-content-between text-start mx-3'>
                            <div>
                                <h1 style={{ fontSize: '3vh' }}>Name: {membername}</h1>
                                <h6 style={{ fontSize: '2.5vh' }}>Position: {position}</h6>
                                <h6 style={{ fontSize: '2.5vh' }}>Grade: {grade}</h6>
                            </div>
                            <a href={fbUrl} rel='noreferrer' target="_blank">
                                <svg viewBox="0 0 128 128" style={{ height: "6vh" }}>
                                    <path fill="#3d5a98" d="M116.42 5.07H11.58a6.5 6.5 0 00-6.5 6.5v104.85a6.5 6.5 0 006.5 6.5H68V77.29H52.66V59.5H68V46.38c0-15.22 9.3-23.51 22.88-23.51a126 126 0 0113.72.7v15.91h-9.39c-7.39 0-8.82 3.51-8.82 8.66V59.5H104l-2.29 17.79H86.39v45.64h30a6.51 6.51 0 006.5-6.5V11.58a6.5 6.5 0 00-6.47-6.51z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )
        })
    }

    if (!teamData) {
        return <div className='h-100 w-100'><Lottie animationData={page_loading} style={{ height: "12rem", width: "12rem" }} className="mx-auto my-auto" /></div>
    }
    else {
        return (
            <section className='text-center p-2 w-100'>
                <Helmet>
                    <title>Team</title>
                </Helmet>
                <h1 className='home-h1'>
                    Meet Vsn IT Club Team Members
                </h1>
                <div className="mx-auto">
                    <div>
                        <h3 className='home-h2'>Founder/Club Mentor</h3>
                        <div className="d-flex flex-wrap justify-content-around">
                            {
                                displayMembers('Founder/Club Mentor')
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className='home-h2'>President</h3>
                        <div className="d-flex flex-wrap justify-content-around">
                            {
                                displayMembers('President')
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Vice President</h3>
                        <div className='d-flex flex-wrap justify-content-around'>{displayMembers('Vice President')}</div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Coder In Charge</h3>
                        <div className='d-flex flex-wrap justify-content-around'>{displayMembers('Coder in charge')}</div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Secretary</h3>
                        <div className='d-flex flex-wrap justify-content-around'>{displayMembers('Secretary')}</div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Event Manager</h3>
                        <div className='d-flex flex-wrap justify-content-around'>{displayMembers('Event Manager')}</div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Social Media Manager</h3>
                        <div className='d-flex flex-wrap justify-content-around'>{displayMembers('Social Media Manager')}</div>
                    </div>
                    <div>
                        <h3 className='home-h2'>Member</h3>
                        <div className='d-flex flex-wrap'>{displayMembers('Member')}</div>
                    </div>
                </div>
            </section>
        )
    }
}

export default OurGroup;