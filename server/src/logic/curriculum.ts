import fs from 'fs';
import path from 'path';
import { Course } from '../types';

const dataPath = path.join(__dirname, '../../../data/curriculum.json');
const courses: Course[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

export const getAllCourses = (): Course[] => {
    return courses;
};

export const getCourse = (id: string): Course | undefined => {
    return courses.find(c => c.id === id);
};

export const getPrerequisites = (id: string): Course[] => {
    const course = getCourse(id);
    if (!course) return [];
    return course.prerequisites
        .map(prereqId => getCourse(prereqId))
        .filter((c): c is Course => c !== undefined);
};

export const getDependents = (id: string): Course[] => {
    return courses.filter(c => c.prerequisites.includes(id));
};

export const canTake = (id: string, approvedSet: Set<string>): boolean => {
    const course = getCourse(id);
    if (!course) return false;
    return course.prerequisites.every(prereqId => approvedSet.has(prereqId));
};
