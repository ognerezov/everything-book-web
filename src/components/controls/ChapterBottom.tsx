import React, {FC} from "react";
import {Button} from "@blueprintjs/core";
import {nextChapter,previousChapter} from "../../thunks/shiftChapter";
import {connect} from "react-redux";

interface ChapterBottomProps {
    nextChapter : any;
    previousChapter : any;
}

const ChapterBottom : FC<ChapterBottomProps> = props => {
  return <div className='page-tool'>
        <Button className='page-bottom--button' minimal={true} icon='arrow-left' onClick={props.previousChapter}/>
        <Button className='page-bottom--button' minimal={true} icon='arrow-right' onClick={props.nextChapter}/>
  </div>
};

export default connect(undefined,{nextChapter,previousChapter})(ChapterBottom);