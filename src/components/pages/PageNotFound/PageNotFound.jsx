import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Helmet } from "react-helmet";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto my-auto text-center">
            <Helmet>
                <title>404</title>
            </Helmet>
            <div>
                <h2 style={{ fontSize: '4rem' }}>404</h2>
                <h3>UH OH! You're lost.</h3>
                <p>
                    The page you are looking for does not exist. How you got here is a
                    mystery. But you can click the button below to go back to the
                    homepage.
                </p>
            </div>
            <Button variant="danger" onClick={() => navigate('/')} >
                Go Back to Home
            </Button>
        </div>
    )
}

export default PageNotFound