import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@thedominuscode.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Updating password...");
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      },
    });
    console.log("✅ Admin password updated");
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      },
    });
    console.log("✅ Admin user created");
  }

  console.log(`\n📧 Email: ${adminEmail}`);
  console.log(`🔑 Password: ${adminPassword}`);
  console.log("\n⚠️  Please change the default password after first login!");
}

main()
  .catch((e) => {
    console.error("Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

