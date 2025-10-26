import { useAuth0 } from '@auth0/auth0-react'

export function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button 
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
            Log Out  
        </button>
    );
}
export default LogoutButton;