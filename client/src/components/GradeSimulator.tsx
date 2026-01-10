import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCurriculum } from '../context/CurriculumContext';

// Types for grade management
interface Evaluation {
    name: string;
    grade: number | null;
    weight: number; // percentage 0-100
}

interface CourseGrades {
    evaluations: Evaluation[];
}

const GradeSimulator: React.FC = () => {
    const { courses } = useCurriculum();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(1);

    // Load grades from localStorage
    const [grades, setGrades] = useState<Record<string, CourseGrades>>(() => {
        const saved = localStorage.getItem('courseGrades');
        return saved ? JSON.parse(saved) : {};
    });

    // Save grades to localStorage
    useEffect(() => {
        localStorage.setItem('courseGrades', JSON.stringify(grades));
    }, [grades]);

    // Get courses for selected semester
    const semesterCourses = courses.filter(c => c.semester === selectedSemester);

    // Initialize evaluations for a course if not exists
    const initializeCourse = (courseId: string) => {
        if (!grades[courseId]) {
            setGrades(prev => ({
                ...prev,
                [courseId]: {
                    evaluations: [
                        { name: 'Evaluación 1', grade: null, weight: 30 },
                        { name: 'Evaluación 2', grade: null, weight: 30 },
                        { name: 'Examen', grade: null, weight: 40 }
                    ]
                }
            }));
        }
    };

    // Update a grade - clamp between 1 and 7
    const updateGrade = (courseId: string, evalIndex: number, gradeValue: number | null) => {
        let grade = gradeValue;
        if (grade !== null) {
            grade = Math.max(1, Math.min(7, grade));
            grade = Math.round(grade * 10) / 10; // Round to 1 decimal
        }
        setGrades(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                evaluations: prev[courseId].evaluations.map((e, i) =>
                    i === evalIndex ? { ...e, grade } : e
                )
            }
        }));
    };

    // Update evaluation weight - clamp between 0 and 100
    const updateWeight = (courseId: string, evalIndex: number, weightValue: number) => {
        const weight = Math.max(0, Math.min(100, weightValue));
        setGrades(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                evaluations: prev[courseId].evaluations.map((e, i) =>
                    i === evalIndex ? { ...e, weight } : e
                )
            }
        }));
    };

    // Add evaluation
    const addEvaluation = (courseId: string) => {
        setGrades(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                evaluations: [
                    ...prev[courseId].evaluations,
                    { name: `Evaluación ${prev[courseId].evaluations.length + 1}`, grade: null, weight: 0 }
                ]
            }
        }));
    };

    // Remove evaluation
    const removeEvaluation = (courseId: string, evalIndex: number) => {
        setGrades(prev => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                evaluations: prev[courseId].evaluations.filter((_, i) => i !== evalIndex)
            }
        }));
    };

    // Calculate weighted average for a course
    const calculateAverage = (courseId: string): number | null => {
        const courseGrades = grades[courseId];
        if (!courseGrades) return null;

        const validEvals = courseGrades.evaluations.filter(e => e.grade !== null && e.weight > 0);
        if (validEvals.length === 0) return null;

        const totalWeight = validEvals.reduce((sum, e) => sum + e.weight, 0);
        const weightedSum = validEvals.reduce((sum, e) => sum + (e.grade! * e.weight), 0);

        return totalWeight > 0 ? weightedSum / totalWeight : null;
    };

    // Calculate semester average
    const calculateSemesterAverage = (): number | null => {
        const averages = semesterCourses
            .map(c => calculateAverage(c.id))
            .filter((avg): avg is number => avg !== null);

        if (averages.length === 0) return null;
        return averages.reduce((sum, avg) => sum + avg, 0) / averages.length;
    };

    // Render toggle button
    if (!isOpen) {
        return (
            <button className="grade-simulator-toggle" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3z" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                </svg>
                Simular Notas
            </button>
        );
    }

    const panel = (
        <div className="grade-simulator-overlay" onClick={() => setIsOpen(false)}>
            <div className="grade-simulator-panel" onClick={e => e.stopPropagation()}>
                <div className="grade-simulator-header">
                    <h2>Simulador de Notas</h2>
                    <button className="grade-close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>

                <div className="semester-selector">
                    <label>Semestre:</label>
                    <select
                        value={selectedSemester}
                        onChange={e => setSelectedSemester(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                            <option key={s} value={s}>Semestre {s}</option>
                        ))}
                    </select>
                </div>

                <div className="grade-courses-list">
                    {semesterCourses.map(course => {
                        // Initialize on first render
                        if (!grades[course.id]) {
                            initializeCourse(course.id);
                            return null; // Will re-render with initialized data
                        }

                        const avg = calculateAverage(course.id);
                        const isPassing = avg !== null && avg >= 4.0;
                        const courseGrades = grades[course.id];

                        return (
                            <div key={course.id} className="grade-course-card">
                                <div className="grade-course-header">
                                    <h4>{course.name}</h4>
                                    {avg !== null && (
                                        <span className={`grade-average ${isPassing ? 'passing' : 'failing'}`}>
                                            {avg.toFixed(1)} {isPassing ? '✓' : '✗'}
                                        </span>
                                    )}
                                </div>

                                <div className="grade-evaluations">
                                    {courseGrades.evaluations.map((evaluation, idx) => (
                                        <div key={idx} className="grade-evaluation-row">
                                            <input
                                                type="text"
                                                className="eval-name"
                                                value={evaluation.name}
                                                onChange={e => {
                                                    setGrades(prev => ({
                                                        ...prev,
                                                        [course.id]: {
                                                            ...prev[course.id],
                                                            evaluations: prev[course.id].evaluations.map((ev, i) =>
                                                                i === idx ? { ...ev, name: e.target.value } : ev
                                                            )
                                                        }
                                                    }));
                                                }}
                                            />
                                            <input
                                                type="number"
                                                className="eval-grade"
                                                placeholder="Nota"
                                                min="1"
                                                max="7"
                                                step="0.1"
                                                value={evaluation.grade ?? ''}
                                                onChange={e => updateGrade(course.id, idx, e.target.value ? Number(e.target.value) : null)}
                                            />
                                            <div className="eval-weight">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={evaluation.weight}
                                                    onChange={e => updateWeight(course.id, idx, Number(e.target.value))}
                                                />
                                                <span>%</span>
                                            </div>
                                            <button
                                                className="eval-delete"
                                                onClick={() => removeEvaluation(course.id, idx)}
                                                title="Eliminar"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="add-evaluation-btn"
                                        onClick={() => addEvaluation(course.id)}
                                    >
                                        + Agregar evaluación
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grade-summary">
                    <div className="summary-item">
                        <span>Promedio Semestre {selectedSemester}:</span>
                        <strong>{calculateSemesterAverage()?.toFixed(1) ?? '—'}</strong>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(panel, document.body);
};

export default GradeSimulator;
