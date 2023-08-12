import { useContext, useRef, useState } from 'react';
import { addTeamMember, deleteMember, updateTeamMember } from '../../../firebase/components/firebase.team';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { BsPlusLg } from 'react-icons/bs';
import { TeamContext } from '../../../context/Team.context';
import { v4 as uuid } from 'uuid';



function TeamA() {
    const { teamData } = useContext(TeamContext);

    //add team member modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = uuid();
    const name = useRef(null);
    const [position, setPosition] = useState('member');
    const fburl = useRef(null);
    const mclass = useRef(null);
    const img = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const membername = name.current.value;
        const image = img.current.files[0];
        const fbUrl = fburl.current.value || 'https://www.facebook.com/Club.VSN.IT';
        const grade = mclass.current.value || 'vsn';
        await addTeamMember({ id, membername, position, fbUrl, grade, image });
        e.target.reset()
    }

    //update team member modal
    const [ushow, setUShow] = useState(false);
    const handleUClose = () => setUShow(false);
    const handleUShow = () => setUShow(true);
    const [udata, setUData] = useState({ id: '', membername: '', position: '', fbUrl: '', grade: '', imgUrl: "" });

    const updateMemberModal = (data) => {
        const { id, membername, position, fbUrl, grade, imgUrl } = data;
        setUData({ id, membername, position, fbUrl, grade, imgUrl });
        handleUShow()
    }

    /* updated data */
    const uname = useRef(null);
    const [uposition, setUPosition] = useState(null);
    const ufburl = useRef(null);
    const uclass = useRef(null);
    const uimg = useRef(null);

    const submitUpdatedData = async (e) => {
        e.preventDefault();
        const uid = udata.id;
        const umembername = uname.current.value;
        const umemberposition = uposition || udata.position;
        const ufbUrl = ufburl.current.value;
        const ugrade = uclass.current.value || 'vsn';
        const uimage = uimg.current.files[0];
        const imgUrl = udata.imgUrl;
        await updateTeamMember({ uid, umembername, umemberposition, ufbUrl, ugrade, uimage, imgUrl });
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
        deleteMember(confirmDeleteID);
        handleDClose();
    }
    return (
        <div className='container-fluid'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name="membername" placeholder='member name' ref={name} required />
                        </Form.Group>
                        <Form.Group className="my-2" >
                            <Form.Label className="fs-4">Team postion</Form.Label>
                            <Form.Check type="radio" name="radio1" label="Founder/Club Mentor" onChange={e => setPosition(e.target.value)} value="Founder/Club Mentor" />
                            <Form.Check type="radio" name="radio1" label="President" onChange={e => setPosition(e.target.value)} value="President" />
                            <Form.Check type="radio" name="radio1" label="Vice President" onChange={e => setPosition(e.target.value)} value="Vice President" />
                            <Form.Check type="radio" name="radio1" label="Secretary" onChange={e => setPosition(e.target.value)} value="Secretary" />
                            <Form.Check type="radio" name="radio1" label="Coder in charge" onChange={e => setPosition(e.target.value)} value="Coder in charge" />
                            <Form.Check type="radio" name="radio1" label="Member" onChange={e => setPosition(e.target.value)} value="Member" />
                            <Form.Check type="radio" name="radio1" label="Event Manager" onChange={e => setPosition(e.target.value)} value="Event Manager" />
                            <Form.Check type="radio" name="radio1" label="Social Media Manager" onChange={e => setPosition(e.target.value)} value="Social Media Manager" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control type='text' name="fburl" placeholder='facebook link' ref={fburl} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type='text' name="grade" placeholder='Grade' ref={mclass} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type='file' name="image" placeholder='choose photo' ref={img} required />
                        </Form.Group>
                        <Button className='my-2' type='submit' >Submit</Button>
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
                    <Modal.Title>Your are Updating Member: {udata.membername}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={submitUpdatedData}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name="membername" placeholder='member name' ref={uname} defaultValue={udata.membername || ''} />
                        </Form.Group>
                        <Form.Group className="my-2" >
                            <Form.Label className="fs-4">Team postion</Form.Label>
                            <Form.Check type="radio" name="radio1" label="Founder/Club Mentor" onChange={e => setUPosition(e.target.value)} value="Founder/Club Mentor" />
                            <Form.Check type="radio" name="radio1" label="President" onChange={e => setUPosition(e.target.value)} value="President" />
                            <Form.Check type="radio" name="radio1" label="Vice President" onChange={e => setUPosition(e.target.value)} value="Vice President" />
                            <Form.Check type="radio" name="radio1" label="Secretary" onChange={e => setUPosition(e.target.value)} value="Secretary" />
                            <Form.Check type="radio" name="radio1" label="Coder in charge" onChange={e => setUPosition(e.target.value)} value="Coder in charge" />
                            <Form.Check type="radio" name="radio1" label="Member" onChange={e => setUPosition(e.target.value)} value="Member" />
                            <Form.Check type="radio" name="radio1" label="Event Manager" onChange={e => setUPosition(e.target.value)} value="Event Manager" />
                            <Form.Check type="radio" name="radio1" label="Social Media Manager" onChange={e => setUPosition(e.target.value)} value="Social Media Manager" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control type='text' name="fburl" placeholder='Facebook link' ref={ufburl} defaultValue={udata.fbUrl || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type='text' name="grade" placeholder='Grade' ref={uclass} defaultValue={udata.grade || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type='file' name="image" placeholder='choose photo' ref={uimg} />
                        </Form.Group>
                        <Button className='my-2' type='submit'>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleUClose()}>
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
                <div style={{ width: '15%' }}>
                    <Button style={{ float: 'left' }} variant='primary' className='position-fixed' onClick={handleShow}><BsPlusLg /></Button>
                </div>

                <article className="d-flex align-items-start flex-wrap my-4" style={{ width: '90%', float: 'right' }}>
                    {
                        teamData.map((data) => {
                            const { id, membername, position, fbUrl, grade, imgUrl } = data;
                            return (
                                <Card key={id} style={{ width: '50vh' }} className="mx-auto mx-md-3 my-4" >
                                    <Card.Img variant="top" src={imgUrl} alt={membername} />
                                    <Card.Body>
                                        <div className='d-flex flex-wrap justify-content-between'>
                                            <div>
                                                <Card.Title>Name: {membername}</Card.Title>
                                                <h6>Postion: {position}</h6>
                                                <h6>Grade: {grade}</h6>
                                            </div>
                                            <a href={fbUrl} rel='noreferrer' target="_blank">
                                                <svg viewBox="0 0 128 128" height={40} width={40}>
                                                    <path fill="#3d5a98" d="M116.42 5.07H11.58a6.5 6.5 0 00-6.5 6.5v104.85a6.5 6.5 0 006.5 6.5H68V77.29H52.66V59.5H68V46.38c0-15.22 9.3-23.51 22.88-23.51a126 126 0 0113.72.7v15.91h-9.39c-7.39 0-8.82 3.51-8.82 8.66V59.5H104l-2.29 17.79H86.39v45.64h30a6.51 6.51 0 006.5-6.5V11.58a6.5 6.5 0 00-6.47-6.51z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <Button variant="secondary" onClick={() => handleDelete(id)}>Delete</Button>
                                        <Button className="mx-2" variant="primary" onClick={() => updateMemberModal(data)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </article>
            </section>
        </div >
    )
}

export default TeamA;