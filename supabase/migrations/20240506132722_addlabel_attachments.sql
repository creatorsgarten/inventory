create table "public"."inventory_label_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "item_id" uuid not null,
    "label_id" text not null
);


alter table "public"."inventory_label_attachments" enable row level security;

CREATE UNIQUE INDEX inventory_label_attachments_label_id_key ON public.inventory_label_attachments USING btree (label_id);

CREATE UNIQUE INDEX inventory_label_attachments_pkey ON public.inventory_label_attachments USING btree (id);

alter table "public"."inventory_label_attachments" add constraint "inventory_label_attachments_pkey" PRIMARY KEY using index "inventory_label_attachments_pkey";

alter table "public"."inventory_label_attachments" add constraint "inventory_label_attachments_label_id_key" UNIQUE using index "inventory_label_attachments_label_id_key";

alter table "public"."inventory_label_attachments" add constraint "public_inventory_label_attachments_item_id_fkey" FOREIGN KEY (item_id) REFERENCES inventory_items(id) not valid;

alter table "public"."inventory_label_attachments" validate constraint "public_inventory_label_attachments_item_id_fkey";

alter table "public"."inventory_label_attachments" add constraint "public_inventory_label_attachments_label_id_fkey" FOREIGN KEY (label_id) REFERENCES inventory_labels(id) not valid;

alter table "public"."inventory_label_attachments" validate constraint "public_inventory_label_attachments_label_id_fkey";

grant delete on table "public"."inventory_label_attachments" to "anon";

grant insert on table "public"."inventory_label_attachments" to "anon";

grant references on table "public"."inventory_label_attachments" to "anon";

grant select on table "public"."inventory_label_attachments" to "anon";

grant trigger on table "public"."inventory_label_attachments" to "anon";

grant truncate on table "public"."inventory_label_attachments" to "anon";

grant update on table "public"."inventory_label_attachments" to "anon";

grant delete on table "public"."inventory_label_attachments" to "authenticated";

grant insert on table "public"."inventory_label_attachments" to "authenticated";

grant references on table "public"."inventory_label_attachments" to "authenticated";

grant select on table "public"."inventory_label_attachments" to "authenticated";

grant trigger on table "public"."inventory_label_attachments" to "authenticated";

grant truncate on table "public"."inventory_label_attachments" to "authenticated";

grant update on table "public"."inventory_label_attachments" to "authenticated";

grant delete on table "public"."inventory_label_attachments" to "service_role";

grant insert on table "public"."inventory_label_attachments" to "service_role";

grant references on table "public"."inventory_label_attachments" to "service_role";

grant select on table "public"."inventory_label_attachments" to "service_role";

grant trigger on table "public"."inventory_label_attachments" to "service_role";

grant truncate on table "public"."inventory_label_attachments" to "service_role";

grant update on table "public"."inventory_label_attachments" to "service_role";

create policy "Inventory label attachments public read"
on "public"."inventory_label_attachments"
as permissive
for select
to public
using (true);


create policy "Inventory labels public read"
on "public"."inventory_labels"
as permissive
for select
to public
using (true);



