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
    login, password, password_not_matches,
    register_caption, register_terms, registered_user_caption,
    registration, repeat_password,
    V, wrong_email_format
} from "../../vocabulary/Vocabulary";
import QuotationViewer from "../viewers/QuotationViewer";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {isEmailValid} from "../../validators/EmailValidator";
import {register} from "../../thunks/register";
import {ConnectionResponse} from "../../service/connection";
import {getErrorMessage} from "../../errors/ErrorMapper";
import {getCurrentChapters} from "../../thunks/getChapter";
import {refresh} from "../../thunks/refresh";

interface LoginDialogProps {
    user : User;
    noException : any;
    enterCodeAndGetChapters :any;
    register : any;
    getCurrentChapters :any;
    refresh : any;
}

interface LoginDialogState {
    accessCode : string;
    showRegistration: boolean;
    showPassword : boolean;
    username ?: string;
    invalidEmail : boolean;
    password ?: string;
    repeatPassword ?: string;
    notSamePasswords: boolean;
    errorMessage ?: string;
}

class LoginDialog extends PureComponent<LoginDialogProps,LoginDialogState>{

    constructor(props: LoginDialogProps, context: any) {
        super(props, context);
        this.state = {
            accessCode : '',
            showRegistration : false,
            showPassword : false,
            invalidEmail : false,
            notSamePasswords : false
        }
        this.props.refresh();
    }

    setAccessCode =(accessCode: string) =>{
        this.setState({...this.state, accessCode: accessCode})
    };

    handleShowRegistration =()=>{
        this.setState({...this.state,showRegistration :true, errorMessage : undefined});
    }

    handleCloseRegistration =()=>{
        this.setState({...this.state,showRegistration :false, errorMessage : undefined});
    }

    toggleShowPassword=()=>{
        this.setState({...this.state,showPassword : !this.state.showPassword})
    }

    setUsername=(username : string)=>{
        const invalidEmail = username !== undefined && !isEmailValid(username);
        this.setState({...this.state,
                                invalidEmail,
                                username,
                                errorMessage : undefined
        });
    }

    setPassword=(password : string)=>{
        const notSamePasswords = password !== this.state.repeatPassword;
        this.setState({...this.state,
            password,
            notSamePasswords,
            errorMessage : undefined
        });
    }

    setRepeatPassword=(repeatPassword : string)=>{
        const notSamePasswords = repeatPassword !== this.state.password;
        this.setState({...this.state,
            repeatPassword,
            notSamePasswords,
            errorMessage : undefined
        });
    }

    getRegistrationStatus=()=>{
        return (
        <Card className='process-container'>
            {this.state.errorMessage ?
                <div className='rule-body error-message'>
                    {this.state.errorMessage}
                </div>:
                this.state.invalidEmail ?
                    <div className='rule-body error-message'>
                        {V[wrong_email_format]}
                    </div> :
                    this.state.notSamePasswords ?
                        <div className='rule-body error-message'>
                            {V[password_not_matches]}
                        </div>:
                        <div className='rule-body accent'>
                            {V[register_terms]}
                        </div>
            }
        </Card>)
    }

    registrationErrorHandler=(e: ConnectionResponse)=>{
        this.setState({...this.state, errorMessage : getErrorMessage(e)})
    }

    register =()=>{this.props.register(this.state.username,this.state.password,this.registrationErrorHandler, this.props.getCurrentChapters)};

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
                {this.getRegistrationStatus()}
                <div className="bp3-dialog-body">

                    <FormGroup
                        label={V[registration]}
                    >
                        <InputGroup
                            type="email"
                            className="login-fields"
                            placeholder={V[email]}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=> this.setUsername(event.currentTarget.value)}
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
                            {this.setPassword(event.currentTarget.value);
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
                            {this.setRepeatPassword(event.currentTarget.value);
                                this.props.noException()}}
                        />
                    </FormGroup>
                </div>
                <div className='bp3-dialog-footer'>
                    <div className='bp3-dialog-footer-actions'>
                        <Button icon='cross' onClick={this.handleCloseRegistration} minimal={true} intent={Intent.DANGER}>{V[cancel]} </Button>
                        <Button icon='user'
                                onClick={this.register}
                                minimal={true}
                                disabled={!this.state.username || !this.state.password || this.state.invalidEmail || this.state.notSamePasswords}>{V[register_caption]} </Button>
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
                    { this.props.user && this.props.user.username ?
                    <div>
                        {V[registered_user_caption] + this.props.user.username}
                    </div> :
                    <div className='bp3-dialog-footer-actions'>
                        <Button icon='log-in' onClick={this.handleShowRegistration} minimal={true}>{V[login]} </Button>
                        <Button icon='user' onClick={this.handleShowRegistration} minimal={true}>{V[register_caption]} </Button>
                    </div>}

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

export default connect(mapStateToProps,{noException,enterCodeAndGetChapters,register,getCurrentChapters,refresh})(LoginDialog)