import { Route, Routes } from 'react-router-dom';
import Completed from "./Completed/Completed";
import Ongoing from "./Ongoing/Ongoing";
import Planned from "./Planned/Planned";
import EventsHome from './EventsHome';
import { Helmet } from "react-helmet";

function Events() {
    return (
        <div>
            <Helmet>
                <title>Events</title>
            </Helmet>
            <Routes>
                <Route path='' element={<EventsHome />} />
                <Route path='completed' element={<Completed />} />
                <Route path='ongoing' element={<Ongoing />} />
                <Route path='planned' element={<Planned />} />
            </Routes>
        </div>

    )
}

export default Events;