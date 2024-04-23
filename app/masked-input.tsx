import { Input } from '@nextui-org/react';
import { IMaskMixin } from 'react-imask';
import CustomInput from './custom-input';


const MaskedInput =
    IMaskMixin(({inputRef, ...props}) => (
      <CustomInput
        {...props}
        ref={inputRef}  // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
      />
    ));
  
  MaskedInput.displayName = "MaskedInput";

