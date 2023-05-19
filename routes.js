const express = require('express');
const { getCostService, createCostService } = require('./database/services/cost.service');
const { getBalanceService, updateBalanceService } = require('./database/services/balance.service');
const router = express.Router();

router.get("/", (req,res)=>res.send("backend works"));



// ------------------------- SCHEMAS -----------------------
/**
 * @swagger
 * components:
 *  schemas:
 *    Balance:
 *      type: object
 *      properties:
 *        identity:
 *          type: string
 *          description: the id of the balance
 *        balance:
 *          type: number
 *          description: the current balance of the tenant
 * 
 *    Cost:
 *      type: object
 *      required:
 *         - date
 *         - amount
 *      properties:
 *          _id:
 *            type: string
 *            description: the auto-generated id of the cost
 *            example: "643be91656cf8315c5f37002"
 *          date:
 *            type: date
 *            description: the year and the month of the cost
 *            pattern: /([0-9]{4})-(?:[0-9]{2})/
 *            example: "2023-04"
 *          amount:
 *            type: number
 *            description: the amount that the tenant has to pay
 *            example: 18366
 * 
 *    Payment:
 *      type: object
 *      required:
 *         - date
 *         - amount
 *      properties:
 *          _id:
 *            type: string
 *            description: the auto-generated id of the cost
 *            example: "643bc54df94f86271666150d"
 *          date:
 *            type: date
 *            description: the date when the tenant paid
 *            pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *            example: "2023-04-17"
 *          amount:
 *            type: number
 *            description: the amount that the tenant paid
 *            example: 19000 
 */






// -------------------------------------- ENDPOINTS -------------------------------------------

/**
 * @swagger
 * tags:
 *  name: Balance
 */
router.get("/balance", getBalanceService);
router.put("/balance", updateBalanceService);





/**
 * @swagger
 * tags:
 *  name: Cost
 */

/**
 * @swagger
 * /costs:
 *  get:
 *    summary: returns the list of all the costs that the tenant has to pay
 *    tags: [Cost]
 *    responses:
 *      200:
 *        description: the list of the costs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Cost'
 */
router.get("/costs", getCostService);


/**
 * @swagger
 * /cost:
 *  post:
 *    summary: create a new cost that the tenant has to pay
 *    tags: [Cost]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cost'
 *    responses:
 *      200:
 *        description: the cost was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cost'
 *      500:
 *        description: something went wrong
 */
router.post("/cost", createCostService);




/**
 * @swagger
 * tags:
 *  name: Payment
 */


module.exports = router;