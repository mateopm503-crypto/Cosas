import { Course } from '../types';

const API_URL = '/api/courses';

export const fetchAllCourses = async (): Promise<Course[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
};

export const fetchCourseDetails = async (id: string): Promise<Course> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch course details');
    }
    return response.json();
};
