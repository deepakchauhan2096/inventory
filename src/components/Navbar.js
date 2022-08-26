import React from 'react'

const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 fixed-top position-sticky">
            <a className="navbar-brand px-3 " href="./home">NFM Analytics</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="./home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="./link">Link</a>
                    </li> */}
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="./dropdown" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="./action">Action</a>
                            <a className="dropdown-item" href="./another">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="./some">Something else here</a>
                        </div>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="./disabled">Disabled</a>
                    </li> */}
                </ul>
                <form className="form-inline my-2 my-lg-0 d-flex">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-info mx-2" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar