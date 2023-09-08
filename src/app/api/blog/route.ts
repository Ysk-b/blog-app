import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    throw new Error('DB接続に失敗しました');
  }
};

// ブログ全記事取得のAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: 'Success!', posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿用のAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: 'Success!', post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
