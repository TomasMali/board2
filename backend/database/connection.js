const cred = require('../cred/cred')

const Pool = require('pg').Pool
const pool = new Pool(cred.db)




module.exports = pool