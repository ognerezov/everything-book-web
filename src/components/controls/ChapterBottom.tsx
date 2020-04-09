import React, {FC} from "react";
import {Button} from "@blueprintjs/core";
import {nextChapter,previousChapter} from "../../thunks/shiftChapter";
import {connect} from "react-redux";
import {AppState} from "../../store/configureStore";
import {MAX_CHAPTER, MIN_CHAPTER} from "../../model/Book";

interface ChapterBottomProps {
    nextChapter : any;
    previousChapter : any;
    number : number;
}

const ChapterBottom : FC<ChapterBottomProps> = props => {
    console.log(props.number);
  return <div className='page-tool'>
        <Button className='page-bottom--button' minimal={true} icon='arrow-left' onClick={props.previousChapter} disabled={props.number <= MIN_CHAPTER}/>
        <Button className='page-bottom--button' minimal={true} icon='arrow-right' onClick={props.nextChapter} disabled={props.number >= MAX_CHAPTER}/>
  </div>
};

const mapStateToProps =(state : AppState)=>({number : state.settings.layers[state.settings.layers.length-1]});

export default connect(mapStateToProps,{nextChapter,previousChapter})(ChapterBottom);