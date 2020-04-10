import React, {FC} from "react";
import {Callout, Card, Elevation, Spinner} from "@blueprintjs/core";
import {Exception, ExceptionType} from "../../actions/error";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {V} from "../../vocabulary/Vocabulary";
import {ExceptionViewInfo, getExceptionViewInfo} from "../../model/ExceptionViewInfo";

interface ProcessInfoProps {
   error : Exception;
}

const ProcessInfo :FC<ProcessInfoProps> = props => {
    function getProgressBar() {
        return <Spinner size={Spinner.SIZE_LARGE} />
    }

    function getError(error: Exception) {
        const viewInfo : ExceptionViewInfo = getExceptionViewInfo(error);
        return <Callout
            // intent={viewInfo.intent}
                                        icon={viewInfo.icon}
                                        title={V[viewInfo.title]}> {V[viewInfo.message]}</Callout>
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