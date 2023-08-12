import { useContext } from 'react';
import { WinnersContext } from '../../../context/winners.context';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Helmet } from "react-helmet";
import 'react-vertical-timeline-component/style.min.css';

function Winners() {
    const { winnersData } = useContext(WinnersContext)
    return (
        <div style={{ backgroundColor: 'rgb(241, 239, 239)' }}>
            <Helmet>
                <title>Hall of winners</title>
            </Helmet>
            <VerticalTimeline>
                {
                    winnersData.map((data, idx) => {
                        const { winnername, eventName, prize, cgsh, grade, section, date, imgUrl } = data;
                        return <VerticalTimelineElement
                            key={idx}
                            className="vertical-timeline-element--work "
                            date={date}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        >
                            <img className='w-100 mx-auto rounded' src={imgUrl} alt={winnername} />
                            <div >
                                <h1>Name: {winnername}</h1>
                                <h6>Event: {eventName}</h6>
                                <h6>Prize: {prize}</h6>
                                <h6>College/School: {cgsh}</h6>
                                <h6>Grade: {grade} "{section}"</h6>
                                <h6>Date Awarded: {date} AD</h6>
                            </div>
                        </VerticalTimelineElement>
                    })
                }

            </VerticalTimeline>
        </div >
    )
}

export default Winners