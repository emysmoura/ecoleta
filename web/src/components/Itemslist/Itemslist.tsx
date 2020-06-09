import React from 'react';
import './styles.css';
interface Props {
    children: any
}
const Itemslist: React.FC<Props> = ({ children }) => {

    return (
        <ul className="items-grid">
            {children}
        </ul>
    )
}

export default Itemslist;