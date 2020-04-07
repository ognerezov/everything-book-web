import React, {FC} from "react";
import {Chapter} from "../../model/Book";
import {Button, Callout, Card, Intent, Spinner} from "@blueprintjs/core";
import {RecordViewer} from "./RecordViewer";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import ChapterBottom from "../controls/ChapterBottom";
import {closeChapter} from "../../actions/settings";
import {connect} from "react-redux";


interface ChapterViewerProps {
    chapter ?: Chapter;
    closable ?: boolean;
    closeChapter : any;
}

const ChapterViewer : FC<ChapterViewerProps> = props => {
    console.log(props.chapter);
    function loading() {
        return <Callout intent={Intent.PRIMARY} title={'title'} className='page-content'>
            <Spinner size={Spinner.SIZE_LARGE} intent={Intent.PRIMARY} />
        </Callout>
    }

    return <div className='page bp3-running-text'>
        {props.chapter ?
            <Card interactive={false}  elevation={Elevation.TWO} className={'page-content'}>
                {props.closable ? <Button icon={"cross"} intent={Intent.DANGER} minimal={true} className='close-button' onClick={props.closeChapter}/> :null}
                <div >
                    {props.chapter?.records.map((record, index)=><RecordViewer record={record} key={index}/> )}
                </div>
            </Card> : loading()}
            <ChapterBottom/>
    </div>
};


export default connect(undefined,{closeChapter})(ChapterViewer);