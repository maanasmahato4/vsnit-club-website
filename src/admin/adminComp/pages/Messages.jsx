import { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase.config';
import { deleteMessage } from '../../../firebase/components/firebase.message';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Messages() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = () => {
            const collectionRef = query(collection(db, 'messages'), orderBy('date', 'desc'));
            onSnapshot(collectionRef, (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchMessages();
    }, [])
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
        deleteMessage(confirmDeleteID);
        handleDClose();
    }
    return (
        <div>
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
            <section className='p-2'>
                <h1 className='text-center'>Messages</h1>
                <div className='w-100'>
                    {
                        messages.map(msg => {
                            const { id, username, email, phone, subject, message } = msg;
                            return <div className='p-md-5 p-3 rounded mx-md-5 my-5 shadow-lg' key={id}>
                                <h1>{username}</h1>
                                <p>Email: {email}</p>
                                <h4>Phone: {phone}</h4>
                                <div>
                                    <h3>{subject}</h3>
                                    <p>{message}</p>
                                </div>
                                <Button variant='secondary' onClick={() => handleDelete(id)}>Delete</Button>
                            </div>
                        })
                    }
                </div>
            </section>
        </div>

    )
}

export default Messages;