import { PrismaClient } from '@prisma/client';
import { STORE_DEFAULT } from '../src/store/constants/default-paths';

const prisma = new PrismaClient();

async function main() {
  const defaultSkin = await prisma.skin.upsert({
    where: { id: STORE_DEFAULT.SKIN_DEFAULT_ID },
    update: {},
    create: {
      id: STORE_DEFAULT.SKIN_DEFAULT_ID,
      name: STORE_DEFAULT.SKIN_DEFAULT_NAME,
      imageUrl: STORE_DEFAULT.SKIN_DEFAULT_PATH,
      price: STORE_DEFAULT.SKIN_DEFAULT_PRICE,
    },
  });

  const defaultBoard = await prisma.board.upsert({
    where: { id: STORE_DEFAULT.BOARD_DEFAULT_ID },
    update: {},
    create: {
      id: STORE_DEFAULT.BOARD_DEFAULT_ID,
      name: STORE_DEFAULT.BOARD_DEFAULT_NAME,
      imageUrl: STORE_DEFAULT.BOARD_DEFAULT_PATH,
      price: STORE_DEFAULT.BOARD_DEFAULT_PRICE,
    },
  });

  // console.log({ defaultSkin, defaultBoard });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
