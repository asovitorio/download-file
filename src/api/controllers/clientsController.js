const {Client} = require('../models')
const {Op} = require('sequelize');

const clientsController = {
  //## Buscas de clientes com paginação  
  index: async (req, res) => {
    try {
      const {
        page = 1
    } = req.query
    const limit = 5;
    const offset = page < 1 ? 0 : (page - 1) * limit
      const{count: total,rows: clients} = await Client.findAndCountAll({
        offset: parseInt(offset),
        limit,
        order:[
          ['company','ASC']
        ]
      })
     
      const totalPages = Math.ceil(total / limit)
      return res.status(200).json({clients,totalPages})
    } catch (error) {
      return res.status(400).json(error)
    }
  },
   // ##### Controle de  Busca de Cliente por parametros ###########
    // ##### Client Search Control by Id ###########
  showId: async (req, res) => {
    const {
        id
    } = req.params

    try {
        const response = await Client.findByPk(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 404,
            msg: `${error}`
        });
    }
},
 // ##### Controle de  Busca de Usuário por parametros ###########
    // ##### User Search Control by Id ###########
    showParams: async (req, res) => {
      const fieldName = Object.keys(req.query)
      const queryValue = req.query[fieldName[0]]
      const page =req.query[fieldName[1]]
      const limit = 6;
      const offset = page < 1 ? 0 : (page - 1) * limit
      console.log(queryValue)
      const {
          count: total,
          rows: clients
      } = await Client.findAndCountAll({
          offset: parseInt(offset),
          limit,
          where: {
              [fieldName[0]]: {
                  [Op.like]: `%${queryValue}%`
              }
          },
      })
      const totalPages = Math.ceil(total / limit)
      return res.status(200).json({
          clients,
          totalPages
      })
  },
   // ########## Insere um usuário no Banco de dados ######## 
    // ########## Insert into data base User  ######## 
    create: async (req, res) => {
      try {
        // rowid	id	company	cnpj	email	telephone	zip_code	andress	district	city	uf	created_at	updated_at
          const {
            company,
            cnpj,
            email,
            telephone,
            zip_code,
            andress,
            district,
            city,
            uf
          } = req.body

          const client ={
            company,
            cnpj,
            email,
            telephone,
            zip_code,
            andress,
            district,
            city,
            uf
          }
          const resp = await Client.create(client)
          res.status(201).json({
              id: resp.id,
              name: resp.name
          })
      } catch (error) {
          res.status(401).json({
              status: 404,
              msg: `${error}`
          })
      }
  },
   // ########## Atualiza um Cliente no Banco de dados ######## 
    // ########## Update into data base Cliente  ######## 
  update: async (req, res) => {
    try {
        const {
            id,
            company,
            cnpj,
            email,
            telephone,
            zip_code,
            andress,
            district,
            city,
            uf
        } = req.body
        const resp = await Client.findByPk(id)
       const clientUpdate = {
        company:company===''?resp.company:company,
        cnpj:cnpj===''?resp.cnpj:cnpj,
        email:email===''?resp.email:email,
        telephone:telephone===''?resp.telephone:telephone,
        zip_code:zip_code===''?resp.zip_code:zip_code,
        andress:andress===''?resp.andress:andress,
        district:district===''?resp.district:district,
        city:city===''?resp.city:city,
        uf:uf===''?resp.uf:uf
       }
        const update = await Client.update(clientUpdate,
         {
            where: {
                id
            }
        })
        res.status(200).json(update)

    } catch (error) {
        res.status(400).json({
            error,
            status: res.status(400)
        })
    }
},
 // ########## Exclui um usuário no Banco de dados ######## 
 // ########## delete into one tupla data base User  ######## 
    delete: async (req, res) => {
      try {
      const {
          id
      } = req.body
     
      const del = await Client.destroy({
          where: {
              id
          }
      })
      res.status(200).json(del)
      
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
module.exports = clientsController



