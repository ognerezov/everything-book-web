import React, {FC} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {Intent, ITagProps, Tag} from "@blueprintjs/core";
import {selectChapter} from "../../actions/settings";

interface StackViewerProps {
    layers : number[],
    limit ?: number;
    className ?: string;
    intent ?: Intent;
    selectChapter : any;
    selected ?:number;
}

const StackViewer: FC<StackViewerProps> = props => {
    const layers = props.layers;
    const selected = props.selected ? -1 : layers.length-1;
    return <span className={props.className}>
        {layers.map((layer,index)=>
            <Tag
                className='n-padding'
                round={true}
                key={index}
                intent={index === selected || layer === props.selected ? props.intent: undefined}
                minimal={false}
                interactive={true}
                onRemove={(e: React.MouseEvent<HTMLButtonElement>, tagProps: ITagProps)=>{
                console.log(tagProps)}}
                onClick={()=>{props.selectChapter(layer)}}
            >
            {layer}
        </Tag>)
        }
    </span>;
}

const mapStateToProps = (state :AppState)=>({layers :state.settings.layers, selected : state.settings.selected});

export default connect(mapStateToProps,{selectChapter})(StackViewer);