import React from 'react';

import './index.css';

function Badge({ num }: { num: string | number }) {
    return <span className="badge">{num}</span>;
}

export default Badge;
