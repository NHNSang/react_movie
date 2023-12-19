import { https } from './configServ';

export const userServ = {
  loginServ: (data) => {
    // Dữ liệu cần truyền là tài khoản và mật khảu nên ta đặt là data 
    return https.post('/api/QuanLyNguoiDung/DangNhap',data);
  },
};
