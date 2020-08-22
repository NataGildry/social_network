import React, {FC} from 'react';
import preloader from '../../../assets/images/5.gif';

const Preloader: FC = () => {
    return (
        <div>
            <img src={preloader} alt=""/>
        </div>
       // {this.props.isFetching ?  : null}
    )
};

export default Preloader;
