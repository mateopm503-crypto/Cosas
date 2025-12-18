import React from 'react';
import { useCurriculum } from '../context/CurriculumContext';

const SearchBar: React.FC = () => {
    const { searchQuery, setSearchQuery } = useCurriculum();

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar ramo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
