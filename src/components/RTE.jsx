// import React from 'react'
// import {Editor } from '@tinymce/tinymce-react';
// import {Controller } from 'react-hook-form';


// export default function RTE({name, control, label, defaultValue =""}) {
//   return (
//     <div className='w-full'> 
//     {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//     {/* <Controller
//     name={name || "content"}
//     control={control}
//     render={({field: {onChange}}) => (
//         <Editor
//          apiKey="w20o9i6iunaagtrxzytwkgq3xb5vbknkmi1jtxcosv3z3z6y"
//         // initialValue={defaultValue}
//         init={{
//             initialValue: defaultValue,
//             height: 500,
//             menubar: true,
//             plugins: [
//                 "image",
//                 "advlist",
//                 "autolink",
//                 "lists",
//                 "link",
//                 "image",
//                 "charmap",
//                 "preview",
//                 "anchor",
//                 "searchreplace",
//                 "visualblocks",
//                 "code",
//                 "fullscreen",
//                 "insertdatetime",
//                 "media",
//                 "table",
//                 "code",
//                 "help",
//                 "wordcount",
//                 "anchor",
//             ],
//             toolbar:
//             "undo redo | blocks | image | bold italic forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//             content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
//         }}
//         onEditorChange={onChange}
//         />
//     )}
//     /> */}



//     <Controller
//   name={name || "content"}
//   control={control}
//   defaultValue={defaultValue}  // <- important
//   render={({ field: { onChange, value } }) => (
//     <Editor
//       apiKey="w20o9i6iunaagtrxzytwkgq3xb5vbknkmi1jtxcosv3z3z6y"
//       value={value}  // <-- controlled
//       init={{
//         height: 500,
//         menubar: true,
//         plugins: [
//           "image advlist autolink lists link charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
//         ],
//         toolbar:
//           "undo redo | blocks | image | bold italic forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//         content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//       }}
//       onEditorChange={onChange}
//     />
//   )}
// />


//      </div>
//   )
// }
// =========================================










import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="w20o9i6iunaagtrxzytwkgq3xb5vbknkmi1jtxcosv3z3z6y"
            value={value}                // controlled
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
