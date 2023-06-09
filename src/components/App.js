import React from 'react';
import CreateLink from './CreateLink';
import Header from './Header';
import LinkList from './LinkList';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Textdavinci from './text-davinci-003';
import ServiceDavinci from '../services/service.davinci-003';
import Imgdavinci003 from './img-davinci-003';
import OpenAI from './unirservice';
import  ChatComponent from './chat';
import EmojiComponent from './emoji';
import TraductorConsumidor from './traductor';
import Clasificationcomponent from './clasification';




function App() {
  // Crea una instancia del servicio con tu clave de API

  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList />} />
          <Route
            path="/create"
            element={<CreateLink />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/text-davinci-003" element={<Textdavinci />} />
          <Route path="/services/service.davinci-003" element={<ServiceDavinci />} />
          <Route path="/img-davinci-003" element={<Imgdavinci003 />} />
          <Route path="/unirservice" element={<OpenAI />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/emoji" element={<EmojiComponent />} />
          <Route path="/traductor" element={<TraductorConsumidor />} />
          <Route path="/clasification" element={<Clasificationcomponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
