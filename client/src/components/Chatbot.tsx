import React, { useState, useEffect, useRef } from 'react';
import { useCurriculum } from '../context/CurriculumContext';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const { courses, selectedCourse } = useCurriculum();
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

    const handleQuestion = (type: 'description' | 'prerequisites' | 'search_course') => {
        if (type === 'prerequisites') {
            addMessage("¿Qué ramos tienen requisitos?", 'user');
            setTimeout(() => {
                const withPrereqs = courses.filter(c => c.prerequisites && c.prerequisites.length > 0);
                const names = withPrereqs.slice(0, 5).map(c => c.name).join(', '); // Show first 5 example
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
        // Reset search
        setCourseSearch('');
        setTimeout(() => {
            const desc = course.description && course.description.trim() !== ""
                ? course.description
                : "Lo siento, no tengo información detallada sobre este curso en mi base de datos.";
            addMessage(desc, 'bot');
        }, 500);
    };

    const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
    const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
    const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;

    const suggestions = [
        { label: <><SearchIcon /> Buscar/Ver todos los ramos</>, action: () => handleQuestion('search_course') },
        { label: <><ListIcon /> ¿Qué ramos tienen requisitos?</>, action: () => handleQuestion('prerequisites') },
    ];

    if (!isOpen) {
        // Hide button when course drawer is open
        if (selectedCourse) return null;

        return (
            <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                <HelpIcon /> Ayuda
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
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>Selecciona un ramo:</span>
                            <button className="cancel-btn" onClick={() => setSelectingCourse(false)}>Cancelar</button>
                        </div>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Filtrar ramos..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            className="mini-search"
                        />
                        <div className="mini-list" style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {courses
                                .filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()))
                                .map(c => (
                                    <button
                                        key={c.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCourseSelect(c.id);
                                        }}
                                        style={{ textAlign: 'left', padding: '8px', border: '1px solid #eee', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                    >
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
