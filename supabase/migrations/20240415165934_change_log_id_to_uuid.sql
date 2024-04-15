create table "public"."inventory_labels" (
    "id" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."inventory_labels" enable row level security;

create table "public"."inventory_logs" (
    "id" uuid default uuid7() not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "activity_type" text,
    "activity_payload" jsonb default '{}'::jsonb
);

alter table "public"."inventory_logs" enable row level security;

create table "public"."inventory_nfc_tags" (
    "id" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."inventory_nfc_tags" enable row level security;

CREATE UNIQUE INDEX inventory_labels_pkey ON public.inventory_labels USING btree (id);

CREATE UNIQUE INDEX inventory_logs_pkey ON public.inventory_logs USING btree (id);

CREATE UNIQUE INDEX inventory_nfc_tags_pkey ON public.inventory_nfc_tags USING btree (id);

alter table "public"."inventory_labels" add constraint "inventory_labels_pkey" PRIMARY KEY using index "inventory_labels_pkey";

alter table "public"."inventory_logs" add constraint "inventory_logs_pkey" PRIMARY KEY using index "inventory_logs_pkey";

alter table "public"."inventory_nfc_tags" add constraint "inventory_nfc_tags_pkey" PRIMARY KEY using index "inventory_nfc_tags_pkey";

grant delete on table "public"."inventory_labels" to "anon";

grant insert on table "public"."inventory_labels" to "anon";

grant references on table "public"."inventory_labels" to "anon";

grant select on table "public"."inventory_labels" to "anon";

grant trigger on table "public"."inventory_labels" to "anon";

grant truncate on table "public"."inventory_labels" to "anon";

grant update on table "public"."inventory_labels" to "anon";

grant delete on table "public"."inventory_labels" to "authenticated";

grant insert on table "public"."inventory_labels" to "authenticated";

grant references on table "public"."inventory_labels" to "authenticated";

grant select on table "public"."inventory_labels" to "authenticated";

grant trigger on table "public"."inventory_labels" to "authenticated";

grant truncate on table "public"."inventory_labels" to "authenticated";

grant update on table "public"."inventory_labels" to "authenticated";

grant delete on table "public"."inventory_labels" to "service_role";

grant insert on table "public"."inventory_labels" to "service_role";

grant references on table "public"."inventory_labels" to "service_role";

grant select on table "public"."inventory_labels" to "service_role";

grant trigger on table "public"."inventory_labels" to "service_role";

grant truncate on table "public"."inventory_labels" to "service_role";

grant update on table "public"."inventory_labels" to "service_role";

grant delete on table "public"."inventory_logs" to "anon";

grant insert on table "public"."inventory_logs" to "anon";

grant references on table "public"."inventory_logs" to "anon";

grant select on table "public"."inventory_logs" to "anon";

grant trigger on table "public"."inventory_logs" to "anon";

grant truncate on table "public"."inventory_logs" to "anon";

grant update on table "public"."inventory_logs" to "anon";

grant delete on table "public"."inventory_logs" to "authenticated";

grant insert on table "public"."inventory_logs" to "authenticated";

grant references on table "public"."inventory_logs" to "authenticated";

grant select on table "public"."inventory_logs" to "authenticated";

grant trigger on table "public"."inventory_logs" to "authenticated";

grant truncate on table "public"."inventory_logs" to "authenticated";

grant update on table "public"."inventory_logs" to "authenticated";

grant delete on table "public"."inventory_logs" to "service_role";

grant insert on table "public"."inventory_logs" to "service_role";

grant references on table "public"."inventory_logs" to "service_role";

grant select on table "public"."inventory_logs" to "service_role";

grant trigger on table "public"."inventory_logs" to "service_role";

grant truncate on table "public"."inventory_logs" to "service_role";

grant update on table "public"."inventory_logs" to "service_role";

grant delete on table "public"."inventory_nfc_tags" to "anon";

grant insert on table "public"."inventory_nfc_tags" to "anon";

grant references on table "public"."inventory_nfc_tags" to "anon";

grant select on table "public"."inventory_nfc_tags" to "anon";

grant trigger on table "public"."inventory_nfc_tags" to "anon";

grant truncate on table "public"."inventory_nfc_tags" to "anon";

grant update on table "public"."inventory_nfc_tags" to "anon";

grant delete on table "public"."inventory_nfc_tags" to "authenticated";

grant insert on table "public"."inventory_nfc_tags" to "authenticated";

grant references on table "public"."inventory_nfc_tags" to "authenticated";

grant select on table "public"."inventory_nfc_tags" to "authenticated";

grant trigger on table "public"."inventory_nfc_tags" to "authenticated";

grant truncate on table "public"."inventory_nfc_tags" to "authenticated";

grant update on table "public"."inventory_nfc_tags" to "authenticated";

grant delete on table "public"."inventory_nfc_tags" to "service_role";

grant insert on table "public"."inventory_nfc_tags" to "service_role";

grant references on table "public"."inventory_nfc_tags" to "service_role";

grant select on table "public"."inventory_nfc_tags" to "service_role";

grant trigger on table "public"."inventory_nfc_tags" to "service_role";

grant truncate on table "public"."inventory_nfc_tags" to "service_role";

grant update on table "public"."inventory_nfc_tags" to "service_role";

