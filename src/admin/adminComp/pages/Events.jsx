import { useContext, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlusLg } from 'react-icons/bs';
import { addEvents, deleteEvent, updateEvent } from '../../../firebase/components/firebase.events';
import { EventsContext } from '../../../context/Events.context';
import { v4 as uuid } from 'uuid';

function EventsA() {
    // context
    const { eventsData } = useContext(EventsContext);

    //add event modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const eventId = uuid();
    const name = useRef(null);
    const desc = useRef(null);
    const startDate = useRef(null);
    const endDate = useRef(null);
    const [status, setStatus] = useState(null);
    const img = useRef(null);
    const winnername = useRef(null);
    const winnerschool = useRef(null);
    const winnerimg = useRef(null);
    const infourl = useRef(null);
    const formurl = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventName = name.current.value;
        const eventDesc = desc.current.value;
        const eventStartDate = startDate.current.value;
        const eventEndDate = endDate.current.value;
        const eventStatus = status;
        const winnerName = winnername.current.value || 'none';
        const winnerSchool = winnerschool.current.value || 'Vs niketan';
        const infoUrl = infourl.current.value || 'https://www.facebook.com/Club.VSN.IT';
        const formUrl = formurl.current.value || 'https://www.facebook.com/Club.VSN.IT';
        const image = img.current.files[0];
        const winnerImage = winnerimg.current.files[0];
        addEvents({ eventId, eventName, eventDesc, eventStartDate, eventEndDate, eventStatus, image, winnerName, winnerSchool, winnerImage, infoUrl, formUrl });
        e.target.reset();
    };


    //update modal
    const [ushow, setUShow] = useState(false);
    const handleUClose = () => setUShow(false);
    const handleUShow = () => setUShow(true);
    const [udata, setUData] = useState({ id: '', name: '', desc: '', startDate: '', endDate: '', status: '', imgUrl: "", winnerName: '', winnerSchool: '', winnerUrl: '', infoUrl: '', formUrl: '' });

    const updateEventModal = (data) => {
        const { id, name, desc, startDate, endDate, status, imgUrl, winnerName, winnerSchool, winnerImage, winnerUrl, infoUrl, formUrl } = data;
        setUData({ id, name, desc, startDate, endDate, status, imgUrl, winnerName, winnerSchool, winnerImage, winnerUrl, infoUrl, formUrl });
        handleUShow()
    }

    /* updated data */
    const uname = useRef(null);
    const udesc = useRef(null);
    const ustartDate = useRef(null);
    const uendDate = useRef(null);
    const [ustatus, setUStatus] = useState(null);
    const uimg = useRef(null);
    const uwinnername = useRef(null);
    const uwinnerschool = useRef(null);
    const uwinnerimg = useRef(null);
    const uinfourl = useRef(null);
    const uformurl = useRef(null);

    const submitUpdatedData = async (e) => {
        e.preventDefault();
        const uid = udata.id;
        const ueventName = uname.current.value;
        const ueventDesc = udesc.current.value;
        const ueventStartDate = ustartDate.current.value;
        const ueventEndDate = uendDate.current.value;
        const ueventStatus = ustatus || udata.status;
        const uimage = uimg.current.files[0];
        const imgUrl = udata.imgUrl;
        const uwinnerName = uwinnername.current.value;
        const uwinnerSchool = uwinnerschool.current.value;
        const uwinnerImage = uwinnerimg.current.files[0];
        const uwinnerUrl = udata.winnerUrl;
        const uinfoUrl = uinfourl.current.value;
        const uformUrl = uformurl.current.value;
        await updateEvent({ uid, ueventName, ueventDesc, ueventStartDate, ueventEndDate, ueventStatus, uimage, imgUrl, uwinnerName, uwinnerSchool, uwinnerImage, uwinnerUrl, uinfoUrl, uformUrl });
        e.target.reset();
        handleUClose();
    }

    // confirm delete modal
    const [dshow, setDShow] = useState(false);
    const handleDClose = () => setDShow(false);
    const handleDShow = () => setDShow(true);
    const [confirmDeleteID, setConfirmDeleteID] = useState();

    const handleDelete = (id) => {
        setConfirmDeleteID(id)
        handleDShow();
    }

    const submitDelete = (e) => {
        e.preventDefault();
        deleteEvent(confirmDeleteID);
        handleDClose();
    }
    //winner modal
    const [wshow, setWShow] = useState(false);
    const handleWClose = () => setWShow(false);
    const handleWShow = () => setWShow(true);

    const [wdata, setWData] = useState({ id: '', winnerName: '', winnerSchool: '', winnerUrl: '' });

    const winnerModal = (data) => {
        const { id, winnerName, winnerSchool, winnerUrl } = data;
        setWData({ id, winnerName, winnerSchool, winnerUrl });
        handleWShow()
    }

    // displaying data fetched form the sever
    const displayEvent = (status) => {
        return eventsData.filter(data => { return data.status === status }).map((doc) => {
            const { id, name, desc, startDate, endDate, status, imgUrl, infoUrl, formUrl } = doc;
            return <div key={id} className="d-flex flex-column flex-sm-row shadow-lg rounded p-2 my-4 mx-auto mx-md-3" style={{ width: '100%' }}>
                <img style={{ width: '42vh' }} className="rounded" variant="top" src={imgUrl} alt={name} />
                <div className='mx-4'>
                    <h1>{name}:</h1>
                    <p style={{ fontSize: '2.5vh' }}>{desc}</p>
                    <h6 style={{ fontSize: '3vh' }}>Status: {status}</h6>
                    <h6 style={{ fontSize: '3vh' }}>Date Organized: {startDate} AD : {endDate} AD</h6>
                    <div className='d-flex flex-row my-4'>
                        <a className='mx-2' href={infoUrl} target="_blank" rel="noreferrer"><Button variant='primary'>Learn more</Button></a>
                        <a className='mx-2' href={formUrl} target="_blank" rel="noreferrer"><Button variant='danger'>Fill Form</Button></a>
                        <Button className='mx-2' variant='danger' onClick={() => winnerModal(doc)}>Winner</Button>
                    </div>
                    <div className='d-flex flex-row my-4'>
                        <Button className="mx-2" variant="secondary" onClick={() => handleDelete(id)}>Delete</Button>
                        <Button className="mx-2" variant="primary" onClick={() => updateEventModal(doc)}>Update</Button>
                    </div>
                </div>
            </div>
        })
    }
    return (

        <div className='container-fluid'>
            {/* add modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={handleSubmit}>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Name</Form.Label>
                            <Form.Control type='text' name="username" ref={name} required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Start Date</Form.Label>
                            <Form.Control type='date' name="eventStartDate" ref={startDate} required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event End Date</Form.Label>
                            <Form.Control type='date' name="eventEndDate" ref={endDate} required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Description</Form.Label>
                            <Form.Control type='text' name="eventDesc" ref={desc} required />
                        </Form.Group>
                        <Form.Group className="my-2" >
                            <Form.Label className="fs-4">Event status</Form.Label>
                            <Form.Check type="radio" name="radio1" label="ongoing" onChange={e => setStatus(e.target.value)} value="ongoing" required />
                            <Form.Check type="radio" name="radio1" label="completed" onChange={e => setStatus(e.target.value)} value="completed" required />
                            <Form.Check type="radio" name="radio1" label="planned" onChange={e => setStatus(e.target.value)} value="planned" required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Image</Form.Label>
                            <Form.Control type='file' name="image" ref={img} required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Information Url</Form.Label>
                            <Form.Control type='text' name="infourl" ref={infourl} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Form Url</Form.Label>
                            <Form.Control type='text' name="formurl" ref={formurl} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner Name</Form.Label>
                            <Form.Control type='text' name="eventDesc" ref={winnername} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner School</Form.Label>
                            <Form.Control type='text' name="eventDesc" ref={winnerschool} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner Image</Form.Label>
                            <Form.Control type='file' name="image" ref={winnerimg} required />
                        </Form.Group>
                        <Button className='my-2' type="submit" >Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* update modal */}
            <Modal show={ushow} onHide={handleUClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your are Updating Event: {udata.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={submitUpdatedData}>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Name</Form.Label>
                            <Form.Control type='text' name="eventname" defaultValue={udata.name || ''} ref={uname} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Start Date</Form.Label>
                            <Form.Control type='date' name="eventStartDate" defaultValue={udata.startDate || ''} ref={ustartDate} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event End Date</Form.Label>
                            <Form.Control type='date' name="eventEndDate" defaultValue={udata.endDate || ''} ref={uendDate} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Event Description</Form.Label>
                            <Form.Control type='text' name="eventDesc" defaultValue={udata.desc || ''} ref={udesc} />
                        </Form.Group>
                        <Form.Group className="my-2" >
                            <Form.Label className="fs-4">Event status</Form.Label>
                            <Form.Check type="radio" name="status" label="ongoing" onChange={e => setUStatus(e.target.value)} value="ongoing" />
                            <Form.Check type="radio" name="status" label="completed" onChange={e => setUStatus(e.target.value)} value="completed" />
                            <Form.Check type="radio" name="status" label="planned" onChange={e => setUStatus(e.target.value)} value="planned" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Image</Form.Label>
                            <Form.Control type='file' name="image" ref={uimg} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Information Url</Form.Label>
                            <Form.Control type='text' name="infourl" ref={uinfourl} defaultValue={udata.infoUrl || ''} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Form Url</Form.Label>
                            <Form.Control type='text' name="formurl" ref={uformurl} defaultValue={udata.formUrl || ''} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner Name</Form.Label>
                            <Form.Control type='text' name="eventDesc" ref={uwinnername} defaultValue={udata.winnerName || ''} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner School</Form.Label>
                            <Form.Control type='text' name="eventDesc" ref={uwinnerschool} defaultValue={udata.winnerSchool || ''} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label className="fs-4">Winner Image</Form.Label>
                            <Form.Control type='file' name="image" ref={uwinnerimg} />
                        </Form.Group>
                        <Button className='my-2' type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* delete modal */}
            <Modal show={dshow} onHide={handleDClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure, you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* winner modal */}
            <Modal show={wshow} onHide={handleWClose} key={wdata.id}>
                <Modal.Body className='text-center p-2'>
                    <h1 className='home-h1 my-2'>{wdata.winnerName}</h1>
                    <img className='w-75' src={wdata.winnerUrl} alt={wdata.winnerName} />
                    <h3 className='home-h2 my-2'>{wdata.winnerSchool}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleWClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <section className="my-5">
                <div style={{ width: '10%', float: 'left' }}>
                    <Button style={{ float: 'left' }} variant='primary' className='position-fixed' onClick={handleShow}><BsPlusLg /></Button>
                </div>
                <article style={{ width: '85%', float: 'right' }} className="mx-auto">
                    <div className="my-5 mx-auto">
                        <h1 className='text-center'>Completed</h1>
                        <div className="d-flex align-items-start flex-wrap">
                            {
                                displayEvent('completed')
                            }
                        </div>
                    </div>
                    <div className="my-5 mx-auto">
                        <h1 className='text-center'>Ongoing</h1>
                        <div className="d-flex align-items-start flex-wrap">
                            {
                                displayEvent('ongoing')
                            }
                        </div>
                    </div>
                    <div className="my-5 mx-auto">
                        <h1 className='text-center'>Planned</h1>
                        <div className="d-flex align-items-start flex-wrap">
                            {
                                displayEvent('planned')
                            }
                        </div>
                    </div>
                </article>
            </section>

        </div >
    )
}

export default EventsA;