const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async checkEmail(req, res) {
    const { email } = req.query;
    try {
      const emailExists = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });

      if(emailExists){
        return res.json({result: true});
      }
      
      return res.json({result: false});
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao checar email");
    }
  },
  async checkCpf(req, res) {
    const { cpf } = req.query;
    try {
      const cpfExists = await User.findOne({
        where: {
          cpf: {
            [Op.eq]: cpf,
          },
        },
      });

      if(cpfExists){
        return res.json({result: true});
      }
      
      return res.json({result: false});
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao checar cpf");
    }
  },

  async store(req, res) {
    const { name, email, cpf, password } = req.body;

   try {
    const user = await User.create({ name, email, cpf, password });

    return res.json(user);
   } catch (error) {
    console.log(error);
    throw new Error("Erro ao cadastrar usuário");
   }
  },
};
