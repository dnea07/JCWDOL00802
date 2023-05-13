import React, { useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
import Axios from "axios";
import { Button, Text, Input } from "@chakra-ui/react";
import { API_URL } from "../helper";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  let userToken = localStorage.getItem("cnc_login");
  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role,
    };
  });

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: basicSchema,
  });
  const onRegis = () => {
    Axios.post(API_URL + `/apis/user/regis`, {
      email: values.email,
    })
      .then((response) => {
        alert("Register Success ✅ Cek Email anda!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.msg);
      });
  };

  // ACCESS
  useEffect(() => {
    document.title = "Cnc || Register";
    window.addEventListener("beforeunload", resetPageTitle);
    return () => {
      window.removeEventListener("beforeunload", resetPageTitle());
    };
  }, []);
  useEffect(() => {
    if (role && role == 1) {
      navigate("/");
    } else if (role == 2 || role == 3) {
      navigate("/admin");
    }
  }, [role, userToken]);
  const resetPageTitle = () => {
    document.title = "Cnc-ecommerce";
  };

  //SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="paddingmain">
      <div className="container py-5">
        <div className="row bg-white my-5 shadow rounded">
          {/* Gambar sebelah kiri, kalao layar kecil hilang */}
          <div className="col-12 col-md-8 d-none d-md-block">
            <img
              src={require("../Assets/logo.png")}
              width="100%"
              alt="content"
            />
          </div>
          {/* Input Data User sebelah Kanan */}
          <div className="col-12 col-md-4 p-5 shadow">
            <h6 className="fw-bold muted-color">Click N Collect</h6>
            <Text className="fw-bold" fontSize="4xl">
              Daftar disini
            </Text>
            <div className="d-flex">
              <a className="muted-color">Sudah daftar?</a>
              <a className="ms-2 main-color fw-bold" href="/login">
                Masuk disini
              </a>
            </div>
            <div id="form">
              <div className="my-3">
                <label className="form-label fw-bold text-muted">Email</label>
                <Input
                  type="email"
                  id="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && (
                  <Text fontSize="small" className="error">
                    {errors.email}
                  </Text>
                )}
              </div>
            </div>
            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant={errors.email ? "outline" : "solid"}
              onClick={() => onRegis()}
              isDisabled={errors.email}
            >
              Daftar
            </Button>
            {/* Social Media Login */}
            {/* <div className="text-center text-muted">
              <span>atau</span>
            </div>
            <button
              //   onClick={() =>
              //     window.open(`https://google.com`, "_blank").focus()
              //   }
              className="btn btn-light py-2 text-muted mt-2 w-100 shadow"
            >
              <div className="d-flex justify-content-center align-items-center">
                <FcGoogle size={36} className="me-2" />{" "}
                <span> Daftar dengan Google</span>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
