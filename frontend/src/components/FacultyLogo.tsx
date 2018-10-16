import React from 'react';
import W10 from '../img/w10.svg';

interface IFacultyLogoProps {
    size: number;
}

export class FacultyLogo extends React.Component<IFacultyLogoProps> {

    public render(): React.ReactNode {
        return (
            <img
                style={{
                    height: `${this.props.size}vh`,
                    width: `${this.props.size}vh`,
                }}
                src={W10}
            />
        );
    }
}
