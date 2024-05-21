import React from "react";
import { useGlobalContext } from "./Context";

function Stories () {

    const { hits, isLoading, removePost } = useGlobalContext();    
    
        if (isLoading) {
            return (
            <>
            <h2> Loading......</h2>
            </>
            );
        } 
    
    return (
    <>
    {hits.map((curPost) => {
        const {title, author, objectID, url, num_comments} = curPost;
        return (
        <>
       <div>
        <h2>{title}</h2>
        <p> By <span> {author} </span> | <span>{num_comments}</span> comments</p>

        <div>
            <a href={url} target="_blank">Read More</a>
            <a href="#" onClick={() => removePost(objectID)}>Remove</a>
        </div>
       </div>
        </>
        );
    })}
    </>

    )
}

export default Stories;