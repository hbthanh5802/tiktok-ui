import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) => {
  const [fallBack, setFallBack] = useState('');

  const handleError = () => {
    setFallBack(customFallBack);
  };

  useEffect(() => {
    setFallBack('');
  }, [src]);

  const classes = cx('wrapper', {
    [className]: className,
  });

  return <img ref={ref} src={fallBack || src} alt={alt} className={classes} onError={handleError} {...props} />;
});

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallBack: PropTypes.string,
};

export default Image;
