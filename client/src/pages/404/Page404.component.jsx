import React from 'react';
import './page404.style.css';
import { useHistory } from 'react-router-dom';

const Page404 = () => {
    const history = useHistory();

    const goHome = () => {
        history.push("/");
    }

    return (
        <>
            <div className="page-404">
                <p className="page-404-error">404</p>
                <p className="page-404-title">We couldn't find the page..</p>

                <p>Sorry, but the page you are looging for was either not found or does not exist.</p>
                <p>Try refreshing the page or click the button below to go back to the Homepage.</p>

                <div className="container container-one" onClick={goHome}>
                    <button className="btn-404" >
                        Back To Homepage
				<div className="fill-one"></div>
                    </button>
                </div>

            </div>

        </>
    )
}

export default Page404;