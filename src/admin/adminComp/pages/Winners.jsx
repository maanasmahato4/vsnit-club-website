import { Fragment, useContext, useRef, useState } from 'react';
import { addWinner, deleteWinner, updateWinner } from '../../../firebase/components/firebase.winners';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { BsPlusLg } from 'react-icons/bs';
import { WinnersContext } from '../../../context/winners.context';
import { v4 as uuid } from 'uuid';

function WinnersA() {
    const { winnersData } = useContext(WinnersContext);

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = uuid();
    const name = useRef(null);
    const ename = useRef(null);
    const award = useRef(null);
    const cgSh = useRef(null);
    const gd = useRef(null);
    const sec = useRef(null);
    const dt = useRef(null);
    const img = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const winnername = name.current.value;
        const eventName = ename.current.value;
        const prize = award.current.value;
        const cgsh = cgSh.current.value;
        const grade = gd.current.value;
        const section = sec.current.value;
        const date = dt.current.value;
        const image = img.current.files[0];
        await addWinner({ id, winnername, eventName, prize, cgsh, grade, section, date, image });
        e.target.reset()
    }

    //update team member modal
    const [ushow, setUShow] = useState(false);
    const handleUClose = () => setUShow(false);
    const handleUShow = () => setUShow(true);
    const [udata, setUData] = useState({ id: '', winnername: '', eventName: '', prize: '', cgsh: '', grade: '', section: '', date: '', image: '', imgUrl: "" });

    const updateWinnerModal = (data) => {
        const { id, winnername, eventName, prize, cgsh, grade, section, date, imgUrl } = data;
        setUData({ id, winnername, eventName, prize, cgsh, grade, section, date, imgUrl });
        handleUShow()
    }

    /* updated data */
    const uname = useRef(null);
    const uename = useRef(null);
    const uaward = useRef(null);
    const ucgSh = useRef(null);
    const ugd = useRef(null);
    const usec = useRef(null);
    const udt = useRef(null);
    const uimg = useRef(null);

    const submitUpdatedData = async (e) => {
        e.preventDefault();
        const uid = udata.id;
        const uwinnerName = uname.current.value;
        const ueventName = uename.current.value;
        const uprize = uaward.current.value;
        const ucgsh = ucgSh.current.value;
        const ugrade = ugd.current.value;
        const usection = usec.current.value;
        const udate = udt.current.value;
        const uimage = uimg.current.files[0]
        const imgUrl = udata.imgUrl;
        await updateWinner({ uid, uwinnerName, ueventName, uprize, ucgsh, ugrade, usection, udate, uimage, imgUrl });
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
        deleteWinner(confirmDeleteID);
        handleDClose();
    }
    return (
        <div className='mx-4'>
            {/* add winner modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Winner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className=' p-4 bg-white rounded-sm shadow-sm' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name="winnername" placeholder='name' ref={name} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control type='text' name="eventname" placeholder='event name' ref={ename} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prize</Form.Label>
                            <Form.Control type='text' name="prize" placeholder='prize' ref={award} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>College/School</Form.Label>
                            <Form.Control type='text' name="college/school" placeholder='college/school' ref={cgSh} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type='text' name="grade" placeholder='grade' ref={gd} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Section</Form.Label>
                            <Form.Control type='text' name="section" placeholder='section' ref={sec} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type='date' name="date" placeholder='date' ref={dt} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type='file' name="image" placeholder='choose photo' ref={img} />
                        </Form.Group>
                        <Button className='my-2' type='submit'>Submit</Button>
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
                    <Modal.Title>Your are Updating winner: {udata.winnername}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className=' p-4 bg-white rounded-sm shadow-sm' onSubmit={submitUpdatedData}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name="winnername" placeholder='name' ref={uname} defaultValue={udata.winnername || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control type='text' name="eventname" placeholder='event name' ref={uename} defaultValue={udata.eventName || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prize</Form.Label>
                            <Form.Control type='text' name="prize" placeholder='prize' ref={uaward} defaultValue={udata.prize || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>College/School</Form.Label>
                            <Form.Control type='text' name="college/school" placeholder='college/school' ref={ucgSh} defaultValue={udata.cgsh || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type='text' name="grade" placeholder='grade' ref={ugd} defaultValue={udata.grade || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Section</Form.Label>
                            <Form.Control type='text' name="section" placeholder='section' ref={usec} defaultValue={udata.section || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type='date' name="date" placeholder='date' ref={udt} defaultValue={udata.date || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type='file' name="image" placeholder='choose photo' ref={uimg} />
                        </Form.Group>
                        <Button className='my-2' type='submit'>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleUClose(); setUData({ id: '', name: '', desc: '', startDate: '', endDate: '', status: '', imgUrl: '' }) }}>
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
            <section className='my-5'>
                <div style={{ width: '10%' }}>
                    <Button style={{ float: 'left' }} variant='primary' className='position-fixed' onClick={handleShow}><BsPlusLg /></Button>
                </div>
                <article className="d-flex align-items-start flex-wrap my-4" style={{ width: '85%', float: 'right' }}>
                    <Fragment>
                        {
                            winnersData.map((data) => {
                                const { id, winnername, eventName, prize, cgsh, grade, section, date, imgUrl } = data;
                                return <Card key={id} style={{ width: '18rem' }} className="mx-auto mx-md-3 my-4">
                                    <Card.Img variant="top" width={200} height={200} src={imgUrl} alt={winnername} />
                                    <Card.Body>
                                        <Card.Title>Name: {winnername}</Card.Title>
                                        <h6>Event: {eventName}</h6>
                                        <h6>Prize: {prize}</h6>
                                        <h6>College/School: {cgsh}</h6>
                                        <h6>Grade: {grade} "{section}"</h6>
                                        <h6>Date Awarded: {date} AD</h6>
                                        <Button variant="secondary" onClick={() => handleDelete(id)}>Delete</Button>
                                        <Button className="mx-2" variant="primary" onClick={() => updateWinnerModal(data)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            })
                        }
                    </Fragment>
                </article>
            </section >
        </div>
    )
}

export default WinnersA;