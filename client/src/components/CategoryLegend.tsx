import React from 'react';

const CategoryLegend: React.FC = () => {
    const categories = [
        { label: 'MÍNIMOS DISCIPLINARIOS', color: '#1976D2' }, // Standard Blue
        { label: 'FORMACIÓN GENERAL', color: '#FBC02D' }, // Yellow
        { label: 'MENCIÓN', color: '#757575' }, // Grey
        { label: 'MÍNIMOS DE TITULACIÓN', color: '#4A148C' }, // Purple (Distinct from Blue)
        { label: 'OPTATIVO DE PROFUNDIZACIÓN', color: '#29B6F6' } // Light Blue
    ];

    return (
        <div className="category-legend-container" style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem', // Reduced gap
            padding: '0.5rem 1rem', // Very compact padding
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: '50px', // Pill shape
            margin: '0.5rem auto 0 auto', // Minimal margin
            maxWidth: 'fit-content', // Shrink to fit
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid white'
        }}>
            {categories.map((cat, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <div style={{
                        width: '3px',
                        height: '14px', // Smaller bar
                        backgroundColor: cat.color,
                        borderRadius: '2px'
                    }}></div>
                    <span style={{
                        fontSize: '0.65rem', // Tiny elegant font
                        fontWeight: 600,
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px'
                    }}>
                        {cat.label}
                    </span>
                    {/* Add a checkmark icon to match sketch if it's meant to be there, but sketch had checkmarks only on some? 
                        User sketch: 
                        - Mínimos Disciplinarios (Blue line)
                        - Formación General (Yellow line + Checkmark circle?)
                        - Mención (Grey line + Checkmark circle)
                        - ...
                        I'll stick to the clean line + text first.
                    */}
                </div>
            ))}
        </div>
    );
};

export default CategoryLegend;
