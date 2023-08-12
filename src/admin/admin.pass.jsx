import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Admin from './Admin';
import { auth } from '../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AdminContext } from '../context/admin.context';



function AdminPass() {
    const { adminState } = useContext(AdminContext);
    const [show, setShow] = useState(true);
    const [accessData, setAccessData] = useState({ email: null, password: null, confirm_password: null });

    const handleClose = () => setShow(false);
    //const handleOpen = () => setShow(true);

    const handleFormData = (e) => {
        setAccessData({ ...accessData, [e.target.name]: e.target.value });
    }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirm_password } = accessData
        if (password === confirm_password) {
            signIn(email, password);
            handleClose();
        }
        else {
            handleClose();
        }
    }



    return (
        <div>
            {adminState ?
                <Admin /> :
                <Modal show={show} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Access Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Admin Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter Username" onChange={handleFormData} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAccessKey1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Enter Password" onChange={handleFormData} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAccessKey2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name="confirm_password" type="password" placeholder="Enter Password" onChange={handleFormData} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}

export default AdminPass