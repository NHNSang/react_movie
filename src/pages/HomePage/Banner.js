import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { quanLyPhimServ } from '../../services/quanLyPhimServ';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-[""]`}
      style={{
        ...style,
        display: 'block',
        insetInlineEnd: '0px',
        fontSize: 40,
        color: 'white',
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-[""]`}
      style={{
        ...style,
        display: 'block',
        insetInlineStart: '0px',
        zIndex: 2,
        fontSize: 40,
        color: 'white',
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left"></i>
    </div>
  );
}

const Banner = () => {
  const setting = {
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
  };

  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    quanLyPhimServ
      .getAllBanner()
      .then((res) => {
        console.log(res);
        setListBanner(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Carousel {...setting}>
      {listBanner.map((item, index) => {
        return (
          <div key={index}>
            <img
              className="w-full h-[700px] object-cover"
              src={item.hinhAnh}
              alt=""
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
