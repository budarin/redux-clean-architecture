import React from 'react';

import './index.css';

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
                <input
                    type="radio"
                    name="navlist"
                    value={title}
                    checked={checked}
                    onChange={handleChange}
                    className="navPanelItem-radio"
                />
                <span className="navPanelItem-title">{title}</span> <span>{todoCount}</span>
            </label>
        </div>
    );
};

export default NavigationIPanelIem;
