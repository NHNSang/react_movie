import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { quanLyRapServ } from '../../services/quanLyRapServ';
import './lichChieuCumRap.css';
import moment from 'moment';
const LichChieuCumRap = ({ maHeThongRap }) => {
  const [cumRap, setCumRap] = useState([]);

  useEffect(() => {
    // CGV
    // BHDStar
    quanLyRapServ
      .getInfoShowTimesTheater(maHeThongRap)
      .then((res) => {
        console.log(res);
        setCumRap(res.data.content[0]?.lstCumRap);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]);

  return (
    <div className="cum_rap">
      <Tabs
        defaultActiveKey="1"
        tabPosition={'left'}
        style={{
          height: 400,
        }}
        items={cumRap.map((item, index) => {
          return {
            // thuộc tính label tạo nội dung cho các nút tab
            label: (
              <div className="text-left space-y-1">
                <h4 className="truncate text-green-600 uppercase font-medium">
                  {item.tenCumRap}
                </h4>
                <p className="truncate text-xs text-gray-400">{item.diaChi}</p>
                <p className="text-xs text-red-500">[Chi tiết]</p>
              </div>
            ),
            // key là khoá của tab, giúp cho một số chức năng sau này cần biết đang đứng ở tab nào
            key: index,
            // disabled giúp ngăn chặn người dùng bấm mở tab nếu giá trị là true
            // disabled: true,
            // children giúp hiển thị nội dung của tab mà chúng ta muốn
            children: (
              <div>
                {item.danhSachPhim.map((item, index) => {
                  return item.dangChieu ? (
                    // mỗi div này sẽ là một div chứa lịch chiếu của một phím
                    <div key={index} className="flex p-5">
                      {/* // cột trái hiển thị hình ảnh phim  */}
                      <div className="col_left mr-4">
                        <img className="w-24" src={item.hinhAnh} alt="" />
                      </div>
                      {/* cột phải hiển thị tên phim và suất chiếu  */}
                      <div className="col_right">
                        <div>
                          {/* tên phim  */}
                          <h3 className="font-medium text-lg">
                            <span className="text-white p-1 bg-orange-600 rounded mr-2">
                              C18
                            </span>
                            {item.tenPhim}
                          </h3>
                          {/* danh sách 4 lịch chiếu  */}
                          <div className="grid grid-cols-2 gap-5 mt-3">
                            {item.lstLichChieuTheoPhim
                              .slice(0, 4)
                              .map((item, index) => {
                                // DD-MM-YYYY
                                return (
                                  <div className="p-3 border border-gray-400 rounded-md space-x-2 text-base">
                                    {/* ngày tháng năm  */}
                                    <span className="text-green-600 font-medium">
                                      {moment(item.ngayChieuGioChieu).format(
                                        'DD-MM-YYYY'
                                      )}
                                    </span>
                                    <span>~</span>
                                    {/* giờ phút chiếu  */}
                                    <span className="text-orange-600 font-medium">
                                      {moment(item.ngayChieuGioChieu).format(
                                        'hh:mm'
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default LichChieuCumRap;
