import React, {FC} from "react";

interface NProps {
    number : string;
    disabled ?: boolean;
}

const N : FC<NProps> = props => {
    return <span className={props.disabled ? 'n-disabled' : 'n'} >
        {props.number}
    </span>
};


export default N;