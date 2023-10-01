const { PrismaClient } = require('@prisma/client')

const mysqlClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})
export default mysqlClient;