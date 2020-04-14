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

    handleCloseQuotation=()=>{
        this.setState({...this.state,
            index : !this.props.quotations || this.state.index >= this.props.quotations.length-1 ? 0 : this.state.index +1})
    }

    render(){
        return this.props.quotations? <div className='quotation-container--holder'>
            <Quotation chapter={this.props.quotations[this.state.index]} closable={true} closeChapter={this.handleCloseQuotation}/>
        </div>:null
    }
}

const mapStateToProps = (state: AppState)=>({
    quotations : state.data.quotations
})

export default connect(mapStateToProps,{getData})(QuotationViewer);