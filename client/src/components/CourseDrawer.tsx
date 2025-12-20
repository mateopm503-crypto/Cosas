
import React, { useEffect, useState } from 'react';
import { useCurriculum } from '../context/CurriculumContext';

import { Course } from '../types';

const CourseDrawer: React.FC = () => {
    const { selectedCourse, closeDrawer, toggleApproved, approvedCourses, isLocked, customNames, setCustomName, courses } = useCurriculum();
    const [details, setDetails] = useState<Course | null>(null);

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
        </div>
    );
};

export default CourseDrawer;
