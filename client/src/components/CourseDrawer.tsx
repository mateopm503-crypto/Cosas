
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useCurriculum } from '../context/CurriculumContext';
import { isMencionCourse, MENCIONES } from '../data/mencionData';
import { Course } from '../types';

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

const CourseDrawer: React.FC = () => {
    const { selectedCourse, closeDrawer, toggleApproved, approvedCourses, isLocked, customNames, setCustomName, courses, selectedMencion, setSelectedMencion } = useCurriculum();
    const [details, setDetails] = useState<Course | null>(null);
    const [showMencionModal, setShowMencionModal] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCourse) {
            // Fetch details again to get enriched data (prereqs names, dependents) if not already present
            // Actually, our API returns enriched data on getById.
            // But selectedCourse in context might be just the basic info if we set it from the list.
            // Wait, selectCourse in context ALREADY fetches details. So selectedCourse IS the detailed one.
            setDetails(selectedCourse);
        } else {
            setDetails(null);
        }
    }, [selectedCourse]);

    if (!selectedCourse || !details) return null;

    const isApproved = selectedCourse ? approvedCourses.has(selectedCourse.id) : false;
    const locked = isLocked(selectedCourse.id);

    // Allow renaming if it's an elective
    const isElective = selectedCourse && (
        selectedCourse.name.includes('Electivo') ||
        selectedCourse.name.includes('Optativo') ||
        selectedCourse.id.includes('ELECTIVO') ||
        selectedCourse.id.includes('OPT')
    );

    const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedCourse) return;
        setCustomName(selectedCourse.id, e.target.value);
    };

    const handleDrawerClose = () => {
        closeDrawer();
    };

    return (
        <div className="drawer-overlay" onClick={handleDrawerClose}>
            <div className="drawer-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={handleDrawerClose}>&times;</button>

                {isElective ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>
                            Nombre del Ramo (Editable):
                        </label>
                        <input
                            type="text"
                            value={customNames[selectedCourse.id] || selectedCourse.name}
                            onChange={handleRename}
                            style={{
                                width: '100%',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                color: 'var(--primary-dark)'
                            }}
                        />
                    </div>
                ) : (
                    <h2>{selectedCourse.name}</h2>
                )}

                {(() => {
                    const getCategoryDetails = (c: Course) => {
                        const name = c.name.toLowerCase();
                        const id = c.id;

                        // Mención
                        if (name.includes('mención') || id.includes('MENCION'))
                            return { label: 'Mención', color: '#757575' }; // Grey

                        // Formación General & Teología
                        if (name.includes('formación general') || name.includes('teológica') || name.includes('filosofía') || name.includes('ética') || name.includes('antropología') || id.includes('ELECTIVO_FG') || id.includes('ELECTIVO_TEOL'))
                            return { label: 'Formación General', color: '#FBC02D' }; // Yellow

                        // Optativo de Profundización
                        if ((name.includes('optativo') || id.includes('OPT')) && !name.includes('general'))
                            return { label: 'Optativo de Profundización', color: '#29B6F6' }; // Light Blue

                        // Titulación (Prácticas Profesionales y Seminario, Gestión y Liderazgo, Prácticas I-III)
                        const titCourses = ['practica i', 'práctica i', 'practica ii', 'práctica ii', 'practica iii', 'práctica iii', 'gestión y liderazgo', 'gestion y liderazgo'];
                        if (name.includes('práctica profesional') || name.includes('seminario') || id.includes('PRACTICA_PROF') || id.includes('SEMIN') || titCourses.some(t => name.toLowerCase().includes(t)))
                            return { label: 'Mínimo de Titulación', color: '#4A148C' }; // Purple

                        // Default: Mínimo Disciplinario
                        return { label: 'Mínimo Disciplinario', color: '#1976D2' }; // Standard Blue
                    };

                    const cat = getCategoryDetails(selectedCourse);

                    return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: cat.color,
                                display: 'inline-block'
                            }}></span>
                            <span style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                fontWeight: 500
                            }}>
                                {cat.label}
                            </span>
                        </div>
                    );
                })()}

                <p className="description">
                    {selectedCourse.description}
                </p>

                <div className="section">
                    <h3>Prerrequisitos</h3>
                    {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 ? (
                        <ul>
                            {selectedCourse.prerequisites.map(prereqId => {
                                const prereq = courses.find(c => c.id === prereqId);
                                return (
                                    <li key={prereqId}>
                                        {prereq ? prereq.name : prereqId}
                                        {approvedCourses.has(prereqId) ? ' ✓' : ' (Pendiente)'}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No tiene prerrequisitos.</p>
                    )}
                </div>

                <div className="section">
                    <h3>Cursos que abre (Dependientes)</h3>
                    {(() => {
                        const dependents = courses.filter(c => c.prerequisites.includes(selectedCourse.id));
                        return dependents.length > 0 ? (
                            <ul>
                                {dependents.map(d => (
                                    <li key={d.id}>{d.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No es prerrequisito de otros cursos.</p>
                        );
                    })()}
                </div>

                <div className="actions">
                    {isMencionCourse(selectedCourse.id) && (
                        <button
                            className="action-btn mencion-action-btn"
                            onClick={() => setShowMencionModal(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                            {selectedMencion ? 'Cambiar Mención' : 'Seleccionar Mención'}
                        </button>
                    )}
                    <button
                        className={`action-btn ${isApproved ? 'is-approved' : ''} ${locked && !isApproved ? 'locked-btn' : ''}`}
                        onClick={() => toggleApproved(selectedCourse.id)}
                        disabled={locked && !isApproved}
                        style={{
                            opacity: locked && !isApproved ? 0.6 : 1,
                            cursor: locked && !isApproved ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isApproved ? 'Desmarcar como Aprobado' : locked ? 'Bloqueado (Prerrequisitos)' : 'Marcar como Aprobado'}
                    </button>
                </div>
            </div>

            {/* Mención Selector Modal */}
            {showMencionModal && ReactDOM.createPortal(
                <div className="mencion-selector-overlay" onClick={() => setShowMencionModal(false)}>
                    <div className="mencion-selector-modal" onClick={e => e.stopPropagation()}>
                        <div className="mencion-selector-header">
                            <h3>Selecciona tu Mención</h3>
                            <button className="mencion-close-btn" onClick={() => setShowMencionModal(false)}>
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
                                        setShowMencionModal(false);
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
            )}
        </div>
    );
};

export default CourseDrawer;

