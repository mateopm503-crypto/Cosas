import React, { createContext, useContext, useEffect, useState } from 'react';
import { Course } from '../types';
import { fetchAllCourses } from '../api/courses';

interface CurriculumContextType {
    courses: Course[];
    approvedCourses: Set<string>;
    selectedCourse: Course | null;
    loading: boolean;
    toggleApproved: (id: string) => void;
    selectCourse: (id: string) => void;
    closeDrawer: () => void;
    isLocked: (id: string) => boolean;
    isPrerequisite: (id: string) => boolean;
    isDependent: (id: string) => boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    customNames: Record<string, string>;
    setCustomName: (id: string, name: string) => void;
    hoveredCourse: string | null;
    setHoveredCourse: (id: string | null) => void;
    selectedMencion: string | null;
    setSelectedMencion: (mencionId: string | null) => void;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [approvedCourses, setApprovedCourses] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('approvedCourses');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [customNames, setCustomNames] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem('customCourseNames');
        return saved ? JSON.parse(saved) : {};
    });
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMencion, setSelectedMencionState] = useState<string | null>(() => {
        return localStorage.getItem('selectedMencion');
    });

    useEffect(() => {
        fetchAllCourses().then(data => {
            setCourses(data);
            setLoading(false);
        }).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses)));
    }, [approvedCourses]);

    useEffect(() => {
        localStorage.setItem('customCourseNames', JSON.stringify(customNames));
    }, [customNames]);

    useEffect(() => {
        if (selectedMencion) {
            localStorage.setItem('selectedMencion', selectedMencion);
        } else {
            localStorage.removeItem('selectedMencion');
        }
    }, [selectedMencion]);

    const setSelectedMencion = (mencionId: string | null) => {
        setSelectedMencionState(mencionId);
    };

    const toggleCourseApproval = (courseId: string) => {
        setApprovedCourses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(courseId)) {
                newSet.delete(courseId);
            } else {
                newSet.add(courseId);
            }
            return newSet;
        });
    };

    const setCustomName = (courseId: string, name: string) => {
        setCustomNames(prev => ({
            ...prev,
            [courseId]: name
        }));
    };

    const selectCourse = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        setSelectedCourse(course || null);
    };

    const closeDrawer = () => setSelectedCourse(null);

    const getCourseById = (id: string) => courses.find(c => c.id === id);

    const isLocked = (courseId: string) => {
        const course = getCourseById(courseId);
        if (!course) return false;
        return course.prerequisites.some(prereqId => !approvedCourses.has(prereqId));
    };

    const isPrerequisite = (id: string) => {
        if (!selectedCourse) return false;
        return selectedCourse.prerequisites.includes(id);
    };

    const isDependent = (id: string) => {
        if (!selectedCourse) return false;
        // Check if the current course (id) has selectedCourse as a prerequisite
        const course = getCourseById(id);
        return course ? course.prerequisites.includes(selectedCourse.id) : false;
    };

    return (
        <CurriculumContext.Provider value={{
            courses,
            approvedCourses,
            selectedCourse,
            loading,
            toggleApproved: toggleCourseApproval,
            selectCourse,
            closeDrawer,
            isLocked,
            isPrerequisite,
            isDependent,
            searchQuery,
            setSearchQuery,
            customNames,
            setCustomName,
            hoveredCourse,
            setHoveredCourse,
            selectedMencion,
            setSelectedMencion
        }}>
            {children}
        </CurriculumContext.Provider>
    );
};

export const useCurriculum = () => {
    const context = useContext(CurriculumContext);
    if (!context) throw new Error('useCurriculum must be used within a CurriculumProvider');
    return context;
};
