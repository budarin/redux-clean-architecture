import React, { ReactNode } from 'react';

type ListProps = {
    children: ReactNode;
};

function NavigationPanel({ children }: ListProps) {
    return <nav>{children}</nav>;
}

export default NavigationPanel;
