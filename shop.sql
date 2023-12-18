
DROP TABLE IF EXISTS "Cart";
CREATE TABLE "Cart" (
    "userId" int4 NOT NULL,
    "productId" int4 NOT NULL unique,
    "timeAddToCart" timestamp default CURRENT_TIMESTAMP,
    "quantity" int4
);

DROP TABLE IF EXISTS "Comment";
CREATE TABLE "Comment" (
    "commentId" serial NOT NULL,
    "productId" int4 NOT NULL,
    "userId" int4 NOT NULL,
    "content" text,
    "date" date,
    "rate" int4 DEFAULT -1
);

DROP TABLE IF EXISTS "OrderDetail";
CREATE TABLE "OrderDetail" (
    "orderId" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "timeAddToCart" timestamp,
    "quantity" int4
);

DROP TABLE IF EXISTS "Order";
CREATE TABLE "Order" (
    "orderId" serial NOT NULL,
    "userId" int4 NOT NULL,
    "address" character varying(255),
    "reciverName" character varying(255),
    "phoneNumber" character varying(255),
    "totalCost" integer,
    "isPayment" boolean DEFAULT false,
    "status" character varying(100),
    "timeOrder" timestamp default CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "ProductDetail";
CREATE TABLE "ProductDetail" (
    "productId" int4 NOT NULL unique,
    "screen" character varying(255),
    "os" character varying(100),
    "cameraBehind" character varying(100),
    "cameraFront" character varying(100),
    "cpu" character varying(100),
    "ram" character varying(100),
    "rom" character varying(100),
    "battery" character varying(255),
    "sim" character varying(255)
);


DROP TABLE IF EXISTS "Product";
CREATE TABLE "Product" (
    "productId" serial NOT NULL,
    "name" character varying(255),
    "total" int4,
    "typeId" int4 NOT NULL,
    "image" character varying(255),
	"public_id" character varying(255) DEFAULT NULL,
    "active" boolean DEFAULT true,
    "cost" int4,
    "price" int4,
	"discount" float default 0,
	"rate" int4 default -1,
	"releaseDate" Date
);

DROP TABLE IF EXISTS "Slide";
CREATE TABLE "Slide" (
    "slideId" serial NOT NULL,
    "image" character varying(255),
	"public_id" character varying(255),
    "header" character varying(100),
    "content" text
);

DROP TABLE IF EXISTS "Type";
CREATE TABLE "Type" (
    "typeId" serial NOT NULL,
    "name" character varying(255) NOT NULL,
    "active" boolean DEFAULT true
);



DROP TABLE IF EXISTS "VerifyCode";
CREATE TABLE "VerifyCode" (
    "codeId" serial NOT NULL,
    "token" text NOT NULL
);

DROP TABLE IF EXISTS "ForgotCode";
CREATE TABLE "ForgotCode" (
    "codeId" serial NOT NULL,
    "code" text NOT NULL,
    "userId" int4 NOT NULL
);

DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
    "userId" serial NOT NULL,
    "name" character varying(255),
    "phoneNumber" character varying(15),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    avatar character varying(255),
	public_id character varying(255),
    gender boolean,
    role character varying(100) DEFAULT USER NOT NULL,
    active boolean default false 
);

ALTER TABLE "Cart" ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId", "productId");
ALTER TABLE "Comment" ADD CONSTRAINT "Commnet_pkey" PRIMARY KEY ("commentId");
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("orderId", "productId");
ALTER TABLE "Order" ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");
ALTER TABLE "Product" ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("slideId");
ALTER TABLE "Type" ADD CONSTRAINT "Type_pkey" PRIMARY KEY ("typeId");
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
ALTER TABLE "ForgotCode" ADD CONSTRAINT "ForgotCode_pkey" PRIMARY KEY ("codeId");
ALTER TABLE "VerifyCode" ADD CONSTRAINT "VerifyCode_pkey" PRIMARY KEY ("codeId");
--- 

