import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../helper";
import Axios from "axios";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  EditableInput,
  ButtonGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";

function AdminProducts() {
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = React.useState(null);
  const [dataStock, setDataStock] = React.useState(null);
  const [dataWarehouse, setDataWarehouse] = React.useState(null);
  // const [dataFilter, setDataFilter] = React.useState(null);
  // const [filterName, setFilterName] = React.useState("");

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

  const getProduct = async () => {
    try {
      let products = await Axios.get(API_URL + `/product/list`);
      console.log(`res data ${products.data}`);
      // let stocks = await Axios.get(API_URL + `/stock/stockall`);
      // console.log(`data stok`, stocks);
      setDataProduct(products.data);
      // setDataStock(stocks.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStock = async (id) => {
    try {
      console.log(`id`, id);
      let stocks = await Axios.get(API_URL + `/stock/stockwarehouse`, {
        params: { id_warehouse: id },
      });
      console.log(`data stok`, stocks);
      // setDataProduct(products.data);
      setDataStock(stocks.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  // const { products } = useSelector(({ productReducer }) => {
  //   return {
  //     products: productReducer.products,
  //   };
  // });

  // const getStock = async () => {
  //   try {
  //     let products = await Axios.get(API_URL + `/stock/stockall`);
  //     console.log(`res data ${products.data}`);
  //     setDataProduct(products.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  let dataProductExist = false;
  if (dataProduct == null) {
    dataProductExist = false;
  } else {
    dataProductExist = true;
  }

  let dataStockExist = false;
  if (dataStock == null) {
    dataStockExist = false;
  } else {
    dataStockExist = true;
  }

  // const getFilter = async () => {
  //   try {
  //     let res = await Axios.get(API_URL + `/products?name_like=${filterName}`);
  //     console.log(`res data ${res.data}`);
  //     console.log(`filtername ${filterName}`);
  //     console.log(API_URL + `/products?name_like=${filterName}`);
  //     setDataFilter(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onBtnReset = () => {
  //   setDataFilter(null);
  //   setFilterName("");
  //   dispatch(getProductsAction());
  // };

  // React.useEffect(() => {
  //   // getData();
  //   dispatch(getProductsAction());
  // }, []);

  // useEffect(() => {
  //   dispatch(getProductsAction());
  // }, []);

  // getProduct();
  useEffect(() => {
    getWarehouse();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getStock();
  }, []);

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

  const printData = () => {
    let data = dataProductExist ? dataProduct : [];
    let stok = dataStockExist ? dataStock : [];
    console.log(data);
    return data.map((val, idx) => {
      let editpage = `/admin/editproduct?id_product=${val.id_product}`;
      let requestpage = `/admin/requeststock?id_product=${val.id_product}`;
      let stock = 0;
      stok.map((value, index) => {
        if (value.id_product == val.id_product) {
          stock = stock + value.stock;
        }
      });
      return (
        <Tr>
          <Td>{val.id_product}</Td>
          <Td>{val.name}</Td>
          <Td>{val.price}</Td>
          {/* panggil jmlh stok disini (sesuai warehouse) */}
          <Td>{stock}</Td>
          <Td>
            <ButtonGroup>
              <Link to={editpage}>
                <Button type="button" colorScheme="orange" variant="solid">
                  Edit Produk
                </Button>
              </Link>
              <Link to={requestpage}>
                <Button type="button" colorScheme="orange" variant="solid">
                  Request Stok
                </Button>
              </Link>
            </ButtonGroup>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <div className="bg-white  w-100 p-5 m-auto">
      <div className="d-flex">
        <div className="align-center">
          <Text className="ps-4 pt-3" fontSize="4xl">
            {" "}
            Products Page
          </Text>
        </div>
        <div>
          <select
            onChange={(e) => getStock(e.target.value)}
            className="form-control form-control-lg mt-3
          "
          >
            <option>Pilih Gudang </option>
            {printSelectWarehouse()}
          </select>
        </div>
      </div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Product Name</Th>
              <Th>Harga</Th>
              <Th>Stok</Th>
              <Th>
                <Link to="/admin/newproduct">
                  <Button type="button" colorScheme="orange" variant="solid">
                    Tambah Produk Baru
                  </Button>
                </Link>
              </Th>
            </Tr>
          </Thead>
          <Tbody>{printData()}</Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminProducts;
