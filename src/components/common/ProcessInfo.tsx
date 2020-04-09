import React, {FC} from "react";
import {Callout, Card, Elevation, Intent, Spinner} from "@blueprintjs/core";
import {Exception, ExceptionType} from "../../actions/error";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";

interface ProcessInfoProps {
   error : Exception;
}

const ProcessInfo :FC<ProcessInfoProps> = props => {
    function getProgressBar() {
        return <Spinner size={Spinner.SIZE_LARGE} />
    }

    function getError(error: Exception) {
        return <Callout intent={Intent.DANGER} title='Ошибка'> {error.message}</Callout>
    }

    return props.error.type === ExceptionType.NoException ? null :
        <Card elevation={Elevation.ZERO} interactive={true} className='process-container'>
            {props.error.type === ExceptionType.Processing ? getProgressBar(): getError(props.error)}
        </Card>
};

const mapStateToProps = (state : AppState) =>({
    error : state.error
});

export default connect(mapStateToProps)(ProcessInfo);