import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface Props {
    page?: string,
    icon?: any,
    text: string,
    type?: string,
    className: string,
}

const Button: React.FC<Props> = ({ page, icon, text, type, className }) => {

    return (
        <>
            {
                type !== "submit" &&
                <Link className={className} to={page ? page : ""}>
                    {
                        icon &&
                        <span>{icon}</span>
                    }
                    <strong>{text}</strong>
                </Link>
            }
            {
                type === "submit" &&
                <button className={className} type={type ? type : "button"}> 
                    {
                        icon &&
                        <span>{icon}</span>
                    }
                    <strong>{text}</strong>
                </button>
            }
        </>
    )
}

export default Button;