import React, { useEffect, useState } from 'react';
import { quanLyPhimServ } from '../../services/quanLyPhimServ';
import { Table, Tag, Space } from 'antd';

const MovieManager = () => {
  const [listMovie, setListMovie] = useState([]);
  console.log(listMovie);
  const columns = [
    {
      // title là tên cột
      title: 'Mã phim',
      // dataIndex giúp bắt được thuộc tính cần lấy dữ liệu của phần tử trong mảng
      dataIndex: 'maPhim',
      key: 'maPhim',
      // render: (text, record, index) => {
      //   // console.log(text);
      //   // console.log(record);
      //   // console.log(index);
      // },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (url) => {
        return <img className="w-20" src={url} />;
      },
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
    },
    {
      title: 'Mô tả',
      key: 'moTa',
      dataIndex: 'moTa',
      render: (text) => {
        return <p className="w-56 line-clamp-2">{text}</p>;
      },
    },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (_, record) => {
        console.log(record);
        return (
          <div className="space-x-3">
            <button
              onClick={() => {
                quanLyPhimServ
                  .deleteMovie(record.maPhim)
                  .then(() => {
                    // gọi render lại phim khi đã xoá
                    quanLyPhimServ.getAllMovie().then((res) => {
                      setListMovie(res.data.content);
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="text-white bg-red-600 py-2 px-4 rounded-md"
            >
              Xoá
            </button>
            <button className="text-white bg-yellow-600 py-2 px-4 rounded-md">
              Sửa
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    quanLyPhimServ
      .getAllMovie()
      .then((res) => {
        console.log(res);
        setListMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Danh sách phim</h2>
      <input type="text" />
      <Table
        columns={columns}
        dataSource={listMovie}
        pagination={{
          // pageSize giúp giới hạn số phần tử trên mỗi trang
          pageSize: 5,
          // current giúp đưa người dùng tới trang mà người dùng muốn
          // current: 8,
          // total
        }}
      />
    </div>
  );
};

export default MovieManager;