ALTER TABLE "Cart" ADD CONSTRAINT "FK_Cart_Pro" 
	FOREIGN KEY ("productId") REFERENCES "Product" ("productId");
ALTER TABLE "Cart" ADD CONSTRAINT "FK_Cart_User" 
	FOREIGN KEY ("userId") REFERENCES "User" ("userId");

ALTER TABLE "Comment" ADD CONSTRAINT "FK_Comment_Pro" 
	FOREIGN KEY ("productId") REFERENCES "Product" ("productId");
ALTER TABLE "Comment" ADD CONSTRAINT "FK_Comment_User" 
	FOREIGN KEY ("userId") REFERENCES "User" ("userId");

ALTER TABLE "Order" ADD CONSTRAINT "FK_Order_User" 
	FOREIGN KEY ("userId") REFERENCES "User" ("userId");

ALTER TABLE "OrderDetail" ADD CONSTRAINT "FK_OrderDetail_User" 
	FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId");
ALTER TABLE "OrderDetail" ADD CONSTRAINT "FK_OrderDetail_Pro" 
	FOREIGN KEY ("productId") REFERENCES "Product" ("productId");

ALTER TABLE "Product" ADD CONSTRAINT "FK_Product_Type" 
	FOREIGN KEY ("typeId") REFERENCES "Type" ("typeId");

ALTER TABLE "ProductDetail" ADD CONSTRAINT "FK_ProductDetail_Product" 
	FOREIGN KEY ("productId") REFERENCES "Product" ("productId");

ALTER TABLE "ForgotCode" ADD CONSTRAINT "FK_ForgotCode_User" 
	FOREIGN KEY ("userId") REFERENCES "User" ("userId");



