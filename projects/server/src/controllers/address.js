const { AddressModel, PostalCodeModel } = require("../model");
const sequelize = require("sequelize");
const Axios = require("axios");

module.exports = {
  getAddress: async (req, res) => {
    try {
      let data = await AddressModel.findAll({
        where: { id_user: req.decript.id_user },
      }).then((response) => {
        return res.status(200).send(response);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getAddressDetail: async (req, res) => {
    try {
      let data = await AddressModel.findAll({
        where: {
          [sequelize.Op.and]: [
            { id_user: req.decript.id_user },
            { priority: 1 },
          ],
        },
      });

      let postal_code = data[0].dataValues.postal_code;
      let detail = await PostalCodeModel.findAll({
        where: { postal_code },
      });
      let result = [];
      result.push({ ...data[0].dataValues, ...detail[0].dataValues });
      console.log(result[0].id_address);
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  changeSelectedAddress: async (req, res) => {
    try {
      let { id_address } = req.body;
      let id_user = req.decript.id_user;
      let begin = await AddressModel.update(
        { priority: 0 },
        { where: { id_user } }
      );
      let result = await AddressModel.update(
        { priority: 1 },
        {
          where: {
            [sequelize.Op.and]: [{ id_address }, { id_user }],
          },
        }
      );
      return res.status(200).send("oke");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  addAddress: async (req, res) => {
    try {
      let {
        city,
        province,
        postal_code,
        detail_address,
        key_province,
        key_city,
        encoded_province,
        id_user,
      } = req.body;
      let checkPostalCode = await PostalCodeModel.findAll({
        where: { postal_code },
      });
      if (checkPostalCode.length == 0) {
        let addpostalcode = await PostalCodeModel.create({
          city,
          province,
          postal_code,
          key_city,
          key_province,
        });

        let start = await AddressModel.create({
          postal_code,
          id_user,
          detail_address,
        });
        let coordinate = await Axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${city},+${encoded_province}&key=${process.env.OPENCAGE_API_KEY}&pretty=1&no_annotations=1`
        ).then((response) => {
          console.log(response.data.results[0].geometry);
          let updatelat = AddressModel.update(
            { coordinate_lat: response.data.results[0].geometry.lat },
            {
              where: {
                [sequelize.Op.and]: [
                  { id_user },
                  { postal_code },
                  { detail_address },
                ],
              },
            }
          );
          let updatelong = AddressModel.update(
            { coordinate_long: response.data.results[0].geometry.lng },
            {
              where: {
                [sequelize.Op.and]: [
                  { id_user },
                  { postal_code },
                  { detail_address },
                ],
              },
            }
          );
        });
      }
      return res.status(200).send("done");
    } catch (error) {
      console.log(error);
    }
  },
};
