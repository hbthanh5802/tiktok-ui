import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Video from '~/components/Video';
import { useEffect, useState } from 'react';
import * as videoServices from '~/services/videoServices';

const cx = classNames.bind(styles);

const InitialPagenation = {
  total: 1,
  count: 15,
  per_page: 15,
  current_page: 1,
  total_pages: 2,
  links: {
    next: 'http://tiktok.fullstack.edu.vn/api/videos?page=2',
  },
};

function Home() {
  const [pagination, setPagination] = useState(InitialPagenation);
  const { current_page, total_pages } = pagination;
  const [params, setParams] = useState({
    type: 'for-you',
    page: '1',
    except: '-1',
  });
  const [videosList, setVideosList] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let { type, except, page } = params;
        except = videosList.reduce((total, cur) => total + ',' + cur.uuid, '-1');
        const videosresult = await videoServices.getVideosList(type, page, except);
        const paginationResult = await videoServices.getVideoPagination(type, page, except);
        setVideosList((prev) => [...prev, ...videosresult]);
        setPagination({ ...pagination, ...paginationResult });
      } catch (error) {
        console.error('Error fetch video list!');
      }
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const handleScroll = () => {
      // Chiều cao của cửa sổ trình duyệt
      const windowHeight = window.innerHeight;
      // Chiều cao của toàn bộ trang (bao gồm cả phần không thể nhìn thấy được)
      const documentHeight = document.documentElement.scrollHeight;
      // Đã cuộn được bao nhiêu
      const scrollY = window.scrollY;
      // Kiểm tra xem bạn đã cuộn đến cuối trang chưa
      if (windowHeight + scrollY >= documentHeight) {
        // Bạn đã cuộn đến cuối trang
        setParams({
          ...params,
          page: current_page < total_pages ? current_page + 1 : total_pages,
        });
      }
    };

    // Gán sự kiện scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, [params, current_page, total_pages]);

  return (
    <main className={cx('wrapper')}>
      <div className={cx('container')}>
        {videosList.map((video) => {
          return <Video key={video.id} data={video} />;
        })}
      </div>
    </main>
  );
}

export default Home;
