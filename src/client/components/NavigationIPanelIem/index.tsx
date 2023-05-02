import React from 'react';

type NavigationIPanelIemProps = {
    title: string;
    count: number;
    checked: boolean;
    handleChange: (e: any) => void;
};

const NavigationIPanelIem = ({ title, checked, count, handleChange }: NavigationIPanelIemProps) => {
    return (
        <div>
            <label>
                <input type="radio" name="navlist" value={title} checked={checked} onChange={handleChange} />
                {title} {count}
            </label>
        </div>
    );
};

export default NavigationIPanelIem;
