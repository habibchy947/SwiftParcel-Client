import { auth } from '@/Firebase/firebase.init';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const provider = new GoogleAuthProvider()

    // google sign in
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    // sign up
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sign in
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    
    // manage user
    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            const userInfo = {
                email: currentUser?.email
            }
            if(currentUser) {
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
            }else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            // console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        setUser,
        updateUserProfile,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleLogin,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;