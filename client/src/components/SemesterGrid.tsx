import React from 'react';
import { useCurriculum } from '../context/CurriculumContext';
import CourseCard from './CourseCard';

const SemesterGrid: React.FC = () => {
    const { courses, loading, searchQuery } = useCurriculum();

    if (loading) return <div>Cargando malla...</div>;

    const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="semester-grid">
            {semesters.map(sem => (
                <div key={sem} className="semester-column">
                    <h3>Semestre {sem}</h3>
                    <div className="courses-list">
                        {courses
                            .filter(c => c.semester === sem)
                            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SemesterGrid;
