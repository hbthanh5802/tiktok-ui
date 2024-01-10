import * as request from '~/utils/httpRequest';

// VD: {{API_ENDPOINT}}/api/videos?type=for-you&page=1
// type: Có 2 giá trị là "for-you" và "following". for-you: Lấy danh sách posts dành cho bạn. following: Lấy danh sách posts của những người bạn đang theo dõi
// page: Dùng để tải thêm dữ liệu posts. VD: Khi ở trang 1 sẽ tải 10 posts đầu, sang trang 2 sẽ tải thêm 10 posts tiếp theo
// except: UID của video sẽ bị loại trừ khỏi kết quả
export const getVideosList = async (type = 'for-you', page = '1', except = '-1') => {
  try {
    const response = await request.get('videos', {
      params: {
        type,
        page,
        except,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVideoPagination = async (type = 'for-you', page = '1', except = '-1') => {
  try {
    const response = await request.get('videos', {
      params: {
        type,
        page,
        except,
      },
    });
    return response.meta;
  } catch (error) {
    console.error(error);
  }
};

export const getUserVideos = async (id) => {
  try {
    const response = await request.get(`users/${id}/videos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
