import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import OurGroup from './components/pages/Team/OurGroup';
import Events from './components/pages/Events/Events';
import NavBar from './components/navbar/NavBar';
import Youtube from './components/pages/Youtube/Youtube';
import Winners from './components/pages/HallOfWinners/Winners';
import AdminPass from './admin/admin.pass';
import { TeamContextProvider } from './context/Team.context';
import { EventsContextProvider } from './context/Events.context';
import { WinnersContextProvider } from './context/winners.context';
import { AdminContextProvider } from './context/admin.context';
import { YoutubeContextProvider } from './context/youtube.context';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import { Helmet } from "react-helmet";
function App() {
  return (
    <div className='body vh-100' >
      <NavBar />
      <Helmet>
        <title>Vsn IT Club</title>
        <meta name="description" content='Discover more about the work we perform at the VSN IT Club.' />
        <meta name="Keywords" content='Nepal, vsnitclub, VSN IT CLUB, Vsn IT Club, vs niketan, VSN, vsn, VS NIKETAN' />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourgroup" element={<TeamContextProvider><OurGroup /></TeamContextProvider>} />
        <Route path="/events/*" element={<EventsContextProvider><Events /></EventsContextProvider>} />
        <Route path="/workshops" element={<YoutubeContextProvider> <Youtube /></YoutubeContextProvider>} />
        <Route path="/winners" element={<WinnersContextProvider><Winners /></WinnersContextProvider>} />
        <Route path="/accessvsnadmin/*" element={<AdminContextProvider><AdminPass /></AdminContextProvider>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
