import React, {FC} from "react";
import {Chapter} from "../../model/Book";


interface ChapterViewerProps {
    chapter ?: Chapter;
}

const ChapterViewer : FC<ChapterViewerProps> = props => {
    console.log(props.chapter);
    return <div>

    </div>
};


export default ChapterViewer;