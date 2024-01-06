import * as request from '~/utils/httpRequest';

// Get suggested users:
// page: Số trang
// per_page: Số lượng trả về mộ trang
// except: Loại trừ account có id. VD: except = 1.
export const suggestedUser = async (page = '1', except = '-1', per_page = '6') => {
  try {
    const response = await request.get('users/suggested', {
      params: {
        page,
        except,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
