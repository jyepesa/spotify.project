import React from "react";

function ErrorMessage({loading, message}) {
    if(loading) {
        return <p>Loading...</p>
    } else if(message) {
        return <p>{message}</p>
    }
    
}

export default ErrorMessage