import { https } from './configServ';

export const quanLyPhimServ = {
  getAllBanner: () => {
    // trong các phương thức của https sẽ có 2 giá trị nhận vào, một là đoạn chuỗi endpoint, 2 là dữ liệu data truyền lên
    return https.get('/api/QuanLyPhim/LayDanhSachBanner');
  },
  getAllMovie: () => {
    return https.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08');
  },
  deleteMovie: (maPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
};
