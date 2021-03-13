const {
    Report
} = require('../models')

const reportsController = {
    index: async (req, res) => {
        try {
            const reports = await Report.findAll()
            return res.status(200).json(reports)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    create: async (req, res) => {
        try {
            const report = await Report.create(req.body);
            return res.status(201).json(report)
        } catch (error) {
            return res.status(201).json(error)
        }
    },
    update: async (req, res) => {
        try {
            const response = await Report.findByPk(req.body.id)
            const report = {
                name:req.body.name===''?response.name:req.body.name
            }
             const update = await Report.update(report,{
                 where:{id:req.body.id}
             });
            return res.status(201).json(update)
        } catch (error) {
            return res.status(401).json(error)
        }
    },
    delete: async (req, res) => {
        try {
             const update = await Report.destroy({
                 where:{id:req.body.id}
             });
            return res.status(201).json(update)
        } catch (error) {
            return res.status(401).json(error)
        }
    },
}


module.exports = reportsController