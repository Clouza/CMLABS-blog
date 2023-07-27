import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../service";

export default function Paper() {
    if (sessionStorage.getItem('key') == undefined) {
        return window.location.href = "/login";
    }
    const slugPathVariable = useParams().slug;

    const [isPaper, setIsPaper] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [slug, setSlug] = useState(undefined);
    const [content, setContent] = useState(undefined);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (slugPathVariable != undefined) {
            api.getRecord(slugPathVariable)
                .then(({ data }) => {
                    setIsPaper(data);
                    setTitle(data.title);
                    setSlug(data.slug);

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
                        data: data.body,
                        onChange: async () => {
                            let content = await editor.saver.save();
                            setContent(content);
                        }
                    });
                });
        } else {
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
                onChange: async () => {
                    let content = await editor.saver.save();
                    setContent(content);
                }
            });
        }
    }, []);

    const handleTitle = (value) => {
        if (value == "") return;
        const slug = value.split(" ").join("-").toLowerCase(); // /\s+|[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g
        setSlug(slug);
        setTitle(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (slugPathVariable != undefined) {
            const paper = {
                id: isPaper.id,
                title,
                slug,
                body: content,
                created_at: isPaper.created_at
            };

            api.updateRecord(paper)
                .then(() => window.location.href = "/")
                .catch((() => {
                    setIsError(true);
                    setTitle(undefined);
                    setSlug(undefined);
                }));;
            return;
        }

        const paper = {
            title,
            slug,
            body: content,
            created_at: new Date().toLocaleString().replace(',', '')
        };

        api.createRecord(paper)
            .then(() => window.location.href = "/")
            .catch((() => {
                setIsError(true);
                setTitle(undefined);
                setSlug(undefined);
            }));
    };

    return (
        <>
            <Navbar background="https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" headerHeading="Paper" headerSubHeading="Write anything, anywhere, anytime ☕" />
            <form className="container" onSubmit={handleSubmit}>
                {
                    isError &&
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        The title has been taken (slug will be removed)
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                <div className="form-floating">
                    <input className="form-control" id="key" type="text" placeholder="Enter the Title" defaultValue={title} required onChange={(e) => handleTitle(e.target.value)} />
                    <label htmlFor="key">Title</label>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" id="key" type="text" placeholder="Auto generated slug" value={slug} required />
                    <label htmlFor="key">Slug</label>
                </div>

                <div id="paperX" className="border rounded mb-3" defaultValue={content}></div>
                {
                    slugPathVariable
                        ? <button className="btn btn-primary my-3" type="submit">Update</button>
                        : <button className="btn btn-primary my-3" type="submit">Save</button>
                }
                <Link to="/" className="btn btn-outline-primary m-3" type="button">Close</Link>
            </form>
            <Footer />
        </>
    );
}