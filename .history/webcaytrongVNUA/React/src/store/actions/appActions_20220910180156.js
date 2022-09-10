import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});
//Đâ là kiểu viết khi redux không truyền data vào app
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});
//đây là kiểu viết khi redux truyền data vào app
export const changeLanguageApp =(languageInput)=>({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput
})
