import React from 'react';
import { useCurriculum } from '../context/CurriculumContext';

const PrintHeader: React.FC = () => {
    const { courses, approvedCourses } = useCurriculum();

    const total = courses.length;
    const approved = approvedCourses.size;
    const percentage = total > 0 ? Math.round((approved / total) * 100) : 0;
    const date = new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="print-only-header">
            <h1>Reporte de Avance Curricular</h1>
            <h2>Pedagogía en Educación General Básica - UC</h2>
            <div className="print-meta">
                <p><strong>Fecha de emisión:</strong> {date}</p>
                <div className="print-stats">
                    <p><strong>Progreso:</strong> {percentage}% Completado</p>
                    <p><strong>Cursos Aprobados:</strong> {approved} de {total}</p>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default PrintHeader;
