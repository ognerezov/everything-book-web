import React, {FC} from "react";
import {Chapter} from "../../model/Book";
import {Button, Card, Intent} from "@blueprintjs/core";
import {RecordViewer} from "./RecordViewer";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import {closeChapter} from "../../actions/settings";
import {connect} from "react-redux";
import ProcessInfo from "../common/ProcessInfo";
import ChapterTools from "../controls/ChapterTools";


interface ChapterViewerProps {
    chapter ?: Chapter;
    closable ?: boolean;
    closeChapter : any;
}

const ChapterViewer : FC<ChapterViewerProps> = props => {

    return <div className='page bp3-running-text'>
        {props.chapter ?
            <Card interactive={false}  elevation={Elevation.TWO} className={'page-content'}>
                {props.closable ? <Button icon={"cross"} intent={Intent.DANGER} minimal={true} className='close-button' onClick={props.closeChapter}/> :null}
                <div >
                    {props.chapter?.records.map((record, index)=><RecordViewer record={record} key={index}/> )}
                </div>
            </Card> :
            <ProcessInfo/>}
            <ChapterTools/>
    </div>
};


export default connect(undefined,{closeChapter})(ChapterViewer);