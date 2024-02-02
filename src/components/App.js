import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/localStorage";

const App = () => {
  const [html, setHtml] = useLocalStorage("html", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    // Set default values when the component mounts
    setHtml(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>Content Placeholder</title>
      </head>
      <body>
        <div class="card">
          <div class="card-header animated-bg" id="header">&nbsp;</div>
    
          <div class="card-content">
            <h3 class="card-title animated-bg animated-bg-text" id="title">
              &nbsp;
            </h3>
            <p class="card-excerpt" id="excerpt">
              &nbsp;
              <span class="animated-bg animated-bg-text">&nbsp;</span>
              <span class="animated-bg animated-bg-text">&nbsp;</span>
              <span class="animated-bg animated-bg-text">&nbsp;</span>
            </p>
            <div class="author">
              <div class="profile-img animated-bg" id="profile_img">&nbsp;</div>
              <div class="author-info">
                <strong class="animated-bg animated-bg-text" id="name"
                  >&nbsp;</strong
                >
                <small class="animated-bg animated-bg-text" id="date">&nbsp;</small>
              </div>
            </div>
          </div>
        </div>
    
        <script src="script.js"></script>
      </body>
    </html>
    `);
    setJs(`const header = document.getElementById('header')
    const title = document.getElementById('title')
    const excerpt = document.getElementById('excerpt')
    const profile_img = document.getElementById('profile_img')
    const name = document.getElementById('name')
    const date = document.getElementById('date')
    
    const animated_bgs = document.querySelectorAll('.animated-bg')
    const animated_bg_texts = document.querySelectorAll('.animated-bg-text')
    
    setTimeout(getData, 2500)
    
    function getData() {
      header.innerHTML =
        '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />'
      title.innerHTML = 'Lorem ipsum dolor sit amet'
      excerpt.innerHTML =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis'
      profile_img.innerHTML =
        '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />'
      name.innerHTML = 'John Doe'
      date.innerHTML = 'Oct 08, 2020'
    
      animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
      animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
    }
    `);
    setCss(`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    * {
      box-sizing: border-box;
    }
    
    body {
      background-color: #ecf0f1;
      font-family: 'Roboto', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
      margin: 0;
    }
    
    img {
      max-width: 100%;
    }
    
    .card {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: hidden;
      width: 350px;
    }
    
    .card-header {
      height: 200px;
    }
    
    .card-header img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    
    .card-content {
      background-color: #fff;
      padding: 30px;
    }
    
    .card-title {
      height: 20px;
      margin: 0;
    }
    
    .card-excerpt {
      color: #777;
      margin: 10px 0 20px;
    }
    
    .author {
      display: flex;
    }
    
    .profile-img {
      border-radius: 50%;
      overflow: hidden;
      height: 40px;
      width: 40px;
    }
    
    .author-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
      width: 100px;
    }
    
    .author-info small {
      color: #aaa;
      margin-top: 5px;
    }
    
    .animated-bg {
      background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 10%,
        #f6f7f8 20%,
        #f6f7f8 100%
      );
      background-size: 200% 100%;
      animation: bgPos 1s linear infinite;
    }
    
    .animated-bg-text {
      border-radius: 50px;
      display: inline-block;
      margin: 0;
      height: 10px;
      width: 100%;
    }
    
    @keyframes bgPos {
      0% {
        background-position: 50% 0;
      }
    
      100% {
        background-position: -150% 0;
      }
    }
    `);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div className="screen">
      <div className="panel top-panel">
        <Editor name="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor name="CSS" language="css" value={css} onChange={setCss} />
        <Editor name="JS" language="javascript" value={js} onChange={setJs} />
      </div>
      <div className="panel">
        <div className="view-panel"> <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        /></div>
       
      </div>
    </div>
  );
};
export default App;
