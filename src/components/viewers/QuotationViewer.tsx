import React,{PureComponent} from "react";
import {Chapter} from "../../model/Book";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {getData} from "../../thunks/getData";
import {DataType} from "../../actions/data";
import {Quotation} from "./ChapterViewer";

interface QuotationViewerProps {
    quotations ?: Chapter[],
    getData : any
}

interface QuotationViewerState {
    index : number
}

class QuotationViewer extends PureComponent<QuotationViewerProps, QuotationViewerState>{


    constructor(props: QuotationViewerProps, context: any) {
        super(props, context);
        if(!props.quotations){
            props.getData(DataType.Quotations);
        }
        this.state = {index : 0};
    }


    render(){
        console.log(this.props.quotations);
        return <div>{
            this.props.quotations?
            <Quotation chapter={this.props.quotations[this.state.index]}/> :null
        }
        </div>
    }
}

const mapStateToProps = (state: AppState)=>({
    quotations : state.data.quotations
})

export default connect(mapStateToProps,{getData})(QuotationViewer);