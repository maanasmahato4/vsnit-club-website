import { Fragment, useContext } from 'react';
import { EventsContext } from '../../../../context/Events.context';
import Button from 'react-bootstrap/Button';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


function Ongoing() {
    const { eventsData } = useContext(EventsContext);
    const navigate = useNavigate();

    return (
        <Fragment>
            <Button variant='primary' className='mt-4 my-md-2 ms-3 ms-md-3' onClick={() => navigate('/events')}>
                <BsChevronLeft style={{ fontWeight: "bold", fontSize: '1.5rem' }} />
            </Button>
            <section className="p-2 d-flex flex-column mx-auto">
                {
                    eventsData.filter(data => { return data.status === 'ongoing' }).map((doc) => {
                        const { id, name, desc, startDate, endDate, status, imgUrl, infoUrl, formUrl } = doc;
                        return <div key={id} className="d-flex flex-column flex-sm-row shadow-lg rounded p-2 my-4 mx-auto mx-md-0" style={{ width: '100%' }}>
                            <img style={{ width: '42vh' }} className="rounded mx-auto mx-md-0" variant="top" src={imgUrl} alt={name} />
                            <div className='mx-4 my-4'>
                                <h1 className='fw-bold'>{name}</h1>
                                <p className='home-h3'>{desc}</p>
                                <h6 className='home-h3 fw-semibold'>Status: {status}</h6>
                                <h6 className='home-h3 fw-semibold'>Event Duration Date: {startDate} AD : {endDate} AD</h6>
                                <div className='d-flex flex-row my-4'>
                                    <a href={infoUrl} target="_blank" rel="noreferrer"><Button className='mx-2' variant='primary'>Learn more</Button></a>
                                    <a href={formUrl} target="_blank" rel="noreferrer"><Button className='mx-2' variant='danger'>Fill Form</Button></a>
                                </div>
                            </div>
                        </div>
                    })
                }
            </section>
        </Fragment>
    )
}

export default Ongoing;