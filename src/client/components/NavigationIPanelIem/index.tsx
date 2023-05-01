import React from 'react';

const NavigationIPanelIem = ({
    title,
    checked,
    handleChange,
}: {
    title: string;
    checked: boolean;
    handleChange: (e: any) => void;
}) => {
    return (
        <div>
            <label>
                <input type="radio" name="navlist" value={title} checked={checked} onChange={handleChange} />
                {title}
            </label>
        </div>
    );
};

export default NavigationIPanelIem;
