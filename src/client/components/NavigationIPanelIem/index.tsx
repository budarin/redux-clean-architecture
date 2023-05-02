import React from 'react';

type NavigationIPanelIemProps = {
    id: string | Id;
    title: string;
    count: number;
    checked: boolean;
    handleChange: (e: any) => void;
};

const NavigationIPanelIem = ({ id, title, checked, count, handleChange }: NavigationIPanelIemProps) => {
    return (
        <div>
            <label>
                <input
                    type="radio"
                    name="navlist"
                    data-id={id}
                    value={title}
                    checked={checked}
                    onChange={handleChange}
                />
                <span>{title}</span> <span>{count}</span>
            </label>
        </div>
    );
};

export default NavigationIPanelIem;
