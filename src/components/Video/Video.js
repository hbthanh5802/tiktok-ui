import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import * as Icons from '~/components/Icons';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import videos from '~/assets/videos';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function Video({ data }) {
  const { user } = data;
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const lineBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const timeBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isLiked, setIsLiked] = useState(data.is_liked);
  const [isFollowed, setIsFollowed] = useState(user.is_followed);

  const secondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying && isInViewport && video.paused) {
      // video.muted = false;
      video.play();
    } else video.pause();
  }, [isPlaying, isInViewport]);

  const handleChangeTimeBar = function (e) {
    const timeBarValue = e.target.value;
    const seekTime = (duration * timeBarValue) / 100;
    videoRef.current.currentTime = seekTime;
  };

  const handleAccountItemClick = async (nickname) => {
    try {
      const result = await userServices.getUser(nickname);
      navigate(`/profile/${data.nickname}`, {
        state: {
          user: result,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = function (e) {
      setCurrentTime(e.target.currentTime);
    };

    const handleLoadedMetadata = (e) => {
      // e.target.volume = 0;
      setDuration(video ? video.duration : e.target.duration);
    };

    const handleScroll = () => {
      if (video) {
        const rect = video.getBoundingClientRect();
        const isInView = rect.top > 0 && rect.bottom < window.innerHeight;
        setIsInViewport(isInView);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsPlaying(isInViewport);
    }
  }, [isInViewport]);

  useEffect(() => {
    const video = videoRef.current;
    const progressValue = Math.floor((currentTime / video.duration) * 100);
    timeBarRef.current.value = progressValue;
    lineBarRef.current.style.width = progressValue + '%';
  }, [currentTime]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('avatar')} onClick={() => handleAccountItemClick(user.nickname)}>
          <Image src={user.avatar} alt="avatar" />
        </div>
        <div className={cx('content')}>
          <div className={cx('info')}>
            <div>
              <div className={cx('name')}>
                <h3 className={cx('nickname')} onClick={() => handleAccountItemClick(user.nickname)}>
                  <strong>{user.nickname}</strong>
                  {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h3>
                <h4 className={cx('fullname')}>{`${user.first_name} ${user.last_name}`}</h4>
              </div>
              <div className={cx('desc')}>
                <span className={cx('desc-content')}>{data.description}</span>
                <span className={cx('desc-tag')}>#trending</span>
                <span className={cx('desc-tag')}>#outdoor</span>
                <span className={cx('desc-tag')}>#2024</span>
                <span className={cx('desc-tag')}>#tiktok</span>
              </div>
              <div className={cx('music')}>
                <span className={cx('music-icon')}>
                  <FontAwesomeIcon icon={faMusic} />
                </span>
                <span>{data.music}</span>
              </div>
            </div>
            <div className={cx('button')} onClick={() => setIsFollowed(!isFollowed)}>
              <Button outline={!isFollowed} primary={isFollowed}>
                {isFollowed ? 'Followed' : 'Follow'}
              </Button>
            </div>
          </div>
          <div className={cx('video-wrapper')}>
            <div className={cx('video')}>
              {!isInViewport && <img src={data.thumb_url} alt="thumbnail" />}
              <video
                ref={videoRef}
                loop
                onClick={() => setIsPlaying(!isPlaying)}
                autoPlay
                muted={true}
                playsInline
                // onError={(e) => handleVideoError(e)}
              >
                <source src={data.file_url} type="video/mp4" />
                <source src={videos.tempVideo} type="video/mp4" />
              </video>
              <div className={cx('video-control')}>
                <div className={cx('video-btn')}>
                  <div className={cx('btn', 'play-btn')} onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Icons.PlayVideoIcon /> : <Icons.PauseVideoIcon />}
                  </div>
                  <div className={cx('btn', 'volume-btn')}>
                    <div className={cx('volume-bar')}>
                      <input
                        ref={volumeBarRef}
                        className={cx('volume-slider')}
                        type="range"
                        step={0.1}
                        min={0}
                        max={1}
                        value={volume}
                        onChange={(e) => setVolume(+e.target.value)}
                      />
                    </div>
                    <span
                      onClick={() => {
                        setVolume(volume === 0 ? 1 : 0);
                        videoRef.current.muted = false;
                        if (!isPlaying) setIsPlaying(true);
                      }}
                    >
                      {volume === 0 ? <Icons.MuteVolumeVideoIcon /> : <Icons.VolumeVideoIcon />}
                    </span>
                  </div>
                </div>
                <div className={cx('progress')}>
                  <div className={cx('duration')}>
                    <input className={cx('slider', 'slider-hidden')} type="range" step={1} min={0} max={100} />
                    <input
                      ref={timeBarRef}
                      className={cx('slider')}
                      type="range"
                      step={1}
                      min={0}
                      max={100}
                      onChange={handleChangeTimeBar}
                    />
                    <span ref={lineBarRef} className={cx('slider-line')}></span>
                  </div>
                  <span className={cx('time')}>
                    {secondsToTime(currentTime)} / {secondsToTime(duration)}
                  </span>
                </div>
              </div>
            </div>
            <div className={cx('action')}>
              <span
                className={cx('action-item', {
                  avtive: isLiked,
                })}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Icons.HeartIcon />
              </span>
              <strong>{isLiked ? data.likes_count + 1 : data.likes_count}</strong>
              <span className={cx('action-item')}>
                <Icons.CommentIcon />
              </span>
              <strong>{data.comments_count}</strong>
              <span className={cx('action-item')}>
                <Icons.BookmarkIcon />
              </span>
              <strong>12</strong>
              <span className={cx('action-item')}>
                <Icons.ShareIcon />
              </span>
              <strong>{data.shares_count}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
