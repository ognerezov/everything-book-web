import React,{PureComponent} from "react";
import {Button, Card, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {isLoggedIn, User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {noException} from "../../actions/error";
import {connect} from "react-redux";
import {enterCodeAndGetChapters} from "../../thunks/getChapter";
import ProcessInfo from "./ProcessInfo";
import {
    accessCode,
    cancel, email,
    enter_code, input_password,
    inputAccessCode,
    login, password,
    register, register_terms,
    registration, repeat_password,
    V
} from "../../vocabulary/Vocabulary";
import QuotationViewer from "../viewers/QuotationViewer";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";

interface LoginDialogProps {
    user : User;
    noException : any;
    enterCodeAndGetChapters :any;
}

interface LoginDialogState {
    accessCode : string;
    showRegistration: boolean;
    showPassword : boolean;
    username ?: string;
    password ?: string;
    repeatPassword ?: string;
}

class LoginDialog extends PureComponent<LoginDialogProps,LoginDialogState>{

    constructor(props: LoginDialogProps, context: any) {
        super(props, context);
        this.state = {
            accessCode : '',
            showRegistration : false,
            showPassword : false
        }
    }

    setAccessCode =(accessCode: string) =>{
        this.setState({...this.state, accessCode: accessCode})
    };

    handleShowRegistration =()=>{
        this.setState({...this.state,showRegistration :true});
    }

    handleCloseRegistration =()=>{
        this.setState({...this.state,showRegistration :false});
    }

    toggleShowPassword=()=>{
        this.setState({...this.state,showPassword : !this.state.showPassword})
    }

    getRegistrationForm = ()=>{
        const lockButton = (
                <Button
                    icon={this.state.showPassword  ? "unlock" : "lock"}
                    minimal={true}
                    onClick={this.toggleShowPassword}
                />
        );
        return (
            <Dialog
                className='process-container--holder'
                isOpen={this.state.showRegistration }
                transitionDuration={0}
            >
                <Card className='process-container'>
                    <div className='rule-body accent'>
                        {V[register_terms]}
                    </div>
                </Card>
                <div className="bp3-dialog-body">

                    <FormGroup
                        label={V[registration]}
                    >
                        <InputGroup
                            type="email"
                            className="login-fields"
                            placeholder={V[email]}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setAccessCode(event.currentTarget.value);
                                this.props.noException()}}
                        />
                    </FormGroup>
                    <FormGroup
                        label={V[password]}
                    >
                        <InputGroup
                            className="login-fields"
                            placeholder={V[input_password]}
                            type={this.state.showPassword ? "text" : "password"}
                            rightElement={lockButton}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setAccessCode(event.currentTarget.value);
                                this.props.noException()}}
                        />
                    </FormGroup>
                    <FormGroup
                        label={V[repeat_password]}
                    >
                        <InputGroup
                            className="login-fields"
                            placeholder={V[repeat_password]}
                            type={this.state.showPassword ? "text" : "password"}
                            rightElement={lockButton}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setAccessCode(event.currentTarget.value);
                                this.props.noException()}}
                        />
                    </FormGroup>
                </div>
                <div className='bp3-dialog-footer'>
                    <div className='bp3-dialog-footer-actions'>
                        <Button icon='cross' onClick={this.handleCloseRegistration} minimal={true} intent={Intent.DANGER}>{V[cancel]} </Button>
                        <Button icon='user' onClick={this.handleShowRegistration} minimal={true}>{V[register]} </Button>
                    </div>
                </div>
            </Dialog> )

    }

    render(){
        return<div>
            <Dialog
                transitionDuration={0}
                className='process-container--holder'
                isOpen={!isLoggedIn(this.props.user)}
                canEscapeKeyClose={false}
                canOutsideClickClose={false}>
                <ProcessInfo className='process-container'/>
                <QuotationViewer />
                {this.getRegistrationForm()}
                <div className="bp3-dialog-body">
                    <h6>

                    </h6>
                    <FormGroup
                        label={V[accessCode]}
                    >
                        <InputGroup
                            className="login-fields"
                            placeholder={V[inputAccessCode]}
                            rightElement={<Button icon='log-in' onClick={this.handleLoginAttempt} minimal={true}>{V[enter_code]} </Button>}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setAccessCode(event.currentTarget.value);
                                this.props.noException()}}
                        />
                    </FormGroup>
                </div>
                <div className='bp3-dialog-footer'>
                    <div className='bp3-dialog-footer-actions'>
                        <Button icon='log-in' onClick={this.handleShowRegistration} minimal={true}>{V[login]} </Button>
                        <Button icon='user' onClick={this.handleShowRegistration} minimal={true}>{V[register]} </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    }

    private handleLoginAttempt =()=>{
       this.props.enterCodeAndGetChapters(this.state.accessCode);
    }

}

const mapStateToProps =(state : AppState)=>({
    user : state.user
});

export default connect(mapStateToProps,{noException,enterCodeAndGetChapters})(LoginDialog)