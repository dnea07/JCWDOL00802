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
} from "@chakra-ui/react";
import { useEffect } from "react";

function AdminWarehouse() {
  const navigate = useNavigate();

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

  const dispatch = useDispatch();
  // const { products } = useSelector(({ productReducer }) => {
  //   return {
  //     products: productReducer.products,
  //   };
  // });

  let dataExist = false;
  if (dataWarehouse == null) {
    dataExist = false;
  } else {
    dataExist = true;
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

  const printData = () => {
    let data = dataExist ? dataWarehouse : [];
    console.log(data);
    return data.map((val, idx) => {
      let editpage = `/admin/editwarehouse?id_warehouse=${val.id_warehouse}`;
      if (val.status == 1 || val.status == 2) {
        let admin = "⚠️";
        if (val.status == 2) {
          admin = "✅";
        } else {
          admin = "⚠️";
        }
        return (
          <Tr>
            <Td>{val.id_warehouse}</Td>
            <Td>{val.warehouse_branch_name}</Td>
            <Td>{val.postal_code}</Td>
            <Td>{val.detail_address}</Td>
            <Td>{val.phone_number}</Td>
            {/* NANTI GANTI JADI UDH ADA ADMIN ATAU BELUM */}
            <Td>{admin}</Td>
            <Td>
              <Link to={editpage}>
                <Button type="button" colorScheme="orange" variant="solid">
                  Edit Detail Cabang
                </Button>
              </Link>
            </Td>
          </Tr>
        );
      }
    });
  };

  return (
    <div className="bg-white my-5 w-100 p-5 m-auto shadow">
      <div className="d-flex">
        <Text className="ps-4 pt-3" fontSize="4xl">
          {" "}
          Pengelolaan Gudang
        </Text>
      </div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Cabang Gudang</Th>
              <Th>Kode Pos</Th>
              <Th>Alamat</Th>
              <Th>No.Telp</Th>
              <Th>Admin</Th>
              <Th>
                <Link to="/admin/newwarehouse">
                  <Button type="button" colorScheme="orange" variant="solid">
                    Tambah Cabang
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

export default AdminWarehouse;
