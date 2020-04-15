import React,{PureComponent} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import ChapterViewer from "./ChapterViewer";
import {getChapters} from "../../thunks/getChapter";
import {Chapter} from "../../model/Book";
import {isLoggedIn, User} from "../../model/User";

interface LayersViewerProps {
    layers : number[];
    chapter ?: Chapter;
    getChapters : any;
    user : User;
}

class LayersViewer extends PureComponent<LayersViewerProps>{


    constructor(props: LayersViewerProps, context: any) {
        super(props, context);
        this.props.getChapters(props.layers);
    }

    componentWillUnmount(): void {
        this.props.getChapters(this.props.layers);
    }

    render() {
        return isLoggedIn(this.props.user) ?<div>
            <ChapterViewer chapter={this.props.chapter} closable={false}/>
        </div> : null;
    }
}

const mapStateToProps = (state : AppState)=>{
    const top = state.settings.layers[state.settings.layers.length - 1];
    return {chapter : state.book[top],layers : state.settings.layers,user : state.user}};

export default connect(mapStateToProps,{getChapters})(LayersViewer);