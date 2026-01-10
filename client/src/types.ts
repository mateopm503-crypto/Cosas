export interface Course {
    id: string;
    name: string;
    semester: number;
    prerequisites: string[];
    description: string;
    prerequisitesData?: Course[];
    dependentsData?: Course[];
}
