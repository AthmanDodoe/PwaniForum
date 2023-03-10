import { createContext, useContext} from "react";
import { createUserWithEmailAndPassword }
    from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth } from '../firebase';

const userContext = createContext();

export const AuthContextProvider = ({children}) => {
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    return (
        <userContext.Provider value={createUser}>
            {children}
        </userContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(userContext);
}