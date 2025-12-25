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
                    <h1>Malla Curricular Pedagogía Básica UC</h1>
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
                    Desarrollado por Mateo Parra
                </footer>
            </div>
        </CurriculumProvider>
    );
}

export default App;
