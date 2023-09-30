const { PrismaClient } = require('@prisma/client')

const mysqlClient = new PrismaClient()
export default mysqlClient;