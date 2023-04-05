import React from "react";
import Axios from "axios";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { API_URL } from "../helper";
const NewProduct = (props) => {
  const navigate = useNavigate();
  //   const [idEdit, setIdEdit] = React.useState("");
  const [nameEdit, setNameEdit] = React.useState("");
  const [descriptionEdit, setDescriptionEdit] = React.useState("");
  const [priceEdit, setPriceEdit] = React.useState("");
  const [weightEdit, setWeightEdit] = React.useState("");
  //   const [dataProduct, setDataProduct] = React.useState(null);

  //   const location = useLocation();
  //   let idProd = location.search.split("=")[1];
  //   console.log(`id prod = ${idProd}`);
  //   let idInt = parseInt(idProd);
  //   let idArr = idInt - 1;
  //   console.log(`id arr = ${idArr}`);

  //   const getProduct = async () => {
  //     try {
  //       let products = await Axios.get(API_URL + `/product/list`);
  //       console.log(`res data ${products.data}`);
  //       setDataProduct(products.data);
  //       setIdEdit(products.data[idArr].id_product);
  //       setNameEdit(products.data[idArr].name);
  //       setDescriptionEdit(products.data[idArr].description);
  //       setPriceEdit(products.data[idArr].price);
  //       setStatusEdit(products.data[idArr].status);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getProductDetail = async () => {
  //     try {
  //       let products = await Axios.get(
  //         API_URL + `/product/detailproduct?id_product=${idProd}`
  //       );
  //       console.log(`res data ${products}`);
  //       setDataProduct(products.data);
  //       setIdEdit(products.data.id_product);
  //       setNameEdit(products.data.name);
  //       setDescriptionEdit(products.data.description);
  //       setPriceEdit(products.data.price);
  //       setStatusEdit(products.data.status);
  //       console.log(`nama: ${nameEdit}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const onAdd = () => {
    Axios.post(API_URL + `/product/addproduct`, {
      name: nameEdit,
      description: descriptionEdit,
      price: priceEdit,
      weight: weightEdit,
    })
      .then((response) => {
        alert("Add Product Success ✅");
        navigate("/admin/product");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   useEffect(() => {
  //     getProductDetail();
  //   }, []);

  //   useEffect(() => {
  //     getProduct();
  //   }, []);

  return (
    <div>
      <Text className="ps-4 pt-3" fontSize="4xl">
        {" "}
        Add Product
      </Text>
      <div id="regispage" className="row">
        <div className="col-6 px-5">
          <div className="my-3">
            <label className="form-label fw-bold text-muted">Nama</label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="NAMA PRODUK"
              value={nameEdit}
              onChange={(e) => setNameEdit(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="form-label fw-bold text-muted">Description</label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="DESC"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6 px-5">
          <div className="row bg-white">
            <div className="my-3 ">
              <label className="form-label fw-bold text-muted">Price</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder=""
                onChange={(e) => setPriceEdit(e.target.value)}
                value={priceEdit}
              />
            </div>
            <div className="my-3 ">
              <label className="form-label fw-bold text-muted">Weight</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder=""
                onChange={(e) => setWeightEdit(e.target.value)}
                value={weightEdit}
              />
            </div>
          </div>
          <ButtonGroup>
            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant="solid"
              onClick={onAdd}
            >
              Add Product
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
