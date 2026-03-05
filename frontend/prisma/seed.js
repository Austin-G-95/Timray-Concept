const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Clear existing products first
    await prisma.product.deleteMany({})

    const products = [
        // Headphones & Audio
        {
            name: 'SonicWave 7.1 Pro Headphones',
            description: 'Immersive 7.1 surround sound with ultra-soft memory foam cushions and 30-hour battery life.',
            fullDescription: 'Elevate your gaming and music experience with the SonicWave 7.1 Pro. Engineered with precision 50mm drivers and advanced 7.1 virtual surround sound, every footstep and note is crystal clear. The ultra-soft protein leather ear cushions ensure comfort for even the longest sessions, while the 30-hour battery keeps you going without interruption.',
            features: '7.1 Surround Sound\n30-Hour Battery Life\nPassive Noise Cancellation\nFoldable Design',
            specs: JSON.stringify({ "Driver": "50mm Neodymium", "Frequency": "20Hz-20kHz", "Impedance": "32 Ohm" }),
            price: 245000,
            image: '/Bose-QuietComfort-Ultra-Headphones-black-1200x675.webp',
            category: 'Headphones',
            stock: 50,
            rating: 4.9,
        },
        {
            name: 'AirDots S Pro Earbuds',
            description: 'True wireless earbuds with low-latency gaming mode and IPX5 water resistance.',
            fullDescription: 'The AirDots S Pro provide studio-quality sound in a pocket-sized package. With hybrid active noise cancellation and a dedicated gaming mode with only 60ms latency, these are perfect for any situation. Dual microphones with AI noise reduction ensure your calls are clear even in windy environments.',
            features: 'Active Noise Cancellation\n60ms Low Latency\nIPX5 Water Resistant\nUSB-C Fast Charging',
            specs: JSON.stringify({ "Bluetooth": "5.3", "Battery": "6h + 24h with case", "Codecs": "AAC, SBC" }),
            price: 45000,
            image: '/images (4).jpeg',
            category: 'Earphones',
            stock: 100,
            rating: 4.8,
        },
        {
            name: 'Bass Thunder Headset',
            description: 'Deep bass wireless headphones with active noise cancellation and premium build quality.',
            price: 185000,
            image: '/Headphone 1.webp',
            category: 'Headphones',
            stock: 35,
        },
        {
            name: 'Sonic Wave EarPods',
            description: 'Crystal clear audio with ergonomic fit and 8-hour battery life per charge.',
            price: 35000,
            image: '/Sonic Wave EarPods.jpg',
            category: 'Earphones',
            stock: 80,
        },

        // Smart Watches & Wearables
        {
            name: 'PulseTime S3 Smartwatch',
            description: 'AMOLED display with GPS, heart rate monitoring, and 10-day battery life.',
            price: 320000,
            image: '/Amoled GPS Watch.jpg',
            category: 'Smart Watches',
            stock: 45,
        },
        {
            name: 'FitPro Ultra Watch',
            description: 'Advanced fitness tracking with sleep analysis and 50m water resistance.',
            price: 210000,
            image: '/images (7).jpeg',
            category: 'Smart Watches',
            stock: 60,
        },

        // Charging & Power
        {
            name: 'MagCharge Duo Wireless Pad',
            description: 'Dual 15W fast wireless charging with MagSafe compatibility and LED indicators.',
            price: 65000,
            image: '/Wireless Chager.jpg',
            category: 'Laptop Accessories',
            stock: 70,
        },
        {
            name: 'VoltMax 30000mAh Power Bank',
            description: 'Massive capacity power bank with 45W PD output for laptops and phones.',
            price: 75000,
            image: '/PD 45W.jpg',
            category: 'Laptop Accessories',
            stock: 55,
        },
        {
            name: 'TurboCharge 65W GaN Charger',
            description: 'Compact GaN charger with 3 ports for simultaneous fast charging.',
            price: 42000,
            image: '/Fast Charger.jpg',
            category: 'Laptop Accessories',
            stock: 90,
        },
        {
            name: '5-in-1 MagSafe Charging Station',
            description: 'All-in-one charging solution for iPhone, AirPods, and Apple Watch.',
            price: 115000,
            image: '/5_in_1_dual_magsafe_charger_1.webp',
            category: 'Laptop Accessories',
            stock: 40,
        },

        // Keyboards & Peripherals
        {
            name: 'KeyCraft TKL Pro Keyboard',
            description: 'Hot-swappable mechanical keyboard with per-key RGB and PBT keycaps.',
            price: 135000,
            image: '/Keyboard.jpg',
            category: 'Peripherals',
            stock: 65,
        },
        {
            name: 'ZenMouse Pro Wireless',
            description: 'Ergonomic wireless gaming mouse with 25K DPI sensor and 12 programmable buttons.',
            price: 68000,
            image: '/images (8).jpeg',
            category: 'Peripherals',
            stock: 75,
        },

        // Phone Cases & Accessories
        {
            name: 'Galaxy S10 Silicone Case',
            description: 'Premium soft-touch silicone case with microfiber lining for Galaxy S10.',
            price: 22000,
            image: '/Blackweb-Soft-Touch-Silicone-Case-for-Galaxy-S10-Multiple-Colors_c4897984-871b-4e79-8d9d-992183e5b142_2.cb85c27d45cc6dc896eaf02e0980952b.jpeg',
            category: 'Phone Cases',
            stock: 150,
        },
        {
            name: 'iPhone 15 Pro Clear Case',
            description: 'Crystal clear protection with shock-absorbing corners and scratch resistance.',
            price: 18000,
            image: '/images (9).jpeg',
            category: 'Phone Cases',
            stock: 120,
        },

        // Speakers & Jamboxes
        {
            name: 'BoomBox Pro Bluetooth Speaker',
            description: 'Powerful 40W stereo sound with 24-hour battery life and IPX7 waterproofing.',
            price: 155000,
            image: '/VortexSpeaker.jpg',
            category: 'Jamboxes',
            stock: 20,
        },
        {
            name: 'Mini Portable Speaker',
            description: 'Compact wireless speaker with 360-degree sound and 12-hour playtime.',
            price: 45000,
            image: '/images (11).jpeg',
            category: 'Jamboxes',
            stock: 85,
        },

        // Storage & Flash Drives
        {
            name: 'Thunder SSD 2TB External',
            description: 'NVMe PCIe 4.0 external SSD with 7000MB/s read speed and USB-C.',
            price: 265000,
            image: '/images (5).jpeg',
            category: 'Flash Drives',
            stock: 30,
        },
        {
            name: 'NanoFlash 128GB USB Drive',
            description: 'Ultra-compact USB 3.2 flash drive with metal body and keyring hole.',
            price: 15000,
            image: '/images.jpeg',
            category: 'Flash Drives',
            stock: 200,
        },

        // Monitors & Displays
        {
            name: 'Aura Monitor 27" 4K 144Hz',
            description: '4K gaming monitor with HDR600, 1ms response time, and adaptive sync.',
            price: 650000,
            image: '/images (6).jpeg',
            category: 'Peripherals',
            stock: 20,
        },

        // Tablets & Laptops
        {
            name: 'Nexus Tablet Pro 12.9"',
            description: '12.9-inch Liquid Retina display with 120Hz ProMotion and all-day battery.',
            price: 1250000,
            image: '/images (1).jpeg',
            category: 'Laptop Accessories',
            stock: 25,
        },
        {
            name: 'Quantum Laptop X Gaming',
            description: 'Intel i9 processor with RTX 4070, 32GB RAM, and 1TB NVMe SSD.',
            price: 2850000,
            image: '/img/images (2).jpeg',
            category: 'Laptop Accessories',
            stock: 15,
        },

        // Cameras & Streaming
        {
            name: 'StreamCast 4K Webcam',
            description: '4K webcam with AI background removal and dual microphone array.',
            price: 165000,
            image: '/img/images (3).jpeg',
            category: 'Peripherals',
            stock: 45,
        },

        // Premium Phones
        {
            name: 'Infinix ZERO X Pro',
            description: 'Flagship smartphone with 200MP camera, 6.8" AMOLED display, and 5G connectivity.',
            price: 202000,
            image: '/infinix-zero-x-pro-3.png',
            category: 'Phone Cases',
            stock: 12,
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product,
        })
    }

    console.log(`Seeded ${products.length} products successfully!`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
