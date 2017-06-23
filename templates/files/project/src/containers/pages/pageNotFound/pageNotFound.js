import React, { Component } from 'react';
import styles from './pageNotFound.scss';
import T from 'i18n-react';

export default class PageNotFound extends Component {
    render() {
        return <div className='page-not-found'>
            <h3>
                {T.translate('warnings.pageNotFound')}
            </h3>
            <p>
                {T.translate('warnings.pageNotFoundMessage')}
            </p>
            <div className='home-btn'>
                <a href='/' className='btn btn-secondary btn-action'>
                    Navigate to Home
                </a>
            </div>
        </div>
    }
}
