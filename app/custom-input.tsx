// import React, {Ref, forwardRef} from "react";
// import {useInput} from "@nextui-org/react";
// import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
// import { IMaskMixin } from "react-imask";

// const CustomInput = forwardRef(({inputRef, ...props}, ref: Ref<HTMLInputElement>) => {
//   const {
//     Component,
//     label,
//     domRef,
//     description,
//     isClearable,
//     startContent,
//     endContent,
//     shouldLabelBeOutside,
//     shouldLabelBeInside,
//     errorMessage,
//     getBaseProps,
//     getLabelProps,
//     getInputProps,
//     getInnerWrapperProps,
//     getInputWrapperProps,
//     getDescriptionProps,
//     getErrorMessageProps,
//     getClearButtonProps,
//   } = useInput({
//     ...props,
//     ref,
//   });

//   const labelContent = <label {...getLabelProps()}>{label}</label>;

//   const end = React.useMemo(() => {
//     if (isClearable) {
//       return <span {...getClearButtonProps()}>{endContent || <XCircleIcon />}</span>;
//     }

//     return endContent;
//   }, [isClearable, getClearButtonProps, endContent]);

//   const innerWrapper = React.useMemo(() => {
//     if (startContent || end) {
//       return (
//         <div {...getInnerWrapperProps()}>
//           {startContent}
//           <>{IMaskMixin(() => (
//             <input {...getInputProps()} />
//           ))}</>
//           {end}
//         </div>
//       );
//     }

//     return <>{IMaskMixin(() => (<input {...getInputProps()} />))}</>;
//   }, [startContent, end, getInputProps, getInnerWrapperProps]);

//   return (
//     <div className="w-[340px] h-[300px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
//       <Component {...getBaseProps()}>
//         {shouldLabelBeOutside ? labelContent : null}
//         <div
//           {...getInputWrapperProps()}
//           role="button"
//           onClick={() => {
//             domRef.current?.focus();
//           }}
//         >
//           {shouldLabelBeInside ? labelContent : null}
//           {innerWrapper}
//         </div>
//         {description && <div {...getDescriptionProps()}>{description}</div>}
//         {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
//       </Component>
//     </div>
//   );
// });

// CustomInput.displayName = "CustomInput";

// export default CustomInput;