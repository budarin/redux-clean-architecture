import React from 'react';

type NavigationIPanelIemProps = {
    title: string;
    checked: boolean;
    handleChange: (e: any) => void;
};

const NavigationIPanelIem = ({ title, checked, handleChange }: NavigationIPanelIemProps) => {
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
