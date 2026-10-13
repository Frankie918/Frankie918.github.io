create table if not exists page_views (
  page text primary key,
  n int not null default 0
);

insert into page_views (page, n) values
  ('home', 0),
  ('anshen', 0),
  ('jieyu', 0),
  ('anmei', 0),
  ('listen', 0),
  ('qr', 0)
on conflict (page) do nothing;
