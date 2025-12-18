import React from 'react';
import { Course } from '../types';
import { useCurriculum } from '../context/CurriculumContext';

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

    // Default: Mínimo Disciplinario (includes Practices I, II, III which are disciplinarios typically, or we can check with user. 
    // Usually Practica I-III are disciplinarios in this context or general education, but let's default to Disciplinario as it's the "Main" blue)
    return { type: 'disciplinario' }; // Regular Blue
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { approvedCourses, selectCourse, isLocked, customNames } = useCurriculum();

    const isApproved = approvedCourses.has(course.id);
    const locked = isLocked(course.id);
    const displayName = customNames[course.id] || course.name;
    const { type } = getCategory(course.name, course.id); // Base category on original name to keep consistent colors

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
                {locked && <span className="status-icon">🔒</span>}
            </div>
            <div className="course-name">{displayName}</div>
        </div>
    );
};

export default CourseCard;
