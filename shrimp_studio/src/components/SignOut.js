import { useAuth } from '../useAuth'; 

const SignOut = () => {
    const { auth } = useAuth(); 

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;
