import React from 'react';
import './styles.css';
interface Props {
    type?: string,
    name: string,
    id: string,
    onChange: any,
    label: string,
    className: string,
    children?: any,
    value?: any
}
const Field: React.FC<Props> = ({ type, name, id, onChange, label, className, children, value }) => {

    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            {!children &&
                <input
                    type={type ? type : ""}
                    name={name}
                    id={id}
                    onChange={onChange}
                />
            }
            {
                children &&
                <select
                    value={value ? value : ""}
                    name={name}
                    id={id}
                    onChange={onChange}>
                    {children}
                </select>
            }
        </div>

    )
}

export default Field;