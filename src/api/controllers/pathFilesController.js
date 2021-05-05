const {
    PathFile,
    Client

} = require('../models')
const {
    Op
} = require('sequelize')
const pathFilesController = {
    index: async (req, res) => {
        const {
            page = 1
        } = req.query
        const limit = 2;
        const offset = page < 1 ? 0 : (page - 1) * limit
        const {
            count: total,
            rows: pathFiles
        } = await PathFile.findAndCountAll({
            offset: parseInt(offset),
            limit,
            include: [{
                    association: 'report',
                },
                {
                    association: 'client',
                },

            ]

        })
        console.log(total + ' - ' + pathFiles)
        const totalPages = Math.ceil(total / limit)
        return res.status(200).json({
            pathFiles,
            totalPages
        })
    },
    showClientReports: async (req, res) => {
        const {
            page = 1
        } = req.query
        const limit = 2;
        const offset = page < 1 ? 0 : (page - 1) * limit

        const {
            count: total,
            rows: pathFiles
        } = await Client.findAndCountAll({
            offset: parseInt(offset),
            limit,
            include: [{
                association: 'path_file',
                include: [{
                    association: 'report'
                }]
            }, ]
        })

        const totalPages = Math.ceil(total / limit)
        return res.status(200).json({
            pathFiles,
            totalPages
        })


    },
    showClientReortId: async (req, res) => {
        const {
            id
        } = req.params

        try {
            const response = await Client.findByPk(id, {
                include: [{
                    association: 'path_file',
                    include: [{
                        association: 'report'
                    }]
                }, ]
            });
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                status: 404,
                msg: `${error}`
            });
        }
    },
    showReportId: async (req, res) => {
        const {
            id
        } = req.params

        const {
            page = 1
        } = req.query
        const limit = 4;
        const offset = page < 1 ? 0 : (page - 1) * limit
        const {
            count: total,
            rows: pathFiles
        } = await PathFile.findAndCountAll({
            where: {
                client_id: id
            },
            order: [
                ['date', 'DESC'],
            ],
            offset: parseInt(offset),
            limit,
            include: [{
                association: 'report',
            }, ]

        })
        console.log(total + ' - ' + pathFiles)
        const totalPages = Math.ceil(total / limit)
        return res.status(200).json({
            pathFiles,
            totalPages
        })


    },
    create: async (req, res) => {

       
        try {
            const {
                date,
                download,
                path,
                status,
                client_id,
                report_id,
            } = req.body

        
            const pathFile = {
                date,
                path,
                download,
                status,
                client_id,
                report_id,
            }
            const resp = await PathFile.create(pathFile)
            return res.status(201).json(resp)
        } catch (error) {
            return res.status(401).json(error)
        }
    },
    update: async (req, res) => {
        try {
            const {
                id,
                date,
                path,
                download,
                status,
                report_id,
            } = req.body
            const resp = await PathFile.findByPk(id)
            const pathFileUpdate = {
                date: date === '' ? resp.date : date,
                path: path === '' ? resp.path : path,
                download: download === '' ? resp.download : download,
                status: status === '' ? resp.status : status,
                report_id: report_id === '' ? resp.report_id : report_id,
            }
            const update = await PathFile.update(pathFileUpdate, {
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
    }
}

module.exports = pathFilesController