DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    restName VARCHAR(300),
    jobType VARCHAR(255),
    hourPay INT ,
    typePay VARCHAR(255) ,
    schedule VARCHAR(255),
    contact VARCHAR(10) ,
    address VARCHAR(255),
    phone INT ,
    area VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
