import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {isLoggedIn, User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {Button, Card, FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import {
    cancel, message_label,
    message_support_label, message_was_sent,
    send_label, theme_label,
    V
} from "../../vocabulary/Vocabulary";
import {sendMessage} from "../../thunks/sendMessage";

interface ContactSupportToolProps {
    user : User,
    sendMessage : any;
}

interface ContactSupportToolState {
    isExpanded : boolean;
    theme ?: string;
    message ?: string;
    sent ?: boolean;
}

class ContactSupportTool extends PureComponent<ContactSupportToolProps,ContactSupportToolState>{

    constructor(props: ContactSupportToolProps, context: any) {
        super(props, context);
        this.state ={
            isExpanded :false
        }
    }

    handleExpand = ()=>{
        this.setState({...this.state, isExpanded : true})
    }

    handleCollapse = ()=>{
        this.setState({...this.state, isExpanded : false})
    }

    handleSetTheme =(theme : string) =>{
        this.setState({...this.state,theme})
    }

    handleSetMessage =(message : string)=>{
        this.setState({...this.state,message});
    }

    handleSend=()=>{
        this.props.sendMessage(this.state.message,this.state.theme,()=>{
            this.setState({...this.state,sent :true})
            setTimeout(this.handleSuccess,2000)
        },(e : any)=>{
            console.log(e);
        })
    }

    handleSuccess=()=>{
        this.setState({isExpanded : false, sent : false, theme : undefined, message : undefined})
    }

    render(){
        return isLoggedIn(this.props.user) ?
            this.state.sent ?
            <Card className='message-button--login-screen message-window--colors'>
                {V[message_was_sent]}
            </Card> :
            this.state.isExpanded ?
                this.props.user.hasAccess?
                    <div>
                    </div>:
                    <Card className='message-button--login-screen message-window--colors'>
                        <FormGroup
                            label={V[send_label]}
                        >
                            <InputGroup
                                className='message-window--input-field'
                                placeholder={V[theme_label]}
                                onChange={(event : React.FormEvent<HTMLInputElement>)=>
                                {this.handleSetTheme(event.currentTarget.value)}}
                            />
                            <InputGroup
                                className='message-window--input-field'
                                placeholder={V[message_label]}
                                onChange={(event : React.FormEvent<HTMLInputElement>)=>
                                {this.handleSetMessage(event.currentTarget.value)}}
                            />
                        </FormGroup>
                        <div className='bp3-dialog-footer-actions'>
                            <Button icon='cross' intent={Intent.DANGER} minimal={false} onClick={this.handleCollapse}>{V[cancel]} </Button>
                            <Button icon='key-enter' intent={Intent.SUCCESS}  minimal={false} onClick={this.handleSend}>{V[send_label]} </Button>
                        </div>
                    </Card>:
                    this.props.user.hasAccess?
                        <div>
                        </div>:
                            <Button
                                className='message-button--login-screen'
                                icon='envelope'
                                onClick={this.handleExpand}
                                minimal={false}
                                intent={Intent.PRIMARY}>
                                {V[message_support_label]}
                            </Button> :
                null
    }
}

const mapStateToProps = (state : AppState)=>({user : state.user})

export default connect(mapStateToProps,{sendMessage})(ContactSupportTool);