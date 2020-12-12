const { Op } = require("sequelize");
const UserBalance = require("../models/UserBalance");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;

    try {
      const balance = await UserBalance.findOne({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
      });
  
      return res.json(balance);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao listar registro");
    }
  },

  async store(req, res) {
    const { user_id } = req.headers;

    const { balance, date } = req.body;

    try {
      const data = await UserBalance.create({
        balance,
        date,
        user_id,
      });
     
      return res.json(data);

    } catch (error) {
     console.log(error);
     throw new Error("Erro ao inserir registro");
   }
  },

  async update(req, res) {
    const { user_id } = req.headers;

    const { balance } = req.body;

    try {

      const user_balance = await UserBalance.findOne({
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
      });
      
      const data = await UserBalance.update({
        balance: `${Number(user_balance.balance) + Number(balance)}`,
      }, {
        where: {
          user_id: {
            [Op.eq]: user_id,
          },
        },
      })
     
      return res.json(data);

    } catch (error) {
     console.log(error);
     throw new Error("Erro ao atualizar registro");
   }
  },
};
