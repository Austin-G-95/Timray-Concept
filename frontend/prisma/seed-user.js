const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    // Create a test user
    const hashedPassword = await hash('password123', 10)
    
    const user = await prisma.user.upsert({
        where: { email: 'test@timray.com' },
        update: {},
        create: {
            email: 'test@timray.com',
            name: 'Test User',
            password: hashedPassword,
            role: 'USER',
        },
    })

    console.log('✅ Test user created successfully!')
    console.log('📧 Email: test@timray.com')
    console.log('🔑 Password: password123')
    console.log('')
    
    // Create an admin user
    const adminPassword = await hash('admin123', 10)
    
    const admin = await prisma.user.upsert({
        where: { email: 'admin@timray.com' },
        update: {},
        create: {
            email: 'admin@timray.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@timray.com')
    console.log('🔑 Password: admin123')
}

main()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
