import React,{PureComponent} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import ChapterViewer from "./ChapterViewer";
import {getChapters} from "../../thunks/getChapter";
import {Book, Chapter} from "../../model/Book";
import {hasReadAccess, User} from "../../model/User";

interface LayersViewerProps {
    book : Book;
    layers: number[];
    getChapters : any;
    user : User;
    inStack : boolean;
    selected ?:number;
}


class LayersViewer extends PureComponent<LayersViewerProps>{
    render() {
        const top = this.props.layers[this.props.layers.length - 1];
        const chapter : Chapter = this.props.book[this.props.selected === undefined ? top : this.props.layers[this.props.selected]]
        return hasReadAccess(this.props.user) ? <div>
            <ChapterViewer chapter={chapter} closable={this.props.inStack}/>
        </div> : null;
    }
}

const mapStateToProps = (state : AppState)=>{
    const inStack = state.settings.layers.length > 1;
    return {book : state.book, layers: state.settings.layers, user : state.user, inStack, selected : state.settings.selected}};

export default connect(mapStateToProps,{getChapters})(LayersViewer);