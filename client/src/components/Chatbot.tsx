import React, { useState, useEffect, useRef } from 'react';
import { useCurriculum } from '../context/CurriculumContext';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const { courses } = useCurriculum();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: '¡Hola! Soy tu asistente curricular. ¿En qué puedo ayudarte?', sender: 'bot' }
    ]);
    const [selectingCourse, setSelectingCourse] = useState(false);
    const [courseSearch, setCourseSearch] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, selectingCourse, courseSearch]);

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
    };

    const handleQuestion = (type: 'description' | 'prerequisites' | 'random_desc' | 'search_course') => {
        if (type === 'random_desc') {
            // Pick a random course
            if (courses.length === 0) return;
            const randomCourse = courses[Math.floor(Math.random() * courses.length)];
            addMessage(`¿De qué trata ${randomCourse.name}?`, 'user');

            setTimeout(() => {
                addMessage(randomCourse.description || "No tengo información sobre este curso.", 'bot');
            }, 500);
        } else if (type === 'prerequisites') {
            addMessage("¿Qué ramos tienen requisitos?", 'user');
            setTimeout(() => {
                const withPrereqs = courses.filter(c => c.prerequisites && c.prerequisites.length > 0);
                const names = withPrereqs.slice(0, 5).map(c => c.name).join(', '); // Show first 5 to avoid spam
                const remaining = withPrereqs.length - 5;
                let msg = `Hay ${withPrereqs.length} cursos con requisitos. Algunos son: ${names}.`;
                if (remaining > 0) msg += ` ...y ${remaining} más.`;
                addMessage(msg, 'bot');
            }, 500);
        } else if (type === 'search_course') {
            setSelectingCourse(true);
            setCourseSearch('');
            // Don't add user message yet, wait for selection
        }
    };

    const handleCourseSelect = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        setSelectingCourse(false);
        addMessage(`¿De qué trata ${course.name}?`, 'user');
        setTimeout(() => {
            addMessage(course.description || "No tengo información detallada.", 'bot');
        }, 500);
    };

    const suggestions = [
        { label: '¿De qué trata el ramo...?', action: () => handleQuestion('search_course') },
        { label: '¿De qué trata un ramo al azar?', action: () => handleQuestion('random_desc') },
        { label: '¿Qué ramos tienen requisitos?', action: () => handleQuestion('prerequisites') },
    ];

    if (!isOpen) {
        return (
            <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                💬 Ayuda
            </button>
        );
    }

    return (
        <div className="chatbot-window">
            <div className="chatbot-header">
                <h3>Asistente Virtual</h3>
                <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            <div className="chatbot-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-suggestions">
                {selectingCourse ? (
                    <div className="course-selector">
                        <div className="selector-header">
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>Elige un ramo:</span>
                            <button className="cancel-btn" onClick={() => setSelectingCourse(false)}>Cancelar</button>
                        </div>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Escribe para buscar..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            className="mini-search"
                        />
                        <div className="mini-list">
                            {courses
                                .filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()))
                                .slice(0, 5) // Limit results
                                .map(c => (
                                    <button key={c.id} onClick={() => handleCourseSelect(c.id)}>
                                        {c.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                ) : (
                    suggestions.map((s, idx) => (
                        <button key={idx} onClick={s.action}>
                            {s.label}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Chatbot;
