import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const test = async () => {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
};

test();

export default db;
