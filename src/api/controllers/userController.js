const {User,Cliente} = require('../models')
const {Op} = require('sequelize');
const bcryptjs = require('bcryptjs')
const userController = {
    index: async (req,res) =>{
        try {
            const {
              page = 1
          } = req.query
          const limit = 2;
          const offset = page < 1 ? 0 : (page - 1) * limit
            const{count: total,rows: users} = await User.findAndCountAll({
              offset: parseInt(offset),
              limit,
              attributes:{exclude:['password']},
             include:[{
                association: 'client',
             }],
              order:[
                ['name','ASC']
              ]
            })
           
            const totalPages = Math.ceil(total / limit)
            return res.status(200).json({users,totalPages})
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
        const response = await User.findByPk(id,{
            attributes:{exclude:['password']},
            include:{
                association: 'client',
            }
        });
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
        const {
            count: total,
            rows: users
        } = await User.findAndCountAll({
            offset: parseInt(offset),
            limit,
            attributes:{exclude:['password']},
            include:{
                association: 'client',
            },
            where: {
                [fieldName[0]]: {
                    [Op.like]: `%${queryValue}%`
                }
            },
        })
        const totalPages = Math.ceil(total / limit)
        return res.status(200).json({
            users,
            totalPages
        })
    },

     // ########## Insere um usuário no Banco de dados ######## 
    // ########## Insert into data base User  ######## 
    create: async (req, res) => {
        try {
          // rowid	id	company	cnpj	email	telephone	zip_code	andress	district	city	uf	created_at	updated_at
            const {
              name,
              user_name,
              password,
              status,
              client_id,
              
            } = req.body
  
            const client ={
                name,
                user_name,
                password:bcryptjs.hashSync(password,10),
                status,
                client_id,
            }
            const resp = await User.create(client)
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
                name,
                user_name,
                password,
                status,
                client_id,
                active,
                email
               
            } = req.body
            const resp = await User.findByPk(id)
           const userUpdate = {
            name:name===''?resp.name:name,
            user_name:user_name===''?resp.user_name:user_name,
            password:password===''?'':bcryptjs.hashSync(password,10),
            status:status===''?resp.status:status,
            client_id:client_id===''?resp.client_id:client_id,
            active:active===''?resp.active:active,
            email:email===''?resp.email:email,
           }
            const update = await User.update(userUpdate,
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
    const {
        id
    } = req.body
    const del = await User.destroy({
        where: {
            id
        }
    })
    res.status(200).json(del)
},

}

module.exports = userController;