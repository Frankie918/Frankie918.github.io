create table if not exists site_views (
  id int primary key,
  n int not null default 0
);

insert into site_views (id, n)
values (1, 0)
on conflict (id) do nothing;
