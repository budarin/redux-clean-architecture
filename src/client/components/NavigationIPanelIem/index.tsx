import React from 'react';

type NavigationIPanelIemProps = {
    title: string;
    todoCount: number;
    checked: boolean;
    handleChange: (e: any) => void;
};

const NavigationIPanelIem = ({ title, checked, todoCount, handleChange }: NavigationIPanelIemProps) => {
    return (
        <div>
            <label>
                <input type="radio" name="navlist" value={title} checked={checked} onChange={handleChange} />
                <span>{title}</span> <span>{todoCount}</span>
            </label>
        </div>
    );
};

export default NavigationIPanelIem;
