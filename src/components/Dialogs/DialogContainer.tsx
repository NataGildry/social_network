import {actions, dialogDataType, messageDataType} from '../../redux/dialogReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';


// const DialogsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState().dialogsPage;
//
//                 let sendMessage = () => {
//                     store.dispatch(sendMessageActionCreator());
//                 };
//                 let onNewMessageChange = (body) => {
//                     let action = updateNewMessageBodyActionCreator(body);
//                     store.dispatch(action);
//                 };
//                 return (
//                     <Dialogs
//                         updateNewMessageBody={onNewMessageChange}
//                         sendMessage={sendMessage}
//                         dialogData={state.dialogData}
//                         messageData={state.messageData}
//                         newMessageBody={state.newMessageBody}
//                     />)
//
//             }}
//         </StoreContext.Consumer>
//
//     );
// }; =========> How Container Components work in general
type MapStateToPropsType = {
    dialogData: Array<dialogDataType>,
    messageData: Array<messageDataType>
};
type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
};
type OwnPropsType = {
    newMessageBody: string
};

export const mapStateToProps = (state: AppStateType) => {
    return {
        dialogData: state.dialogsPage.dialogData,
        messageData: state.dialogsPage.messageData
    }
};

export default compose(connect<MapStateToPropsType,
    MapDispatchPropsType,
    OwnPropsType,
    AppStateType>(mapStateToProps,
    {sendMessage: actions.sendMessage}
), withAuthRedirect)(Dialogs);
