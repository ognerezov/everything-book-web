import React, {FC, ReactNode} from "react";
import {Chapter, quotationRecordFilter, RecordFilter} from "../../model/Book";
import {Button, Card, Intent} from "@blueprintjs/core";
import {RecordViewer} from "./RecordViewer";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import {closeChapter} from "../../actions/settings";
import {connect} from "react-redux";
import ProcessInfo from "../common/ProcessInfo";
import ChapterTools from "../controls/ChapterTools";


interface BasicChapterViewerProps {
    chapter ?: Chapter;
    closable ?: boolean;
    closeChapter : any;
}

interface ChapterViewerProps extends BasicChapterViewerProps{
    recordFilter: RecordFilter,
    withTools : boolean;
    className ?: string;
    contentClassName ?: string;
    topButton : ReactNode
}

const ChapterViewer : FC<ChapterViewerProps> = props => {

    return <div className={props.className + ' bp3-running-text'}>
        {props.chapter ?
            <Card interactive={false}  elevation={Elevation.TWO} className={props.contentClassName}>
                {props.closable ? props.topButton :null}
                <div >
                    {props.recordFilter(props.chapter).map((record, index)=><RecordViewer record={record} key={index}/> )}
                </div>
            </Card> :
            props.withTools ? <ProcessInfo/> : null}
            {props.withTools ?<ChapterTools/> : null}
    </div>
};

export default connect(undefined,{closeChapter})
((props :BasicChapterViewerProps) =>
    (<ChapterViewer
            recordFilter={chapter => chapter.records}
            closeChapter={props.closeChapter}
            chapter={props.chapter}
            closable={props.closable}
            withTools={true}
            className='page'
            contentClassName='page-content'
            topButton={<Button icon={"cross"} intent={Intent.DANGER} minimal={true} className='close-button' onClick={props.closeChapter}/>}
        />
))
export const Quotation : FC<BasicChapterViewerProps> = ((props :BasicChapterViewerProps) =>
    (<ChapterViewer
            recordFilter={quotationRecordFilter}
            closeChapter={props.closeChapter}
            chapter={props.chapter}
            closable={props.closable}
            withTools={false}
            className='quotation-container'
            contentClassName='quotation-content'
            topButton={<Button icon="step-forward"  minimal={true} className='quotation-button' onClick={props.closeChapter}/>}/>
    ))