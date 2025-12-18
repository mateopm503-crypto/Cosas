import React, { useEffect, useState } from 'react';
import { useCurriculum } from '../context/CurriculumContext';

interface Point {
    x: number;
    y: number;
}

const ConnectionsOverlay: React.FC = () => {
    const { hoveredCourse, courses } = useCurriculum();
    const [lines, setLines] = useState<{ start: Point; end: Point; type: 'prereq' | 'dependent' }[]>([]);

    useEffect(() => {
        if (!hoveredCourse) {
            setLines([]);
            return;
        }

        const updateLines = () => {
            const course = courses.find(c => c.id === hoveredCourse);
            if (!course) return;

            const newLines: { start: Point; end: Point; type: 'prereq' | 'dependent' }[] = [];
            const originEl = document.getElementById(`course-card-${hoveredCourse}`);

            if (!originEl) return;
            const originRect = originEl.getBoundingClientRect();
            // Calculate absolute position relative to the grid container logic or just offset by scroll?
            // Since this component will be fixed/absolute over the entire window or main area.
            // Best is Fixed position SVG over the screen.

            const getCenter = (rect: DOMRect): Point => ({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });

            const origin = getCenter(originRect);

            // Prereqs (Incoming lines)
            course.prerequisites.forEach(pid => {
                const el = document.getElementById(`course-card-${pid}`);
                if (el) {
                    newLines.push({
                        start: getCenter(el.getBoundingClientRect()),
                        end: origin,
                        type: 'prereq'
                    });
                }
            });

            // Dependents (Outgoing lines)
            // Need to find courses that have this as prereq
            const dependents = courses.filter(c => c.prerequisites.includes(hoveredCourse));
            dependents.forEach(dep => {
                const el = document.getElementById(`course-card-${dep.id}`);
                if (el) {
                    newLines.push({
                        start: origin,
                        end: getCenter(el.getBoundingClientRect()),
                        type: 'dependent'
                    });
                }
            });

            setLines(newLines);
        };

        updateLines();
        window.addEventListener('resize', updateLines);
        window.addEventListener('scroll', updateLines, true);

        return () => {
            window.removeEventListener('resize', updateLines);
            window.removeEventListener('scroll', updateLines, true);
        };
    }, [hoveredCourse, courses]);

    if (!hoveredCourse || lines.length === 0) return null;

    return (
        <svg
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 900
            }}
        >
            {lines.map((line, i) => {
                const dx = line.end.x - line.start.x;
                const c1 = { x: line.start.x + dx * 0.4, y: line.start.y };
                const c2 = { x: line.end.x - dx * 0.4, y: line.end.y };

                // Elegant colors: 
                // Prereq (incoming): Dark Gray/Black fading in? 
                // Dependent (outgoing): Primary Color?
                // Visual consistency:
                // Pre-requisite lines (Card needs these): Grey/Orange
                // Dependent lines (Card unlocks these): Green/Blue

                // User said "Esa flecha quedo fea". 
                // Suggestion: Solid subtle curved lines.
                // Let's use a nice Gradient stroke? No, simple stroke.

                const isPrereq = line.type === 'prereq';
                const strokeColor = isPrereq ? '#FF8A65' : '#4DB6AC'; // Stronger but pleasant Coral vs Teal

                return (
                    <g key={i}>
                        <path
                            d={`M ${line.start.x} ${line.start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${line.end.x} ${line.end.y}`}
                            stroke={strokeColor}
                            strokeWidth="2" // Thinner
                            fill="none"
                            strokeDasharray="5,5" // Dashed line feels less invasive? Or solid?
                            // Let's try Solid for elegance.
                            // strokeDasharray="none"
                            style={{ opacity: 0.6 }}
                        />
                        <circle cx={line.end.x} cy={line.end.y} r="3" fill={strokeColor} /> {/* Subtle dot at end instead of arrow */}
                    </g>

                );
            })}
        </svg>
    );
};

export default ConnectionsOverlay;
