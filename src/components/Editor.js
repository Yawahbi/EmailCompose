import { height, minHeight } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";

function Editor({ onChange, name, value, signature }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        setEditorLoaded(true);
    }, []);

    return (
        <div style={{ height: '250px', overflowY: 'scroll', overflowX: 'hidden' }}>
            {editorLoaded ? (
                <div>
                    <CKEditor
                        type=""
                        name={name}
                        editor={ClassicEditor}
                        data={value}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data })
                            onChange(data);
                        }}
                    />
                    <div style={{ fontStyle: 'italic', padding: '0.5rem 1.5rem' }}>
                        <p>{signature.firstname} {signature.lastname},</p>
                        <p>{signature.business_email}</p>
                    </div>
                </div>

            ) : (
                <div>Editor loading</div>
            )
            }
        </div >
    );
}

export default Editor;
