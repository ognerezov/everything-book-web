import React,{PureComponent} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import ChapterViewer from "./ChapterViewer";
import {getChapters} from "../../thunks/getChapter";
import {Chapter} from "../../model/Book";
import {isLoggedIn, User} from "../../model/User";

interface LayersViewerProps {
    chapter ?: Chapter;
    getChapters : any;
    user : User;
}

class LayersViewer extends PureComponent<LayersViewerProps>{
    render() {
        return isLoggedIn(this.props.user) ?<div>
            <ChapterViewer chapter={this.props.chapter} closable={false}/>
        </div> : null;
    }
}

const mapStateToProps = (state : AppState)=>{
    const top = state.settings.layers[state.settings.layers.length - 1];
    return {chapter : state.book[top],user : state.user}};

export default connect(mapStateToProps,{getChapters})(LayersViewer);