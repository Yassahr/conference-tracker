import React from 'react';
//this is for auth, to make sure you are logged in to the correct place to login into a page
function Protected ({children, authentication = true}){
    return (
        <>
            {children}
        </>
    );
};

export default Protected;