/**
 * @swagger
 * definitions:
 *   Department:
 *     properties:
 *       department_id:
 *         type: integer
 *         example: 1
 *       name:
 *         type: string
 *         example: Sesonal
 *       description:
 *         type: string
 *         example: Seasonal  
 */
/**
 * @swagger
 * definitions:
 *   Error:
 *      properties:
 *          code:
 *              type: string
 *              example: USR_02
 *          message:
 *              type: string
 *              example: The field example is empty
 *          field:
 *              type: string
 *              example: example
 *          status:
 *              type: integer
 *              example: 500
 */
/**
 * @swagger
 * tags:
 *   - name: Departments
 *     description: "Get All Information of Departments"
 * /departments:
 *   get:
 *      summary: Get Departments
 *      tags: 
 *          - Departments
 *      description: Return a list of departments
 *      parameters:
 *        - name: order
 *          in: query
 *          description: "Sorting a field. Allowed fields: 'department_id', 'name'."
 *          required: false
 *          type: string
 *        - name: page
 *          in: query
 *          description: "Inform the page. Starting with 1. Default: 1"
 *          required: false
 *          type: integer
 *        - name: limit
 *          in: query
 *          description: "Limit per page, Default: 10."
 *          required: false
 *          type: integer
 *      produces:
 *        - application/json
 *      responses:
 *       200:
 *         description: Return a list with count (total departments) and the rows of departments
 *         schema:
 *           $ref: '#/definitions/departments'
 *       400:
 *         description: Return an error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
/**
 * @swagger
 * /departments/{department_id}:
 *   get:
 *      summary: Get Department by ID
 *      tags:
 *          - Departments
 *      description: Return a Department by ID
 *      parameters:
 *          - name: department_id
 *            in: path
 *            description: ID of Department
 *            required: true
 *            type: number
 *            minimum: 1
 *      produces:
 *        - application/json
 *      responses:
 *       200:
 *         description: Return a object of Department
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Return an error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /departments:
 *   post:
 *      summary: Post Department
 *      tags:
 *          - Departments
 *      description: Return Posted Department
 *      parameters:
 *          - name: name
 *            in: formData
 *            description: name of Department         
 *            type: string
 *          - name: description
 *            in: formData
 *            description: detail of Department
 *            type: string          
 *      produces:
 *        - application/json
 *      responses:
 *       200:
 *         description: Return a object of Department
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Return an error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /departments/{department_id}:
 *   put:
 *      summary: Put Department
 *      tags:
 *          - Departments
 *      description: Return Posted Department
 *      parameters:
 *          - name: department_id
 *            in: path
 *            description: id of Department
 *            type: number
 *          - name: name
 *            in: formData
 *            description: name of Department         
 *            type: string
 *          - name: description
 *            in: formData
 *            description: detail of Department
 *            type: string          
 *      produces:
 *        - application/json
 *      responses:
 *       200:
 *         description: Return a object of Department
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Return an error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /departments/{department_id}:
 *   delete:
 *      summary: delete Department
 *      tags:
 *          - Departments
 *      description: Return Posted Department
 *      parameters:
 *          - name: department_id
 *            in: path
 *            description: id of Department
 *            type: number                
 *      produces:
 *        - application/json
 *      responses:
 *       200:
 *         description: Return a object of Department
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Return an error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */

const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');

router.get('/', departmentController.getAllDepartment);
router.get('/:department_id', departmentController.getDepartment);
router.post('/', departmentController.postDepartment);
router.put('/:department_id', departmentController.putDepartment);
router.delete('/:department_id', departmentController.deleteDepartment);

module.exports = router;