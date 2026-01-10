import React from 'react';
import { Course } from '../types';
import { useCurriculum } from '../context/CurriculumContext';
import { isMencionCourse, getMencionCourseName } from '../data/mencionData';

interface CourseCardProps {
    course: Course;
}

const getCategory = (name: string, id: string) => {
    const n = name.toLowerCase();

    // Mención
    if (n.includes('mención') || id.includes('MENCION'))
        return { type: 'mencion' }; // Grey

    // Formación General & Teología
    if (n.includes('formación general') || n.includes('teológica') || n.includes('filosofía') || n.includes('ética') || n.includes('antropología') || id.includes('ELECTIVO_FG') || id.includes('ELECTIVO_TEOL'))
        return { type: 'general' }; // Yellow

    // Optativo de Profundización
    if ((n.includes('optativo') || id.includes('OPT')) && !n.includes('general'))
        return { type: 'profundizacion' }; // Light Blue

    // Titulación (Prácticas Profesionales y Seminario, Gestión y Liderazgo, Prácticas I-III)
    const titCourses = ['practica i', 'práctica i', 'practica ii', 'práctica ii', 'practica iii', 'práctica iii', 'gestión y liderazgo', 'gestion y liderazgo'];
    if (n.includes('práctica profesional') || n.includes('seminario') || id.includes('PRACTICA_PROF') || id.includes('SEMIN') || titCourses.some(t => n.includes(t)))
        return { type: 'titulacion' }; // Purple

    return { type: 'disciplinario' }; // Regular Blue
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { approvedCourses, selectCourse, isLocked, customNames, selectedMencion } = useCurriculum();

    const isApproved = approvedCourses.has(course.id);
    const locked = isLocked(course.id);
    const isMencion = isMencionCourse(course.id);

    // Get display name: mención-specific name > custom name > original name
    let displayName = course.name;
    if (isMencion && selectedMencion) {
        const mencionName = getMencionCourseName(course.id, selectedMencion);
        if (mencionName) displayName = mencionName;
    } else if (customNames[course.id]) {
        displayName = customNames[course.id];
    }

    const { type } = getCategory(course.name, course.id);

    let className = `course-card category-${type}`;
    if (isApproved) className += ' approved';
    if (locked) className += ' locked';

    return (
        <div
            id={`course-card-${course.id}`}
            className={className}
            onClick={() => selectCourse(course.id)}
            title={locked ? 'Prerrequisitos no cumplidos' : displayName}
        >
            <div className="card-header">
                {isApproved && <span className="status-icon">✓</span>}
                {locked && <span className="status-icon lock-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></span>}
            </div>
            <div className="course-name">{displayName}</div>
        </div>
    );
};

export default CourseCard;
