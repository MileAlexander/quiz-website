import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext ({ user: null });

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // check the state of authorization
    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(!token) {
            setUser(null);
            return;
        }

        const controller = new AbortController();

        fetch('/api/auth/me', {
            signal: controller.signal,
            headers: {
                Authorization: token,
            },
        }).then((res) =>{
            if(!res.ok) {
                return null;
            }
            return res.json();
        }).then((user) => {
            setUser(user);
        }).catch((error) => {
            console.log(error);
        });

        return () => {
            controller.abort();
        };
    }, []);

    const sigin = ()=>{
        if(user !== null){
            localStorage.setItem('token', user.token);
        };
        setUser({email: 'test@test.com'});
    };

    const sigout = ()=>{
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, sigin, sigout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;