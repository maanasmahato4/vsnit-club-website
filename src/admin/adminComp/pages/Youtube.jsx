import { Fragment, useContext, useRef, useState } from 'react';
import { addVideo, deleteVideo, updateYoutubeVideo } from '../../../firebase/components/firebase.youtube';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BsPlusLg } from 'react-icons/bs';
import { YoutubeContext } from '../../../context/youtube.context';
import { v4 as uuid } from 'uuid';

function TeamA() {
    const { ytVideos } = useContext(YoutubeContext);


    //add video modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = uuid();
    const vidname = useRef(null);
    const url = useRef(null);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = vidname.current.value;
        const vidUrl = url.current.value;
        await addVideo({ id, title, vidUrl });
        e.target.reset()
    }

    //update team member modal
    const [ushow, setUShow] = useState(false);
    const handleUClose = () => setUShow(false);
    const handleUShow = () => setUShow(true);
    const [udata, setUData] = useState({ id: '', title: '', vidUrl: '' });

    const updateVideoModal = (data) => {
        const { id, title, vidUrl } = data;
        setUData({ id, title, vidUrl });
        handleUShow()
    }

    /* updated data */
    const uvidname = useRef(null);
    const uurl = useRef(null);

    const submitUpdatedData = async (e) => {
        e.preventDefault();
        const uid = udata.id;
        const utitle = uvidname.current.value;
        const uvidUrl = uurl.current.value;
        await updateYoutubeVideo({ uid, utitle, uvidUrl });
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
        deleteVideo(confirmDeleteID);
        handleDClose();
    }
    return (
        <div className='mx-4'>
            {/* add video modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' name="username" ref={vidname} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Video url</Form.Label>
                            <Form.Control type='text' name="postion" ref={url} required />
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
                    <Modal.Title>Your are Updating Member: {udata.membername}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-4 bg-white rounded-sm shadow-sm' onSubmit={submitUpdatedData}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' name="username" ref={uvidname} defaultValue={udata.title || ''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Video url</Form.Label>
                            <Form.Control type='text' name="postion" ref={uurl} defaultValue={udata.vidUrl || ''} />
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
                <article style={{ width: '80%', float: 'right' }}>
                    <Fragment>
                        {
                            ytVideos.map(data => {
                                const { id, title, vidUrl } = data;
                                return <Card key={id} className='my-4' style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Link href={vidUrl} target="_blank" className='p-2 text-decoration-none shadow-sm'>Youtube</Card.Link>
                                        <Button className='mx-4 shadow-sm' variant="secondary" onClick={() => handleDelete(id)}>Delete</Button>
                                        <Button className="mx-2" variant="primary" onClick={() => updateVideoModal(data)}>Update</Button>
                                    </Card.Body>
                                </Card>
                            })

                        }
                    </Fragment>
                </article>
            </section>
        </div>
    )
}

export default TeamA;