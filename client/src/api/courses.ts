import { Course } from '../types';
import curriculumData from '../data/curriculum.json';

const courses = curriculumData as Course[];

export const fetchAllCourses = async (): Promise<Course[]> => {
    // Simulate async to keep interface consistent
    return Promise.resolve(courses);
};

export const fetchCourseDetails = async (id: string): Promise<Course> => {
    const course = courses.find(c => c.id === id);
    if (!course) {
        throw new Error('Course not found');
    }
    return Promise.resolve(course);
};
