import React, { useMemo } from 'react';
import { useCurriculum } from '../context/CurriculumContext';

const ProgressBar: React.FC = () => {
    const { courses, approvedCourses } = useCurriculum();

    const total = courses.length;
    const approved = approvedCourses.size;
    const percentage = useMemo(() => {
        if (total === 0) return 0;
        return Math.round((approved / total) * 100);
    }, [total, approved]);

    return (
        <div className="progress-container">
            <div className="progress-label">
                <span>Progreso de la Carrera</span>
                <strong>{percentage}%</strong>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="progress-message">
                {percentage === 0 && "¡Comienza tu camino!"}
                {percentage > 0 && percentage < 100 && (
                    <span>Faltan <strong>{total - approved}</strong> ramos</span>
                )}
                {percentage === 100 && "¡Felicitaciones! Completaste la malla."}
            </div>
        </div>
    );
};

export default ProgressBar;
