import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// utils
import { api } from "../service";
import EditorJsParser from "../utils/EditorJsParser";

export default function Blog() {
    const slug = useParams().slug;
    const [blog, setBlog] = useState(undefined);

    useEffect(() => {
        api.getRecord(slug)
            .then(({ data }) => {
                setBlog(data);
            })
            .catch(error => {
                window.location.href = "/notfound";
            });
    }, []);

    return (
        <>
            {
                blog &&
                <div>
                    <Navbar background="https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" headerHeading={blog.title} />
                    <article className="mb-4">
                        <div className="container px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <EditorJsParser content={blog.body} readonly={true} />
                                </div>
                            </div>
                        </div>
                    </article>
                    <Footer />
                </div>
            }
        </>
    );
}