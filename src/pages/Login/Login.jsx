import React from "react";
import * as loginAnimation from "./../../assets/animation/loginAnimation2.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userServ } from "../../services/useServ";
import { message } from 'antd';
import { saveLocalStore } from "../../util/local";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { saveInfoUser } from "../../redux/slice/userSlice";
const Login = () => {
  const dispath = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      // initialValues giúp ta quản lí trường dữ liệu
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (values) => {
        console.log(values);
        userServ
          .loginServ(values)
          .then((res) => {
            console.log(res);
            // thông báo thành công
            messageApi.open({
              type: 'success',
              content: 'Đăng nhập thành công',
            });
            // lưu thông tin người dùng
            saveLocalStore(res.data.content, 'user_info');
            dispath(saveInfoUser(res.data.content))
            // trỏ về trang chủ
            setTimeout(()=>{
              navigate("/");
            },1000)
          })
          .catch((err) => {
            console.log(err);
            messageApi.open({
              type: 'error',
              content: err.response.data.content,
            });
          });
      },
      // validationSchema giúp chúng ta kiểm tra lỗi của người dùng
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="gird grid-cols-2">
          <div className="col_left">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
          <div className="col_right">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="taiKhoan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tài Khoản
                </label>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Vui lòng nhập tài khoản"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taiKhoan}
                />
                {errors.taiKhoan && touched.taiKhoan ? (
                  <p className="text-red-500 text-xs mt-1">{errors.taiKhoan}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="maiKhau"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="matKhau"
                  id="maiKhau"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.matKhau}
                />
                {errors.matKhau && touched.matKhau ? (
                  <p className="text-red-500 text-xs mt-1">{errors.matKhau}</p>
                ) : null}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onSubmit={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
