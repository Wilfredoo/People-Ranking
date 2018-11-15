DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    restName VARCHAR(300),
    jobType VARCHAR(255),
    hourPay INT,
    typePay VARCHAR(255) ,
    schedule VARCHAR(255),
    contact VARCHAR(255) ,
    address VARCHAR(255),
    phone VARCHAR(255),
    area VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('Souths Bar & Restaurant', 'Cocinero', '14', 'cash', 'lunes a viernes tardes hasta cerrar', 'juana marcos', '127 East 7th
New York, NY 10009', '(646) 850-5345', 'manhattan');
INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('Ambrosio Italian Restaurant & Banquet Hall', 'Cocinero', '13', 'ambos', 'fines de semana', 'maria', '2071 Clove Rd
Staten Island, NY 10304', '(718) 524-7174', 'Staten Island');
INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('L’Appart', 'Preparador', '16', 'Check', 'lunes marte y miercoles', 'nicola', '225 Liberty St
New York, NY 10281', '(212) 981-8577', 'Manhattan');
INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('Daniel', 'Lavaplatos', '15', 'Cash', 'lunes, martes, miercoles sabados y domingos', 'juan', '60 E 65th St.
New York, NY 10065', '(212) 288-0033', 'Manhattan');
INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('Ambrosio Italian Restaurant & Banquet Hall', 'Lavaplatos', '13', 'ambos', 'fines de semana', 'maria', '2071 Clove Rd
Staten Island, NY 10304', '(718) 524-7174', 'Staten Island');;
INSERT INTO jobs (restName, jobType, hourPay, typePay, schedule, contact, address, phone, area) VALUES ('L’Appart', 'Cocinero', '16', 'Check', 'lunes marte y miercoles', 'nicola', '225 Liberty St
New York, NY 10281', '(212) 981-8577', 'Manhattan');
