import React from "react";
import Axios from "axios";
import { Button, ButtonGroup, Text, Textarea } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { API_URL } from "../helper";

const RequestStock = (props) => {
  const navigate = useNavigate();

  const [idProductEdit, setIdProductEdit] = React.useState("");
  const [nameEdit, setNameEdit] = React.useState("");
  const [inputEdit, setInputEdit] = React.useState("");
  const [idWarehouseFrom, setIdWarehouseFrom] = React.useState("");
  const [stockWarehouseFrom, setStockWarehouseFrom] = React.useState("");
  const [stockWarehouseTo, setStockWarehouseTo] = React.useState("");
  const [idWarehouseTo, setIdWarehouseTo] = React.useState("");

  const [dataProduct, setDataProduct] = React.useState(null);
  const [dataStock, setDataStock] = React.useState(null);
  const [dataWarehouse, setDataWarehouse] = React.useState(null);

  const location = useLocation();
  let idProd = location.search.split("=")[1];
  console.log(`id prod = ${idProd}`);
  let idInt = parseInt(idProd);
  let idArr = idInt - 1;
  console.log(`id arr = ${idArr}`);

  const getProduct = async () => {
    try {
      let products = await Axios.get(API_URL + `/product/list`);
      let warehouse = await Axios.get(API_URL + `/warehouse/list`);
      let stocks = await Axios.get(API_URL + `/stock/stockall`);
      console.log(`product data ${products.data}`);
      console.log(`warehouse data ${warehouse.data}`);
      console.log(`stock data ${products.data}`);
      setDataProduct(products.data);
      setIdProductEdit(products.data[idArr].id_product);
      setNameEdit(products.data[idArr].name);
      setDataWarehouse(warehouse.data);
      setDataStock(stocks);
    } catch (error) {
      console.log(error);
    }
  };

  const onStockRequest = () => {
    Axios.post(API_URL + `/stock/stockmove`, {
      id_product: idProductEdit,
      input: inputEdit,
      from_id_warehouse: idWarehouseFrom,
      to_id_warehouse: idWarehouseTo,
    })
      .then((response) => {
        alert("Stock move Success ✅");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  let dataWarehouseExist = false;
  if (dataWarehouse == null) {
    dataWarehouseExist = false;
  } else {
    dataWarehouseExist = true;
  }

  const printDataWarehouse = () => {
    let data = dataWarehouseExist ? dataWarehouse : [];
    console.log(`print data city = `, data);
    return data.map((val, idx) => {
      if (val.status == 1) {
        return (
          <option value={val.id_warehouse}>{val.warehouse_branch_name}</option>
        );
      }
    });
  };

  let onGetStockFrom = async (id) => {
    try {
      console.log(`id warehouse=`, id);
      setIdWarehouseFrom(id);
      let data = dataStock.data;
      console.log(data);
      let stok = 0;
      data.map((val, idx) => {
        if (val.id_product == idProd && val.id_warehouse == id) {
          stok = stok + val.stock;
        }
      });
      setStockWarehouseFrom(stok);
    } catch (error) {
      console.log(error);
    }
  };

  let onGetStockTo = async (id) => {
    try {
      console.log(`id warehouse=`, id);
      setIdWarehouseTo(id);
      let data = dataStock.data;
      console.log(data);
      let stok = 0;
      data.map((val, idx) => {
        if (val.id_product == idProd && val.id_warehouse == id) {
          stok = stok + val.stock;
        }
      });
      setStockWarehouseTo(stok);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white my-5 w-100 p-5 m-auto shadow">
      <Text className="ps-4 pt-3" fontSize="4xl">
        {" "}
        Request Stock
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
              disabled
            />
          </div>
          <div className="flex d-flex my-3">
            <div className="w-50 mx-2">
              <label className="form-label fw-bold text-muted">
                Stok Warehouse Saya
              </label>
              <select
                className="form-control form-control-lg mt-3"
                onChange={(e) => onGetStockTo(e.target.value)}
              >
                <option>Pilih Gudang</option>
                {printDataWarehouse()}
              </select>
            </div>
            <div className="w-50 mx-2">
              <label className="form-label fw-bold text-muted">
                Jumlah stok di Gudang Saya
              </label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="jmlh stok"
                value={stockWarehouseTo}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="col-6 px-5">
          <div className="row bg-white">
            <div className="flex d-flex my-3">
              <div className="w-50 mx-2">
                <label className="form-label fw-bold text-muted">
                  Minta Stok Warehouse
                </label>
                <select
                  className="form-control form-control-lg mt-3"
                  onChange={(e) => onGetStockFrom(e.target.value)}
                >
                  <option>Pilih Gudang</option>
                  {printDataWarehouse()}
                </select>
              </div>
              <div className="w-50 mx-2">
                <label className="form-label fw-bold text-muted">
                  Jumlah stok di Gudang
                </label>
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="jmlh stok"
                  value={stockWarehouseFrom}
                  disabled
                />
              </div>
            </div>
            <div className="my-3">
              <label className="form-label fw-bold text-muted">
                Jumlah produk yg ingin di transfer
              </label>
              <input
                placeholder="jumlah produk "
                type="text"
                className="form-control p-3"
                value={inputEdit}
                onChange={(e) => setInputEdit(e.target.value)}
              />
            </div>
          </div>
          <br />
          <ButtonGroup>
            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant="solid"
              onClick={onStockRequest}
            >
              Request Stock
            </Button>
            <Link to="/admin/products">
              <Button>Kembali</Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default RequestStock;
