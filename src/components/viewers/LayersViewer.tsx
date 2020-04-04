import React,{PureComponent} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import ChapterViewer from "./ChapterViewer";
import {getChapters} from "../../thunks/getChapter";
import {Chapter} from "../../model/Book";

interface LayersViewerProps {
    layers : number[];
    chapter ?: Chapter;
    getChapters : any;
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
        return <div>
            <ChapterViewer chapter={this.props.chapter}/>
        </div>
    }
}

const mapStateToProps = (state : AppState)=>{
    const top = state.settings.layers[state.settings.layers.length - 1];
    return {chapter : state.book[top],layers : state.settings.layers}};

export default connect(mapStateToProps,{getChapters})(LayersViewer);