import React from 'react';
import W10 from '../img/w10.svg';

export class FacultyLogo extends React.Component{

    render() {
        return (
            <img
                alt='Presents faculty logo'
                style={{
                    height: `${this.props.size}vh`,
                    width: `${this.props.size}vh`,
                }}
                src={W10}
            />
        );
    }
}
