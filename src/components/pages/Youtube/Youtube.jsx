import { useContext, useState } from 'react';
import { YoutubeContext } from '../../../context/youtube.context';
import ReactPlayer from 'react-player/youtube';
import { Helmet } from "react-helmet";
import './youtube.css';

function Youtube() {
    const { ytVideos } = useContext(YoutubeContext);
    const [ytdata, setYtdata] = useState({ id: 'initial', title: 'VS Niketan Coding Club Orientation -Day 1', vidUrl: 'https://youtu.be/Bhb6_XQjiJk' });
    const handleVideo = (data) => {
        const { id, title, vidUrl } = data;
        setYtdata({ id, title, vidUrl });
        console.log(ytdata)
    }
    return (
        <div className='h-100 w-100'>
            <Helmet>
                <title>Videos</title>
            </Helmet>
            <div className='d-flex flex-column vidplayer w-100 flex-lg-row my-2 my-md-2 p-lg-3 h-100 rounded'>
                <section className='mx-lg-1 h-100 flex-fill' style={{ backgroundColor: 'rgb(248, 245, 245)' }}>
                    <ReactPlayer controls width={'100%'} height={'80%'} url={ytdata.vidUrl} />
                    <h3 className='my-3 mx-md-4 mx-1 home-h2 fw-bold' >{ytdata.title}</h3>
                </section>
                <section className='overflow-scroll p-3 mx-auto mx-md-1 rounded vidscroll my-2 my-md-0' style={{ backgroundColor: 'rgb(248, 245, 245)' }}>
                    {
                        ytVideos.map((vid, idx) => {
                            const { id, title } = vid;
                            return <div key={id} className="shadow-sm p-2 p-lg-3 mx-auto mx-md-2 my-3 bg-white y_pointer" onClick={() => handleVideo(vid)}>
                                <h3 className='home-h3'>{idx + 1}. {title}</h3>
                            </div>
                        })
                    }
                    <div className="shadow-sm p-2 p-lg-3 rounded mx-auto mx-md-2 my-3 bg-white y_pointer">
                        <h3 className='home-h3'>Coming soon!</h3>
                    </div>
                </section>
            </div >
        </div>
    )
}

export default Youtube;