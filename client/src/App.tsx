import { CurriculumProvider } from './context/CurriculumContext';
import SemesterGrid from './components/SemesterGrid';
import CourseDrawer from './components/CourseDrawer';
import SearchBar from './components/SearchBar';
import Chatbot from './components/Chatbot';
import ProgressBar from './components/ProgressBar';
import PrintHeader from './components/PrintHeader';
import CategoryLegend from './components/CategoryLegend';
import GradeSimulator from './components/GradeSimulator';
import './index.css';

function App() {
    return (
        <CurriculumProvider>
            <div className="app-container">
                <PrintHeader />
                <header>
                    <div className="header-content">
                        <img
                            src="/Cosas/logo-uc.png"
                            alt="Logo UC"
                            className="uc-logo"
                        />
                        <div className="header-titles">
                            <h1>Pedagogía en Educación General Básica</h1>
                            <p className="subtitle">Pontificia Universidad Católica de Chile</p>
                        </div>
                    </div>
                    <button className="print-btn" onClick={() => window.print()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                        Imprimir
                    </button>
                    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                        <ProgressBar />
                    </div>
                </header>
                <div style={{ position: 'relative', width: '100%' }}>
                    <SearchBar />
                </div>
                <main>
                    <SemesterGrid />
                </main>
                <CourseDrawer />
                <GradeSimulator />
                <Chatbot />
                <CategoryLegend />
                <footer className="app-footer">
                    <span>Desarrollado por Mateo Parra</span>
                    <a href="https://www.instagram.com/cape_uc/" target="_blank" rel="noopener noreferrer" className="ig-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        @cape_uc
                    </a>
                </footer>
            </div>
        </CurriculumProvider>
    );
}

export default App;
