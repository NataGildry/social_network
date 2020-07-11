import React from 'react';
import preloader from '../../../assets/images/5.gif';

let Preloader = (props) => {
    return (
        <div>
            <img src={preloader}/>
        </div>
       // {this.props.isFetching ?  : null}
    )
};

export default Preloader;
