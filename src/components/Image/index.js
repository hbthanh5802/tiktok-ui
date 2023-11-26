import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) {
    const [fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(customFallBack);
    };

    const classes = cx('wrapper', {
        [className]: className,
    });

    return <img ref={ref} src={fallBack || src} alt={alt} className={classes} onError={handleError} {...props} />;
}

export default forwardRef(Image);