----------------------------------------------------------------
---- Insert database
---------- Type
INSERT INTO "Type" ("typeId","name") VALUES (1,'Samsung'),(2,'iPhone'),(3,'Oppo'),(4,'Xiaomi'),(5,'Vivo'),(6,'realme'),(7,'Nokia');
--------- Product

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (1, 131, 1,'images\img_tpdpytgefhsrqsyeg.png',36990000,40990000,7,2,'2020-11-29', N'Điện thoại Samsung Galaxy Z Fold5 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (1,N'Dynamic AMOLED 2X, Chính 7.6" & Phụ 6.2", Quad HD+ (2K+)',N'Android 13',N'Chính 50 MP & Phụ 12 MP, 10 MP',N'10 MP & 4 MP',N'Snapdragon 8 Gen 2 for Galaxy', N'12 GB',N'256 GB',N'4400 mAh',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (2, 118, 1,'images\img_hwiyedwhyssogpwfr.png',29990000,31990000,6,5,'2021-06-16', N'Điện thoại Samsung Galaxy S23 Ultra 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (2,N'Dynamic AMOLED 2X, 6.8", Quad HD+ (2K+)',N'Android 13',N'Chính 200 MP & Phụ 12 MP, 10 MP, 10 MP',N'12 MP',N'Snapdragon 8 Gen 2 for Galaxy', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (3, 132, 1,'images\img_fdfoooteurgyihtse.png',37990000,40990000,7,2,'2020-03-20', N'Điện thoại Samsung Galaxy Z Fold4 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (3,N'Dynamic AMOLED 2X, Chính 7.6" & Phụ 6.2", Quad HD+ (2K+)',N'Android 12',N'Chính 50 MP & Phụ 12 MP, 10 MP',N'10 MP & 4 MP',N'Snapdragon 8+ Gen 1', N'12 GB',N'256 GB',N'4400 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (4, 161, 1,'images\img_jwsuertjtwjdgsfir.png',24990000,25990000,3,2,'2020-03-11', N'Điện thoại Samsung Galaxy Z Flip5 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (4,N'Chính: Dynamic AMOLED 2X, Phụ: Super AMOLED, Chính 6.7" & Phụ 3.4", Full HD+',N'Android 13',N'2 camera 12 MP',N'10 MP',N'Snapdragon 8 Gen 2 for Galaxy', N'8 GB',N'256 GB',N'3700 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (5, 158, 1,'images\img_wutgruqasddapwyep.png',22990000,26990000,14,2,'2019-11-14', N'Điện thoại Samsung Galaxy S23+ 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (5,N'Dynamic AMOLED 2X, 6.6", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 12 MP, 10 MP',N'12 MP',N'Snapdragon 8 Gen 2 for Galaxy', N'8 GB',N'256 GB',N'4700 mAh',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (6, 87, 1,'images\img_ssrfwequeqajsjtso.png',29990000,30990000,3,2,'2020-08-21', N'Điện thoại Samsung Galaxy S22 Ultra 5G 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (6,N'Dynamic AMOLED 2X, 6.8", Quad HD+ (2K+)',N'Android 12',N'Chính 108 MP & Phụ 12 MP, 10 MP, 10 MP',N'40 MP',N'Snapdragon 8 Gen 1', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (7, 144, 1,'images\img_yypyfrijfuapiryqp.png',20990000,22990000,8,1,'2021-04-08', N'Điện thoại Samsung Galaxy S23 5G 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (7,N'Dynamic AMOLED 2X, 6.1", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 12 MP, 10 MP',N'12 MP',N'Snapdragon 8 Gen 2 for Galaxy', N'8 GB',N'128 GB',N'3900 mAh',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (8, 65, 1,'images\img_uqjuwsrtspjygoswh.png',19990000,23990000,16,0,'2019-11-27', N'Điện thoại Samsung Galaxy Z Flip4 5G 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (8,N'Chính: Dynamic AMOLED 2X, Phụ: Super AMOLED, Chính 6.7" & Phụ 1.9", Full HD+',N'Android 12',N'2 camera 12 MP',N'10 MP',N'Snapdragon 8+ Gen 1', N'8 GB',N'128 GB',N'3700 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (9, 81, 1,'images\img_eegdatafghefrgypr.png',7990000,11990000,12,5,'2022-09-03', N'Điện thoại Samsung Galaxy M54 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (9,N'Super AMOLED Plus, 6.7", Full HD+',N'Android 13',N'Chính 108 MP & Phụ 8 MP, 2 MP',N'32 MP',N'Exynos 1380 8 nhân', N'8 GB',N'256 GB',N'6000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (10, 71, 1,'images\img_yrtgsgpephehqpoqp.png',8990000,12990000,26,5,'2021-11-25', N'Điện thoại Samsung Galaxy S21 FE 5G (6GB/128GB)');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (10,N'Dynamic AMOLED 2X, 6.4", Full HD+',N'Android 12',N'Chính 12 MP & Phụ 12 MP, 8 MP',N'32 MP',N'Exynos 2100', N'6 GB',N'128 GB',N'4500 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (11, 193, 1,'images\img_uqdwoegsyiufuyytu.png',9490000,10490000,9,5,'2021-06-27', N'Điện thoại Samsung Galaxy A54 5G 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (11,N'Super AMOLED, 6.4", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 12 MP, 5 MP	',N'32 MP',N'Exynos 1380 8 nhân', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (12, 89, 1,'images\img_apdewryreuioqpdoq.png',8490000,9490000,10,3,'2022-04-07', N'Điện thoại Samsung Galaxy A34 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (12,N'Super AMOLED, 6.6", Full HD+',N'Android 13',N'Chính 48 MP & Phụ 8 MP, 5 MP',N'13 MP',N'MediaTek Dimensity 1080 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (13, 199, 1,'images\img_yieuftfdaadriqfrg.png',4990000,7990000,10,0,'2019-11-11', N'Điện thoại Samsung Galaxy M34 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (13,N'Super AMOLED, 6.5", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'13 MP',N'Exynos 1280', N'8 GB',N'128 GB',N'6000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (14, 110, 1,'images\img_ogfffwfddyooarqto.png',4490000,6490000,15,5,'2021-05-17', N'Điện thoại Samsung Galaxy A24 6GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (14,N'Super AMOLED, 6.5", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 5 MP, 2 MP',N'13 MP',N'MediaTek Helio G99', N'6 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (15, 189, 1,'images\img_aouseyjftogpopayi.png',2190000,5190000,17,5,'2021-11-29', N'Điện thoại Samsung Galaxy A14 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (15,N'PLS LCD, 6.6", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 2 MP, 2 MP',N'13 MP',N'MediaTek Dimensity 700', N'4 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (16, 67, 1,'images\img_dwsaoootearprsfgr.png',490000,4490000,6,2,'2022-09-28', N'Điện thoại Samsung Galaxy A05s 6GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (16,N'PLS LCD, 6.7", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 2 MP, 2 MP',N'13 MP',N'Snapdragon 680', N'6 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (17, 129, 2,'images\img_ugweerjugjiqarjje.png',32990000,34990000,3,2,'2021-09-03', N'Điện thoại iPhone 15 Pro Max 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (17,N'OLED, 6.7", Super Retina XDR',N'iOS 17',N'Chính 48 MP & Phụ 12 MP, 12 MP',N'12 MP',N'Apple A17 Pro 6 nhân', N'8 GB',N'256 GB',N'4422 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (18, 182, 2,'images\img_ugpuafgsdypyjwwqy.png',27990000,28990000,2,0,'2020-05-22', N'Điện thoại iPhone 15 Pro 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (18,N'OLED, 6.1", Super Retina XDR',N'iOS 17',N'Chính 48 MP & Phụ 12 MP, 12 MP',N'12 MP',N'Apple A17 Pro 6 nhân', N'8 GB',N'128 GB',N'3274 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (19, 156, 2,'images\img_epjwgaosjjfugsuow.png',19990000,22990000,4,0,'2020-09-30', N'Điện thoại iPhone 15 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (19,N'OLED, 6.1", Super Retina XDR',N'iOS 17',N'Chính 48 MP & Phụ 12 MP',N'12 MP',N'Apple A16 Bionic', N'6 GB',N'128 GB',N'3349 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (20, 197, 2,'images\img_ggdhoadrafjeqeijf.png',25490000,29490000,6,4,'2019-10-17', N'Điện thoại iPhone 14 Pro Max 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (20,N'OLED, 6.7", Super Retina XDR',N'iOS 16',N'Chính 48 MP & Phụ 12 MP, 12 MP',N'12 MP',N'Apple A16 Bionic', N'6 GB',N'128 GB',N'4323 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (21, 178, 2,'images\img_eshwdsyopjiesiwoh.png',10790000,11790000,6,2,'2020-11-04', N'Điện thoại iPhone 11 64GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (21,N'IPS LCD, 6.1", Liquid Retina',N'iOS 15',N'2 camera 12 MP',N'12 MP',N'Apple A13 Bionic', N'4 GB',N'64 GB',N'3110 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (22, 141, 2,'images\img_sgggghpiyoettfewg.png',12890000,14890000,8,5,'2019-11-25', N'Điện thoại iPhone 12 64GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (22,N'OLED, 6.1", Super Retina XDR',N'iOS 15',N'2 camera 12 MP',N'12 MP',N'Apple A14 Bionic', N'4 GB',N'64 GB',N'2815 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (23, 161, 2,'images\img_qsuserhftwjdpsiuo.png',24090000,27090000,8,4,'2019-03-30', N'Điện thoại iPhone 14 Pro 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (23,N'OLED, 6.1", Super Retina XDR',N'iOS 16',N'Chính 48 MP & Phụ 12 MP, 12 MP',N'12 MP',N'Apple A16 Bionic', N'6 GB',N'128 GB',N'3200 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (24, 55, 2,'images\img_piyigoyhtwggfjuyf.png',19690000,23690000,10,3,'2021-12-26', N'Điện thoại iPhone 14 Plus 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (24,N'OLED, 6.7", Super Retina XDR',N'iOS 16',N'2 camera 12 MP',N'12 MP',N'Apple A15 Bionic', N'6 GB',N'128 GB',N'4325 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (25, 133, 2,'images\img_wryqtahapuqtqgjfg.png',17490000,20490000,9,2,'2021-03-12', N'Điện thoại iPhone 14 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (25,N'OLED, 6.1", Super Retina XDR',N'iOS 16',N'2 camera 12 MP',N'12 MP',N'Apple A15 Bionic', N'6 GB',N'128 GB',N'3279 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (26, 82, 2,'images\img_tiippouduqaqrihge.png',16790000,17790000,5,0,'2022-10-06', N'Điện thoại iPhone 13 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (26,N'OLED, 6.1", Super Retina XDR',N'iOS 15',N'2 camera 12 MP',N'12 MP',N'Apple A15 Bionic', N'4 GB',N'128 GB',N'3240 mAh',N'1 Nano SIM & 1 eSIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (27, 199, 3,'images\img_ftoooygtydohiqwpu.png',990000,4990000,12,2,'2020-06-24', N'Điện thoại OPPO A57 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (27,N'IPS LCD, 6.56", HD+',N'Android 12',N'Chính 13 MP & Phụ 2 MP',N'8 MP',N'MediaTek Helio G35', N'4 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (28, 129, 3,'images\img_hffhodgtqygdojuti.png',6990000,10990000,4,2,'2020-06-04', N'Điện thoại OPPO Reno10 5G 256GB Xanh');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (28,N'AMOLED, 6.7", Full HD+',N'Android 13',N'Chính 64 MP & Phụ 32 MP, 8 MP',N'32 MP',N'MediaTek Dimensity 7050 5G 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (29, 53, 3,'images\img_djgaiwjthddwrjguf.png',17990000,19990000,5,1,'2021-03-15', N'Điện thoại OPPO Find N2 Flip 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (29,N'AMOLED, Chính 6.8" & Phụ 3.26", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 8 MP',N'32 MP',N'MediaTek Dimensity 9000+ 8 nhân', N'8 GB',N'256 GB',N'4300 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (30, 198, 3,'images\img_wtfwhaeswduiphieg.png',9990000,13990000,3,3,'2020-09-20', N'Điện thoại OPPO Reno10 Pro 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (30,N'AMOLED, 6.7", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 32 MP, 8 MP',N'32 MP',N'Snapdragon 778G 5G', N'12 GB',N'256 GB',N'4600 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (31, 141, 3,'images\img_dspfaafoygdagohhd.png',8990000,10990000,9,1,'2019-09-18', N'Điện thoại OPPO Reno8 T 5G 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (31,N'AMOLED, 6.7", Full HD+',N'Android 13',N'Chính 108 MP & Phụ 2 MP, 2 MP',N'32 MP',N'Snapdragon 695 5G', N'8 GB',N'256 GB',N'4800 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (32, 116, 3,'images\img_rutwedrwuposiyeho.png',6990000,8990000,5,1,'2019-03-27', N'Điện thoại OPPO A98 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (32,N'LTPS LCD, 6.72", Full HD+',N'Android 13',N'Chính 64 MP & Phụ 2 MP, 2 MP',N'32 MP',N'Snapdragon 695 5G', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (33, 114, 3,'images\img_yihsfypsydtspogta.png',7490000,8490000,5,3,'2021-03-09', N'Điện thoại OPPO Reno8 T');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (33,N'AMOLED, 6.4", Full HD+',N'Android 13',N'Chính 100 MP & Phụ 2 MP, 2 MP',N'32 MP',N'MediaTek Helio G99', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (34, 78, 3,'images\img_tsppptrwqtosyshee.png',4290000,6290000,11,2,'2020-03-10', N'Điện thoại OPPO A77s');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (34,N'IPS LCD, 6.56", HD+',N'Android 12',N'Chính 50 MP & Phụ 2 MP',N'8 MP',N'Snapdragon 680', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (35, 90, 3,'images\img_piuwhudqjfehyjput.png',2660000,3990000,12,2,'2019-09-24', N'Điện thoại OPPO A17');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (35,N'IPS LCD, 6.56", HD+',N'Android 12',N'Chính 50 MP & Phụ 0.3 MP',N'5 MP',N'MediaTek Helio G35', N'4 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (36, 162, 3,'images\img_gufihqgutjdqwquyw.png',2193334,3290000,9,0,'2019-09-26', N'Điện thoại OPPO A17K');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (36,N'IPS LCD, 6.56", HD+',N'Android 12',N'8 MP',N'5 MP',N'MediaTek Helio G35', N'3 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (37, 193, 4,'images\img_rufworgwisphhtpfh.png',2060000,3090000,6,5,'2021-11-20', N'Điện thoại Xiaomi Redmi 13C 4GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (37,N'IPS LCD, 6.74", HD+',N'Android 13',N'Chính 50 MP & Phụ 2 MP',N'8 MP',N'MediaTek Helio G85', N'4 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (38, 90, 4,'images\img_dwuiypyrgdyyjhgtf.png',2290000,4290000,16,4,'2019-02-12', N'Điện thoại Xiaomi Redmi 12 4GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (38,N'IPS LCD, 6.79", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'8 MP',N'MediaTek Helio G88', N'4 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (39, 62, 4,'images\img_agjaqraofhpeutqss.png',9990000,11990000,8,3,'2021-02-27', N'Điện thoại Xiaomi 13T 5G 8GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (39,N'AMOLED, 6.67", 1.5K',N'Android 13',N'Chính 50 MP & Phụ 50 MP, 12 MP',N'20 MP',N'MediaTek Dimensity 8200-Ultra', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (40, 71, 4,'images\img_owwfqqsqqwhphjusy.png',10490000,11490000,8,4,'2021-10-05', N'Điện thoại Xiaomi 13 Lite 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (40,N'AMOLED, 6.55", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'Chính 32 MP & Phụ 8 MP',N'Snapdragon 7 Gen 1 8 nhân', N'8 GB',N'256 GB',N'4500 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (41, 70, 4,'images\img_jwedqjwigiedioyto.png',4490000,6490000,13,2,'2021-06-21', N'Điện thoại Xiaomi Redmi Note 12 (8GB/256GB)');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (41,N'AMOLED, 6.67", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'13 MP',N'Snapdragon 685 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (42, 92, 4,'images\img_qidfptjitqowspprs.png',12990000,15990000,6,5,'2019-08-18', N'Điện thoại Xiaomi 13T Pro 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (42,N'AMOLED, 6.67", 1.5K',N'Android 13',N'Chính 50 MP & Phụ 50 MP, 12 MP',N'20 MP',N'MediaTek Dimensity 9200+ 5G 8 nhân', N'12 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (43, 187, 4,'images\img_fqtfowrprfwuoswfu.png',10990000,13990000,21,2,'2019-11-24', N'Điện thoại Xiaomi 12 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (43,N'AMOLED, 6.28", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 13 MP, 5 MP',N'32 MP',N'Snapdragon 8 Gen 1', N'8 GB',N'256 GB',N'4500 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (44, 82, 4,'images\img_swiqjpiyqyprgyqis.png',5490000,9490000,15,0,'2019-05-15', N'Điện thoại Xiaomi Redmi Note 12 Pro 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (44,N'AMOLED, 6.67", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'16 MP',N'MediaTek Dimensity 1080 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (45, 141, 4,'images\img_ifoirtgegsjhdofjj.png',8490000,9490000,10,2,'2019-07-29', N'Điện thoại Xiaomi Redmi Note 12 Pro 5G Tím');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (45,N'AMOLED, 6.67", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 8 MP, 2 MP',N'16 MP',N'MediaTek Dimensity 1080 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (46, 144, 4,'images\img_ywdhusirdieqtdayt.png',6190000,7190000,11,1,'2019-05-01', N'Điện thoại Xiaomi Redmi Note 12 Pro 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (46,N'AMOLED, 6.67", Full HD+',N'Android 11',N'Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP',N'16 MP',N'Snapdragon 732G', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (47, 121, 4,'images\img_uthuargephpfhhfdj.png',3690000,6690000,17,0,'2019-05-04', N'Điện thoại Xiaomi Redmi Note 12S');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (47,N'AMOLED, 6.43", Full HD+',N'Android 13',N'Chính 108 MP & Phụ 8 MP, 2 MP',N'16 MP',N'MediaTek Helio G96', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (48, 53, 4,'images\img_iaortrjaitogasary.png',2393334,3590000,30,0,'2021-03-12', N'Điện thoại Xiaomi Redmi 12C 64GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (48,N'IPS LCD, 6.71", HD+',N'Android 12',N'Chính 50 MP & Phụ QVGA',N'5 MP',N'MediaTek Helio G85', N'4 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (49, 198, 4,'images\img_qesdrotajoufsqfpr.png',1860000,2790000,14,2,'2021-12-04', N'Điện thoại Xiaomi Redmi A2+');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (49,N'IPS LCD, 6.52", HD+',N'Android 13 (Go Edition)',N'Chính 8 MP & Phụ QVGA (248 x 328 Pixels)',N'5 MP',N'MediaTek Helio G36 8 nhân', N'3 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (50, 110, 5,'images\img_hjjuujirjpdwiifyh.png',7990000,9990000,3,1,'2021-09-17', N'Điện thoại vivo V29e 5G 12GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (50,N'AMOLED, 6.67", Full HD+',N'Android 13',N'Chính 64 MP & Phụ 8 MP',N'50 MP',N'Snapdragon 695 5G', N'12 GB',N'256 GB',N'4800 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (51, 52, 5,'images\img_sshqejrdwywridars.png',1990000,5990000,8,5,'2022-06-25', N'Điện thoại vivo Y36 128GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (51,N'IPS LCD, 6.64", Full HD+',N'Android 13',N'Chính 50 MP & Phụ 2 MP',N'16 MP',N'Snapdragon 680', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (52, 130, 5,'images\img_egtdiqujqqygserja.png',6990000,8990000,11,4,'2021-04-05', N'Điện thoại vivo V27e');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (52,N'AMOLED, 6.62", Full HD+',N'Android 13',N'Chính 64 MP & Phụ 2 MP, 2 MP',N'32 MP',N'MediaTek Helio G99', N'8 GB',N'256 GB',N'4600 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (53, 66, 5,'images\img_priitrhjhupgfsopa.png',11990000,13990000,14,5,'2021-12-09', N'Điện thoại vivo V25 Pro 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (53,N'AMOLED, 6.56", Full HD+',N'Android 12',N'Chính 64 MP & Phụ 8 MP, 2 MP',N'32 MP',N'MediaTek Dimensity 1300', N'8 GB',N'128 GB',N'4830 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (54, 112, 5,'images\img_qqqrhhdditaapqtur.png',7490000,10490000,28,0,'2019-01-19', N'Điện thoại vivo V25 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (54,N'AMOLED, 6.44", Full HD+',N'Android 12',N'Chính 64 MP & Phụ 8 MP, 2 MP',N'50 MP',N'MediaTek Dimensity 900 5G', N'8 GB',N'128 GB',N'4500 mAh',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (55, 140, 5,'images\img_fdowwwdeiujfqqyti.png',2990000,6990000,28,5,'2020-02-01', N'Điện thoại vivo Y35');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (55,N'IPS LCD, 6.58", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 2 MP, 2 MP',N'16 MP',N'Snapdragon 680', N'8 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (56, 163, 5,'images\img_ywwddthystjwysrpi.png',490000,4490000,4,1,'2022-02-23', N'Điện thoại vivo Y17s (6GB/128GB)');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (56,N'IPS LCD, 6.56", HD+',N'Android 13',N'Chính 50 MP & Phụ 2 MP',N'8 MP',N'MediaTek Helio G85', N'6 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (57, 74, 5,'images\img_wtewwfttsjrqwoiwg.png',2193334,3290000,9,3,'2020-07-28', N'Điện thoại vivo Y02s 64GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (57,N'IPS LCD, 6.51", HD+',N'Android 12',N'8 MP',N'5 MP',N'MediaTek Helio P35', N'3 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (58, 152, 6,'images\img_sfrwoshawptepfgih.png',2290000,4290000,9,2,'2021-11-03', N'Điện thoại realme C53 (6GB/128GB)');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (58,N'IPS LCD, 6.74", HD+',N'Android 13',N'Chính 50 MP & Phụ 0.08 MP',N'8 MP',N'Unisoc Tiger T612', N'6 GB',N'128 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (59, 184, 6,'images\img_wffsoshtouiegiotq.png',4990000,7990000,6,3,'2022-06-17', N'Điện thoại realme 11 256GB');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (59,N'Super AMOLED, 6.4", Full HD+',N'Android 13',N'Chính 108 MP & Phụ 2 MP',N'16 MP',N'MediaTek Helio G99', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (60, 76, 6,'images\img_ddfpruuetwuqusuyj.png',11990000,14990000,10,0,'2022-02-17', N'Điện thoại realme 11 Pro+ 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (60,N'AMOLED, 6.7", Full HD+',N'Android 13',N'Chính 200 MP & Phụ 8 MP, 2 MP	',N'32 MP',N'MediaTek Dimensity 7050 5G 8 nhân', N'12 GB',N'512 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (61, 109, 6,'images\img_ygusfrtfuedqtayyy.png',7990000,11990000,4,5,'2022-03-21', N'Điện thoại realme 11 Pro 5G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (61,N'AMOLED, 6.7", Full HD+',N'Android 13',N'Chính 100 MP & Phụ 2 MP',N'16 MP',N'MediaTek Dimensity 7050 5G 8 nhân', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (62, 100, 6,'images\img_ujgyfaposeuadjdoh.png',3390000,6390000,15,0,'2022-03-17', N'Điện thoại realme 10');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (62,N'Super AMOLED, 6.4", Full HD+',N'Android 12',N'Chính 50 MP & Phụ 2 MP',N'16 MP',N'MediaTek Helio G99', N'8 GB',N'256 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (63, 158, 6,'images\img_daafseeshhqufoydq.png',2460000,3690000,18,3,'2021-01-18', N'Điện thoại realme C51 (4GB/64GB)');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (63,N'IPS LCD, 6.74", HD+',N'Android 13',N'Chính 50 MP & Phụ 0.3 MP',N'5 MP',N'Unisoc Tiger T612', N'4 GB',N'64 GB',N'5000 mAh',N'2 Nano SIM');

INSERT INTO "Product" ("productId","total","typeId","image","cost","price","discount","rate","releaseDate","name") VALUES (64, 57, 7,'images\img_ajpaeifapjifhtefw.png',580000,870000,24,2,'2022-06-03', N'Điện thoại Nokia 110 4G');
INSERT INTO "ProductDetail" ("productId","screen","os","cameraBehind","cameraFront","cpu","ram","rom","battery","sim") VALUES (64,N'TFT LCD, 1.8", 65.536 màu',N'2 Nano SIM',N'2000 số',N'MicroSD, hỗ trợ tối đa 32 GB',N'0.08 MP', N'FM không cần tai nghe',N'3.5 mm',N'Nokia. Xem thông tin hãng',N'1020 mAh');

