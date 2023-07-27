import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import { useEffect } from "react";

export default function EditorJsParser({ content, readonly }) {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'paperX',
            minHeight: 0,
            tools: {
                header: {
                    class: Header,
                },
                image: {
                    class: SimpleImage
                }
            },
            data: content,
            readOnly: readonly
        });
    }, []);

    return (
        <div>
            <div id="paperX"></div>
        </div>
    );
}