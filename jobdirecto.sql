DROP TABLE IF EXISTS posts;

CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    restName VARCHAR(300) NOT NULL,
    jobType VARCHAR(255) NOT NULL,
    hourPay INT NOT NULL,
    typePay VARCHAR(255) NOT NULL,
    schedule VARCHAR(255) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone INT NOT NULL,
    area VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
