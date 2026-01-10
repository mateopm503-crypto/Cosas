import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { MENCIONES } from '../data/mencionData';
import { useCurriculum } from '../context/CurriculumContext';

// SVG Icons for each mención
const MencionIcons: Record<string, JSX.Element> = {
    matematica: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    ),
    lenguaje: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
    ),
    cs_naturales: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"></ellipse>
        </svg>
    ),
    historia_geografia: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    )
};

const MencionButton: React.FC = () => {
    const { selectedMencion, setSelectedMencion } = useCurriculum();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    const currentMencion = MENCIONES.find(m => m.id === selectedMencion);

    const modal = isOpen ? ReactDOM.createPortal(
        <div className="mencion-selector-overlay" onClick={() => setIsOpen(false)}>
            <div className="mencion-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="mencion-selector-header">
                    <h3>Selecciona tu Mención</h3>
                    <button className="mencion-close-btn" onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="mencion-options">
                    {MENCIONES.map(mencion => (
                        <button
                            key={mencion.id}
                            className={`mencion-option ${selectedMencion === mencion.id ? 'selected' : ''}`}
                            style={{
                                borderColor: hoveredOption === mencion.id || selectedMencion === mencion.id ? mencion.color : 'transparent',
                                backgroundColor: selectedMencion === mencion.id ? `${mencion.color}15` : undefined
                            }}
                            onClick={() => {
                                setSelectedMencion(mencion.id);
                                setIsOpen(false);
                            }}
                            onMouseEnter={() => setHoveredOption(mencion.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            <span className="mencion-icon" style={{ backgroundColor: mencion.color }}>
                                {MencionIcons[mencion.id]}
                            </span>
                            <span className="mencion-name">{mencion.name}</span>
                            {selectedMencion === mencion.id && (
                                <svg className="mencion-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={mencion.color} strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                <p className="mencion-hint">
                    Los cursos de mención en semestres IX y X se actualizarán según tu selección
                </p>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <button
                className="mencion-btn"
                onClick={() => setIsOpen(true)}
                style={currentMencion ? { borderColor: currentMencion.color } : undefined}
            >
                {currentMencion ? (
                    <>
                        <span className="mencion-btn-icon" style={{ backgroundColor: currentMencion.color }}>
                            {MencionIcons[currentMencion.id]}
                        </span>
                        <span className="mencion-btn-text">{currentMencion.name}</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Seleccionar Mención
                    </>
                )}
            </button>
            {modal}
        </>
    );
};

export default MencionButton;
