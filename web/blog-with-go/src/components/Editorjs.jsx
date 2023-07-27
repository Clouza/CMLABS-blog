import { createReactEditorJS } from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';

export default function Editor() {
    const ReactEditorJS = createReactEditorJS();
    const tools = {
        header: Header,
        image: SimpleImage,
    };
    return (
        <ReactEditorJS holder="paperX" tools={tools} >
            <div id="paperX" className="border rounded mb-3"></div>
        </ReactEditorJS>
    );
}