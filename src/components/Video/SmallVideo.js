import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SmallVideo.module.scss';
import * as Icons from '~/components/Icons';

const cx = classNames.bind(styles);

function SmallVideo({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.muted = true;
    isPlaying ? video.play() : video.pause();
  }, [isPlaying]);

  const handleMouseLeave = function () {
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={handleMouseLeave}>
        <div className={cx('video-wrapper')}>
          {!isPlaying && <img className={cx('thumbnail')} src={data.thumb_url} alt="thumbnail" />}
          <video ref={videoRef} className={cx('video')} src={data.file_url} loop muted={true} autoPlay></video>
          <div className={cx('control')}>
            <div className={cx('control-item')}>
              <span className={cx('control-icon')}>
                <Icons.PlayOutlineVideoIcon />
              </span>
              <span className={cx('control-analystic')}>{data.views_count}</span>
            </div>
          </div>
        </div>
        <div className={cx('desc')}>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}

SmallVideo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SmallVideo;
