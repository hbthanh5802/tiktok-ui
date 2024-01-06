import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Video from '~/components/Video';

const cx = classNames.bind(styles);

function Home() {
  return (
    <main className={cx('wrapper')}>
      <div className={cx('container')}>
        <Video />
      </div>
    </main>
  );
}

export default Home;
