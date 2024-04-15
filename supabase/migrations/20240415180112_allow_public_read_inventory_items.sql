create policy "Inventory item public read"
on "public"."inventory_items"
as permissive
for select
to public
using (true);



