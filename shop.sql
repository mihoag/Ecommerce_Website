
DROP TABLE IF EXISTS "Cart";
CREATE TABLE "Cart" (
    "userId" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "quantity" int4
);

DROP TABLE IF EXISTS "Comment";
CREATE TABLE "Comment" (
    "commentId" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "userId" int4 NOT NULL,
    content text,
    date date,
    rate integer DEFAULT 0
);

DROP TABLE IF EXISTS "Order";
CREATE TABLE "Order" (
    "orderId" serial NOT NULL,
    "userId" int4 NOT NULL,
    address character varying(255),
    "reciverName" character varying(255),
    "phoneNumber" character varying(255),
    "totalCost" integer,
    "isPayment" boolean DEFAULT false,
    status character varying(100)
);

DROP TABLE IF EXISTS "OrderDetail";
CREATE TABLE "OrderDetail" (
    "orderId" int4 NOT NULL,
    "productId" int4 NOT NULL,
    quantity int4
);

DROP TABLE IF EXISTS "Product";
CREATE TABLE "Product" (
    "productId" serial NOT NULL,
    total int4,
    "typeId" int4 NOT NULL,
    image character varying(255),
	public_id character varying(255),
    active boolean DEFAULT true,
    cost int4,
    price int4
);

DROP TABLE IF EXISTS "Slide";
CREATE TABLE "Slide" (
    "slideId" serial NOT NULL,
    image character varying(255),
	public_id character varying(255),
    header character varying(100),
    content text
);

DROP TABLE IF EXISTS "Type";
CREATE TABLE "Type" (
    "typeId" serial NOT NULL,
    name character varying(255) NOT NULL,
    active boolean DEFAULT true
);

DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
    "userId" serial NOT NULL,
    name character varying(255),
    "phoneNumber" character varying(15),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    avatar character varying(255),
	public_id character varying(255),
    gender boolean,
    role character varying(100) DEFAULT USER NOT NULL,
    active boolean NOT NULL
);

ALTER TABLE "Cart" ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId", "productId");
ALTER TABLE "Comment" ADD CONSTRAINT "Commnet_pkey" PRIMARY KEY ("commentId");
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("orderId", "productId");
ALTER TABLE "Order" ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");
ALTER TABLE "Product" ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("slideId");
ALTER TABLE "Type" ADD CONSTRAINT "Type_pkey" PRIMARY KEY ("typeId");
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
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