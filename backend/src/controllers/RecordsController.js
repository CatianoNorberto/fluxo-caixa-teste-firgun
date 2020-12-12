const { Op } = require("sequelize");
const Registrations = require("../models/Records");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;

    try {
      const users = await Registrations.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
      });
  
      return res.json(users);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao listar registros");
    }
  },

  async store(req, res) {
    const { user_id } = req.headers;

    const { category, description, input, exit, balance, date } = req.body;

    try {
      const registrations = await Registrations.create({
        category,
        description,
        input,
        exit,
        balance,
        date,
        user_id,
      });
     
      return res.json(registrations);

    } catch (error) {
     console.log(error);
     throw new Error("Erro ao inserir registro");
   }
  },
};
