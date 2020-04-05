import React, {FC} from "react";
import {Chapter} from "../../model/Book";
import {Callout, Card, Intent, Spinner} from "@blueprintjs/core";
import {RecordViewer} from "./RecordViewer";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import ChapterBottom from "../controls/ChapterBottom";


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
            <Card interactive={false}  elevation={Elevation.TWO} className='page-content'>
                {props.chapter?.records.map((record, index)=><RecordViewer record={record} key={index}/> )}
            </Card> : loading()}
            <ChapterBottom/>
    </div>
};


export default ChapterViewer;