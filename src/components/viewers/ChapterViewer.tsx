import React, {FC} from "react";
import {Chapter} from "../../model/Book";
import {Callout, Intent,  Spinner} from "@blueprintjs/core";
import {RecordViewer} from "./RecordViewer";


interface ChapterViewerProps {
    chapter ?: Chapter;
}

const ChapterViewer : FC<ChapterViewerProps> = props => {
    console.log(props.chapter);
    function loading() {
        return <Callout intent={Intent.PRIMARY} title={'title'}>
            <Spinner size={Spinner.SIZE_LARGE} intent={Intent.PRIMARY} />
        </Callout>
    }

    return <div className='page bp3-running-text'>
        {props.chapter ?
            <div>
                {props.chapter?.records.map((record, index)=><RecordViewer record={record} key={index}/> )}
            </div> : loading()}
    </div>
};


export default ChapterViewer;