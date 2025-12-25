import { CurriculumProvider } from './context/CurriculumContext';
import SemesterGrid from './components/SemesterGrid';
import CourseDrawer from './components/CourseDrawer';
import SearchBar from './components/SearchBar';
import Chatbot from './components/Chatbot';
import ProgressBar from './components/ProgressBar';
import PrintHeader from './components/PrintHeader';
import CategoryLegend from './components/CategoryLegend';
import './index.css';

function App() {
    return (
        <CurriculumProvider>
            <div className="app-container">
                <PrintHeader />
                <header>
                    <div className="header-content">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/47/Escudo_Pontificia_Universidad_Cat%C3%B3lica_de_Chile.svg"
                            alt="Logo UC"
                            className="uc-logo"
                        />
                        <div className="header-titles">
                            <h1>Pedagogía en Educación General Básica</h1>
                            <p className="subtitle">Pontificia Universidad Católica de Chile</p>
                        </div>
                    </div>
                    <button className="print-btn" onClick={() => window.print()}>
                        🖨️ Imprimir
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
                <Chatbot />
                <CategoryLegend />
                <footer className="app-footer">
                    <span>Desarrollado por Mateo Parra</span>
                    <a href="https://www.instagram.com/cape_uc/" target="_blank" rel="noopener noreferrer" className="ig-link">
                        📷 @cape_uc
                    </a>
                </footer>
            </div>
        </CurriculumProvider>
    );
}

export default App;
