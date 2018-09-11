import React from 'react';
import W10 from '../img/w10.svg';

interface IFacultyLogoProps {
    size: number;
}

export class FacultyLogo extends React.Component<IFacultyLogoProps> {

    public render(): React.ReactNode {
        console.log(W10);
        return (
            <img
                style={{
                    height: `${this.props.size}em`,
                    width: `${this.props.size}em`,
                }}
                src={W10}
            />
        );
    }
}
