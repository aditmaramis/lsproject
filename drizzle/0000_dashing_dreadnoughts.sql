CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"short_code" varchar(10) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"original_url" text NOT NULL,
	"title" varchar(255),
	"description" text,
	"click_count" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "links" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "links" USING btree ("created_at");