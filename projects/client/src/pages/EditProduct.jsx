import React from "react";
import Axios from "axios";
import { Button, ButtonGroup, Text, Textarea } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { API_URL } from "../helper";
const EditProduct = (props) => {
  const navigate = useNavigate();
  // AMBIL DATA ROLE UTK DISABLE BUTTON EDIT KALO BUKAN SUPERADMIN
  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role,
    };
  });

  console.log(role);
  // let editable = false;
  // if (role == 3) {
  //   editable = true;
  // } else {
  //   editable = false;
  // }
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (role === 3) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [role]);

  console.log(isEdit);

  //STATE
  const [idEdit, setIdEdit] = React.useState("");
  const [nameEdit, setNameEdit] = React.useState("");
  const [descriptionEdit, setDescriptionEdit] = React.useState("");
  const [priceEdit, setPriceEdit] = React.useState("");
  const [weightEdit, setWeightEdit] = React.useState("");
  const [inputChange, setInputChange] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [dataProduct, setDataProduct] = React.useState(null);
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);
  const [gudang, setGudang] = React.useState("");
  const [type, setType] = React.useState("");

  const [dataWarehouse, setDataWarehouse] = React.useState(null);
  const [dataStock, setDataStock] = React.useState("");
  // GET NOMOR ID PRODUK DARI QUERY
  const location = useLocation();
  let idProd = location.search.split("=")[1];

  //FUNCTION FE
  const getProduct = async () => {
    try {
      let products = await Axios.get(API_URL + `/product/detailproduct`, {
        params: { id_product: idProd },
      });
      console.log(`res data ${products.data}`);
      setDataProduct(products.data);
      setIdEdit(products.data[0].id_product);
      setNameEdit(products.data[0].name);
      setDescriptionEdit(products.data[0].description);
      setPriceEdit(products.data[0].price);
      setWeightEdit(products.data[0].weight);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarehouse = async () => {
    try {
      let warehouse = await Axios.get(API_URL + `/warehouse/list`);
      setDataWarehouse(warehouse.data);
    } catch (error) {
      console.log(error);
    }
  };
  let dataWarehouseExist = false;
  if (dataWarehouse == null) {
    dataWarehouseExist = false;
  } else {
    dataWarehouseExist = true;
  }

  const getStock = async (id) => {
    try {
      setGudang(id);
      let stocks = await Axios.get(API_URL + `/stock/stockdetail`, {
        params: { id_warehouse: id, id_product: idProd },
      });
      setDataStock(stocks.data[0].stock);
    } catch (error) {
      console.log(error);
    }
  };

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  function handleSave() {
    if (saveImage) {
      // save image to backend
      let formData = new FormData();
      formData.append("photo", saveImage);

      fetch(`http://${API_URL}/product/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href = data.image;
        });
    } else {
      alert("Upload gambar dulu");
    }
  }

  // FUNCTION AXIOS
  const onEdit = () => {
    Axios.post(API_URL + `/product/editproduct`, {
      id_product: idEdit,
      name: nameEdit,
      description: descriptionEdit,
      price: priceEdit,
      weight: weightEdit,
    })
      .then((response) => {
        alert("Edit Product Success ✅");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDelete = () => {
    Axios.post(API_URL + `/product/deleteproduct`, {
      id_product: dataProduct.id_product,
    })
      .then((response) => {
        alert("Delete Product Success ✅");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onExecuteChange = () => {
    Axios.post(API_URL + `/stock/stockedit`, {
      input: inputChange,
      id_product: idEdit,
      id_warehouse: gudang,
      type,
    })
      .then((response) => {
        alert("Edit Stock Success ✅");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //USE EFFECT
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getWarehouse();
  }, []);

  //PRINT DATA
  const printSelectWarehouse = () => {
    let data = dataWarehouseExist ? dataWarehouse : [];
    return data.map((val, idx) => {
      if (val.status == 2) {
        return (
          <option value={val.id_warehouse}>{val.warehouse_branch_name}</option>
        );
      }
    });
  };

  return (
    <div className="bg-white  w-100 p-3 m-auto ">
      <Text className="ps-4 pt-3" fontSize="4xl">
        {" "}
        Edit Product
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
              disabled={!isEdit}
            />
          </div>
          <div className="my-3">
            <label className="form-label fw-bold text-muted">Description</label>
            <Textarea
              type="text"
              className="form-control p-3"
              placeholder="DESC"
              style={{
                resize: "none",
                height: "250px",
              }}
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
            />
          </div>
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
            <label className="form-label fw-bold text-muted">
              Berat Barang (gram)
            </label>
            <input
              type="text"
              className="form-control p-3"
              placeholder=""
              onChange={(e) => setWeightEdit(e.target.value)}
              value={weightEdit}
            />
          </div>

          {/* INPUT PICTURE */}
          <div>
            <label className="form-label fw-bold text-muted">
              Gambar Produk
            </label>
            <div>
              <img src={image} className="img-thumbnail" alt="..." />
            </div>
            <div
              className="my-3"
              style={
                {
                  // display: editable ? "flex" : "none",
                }
              }
            >
              <label htmlFor="formFile" className="form-label">
                Upload image here
              </label>
              <input
                onChange={handleUploadChange}
                className="form-control"
                type="file"
                id="formFile"
              />
              <button
                // onClick={handleSave}
                className="btn btn-primary mt-2 w-100"
              >
                Change Picture
              </button>
            </div>
          </div>
          {/*  */}
          <br />
          <ButtonGroup>
            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant="solid"
              onClick={onEdit}
              style={
                {
                  // display: editable ? "flex" : "none",
                }
              }
            >
              Simpan
            </Button>
            {isEdit && (
              <Button
                type="button"
                width="full"
                colorScheme="orange"
                variant="solid"
                onClick={onDelete}
              >
                Hapus Produk
              </Button>
            )}
            <Link to="/admin/products">
              <Button>Kembali</Button>
            </Link>
          </ButtonGroup>
        </div>
        <div className="col-6 px-5">
          <div className="row bg-white">
            <div>
              <label className="form-label fw-bold text-muted">Warehouse</label>
              <select
                className="form-control form-control-lg mt-3"
                onChange={(e) => getStock(e.target.value)}
              >
                <option>Pilih Gudang</option>
                {printSelectWarehouse()}
              </select>
              <label className="form-label fw-bold text-muted">Stock</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="jmlh stok"
                value={dataStock}
                disabled
              />
            </div>

            <div className="my-5">
              <label className="form-label fw-bold text-muted">
                INPUT CHANGE JUMLAH STOK
              </label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="INPUT CHANGE HERE"
                value={inputChange}
                onChange={(e) => setInputChange(e.target.value)}
              />
              <br />
              <label className="form-label fw-bold text-muted">
                TIPE PERUBAHAN
              </label>
              <select
                className="form-control form-control-lg mt-3"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" selected hidden>
                  Pilih tipe
                </option>
                <option value="increment">INPUT BARANG</option>
                <option value="decrement">BUANG BARANG</option>
              </select>
              <br />
              <label className="form-label fw-bold text-muted">
                Notes for changes
              </label>
              <Textarea
                type="text"
                className="form-control p-3"
                placeholder="DESC"
                style={{
                  resize: "none",
                  height: "100px",
                }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <ButtonGroup>
              <Button
                type="button"
                width="full"
                colorScheme="orange"
                variant="solid"
                onClick={onExecuteChange}
              >
                EXECUTE INPUT
              </Button>
            </ButtonGroup>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
