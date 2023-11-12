import React, { useState } from 'react';
import { RegNavBar } from '../components/RegNavBar';

export function ForgotPass() {
    return (
        <div>
            <RegNavBar />
            <div className={ 'outerCard' } style={{ backgroundColor: '#f3f3f3', height: '100vh', width: '100vw' }}>
                <h1>Forgot Password</h1>
            </div>
        </div>
    )
}