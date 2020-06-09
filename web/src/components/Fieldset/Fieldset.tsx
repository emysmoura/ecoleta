import React from 'react';
import './styles.css';
interface Props {
    legend?: string,
    sublegend?: string,
    children: any
}
const Fieldset: React.FC<Props> = ({ legend, sublegend, children, }) => {

    return (
        <fieldset>
            {
                (legend || sublegend) &&
                <legend>
                    {
                        legend &&
                        <h2>{legend}</h2>
                    }
                    {
                        sublegend &&
                        <span>{sublegend}</span>
                    }
                </legend>
            }
            <div className="field-group">
                {children}
            </div>
        </fieldset>

    )
}

export default Fieldset;