import React from "react";
import Axios from "axios";
import { Button, ButtonGroup, Text, Textarea } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

import { API_URL } from "../helper";
const EditWarehouse = (props) => {
  const navigate = useNavigate();

  const [nameEdit, setNameEdit] = React.useState("");
  const [detailAddressEdit, setDetailAddressEdit] = React.useState("");
  const [phoneNumberEdit, setPhoneNumberEdit] = React.useState("");
  const [keyProvinceEdit, setKeyProvinceEdit] = React.useState("");
  // const [keyCityEdit, setKeyCityEdit] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [provinceList, setProvinceList] = React.useState(null);
  const [cityList, setCityList] = React.useState(null);
  const [warehouseData, setWarehouseData] = React.useState(0);

  const location = useLocation();
  let idWarehouse = location.search.split("=")[1];
  console.log(`id warehouse = ${idWarehouse}`);
  let idInt = parseInt(idWarehouse);
  let idArr = idInt - 1;
  console.log(`id arr = ${idArr}`);

  const getWarehouse = async () => {
    try {
      let warehouse = await Axios.get(API_URL + `/warehouse/list`);
      console.log(`res data ${warehouse.data}`);
      setWarehouseData(warehouse.data[idArr]);
      setNameEdit(warehouse.data[idArr].warehouse_branch_name);
      setDetailAddressEdit(warehouse.data[idArr].detail_address);
      setPhoneNumberEdit(warehouse.data[idArr].phone_number);
    } catch (error) {
      console.log(error);
    }
  };

  // let onGetProvince = async () => {
  //   try {
  //     let response = await Axios.get(API_URL + `/rajaongkir/getprovince`);
  //     console.log(`rajaongkir data propinsi=`, response.data);
  //     setProvinceList(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onGetProvince = useCallback(async () => {
    try {
      let response = await Axios.get(API_URL + `/rajaongkir/getprovince`);
      console.log(`rajaongkir data propinsi=`, response.data);
      setProvinceList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  let onGetSelectedCity = async () => {
    try {
      let response = await Axios.get(API_URL + `/rajaongkir/getcity`);
      let kota = response.data;
      console.log(`get selected city`, kota);
      let container = [];
      kota.map((val, idx) => {
        if (val.postal_code == warehouseData.postal_code) {
          container.push(kota[idx]);
        }
      });
      console.log(`container selected=`, container);
      setSelectedCity(container[0]);
      // setKeyProvinceEdit(selectedCity?.province_id);
      // setKeyCityEdit(selectedCity?.city_id);
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCity = useCallback(
    async (idprop) => {
      try {
        console.log(`province id =`, idprop);
        // setKeyProvinceEdit(idprop);
        let response = await Axios.get(API_URL + `/rajaongkir/getcity`);
        console.log(`rajaongkir data kota=`, response.data);
        let kota = response.data;
        let container = [];
        kota.map((val, idx) => {
          if (val.province_id == idprop) {
            container.push(kota[idx]);
          }
        });
        console.log(`container=`, container);
        setCityList(container);
      } catch (error) {
        console.log(error);
      }
    },
    [keyProvinceEdit]
  );

  useEffect(() => {
    onGetProvince();
  }, [onGetProvince]);

  let dataProvinceExist = false;
  if (provinceList == null) {
    dataProvinceExist = false;
  } else {
    dataProvinceExist = true;
  }

  const printDataProvince = () => {
    let data = dataProvinceExist ? provinceList : [];
    console.log(data);
    return data.map((val, idx) => {
      return (
        <option
          // selected={keyProvinceEdit == val.province_id}
          value={val.province_id}
        >
          {val.province}
        </option>
      );
    });
  };

  let dataCityExist = false;
  if (cityList == null) {
    dataCityExist = false;
  } else {
    dataCityExist = true;
  }

  const printDataCity = () => {
    let data = dataCityExist ? cityList : [];
    console.log(`print data city = `, data);
    return data.map((val, idx) => {
      return (
        <option
          // selected={keyCityEdit == val.city_id}
          value={val.city_id}
        >
          {val.type} {val.city_name}
        </option>
      );
    });
  };

  let onGetPostal = async (keyCity) => {
    try {
      console.log(`inputnya get postal =`, keyCity);
      let data = cityList;
      let filterData = data.filter((x) => {
        return x.city_id == keyCity;
      });
      console.log(`filter data =`, filterData[0]);
      setSelectedCity(filterData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = async () => {
    try {
      await Axios.post(API_URL + `/warehouse/editwarehouse`, {
        id_warehouse: idWarehouse,
        warehouse_branch_name: nameEdit,
        phone_number: phoneNumberEdit,
        city: selectedCity?.city_name,
        province: selectedCity?.province,
        postal_code: selectedCity?.postal_code,
        detail_address: detailAddressEdit,
        key_city: selectedCity?.city_id,
        key_province: selectedCity?.province_id,
      });

      alert("Edit Warehouse Success ✅");
      navigate("/admin/warehouse");
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => {
    Axios.post(API_URL + `/warehouse/deletewarehouse`, {
      id_warehouse: idWarehouse,
    })
      .then((response) => {
        alert("Delete Warehouse Success ✅");
        navigate("/admin/warehouse");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  useEffect(() => {
    onGetSelectedCity();
  }, [warehouseData]);

  useEffect(() => {
    if (selectedCity) {
      onGetCity();
    }
  }, []);

  return (
    <div className="bg-white my-5 w-100 p-5 m-auto shadow">
      <Text className="ps-4 pt-3" fontSize="4xl">
        {" "}
        Edit Warehouse
      </Text>
      <div id="regispage" className="row">
        <div className="col-6 px-5">
          <div className="my-3">
            <label className="form-label fw-bold text-muted">
              Nama Warehouse
            </label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="Nama Warehouse"
              value={nameEdit}
              onChange={(e) => setNameEdit(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="form-label fw-bold text-muted">
              Nomor Telepon
            </label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="Nomor telepon"
              value={phoneNumberEdit}
              onChange={(e) => setPhoneNumberEdit(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="form-label fw-bold text-muted">
              Alamat Warehouse
            </label>
            <Textarea
              resize="vertical"
              type="text"
              className="form-control p-3"
              placeholder="DESC"
              value={detailAddressEdit}
              onChange={(e) => setDetailAddressEdit(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6 px-5">
          <div className="row bg-white">
            <div className="my-3 ">
              <label className="form-label fw-bold text-muted">Propinsi</label>
              <select
                onChange={(e) => onGetCity(e.target.value)}
                className="form-control form-control-lg mt-3"
              >
                <option value={selectedCity?.province_id}>
                  {selectedCity?.province}
                </option>
                {printDataProvince()}
              </select>
            </div>
            <div className="my-3 ">
              <label className="form-label fw-bold text-muted">Kota</label>
              <select
                onChange={(e) => onGetPostal(e.target.value)}
                className="form-control form-control-lg mt-3"
              >
                <option value={selectedCity?.city_id}>
                  {selectedCity?.type} {selectedCity?.city_name}
                </option>
                {printDataCity()}
              </select>
            </div>
            <div className="my-3 ">
              <label className="form-label fw-bold text-muted">
                Postal Code
              </label>

              <input
                type="text"
                className="form-control p-3"
                placeholder="Kode pos"
                value={selectedCity?.postal_code}
                disabled
              />
            </div>
          </div>
          <ButtonGroup>
            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant="solid"
              onClick={onEdit}
            >
              Simpan
            </Button>

            <Button
              type="button"
              width="full"
              colorScheme="orange"
              variant="solid"
              onClick={onDelete}
            >
              Hapus Gudang
            </Button>

            <Link to="/admin/warehouse">
              <Button>Kembali</Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default EditWarehouse;
