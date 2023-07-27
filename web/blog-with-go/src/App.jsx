import { Link, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import './index.css';

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// utils
import { api } from "./service";

export default function App() {
  const [blogs, setBlogs] = useState(undefined);

  useEffect(() => {
    api.getRecords()
      .then(({ data }) => setBlogs(data));
  }, []);

  const deletePost = (slug) => {
    api.deleteRecord(slug)
      .then(() => {
        window.location.href = window.location.pathname;
      });
  };
  return (
    <>
      <Navbar background="https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" headerHeading="Blog Go" headerSubHeading="Trusted blog - do not worries 😇" />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

            {
              blogs && blogs.length == 0 ?
                <div className="post-preview">
                  <h1>Empty </h1>
                  <p>There is not post right now</p>
                </div>
                :
                blogs && blogs.reverse().map((blog, i) => {
                  return (
                    <div key={i}>
                      <div className="post-preview">
                        <div className="d-flex justify-content-between">
                          <Link to={`/blog/${blog.slug}`}>
                            <h2 className="post-title ">{blog.title}</h2>
                          </Link>
                          {
                            sessionStorage.getItem('key') != undefined &&
                            <div className="d-flex gap-3">
                              <Link to={`/paper/${blog.slug}`} className="btn btn-outline-primary">Edit</Link>
                              <button className="btn btn-outline-danger" onClick={() => deletePost(blog.slug)}>Delete</button>
                            </div>
                          }
                        </div>
                        <p className="post-meta">
                          Posted by admin
                          at {blog.created_at.split(' ')[0]}
                        </p>

                      </div>
                      <hr className="my-4" />
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}