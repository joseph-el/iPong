import { useDispatch } from 'react-redux';
import { setGender, setGenderInvalide } from '../Checkbox/CheckboxSlice';

import {  setIsInvalid, setErrorMessage, setValue } from '../InputComponents/inputSlice';
import { setDateIsInvalid, setDateErrorMessage, setDateValue } from '../InputComponents/InputDateComponent/dateSlice';

export default function ResetUserData() {

        const dispatch = useDispatch();
    
        dispatch(setGender(null));
        dispatch(setGenderInvalide(false));
      
        dispatch(setIsInvalid({}));
        dispatch(setErrorMessage({}));
        dispatch(setValue({}));
      
        dispatch(setDateIsInvalid(false));
        dispatch(setDateErrorMessage(''));
        dispatch(setDateValue(null));
      
}
