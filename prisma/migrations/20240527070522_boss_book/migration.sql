/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `ProductOfCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Images` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoryName` to the `ProductOfCategory` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ProductOfCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOfCategory" DROP CONSTRAINT "ProductOfCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOfCategory" DROP CONSTRAINT "ProductOfCategory_productId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductOfCategory" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOfCategory" ADD CONSTRAINT "ProductOfCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOfCategory" ADD CONSTRAINT "ProductOfCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
