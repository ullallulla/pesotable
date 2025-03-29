import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import PrintablePage from './components/PrintablePage';
import UploadPage from './components/UploadPage';
import ModelViewer from './components/ModelViewer';
import PostHogPageView from './lib/pageview';
// import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import ModelsAdminPage from './components/ModelsAdminPage';
import NewModelPage from './components/NewModelPage';

const App = () => {
    return (
        <Router>
            <PostHogPageView />
            <Header />
            {/* <ScrollToTop> */}
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/printable/:id' element={<PrintablePage />} />
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/model' element={<ModelViewer />} />

                    <Route element={<AdminPanel />} >
                        <Route path='/admin' element={<h2>Dashboard</h2>} />
                        <Route path="/admin/models" element={<ModelsAdminPage />} />
                        <Route path="/admin/models/new" element={<NewModelPage />} />
                    </Route>
                </Routes>
            {/* </ScrollToTop> */}
            <Footer />
        </Router>
    );
};

export default App;
