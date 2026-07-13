import React from 'react';
import { Navigate } from 'react-router-dom';
import { authStore } from '../stores/AuthStore';
import { observer } from 'mobx-react';
const protectedRoute = observer(({children})=>{
    if(authStore.loading){
        return null;
    }
    const isAuthenticated = !!authStore.user; //!! checks if the user is not null, meaning the user is logged in
    if(!isAuthenticated){
        return <Navigate to="/" replace />
    }
    return<>{children}</>;
})
export default protectedRoute