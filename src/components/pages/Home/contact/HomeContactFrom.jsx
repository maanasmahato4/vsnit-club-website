import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid';
import { addMessage } from '../../../../firebase/components/firebase.message';
import Lottie from 'lottie-react';
import loading from '../../../../lottie/loading.json';


function HomeContactFrom() {

    //sent modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //wait modal
    const [wshow, setwShow] = useState(false);
    const handlewClose = () => setwShow(false);
    const handlewShow = () => setwShow(true);


    const id = uuid();
    const name = useRef();
    const mail = useRef();
    const num = useRef();
    const text1 = useRef();
    const text2 = useRef();
    const date = new Date().toUTCString();

    const sendMessage = async (e) => {
        e.preventDefault();
        handlewShow();
        const username = name.current.value;
        const email = mail.current.value;
        const phone = num.current.value;
        const subject = text1.current.value;
        const message = text2.current.value;
        await addMessage({ id, username, email, phone, subject, message, date });
        handlewClose();
        handleShow();
        e.target.reset()
    }


    return (
        <section>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='my-3'><h3>Your message has been received!</h3></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={wshow} >
                <Modal.Header closeButton>
                    <Modal.Title>Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flew-row my-3'>
                        <h3 className='text-center my-auto'>please wait... Sending</h3>
                        <Lottie animationData={loading} className="lottie my-auto" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <p>Thank you!</p>
                </Modal.Footer>
            </Modal>
            <Form onSubmit={sendMessage}>
                <Form.Group className="mb-3" controlId="formBasicSubject">
                    <Form.Label className='home-h3'>Name</Form.Label>
                    <Form.Control style={{ fontSize: '2.5vh' }} type="text" name="user_name" ref={name} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='home-h3'>Email address</Form.Label>
                    <Form.Control style={{ fontSize: '2.5vh' }} type="email" name="user_email" ref={mail} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='home-h3'>Phone Number (optional)</Form.Label>
                    <Form.Control style={{ fontSize: '2.5vh' }} type="text" name="phone" ref={num} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubject">
                    <Form.Label className='home-h3'>Subject</Form.Label>
                    <Form.Control style={{ fontSize: '2.5vh' }} type="text" name="subject" ref={text1} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label className='home-h3'>Message</Form.Label>
                    <Form.Control style={{ fontSize: '2.5vh' }} as="textarea" name="message" rows={6} ref={text2} required />
                </Form.Group>
                <div className='d-flex flex-wrap'>
                    <Button className='mx-2' variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button className='mx-2' variant="secondary" type="reset">
                        Reset
                    </Button>
                </div>
            </Form>
        </section>

    );
}

export default HomeContactFrom;