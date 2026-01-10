import { Router } from 'express';
import { getAllCourses, getCourse, getDependents, getPrerequisites } from '../logic/curriculum';

const router = Router();

router.get('/', (req, res) => {
    const courses = getAllCourses();
    res.json(courses);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const course = getCourse(id);

    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }

    const prerequisites = getPrerequisites(id);
    const dependents = getDependents(id);

    res.json({
        ...course,
        prerequisitesData: prerequisites, // Enriched data
        dependentsData: dependents // Enriched data
    });
});

export default router;
