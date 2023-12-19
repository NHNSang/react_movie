import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { quanLyRapServ } from '../../services/quanLyRapServ';
import LichChieuCumRap from './LichChieuCumRap';
const LichChieuRap = () => {
  const [rap, setRap] = useState([]);
  // const [maHeThongRap, setMaHeThongRap] = useState('');
  useEffect(() => {
    quanLyRapServ
      .getAllRap()
      .then((res) => {
        console.log(res);
        setRap(res.data.content);
        // setMaHeThongRap(res.data.content[0]?.maHeThongRap);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-20">
      <div className="container">
        <Tabs
          defaultActiveKey="1"
          tabPosition={'left'}
          // style={{
          //   height: 220,
          // }}
          // 4 key =" abc", key="xyz"
          style={{
            border: '1px solid #8080806e',
          }}
          items={rap.map((item, index) => {
            return {
              // thuộc tính label tạo nội dung cho các nút tab
              label: <img className="w-10" src={item.logo} alt="" />,
              // key là khoá của tab, giúp cho một số chức năng sau này cần biết đang đứng ở tab nào
              key: item.maHeThongRap,
              // disabled giúp ngăn chặn người dùng bấm mở tab nếu giá trị là true
              // disabled: true,
              // children giúp hiển thị nội dung của tab mà chúng ta muốn
              children: <LichChieuCumRap maHeThongRap={item.maHeThongRap} />,
            };
          })}
          // onChange={(activeKey) => {
          //   console.log(activeKey);
          //   // cứ mỗi lần ng dùng bấm sẽ set lại mã hệ thống rạp
          //   setMaHeThongRap(activeKey);
          // }}
        />
      </div>
    </div>
  );
};

export default LichChieuRap;
