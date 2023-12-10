import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Create</a></li>
                            <li><a>My Bets</a></li>
                            <li><a>Profile</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl flex flex-row items-start justify-start">
                        <img className='w-1/2' src="/img/logo.png" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-2 font-bold">
                        <li>
                            <Link to="/tournaments">Tournaments</Link>
                        </li>
                        <li>
                            <Link to="/explore">Explore</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ConnectButton />
                </div>
            </div>
        </>
    );
};

export default Navbar;