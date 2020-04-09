import React,{PureComponent} from "react";
import {Button, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {isLoggedIn, User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {noException} from "../../actions/error";
import {connect} from "react-redux";
import {enterCodeAndGetChapters} from "../../thunks/getChapter";
import ProcessInfo from "./ProcessInfo";

interface LoginDialogProps {
    user : User;
    noException : any;
    enterCodeAndGetChapters :any;
}

interface LoginDialogState {
    accessCode : string;
}

class LoginDialog extends PureComponent<LoginDialogProps,LoginDialogState>{

    constructor(props: LoginDialogProps, context: any) {
        super(props, context);
        this.state = {
            accessCode : ''
        }
    }

    setAccessCode =(accessCode: string) =>{
        this.setState({...this.state, accessCode: accessCode})
    };

    render(){
        return <Dialog
            className='process-container--holder'
            isOpen={!isLoggedIn(this.props.user)}
            canEscapeKeyClose={false}
            canOutsideClickClose={false}>
            <ProcessInfo/>
            <div className="bp3-dialog-body">
                <FormGroup
                    label='Код доступа:'
                >
                    <InputGroup
                        className="login-fields"
                        placeholder={'Введите код доступа'}
                        rightElement={<Button icon='log-in' onClick={this.handleLoginAttempt} minimal={true}>Войти </Button>}
                        onChange={(event : React.FormEvent<HTMLInputElement>)=>
                        {this.setAccessCode(event.currentTarget.value);
                            this.props.noException()}}
                    />
                </FormGroup>
            </div>
        </Dialog>
    }

    private handleLoginAttempt =()=>{
       this.props.enterCodeAndGetChapters(this.state.accessCode);
    }

}

const mapStateToProps =(state : AppState)=>({
    user : state.user
});

export default connect(mapStateToProps,{noException,enterCodeAndGetChapters})(LoginDialog)