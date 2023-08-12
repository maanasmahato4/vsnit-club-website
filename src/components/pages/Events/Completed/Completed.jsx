import { useContext, useState } from 'react';
import { EventsContext } from '../../../../context/Events.context';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsChevronLeft } from 'react-icons/bs';


function Completed() {
    const { eventsData } = useContext(EventsContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const [wdata, setWData] = useState({ id: '', winnerName: '', winnerSchool: '', winnerUrl: '', infoUrl: '' });

    const winnerModal = (data) => {
        const { id, winnerName, winnerSchool, winnerImage, winnerUrl, infoUrl } = data;
        setWData({ id, winnerName, winnerSchool, winnerImage, winnerUrl, infoUrl });
        handleShow()
    }
    return (
        <section className='mx-auto'>
            <Button variant='primary' className='mt-4 my-md-2 ms-3 ms-md-3' onClick={() => navigate('/events')}>
                <BsChevronLeft style={{ fontWeight: "bold", fontSize: '1.5rem' }} />
            </Button>
            <Modal show={show} onHide={handleClose} key={wdata.id}>
                <Modal.Body className='text-center p-2'>
                    <h1 className='home-h1 my-2'>{wdata.winnerName}</h1>
                    <img className='w-75' src={wdata.winnerUrl} alt={wdata.winnerName} />
                    <h3 className='home-h2 my-2'>{wdata.winnerSchool}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="p-2 d-flex flex-column">
                {
                    eventsData.filter(data => { return data.status === 'completed' }).map((doc) => {
                        const { id, name, desc, startDate, endDate, status, imgUrl, infoUrl } = doc;
                        return <div key={id} className="d-flex flex-column flex-sm-row shadow-lg rounded p-2 my-4 mx-auto" style={{ width: '100%' }}>
                            <img style={{ width: '42vh' }} className="rounded mx-auto" variant="top" src={imgUrl} alt={name} />
                            <div className='mx-4 my-4'>
                                <h1 className='fw-bold'>{name}</h1>
                                <p className='home-h3'>{desc}</p>
                                <h6 className='home-h3 fw-semibold'>Status: {status}</h6>
                                <h6 className='home-h3 fw-semibold'>Date Organized: {startDate} AD : {endDate} AD</h6>
                                <div className='d-flex flex-row my-4'>
                                    <a href={infoUrl} target="_blank" rel="noreferrer"><Button className='mx-2' variant='primary'>Learn more</Button></a>
                                    <Button variant='danger' onClick={() => winnerModal(doc)}>Winner</Button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}

export default Completed;