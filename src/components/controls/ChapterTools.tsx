import React, {PureComponent} from "react";
import {Button, Card, Drawer, Elevation, FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import {nextChapter,previousChapter,gotoChapter} from "../../thunks/shiftChapter";
import {connect} from "react-redux";
import {AppState} from "../../store/configureStore";
import {MAX_CHAPTER, MIN_CHAPTER} from "../../model/Book";
import {Position} from "@blueprintjs/core/lib/esm/common/position";
import {isPortrait} from "../../service/MediaInfo";
import {inputNumber, numberOutOfRange, search, searchNumber, V} from "../../vocabulary/Vocabulary";
import {toast} from "../../service/toaster";
import RulesViewer from "../viewers/RulesViewer";

interface ChapterToolsProps {
    nextChapter : any;
    previousChapter : any;
    gotoChapter : any;
    number : number;
}

interface ChapterToolsState {
    extended : boolean;
    searchValue ?:number;
}

class ChapterTools extends PureComponent<ChapterToolsProps,ChapterToolsState>{

    constructor(props: ChapterToolsProps, context: any) {
        super(props, context);
        this.state ={extended : false};
    }

    handleExpandAndCollapse=()=>{
      this.setState({...this.state,extended : !this.state.extended});
    };

    setSearchValue=(searchValue : number)=>{
        this.setState({...this.state,searchValue})
    };

    searchValue=()=>{
        if(this.state.searchValue === undefined ||  MIN_CHAPTER > this.state.searchValue || this.state.searchValue > MAX_CHAPTER) {
            toast({message : V[numberOutOfRange],icon : 'hand'});
            return;
        }
        this.props.gotoChapter(this.state.searchValue);
        this.finishJob();
    };

    finishJob=()=>{
        if(isPortrait()){
            this.setState({...this.state,extended : false})
        }
    };

    render() {
        console.log(this.props.number);

        const searchTool = (
            <FormGroup
                label={V[searchNumber]}
            >
                <InputGroup
                    className="login-fields"
                    inputMode='numeric'
                    placeholder={V[inputNumber]}
                    rightElement={<Button icon='search' onClick={this.searchValue} minimal={true}>{V[search]} </Button>}
                    onChange={(event : React.FormEvent<HTMLInputElement>)=>
                    {this.setSearchValue(Number(event.currentTarget.value))}}
                />
            </FormGroup>
        );

        const extension = (
            this.state.extended ?
            ( isPortrait()?
                <Drawer position={Position.LEFT} size={'90%'} isOpen={true}
                        canOutsideClickClose={true} onClose={this.handleExpandAndCollapse} >
                    <Card interactive={false} elevation={Elevation.TWO} className='extended-tools-container'>
                        {searchTool}
                        <RulesViewer/>
                    </Card>
                </Drawer> :
                <Card interactive={false} elevation={Elevation.TWO} className='page-tool-extension'>
                    {searchTool}
                    <RulesViewer/>
                </Card>)
            :null
        );

        return <div className='page-tool'>
            {extension}
            <Button className='page-tool-menu-button' minimal={true} icon='menu' onClick={this.handleExpandAndCollapse} intent={this.state.extended ? Intent.PRIMARY : undefined}/>
            <Button className='page-tool--button' minimal={true} icon='arrow-left' onClick={this.props.previousChapter}
                    disabled={this.props.number <= MIN_CHAPTER}/>
            <Button className='page-tool--button' minimal={true} icon='arrow-right' onClick={this.props.nextChapter}
                    disabled={this.props.number >= MAX_CHAPTER}/>
        </div>
    }
}

const mapStateToProps =(state : AppState)=>({number : state.settings.layers[state.settings.layers.length-1]});

export default connect(mapStateToProps,{nextChapter,previousChapter,gotoChapter})(ChapterTools);