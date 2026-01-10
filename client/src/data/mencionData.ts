// Datos de las menciones disponibles
export interface MencionCourse {
    id: string;
    name: string;
}

export interface Mencion {
    id: string;
    name: string;
    icon: string;
    color: string;
    courses: {
        CURSO_MENCION_1: string;
        CURSO_MENCION_2: string;
        CURSO_MENCION_3: string;
        CURSO_MENCION_4: string;
        DID_MENCION: string;
    };
}

export const MENCIONES: Mencion[] = [
    {
        id: 'matematica',
        name: 'Matemática',
        icon: '📐',
        color: '#1e88e5',
        courses: {
            CURSO_MENCION_1: 'Probabilidad y Estadística',
            CURSO_MENCION_2: 'Álgebra y Sistemas Numéricos I',
            CURSO_MENCION_3: 'Álgebra y Sistemas Numéricos II',
            CURSO_MENCION_4: 'Geometría II',
            DID_MENCION: 'Didáctica de la Matemática III'
        }
    },
    {
        id: 'lenguaje',
        name: 'Lenguaje y Comunicación',
        icon: '📚',
        color: '#8e24aa',
        courses: {
            CURSO_MENCION_1: 'Gramática para la Competencia Comunicativa',
            CURSO_MENCION_2: 'Elementos de Gramática Española',
            CURSO_MENCION_3: 'Leer y Escribir a través del Currículum',
            CURSO_MENCION_4: 'Literatura Infantil y Juvenil',
            DID_MENCION: 'Didáctica de la Comunicación Multimodal'
        }
    },
    {
        id: 'cs_naturales',
        name: 'Ciencias Naturales',
        icon: '🔬',
        color: '#7cb342',
        courses: {
            CURSO_MENCION_1: 'Optativo de Química',
            CURSO_MENCION_2: 'Optativo de Biología',
            CURSO_MENCION_3: 'Didáctica de las Ciencias Naturales III',
            CURSO_MENCION_4: 'Optativo de Física',
            DID_MENCION: 'Optativo de Ciencias'
        }
    },
    {
        id: 'historia_geografia',
        name: 'Historia, Geografía y Cs. Sociales',
        icon: '🌍',
        color: '#e65100',
        courses: {
            CURSO_MENCION_1: 'Introducción a la Historia',
            CURSO_MENCION_2: 'Chile y América Indígena',
            CURSO_MENCION_3: 'Historia de Chile Contemporáneo',
            CURSO_MENCION_4: 'Geografía Humana General',
            DID_MENCION: 'Didáctica de la Historia'
        }
    }
];

// IDs de los cursos de mención
export const MENCION_COURSE_IDS = [
    'CURSO_MENCION_1',
    'CURSO_MENCION_2',
    'CURSO_MENCION_3',
    'CURSO_MENCION_4',
    'DID_MENCION'
];

export const isMencionCourse = (courseId: string): boolean => {
    return MENCION_COURSE_IDS.includes(courseId);
};

export const getMencionCourseName = (courseId: string, mencionId: string | null): string | null => {
    if (!mencionId) return null;
    const mencion = MENCIONES.find(m => m.id === mencionId);
    if (!mencion) return null;
    return mencion.courses[courseId as keyof typeof mencion.courses] || null;
};
