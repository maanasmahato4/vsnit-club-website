import Accordion from 'react-bootstrap/Accordion';

function FAQs() {
    return (
        <section className='mx-md-5 mx-1 px-1 shadow-sm p-md-5 my-5 py-5' style={{ backgroundColor: 'rgb(248, 245, 245)' }}>
            <h1 className='home-h1'>FAQs</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h5 className='home-h3'>1. What is the purpose of Vsn IT Club?</h5></Accordion.Header>
                    <Accordion.Body className='home-h3'>
                        Programming abilities are crucial capabilities that can be used and incorporated into a variety of disciplines and domains in today's climate of rapid change. Therefore, it is imperative to provide young minds with these skills. By connecting with every student who is enthusiastic about computers and coding, the VSN IT CLUB seeks to establish a coding culture in higher education.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5 className='home-h3'>2. How does Vsn IT Club recruit new members.</h5></Accordion.Header>
                    <Accordion.Body className='home-h3'>
                        We choose new members based on how well-versed they are in the field of information technology and what tasks they can perform as members.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><h5 className='home-h3'>3. How does Vsn IT Club get funds for organizing events.</h5></Accordion.Header>
                    <Accordion.Body className='home-h3'>
                        We raise funds for our events from both interested participants and the VS Niketan College Administration.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><h5 className='home-h3'>4. How does Vsn IT Club plan an event?</h5></Accordion.Header>
                    <Accordion.Body className='home-h3'>
                        Prior to scheduling any activities, we first get everyone in the group together, either physically or over a zoom call, and brainstorm all the potential issues. Then we make a list of every requirement for the event. Finally, collaborate with the administration of VS Niketan College to find solutions for all probable issues.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </section>
    )
}

export default FAQs;