CREATE TABLE daily_time_recorder.users (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username varchar(20) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(254) UNIQUE NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(100) NOT NULL,
  create_date timestamp with time zone NOT NULL,
  last_update_date timestamp with time zone
);
