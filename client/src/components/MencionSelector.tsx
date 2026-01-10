import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { MENCIONES, Mencion } from '../data/mencionData';
import { useCurriculum } from '../context/CurriculumContext';

interface MencionSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
}

// SVG Icons for each mención
const MencionIcons: Record<string, JSX.Element> = {
    matematica: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="12" y1="19" x2="12" y2="21"></line>
            <line x1="12" y1="3" x2="12" y2="5"></line>
            <line x1="3" y1="12" x2="5" y2="12"></line>
            <line x1="19" y1="12" x2="21" y2="12"></line>
        </svg>
    ),
    lenguaje: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <line x1="8" y1="7" x2="16" y2="7"></line>
            <line x1="8" y1="11" x2="16" y2="11"></line>
            <line x1="8" y1="15" x2="12" y2="15"></line>
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

const MencionSelector: React.FC<MencionSelectorProps> = ({ isOpen, onClose, courseId }) => {
    const { selectedMencion, setSelectedMencion, approvedCourses, toggleApproved } = useCurriculum();
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSelect = (mencion: Mencion) => {
        setSelectedMencion(mencion.id);
    };

    const isApproved = approvedCourses.has(courseId);
    const currentMencion = MENCIONES.find(m => m.id === selectedMencion);

    const handleApprove = () => {
        toggleApproved(courseId);
    };

    return ReactDOM.createPortal(
        <div className="mencion-selector-overlay" onClick={onClose}>
            <div className="mencion-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="mencion-selector-header">
                    <h3>Selecciona tu Mención</h3>
                    <button className="mencion-close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {currentMencion && (
                    <div className="current-mencion">
                        <span>Actual:</span>
                        <span className="current-mencion-name" style={{ backgroundColor: currentMencion.color }}>
                            {currentMencion.name}
                        </span>
                    </div>
                )}

                <div className="mencion-options">
                    {MENCIONES.map(mencion => (
                        <button
                            key={mencion.id}
                            className={`mencion-option ${selectedMencion === mencion.id ? 'selected' : ''}`}
                            style={{
                                borderColor: hoveredOption === mencion.id || selectedMencion === mencion.id ? mencion.color : 'transparent',
                                backgroundColor: selectedMencion === mencion.id ? `${mencion.color}15` : undefined
                            }}
                            onClick={() => handleSelect(mencion)}
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

                <button
                    className={`mencion-approve-btn ${isApproved ? 'is-approved' : ''}`}
                    onClick={handleApprove}
                >
                    {isApproved ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Curso Aprobado
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="16 12 12 8 8 12"></polyline>
                                <line x1="12" y1="16" x2="12" y2="8"></line>
                            </svg>
                            Marcar como Aprobado
                        </>
                    )}
                </button>

                <p className="mencion-hint">
                    Los cursos de mención en semestres IX y X se actualizarán según tu selección
                </p>
            </div>
        </div>,
        document.body
    );
};

export default MencionSelector;

