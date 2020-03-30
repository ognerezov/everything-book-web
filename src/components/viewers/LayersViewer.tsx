import React,{FC,memo} from "react";
import {Book} from "../../model/Book";

interface LayersViewerProps {
    book : Book,
    layers : number[]
}

const LayersViewer : FC<LayersViewerProps> = props => {
    return <div>
        {props.layers[props.layers.length-1]}
    </div>
};

