import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Layout from './components/Layout.jsx';
import Profile from './views/Profile.jsx';
import Upload from './views/Upload.jsx';
import Single from './views/Single.jsx';
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
