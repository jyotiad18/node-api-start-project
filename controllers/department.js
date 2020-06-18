const _ = require('lodash');
const joi = require('joi');
const { joiValidate, test } = require("../validations/validation.js");
const rules = require('../models/department');
const localData = require('../dumy-db/db.json');
const response = require('../helpers/response.js');
const errors = [];

module.exports = {
    getAllDepartment: function (req, res, next) {
        let startNum = 0;
        let LimitNum = 10;
        let count = 0;
        let order = "";
        const params = req.params;
        if (params.page != undefined) {
            startNum = parseInt(params.page);    
        }
        if (params.limit != undefined) {
            LimitNum = parseInt(params.limit);
        }
        try {
            const data = startNum == 0 ? _.slice(localData.departments, startNum, LimitNum) : _.slice(localData.departments, startNum * LimitNum, LimitNum * (startNum + 1));
            response.setSuccess(
                200,
                '',
                data
            );
            return response.send(res);
        }
        catch (error) {
            response.setError(500, 'server error');
            return response.send(res);
        }
    },
    getDepartment: function (req, res, next) {
        const departmentId = req.params.deartment_id
        if (departmentId != undefined)
        {
            response.setError(401, 'department_id is not found');
            return response.send(res);
        }
        const data = _.find(localData.departments, (department) => {
            return department.department_id === parseInt(departmentId);
        });
        response.setSuccess(200, '', data);
        return response.send(res);
    },
    postDepartment: function (req, res, next) {        
        const department_id = localData.departments.length + 1;
        const department = {
            department_id,
            ...req.body            
        };
        try {            
            joiValidate(department, rules.schema, errors);            
            localData.departments.push(department);
            response.setSuccess(200, "", department);
            return response.send(res);
        }
        catch (er)
        {
            response.send(res);
        }
    },
    putDepartment: function (req, res, next)
    {
        const department_id = parseInt(req.params.department_id);
        const department = {
            department_id,
            ...req.body
        }        
        try {          
            joiValidate(department, rules.schema, errors);
            const index = _.findIndex((dept) => {
                return dept.department_id == department_id;
            });
            localData.departments[index] = department;
            response.setSuccess(200, "", department);
            return response.send(res);
        }
        catch (er)
        {
            return response.send(res);
        }        
    },
    deleteDepartment: function (req, res, next) {
        const department_id = parseInt(req.params.department_id);       
        try {
            const index = _.findIndex((dept) => {
                return dept.department_id == department_id;
            });
            if (index) {
                localData.departments.splice(index, 1);
                response.setSuccess(200);               
            }
            else {
                response.setError(422, {
                    message: 'department id isnot found.'
                })
            }
            return response.send(res);
        }
        catch (er) {
            return response.send(res);
        }
    }
}