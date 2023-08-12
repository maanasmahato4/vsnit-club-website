import FAQs from "./FAQs/FAQs";
import Intro from "./Intro/Intro";
import About from "./About/About";
import Contact from "./contact/Contact";
import FounderMsg from "./Foundermsg/FounderMsg";
import Developer from "./developer/Developer";
import { Helmet } from "react-helmet";
import Appreciation from "./Appreciation/Appreciation";

function Home() {
    return (
        <div className="vh-100 bg-white">
            <Helmet>
                <title>Vsn IT Club</title>
            </Helmet>
            <div>
                <Intro />
            </div>
            <div>
                <About />
            </div>
            <div>
                <Appreciation />
            </div>
            <div>
                <FounderMsg />
            </div>
            <div>
                <Developer />
            </div>
            <div>
                <FAQs />
            </div>
            <div>
                <Contact />
            </div>
        </div >
    )
}

export default Home;