CREATE OR REPLACE FUNCTION generate_test_data()
  RETURNS VOID AS
$$
DECLARE
  i INT := 1;
BEGIN
  WHILE i <= 2000 LOOP
    INSERT INTO products (name, price, address)
    VALUES (
      'Product ' || i,
      ROUND(RANDOM() * 100, 2),
      'Address ' || (FLOOR(RANDOM() * 10) + 1)::TEXT
    );
    i := i + 1;
  END LOOP;
END;
$$
LANGUAGE PLPGSQL;
