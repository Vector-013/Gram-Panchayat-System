INSERT INTO citizens (citizen_id, name, gender, dob, educational_qualification, income, household_id, email_id, password) VALUES
-- Grandparents (Age: 60-80, Mostly Illiterate or Primary, Some Secondary)
(1, 'Rajesh Sharma', 'Male', '1950-05-14', 'Illiterate', 20000, 1, '1@panchayat.com', '$2b$12$hashedPassword'),
(2, 'Kamla Sharma', 'Female', '1955-08-22', 'Illiterate', 0, 1, '2@panchayat.com', '$2b$12$hashedPassword'),
(3, 'Harish Patel', 'Male', '1948-11-03', 'Primary', 25000, 2, '3@panchayat.com', '$2b$12$hashedPassword'),
(4, 'Savitri Patel', 'Female', '1952-03-18', 'Primary', 0, 2, '4@panchayat.com', '$2b$12$hashedPassword'),
(5, 'Surendra Iyer', 'Male', '1945-07-09', 'Secondary', 30000, 3, '5@panchayat.com', '$2b$12$hashedPassword'),
(6, 'Meera Iyer', 'Female', '1950-10-12', 'Primary', 0, 3, '6@panchayat.com', '$2b$12$hashedPassword'),
-- More Grandparents
(7, 'Gopal Verma', 'Male', '1949-06-15', 'Illiterate', 18000, 4, '7@panchayat.com', '$2b$12$hashedPassword'),
(8, 'Laxmi Verma', 'Female', '1951-09-20', 'Primary', 0, 4, '8@panchayat.com', '$2b$12$hashedPassword'),
-- Parents (Age: 30-59, Mostly Secondary, Graduate, or Post Graduate)
(9, 'Amit Sharma', 'Male', '1980-02-25', 'Graduate', 70000, 1, '9@panchayat.com', '$2b$12$hashedPassword'),
(10, 'Pooja Sharma', 'Female', '1985-06-15', 'Graduate', 65000, 1, '10@panchayat.com', '$2b$12$hashedPassword'),
(11, 'Vikram Patel', 'Male', '1978-09-10', 'Post Graduate', 85000, 2, '11@panchayat.com', '$2b$12$hashedPassword'),
(12, 'Anjali Patel', 'Female', '1982-12-04', 'Post Graduate', 80000, 2, '12@panchayat.com', '$2b$12$hashedPassword'),
-- More Parents
(13, 'Ravi Iyer', 'Male', '1975-03-30', 'Graduate', 60000, 3, '13@panchayat.com', '$2b$12$hashedPassword'),
(14, 'Sunita Iyer', 'Female', '1980-07-21', 'Secondary', 40000, 3, '14@panchayat.com', '$2b$12$hashedPassword'),
-- Children (Age: 1-17, Only Primary or Secondary, Income = 0)
(15, 'Aryan Sharma', 'Male', '2010-05-12', 'Secondary', 0, 1, '15@panchayat.com', '$2b$12$hashedPassword'),
(16, 'Siya Sharma', 'Female', '2015-08-18', 'Primary', 0, 1, '16@panchayat.com', '$2b$12$hashedPassword'),
(17, 'Karan Patel', 'Male', '2012-04-25', 'Secondary', 0, 2, '17@panchayat.com', '$2b$12$hashedPassword'),
(18, 'Riya Patel', 'Female', '2017-09-11', 'Primary', 0, 2, '18@panchayat.com', '$2b$12$hashedPassword'),
(19, 'Neel Iyer', 'Male', '2011-01-05', 'Secondary', 0, 3, '19@panchayat.com', '$2b$12$hashedPassword'),
(20, 'Tara Iyer', 'Female', '2016-03-30', 'Primary', 0, 3, '20@panchayat.com', '$2b$12$hashedPassword'),
-- More citizens added to make it 200 records with proper constraints...

-- Grandparents (Age: 60-80, Mostly Illiterate or Primary, Some Secondary)
(21, 'Prakash Sharma', 'Male', '1951-04-10', 'Illiterate', 22000, 5, '21@panchayat.com', '$2b$12$hashedPassword'),
(22, 'Sumitra Sharma', 'Female', '1954-07-19', 'Illiterate', 0, 5, '22@panchayat.com', '$2b$12$hashedPassword'),
(23, 'Devendra Iyer', 'Male', '1947-10-25', 'Primary', 27000, 6, '23@panchayat.com', '$2b$12$hashedPassword'),
(24, 'Saroj Iyer', 'Female', '1953-02-14', 'Primary', 0, 6, '24@panchayat.com', '$2b$12$hashedPassword'),
(25, 'Mahendra Desai', 'Male', '1946-06-30', 'Secondary', 29000, 7, '25@panchayat.com', '$2b$12$hashedPassword'),
(26, 'Anjana Desai', 'Female', '1951-09-25', 'Primary', 0, 7, '26@panchayat.com', '$2b$12$hashedPassword'),
-- More Grandparents
(27, 'Keshav Pillai', 'Male', '1950-05-20', 'Illiterate', 19000, 8, '27@panchayat.com', '$2b$12$hashedPassword'),
(28, 'Gita Pillai', 'Female', '1952-08-29', 'Primary', 0, 8, '28@panchayat.com', '$2b$12$hashedPassword'),
-- Parents (Age: 30-59, Mostly Secondary, Graduate, or Post Graduate)
(29, 'Naveen Sharma', 'Male', '1979-01-18', 'Graduate', 72000, 5, '29@panchayat.com', '$2b$12$hashedPassword'),
(30, 'Rekha Sharma', 'Female', '1984-05-10', 'Graduate', 68000, 5, '30@panchayat.com', '$2b$12$hashedPassword'),
(31, 'Sandeep Iyer', 'Male', '1977-08-05', 'Post Graduate', 86000, 6, '31@panchayat.com', '$2b$12$hashedPassword'),
(32, 'Kavita Iyer', 'Female', '1981-11-20', 'Post Graduate', 82000, 6, '32@panchayat.com', '$2b$12$hashedPassword'),
-- More Parents
(33, 'Rahul Desai', 'Male', '1976-02-22', 'Graduate', 62000, 7, '33@panchayat.com', '$2b$12$hashedPassword'),
(34, 'Neha Desai', 'Female', '1979-06-14', 'Secondary', 41000, 7, '34@panchayat.com', '$2b$12$hashedPassword'),
-- Children (Age: 1-17, Only Primary or Secondary, Income = 0)
(35, 'Rohan Sharma', 'Male', '2011-06-08', 'Secondary', 0, 5, '35@panchayat.com', '$2b$12$hashedPassword'),
(36, 'Meera Sharma', 'Female', '2014-07-25', 'Primary', 0, 5, '36@panchayat.com', '$2b$12$hashedPassword'),
(37, 'Arjun Iyer', 'Male', '2013-05-18', 'Secondary', 0, 6, '37@panchayat.com', '$2b$12$hashedPassword'),
(38, 'Nisha Iyer', 'Female', '2016-08-30', 'Primary', 0, 6, '38@panchayat.com', '$2b$12$hashedPassword'),
(39, 'Vikrant Desai', 'Male', '2012-02-10', 'Secondary', 0, 7, '39@panchayat.com', '$2b$12$hashedPassword'),
(40, 'Priya Desai', 'Female', '2015-04-22', 'Primary', 0, 7, '40@panchayat.com', '$2b$12$hashedPassword'),
-- More citizens added to make it 200 records with proper constraints...
-- Grandparents (Age: 60-80, Mostly Illiterate or Primary, Some Secondary)
(41, 'Harish Verma', 'Male', '1950-03-12', 'Illiterate', 25000, 9, '41@panchayat.com', '$2b$12$hashedPassword'),
(42, 'Lata Verma', 'Female', '1955-06-15', 'Illiterate', 0, 9, '42@panchayat.com', '$2b$12$hashedPassword'),
(43, 'Rajendra Nair', 'Male', '1948-11-22', 'Primary', 28000, 10, '43@panchayat.com', '$2b$12$hashedPassword'),
(44, 'Meena Nair', 'Female', '1952-01-10', 'Primary', 0, 10, '44@panchayat.com', '$2b$12$hashedPassword'),
(45, 'Kamal Gupta', 'Male', '1947-07-05', 'Secondary', 30000, 11, '45@panchayat.com', '$2b$12$hashedPassword'),
(46, 'Sunita Gupta', 'Female', '1953-10-20', 'Primary', 0, 11, '46@panchayat.com', '$2b$12$hashedPassword'),
-- More Grandparents
(47, 'Vishnu Menon', 'Male', '1951-09-14', 'Illiterate', 20000, 12, '47@panchayat.com', '$2b$12$hashedPassword'),
(48, 'Usha Menon', 'Female', '1956-04-18', 'Primary', 0, 12, '48@panchayat.com', '$2b$12$hashedPassword'),
-- Parents (Age: 30-59, Mostly Secondary, Graduate, or Post Graduate)
(49, 'Amit Verma', 'Male', '1978-02-05', 'Graduate', 70000, 9, '49@panchayat.com', '$2b$12$hashedPassword'),
(50, 'Poonam Verma', 'Female', '1983-07-08', 'Graduate', 65000, 9, '50@panchayat.com', '$2b$12$hashedPassword'),
(51, 'Suresh Nair', 'Male', '1975-09-15', 'Post Graduate', 85000, 10, '51@panchayat.com', '$2b$12$hashedPassword'),
(52, 'Laxmi Nair', 'Female', '1980-12-21', 'Post Graduate', 80000, 10, '52@panchayat.com', '$2b$12$hashedPassword'),
-- More Parents
(53, 'Vikram Gupta', 'Male', '1977-03-12', 'Graduate', 63000, 11, '53@panchayat.com', '$2b$12$hashedPassword'),
(54, 'Anita Gupta', 'Female', '1978-08-25', 'Secondary', 42000, 11, '54@panchayat.com', '$2b$12$hashedPassword'),
-- Children (Age: 1-17, Only Primary or Secondary, Income = 0)
(55, 'Ravi Verma', 'Male', '2010-05-10', 'Secondary', 0, 9, '55@panchayat.com', '$2b$12$hashedPassword'),
(56, 'Sneha Verma', 'Female', '2013-09-28', 'Primary', 0, 9, '56@panchayat.com', '$2b$12$hashedPassword'),
(57, 'Karthik Nair', 'Male', '2012-07-22', 'Secondary', 0, 10, '57@panchayat.com', '$2b$12$hashedPassword'),
(58, 'Deepa Nair', 'Female', '2015-11-15', 'Primary', 0, 10, '58@panchayat.com', '$2b$12$hashedPassword'),
(59, 'Aryan Gupta', 'Male', '2011-02-18', 'Secondary', 0, 11, '59@panchayat.com', '$2b$12$hashedPassword'),
(60, 'Ritika Gupta', 'Female', '2014-06-30', 'Primary', 0, 11, '60@panchayat.com', '$2b$12$hashedPassword'),
-- More citizens added to make it 200 records with proper constraints...
-- Grandparents (Age: 60-80, Mostly Illiterate or Primary, Some Secondary)
(61, 'Shankar Iyer', 'Male', '1949-05-22', 'Illiterate', 27000, 13, '61@panchayat.com', '$2b$12$hashedPassword'),
(62, 'Radha Iyer', 'Female', '1954-09-13', 'Illiterate', 0, 13, '62@panchayat.com', '$2b$12$hashedPassword'),
(63, 'Govind Reddy', 'Male', '1950-12-10', 'Primary', 26000, 14, '63@panchayat.com', '$2b$12$hashedPassword'),
(64, 'Kamala Reddy', 'Female', '1951-02-17', 'Primary', 0, 14, '64@panchayat.com', '$2b$12$hashedPassword'),
(65, 'Brijesh Sharma', 'Male', '1948-08-05', 'Secondary', 31000, 15, '65@panchayat.com', '$2b$12$hashedPassword'),
(66, 'Savita Sharma', 'Female', '1956-11-30', 'Primary', 0, 15, '66@panchayat.com', '$2b$12$hashedPassword'),
-- More Grandparents
(67, 'Mahadev Pillai', 'Male', '1952-07-20', 'Illiterate', 19000, 16, '67@panchayat.com', '$2b$12$hashedPassword'),
(68, 'Leela Pillai', 'Female', '1957-03-25', 'Primary', 0, 16, '68@panchayat.com', '$2b$12$hashedPassword'),
-- Parents (Age: 30-59, Mostly Secondary, Graduate, or Post Graduate)
(69, 'Ramesh Iyer', 'Male', '1979-06-14', 'Graduate', 72000, 13, '69@panchayat.com', '$2b$12$hashedPassword'),
(70, 'Meera Iyer', 'Female', '1982-10-19', 'Graduate', 67000, 13, '70@panchayat.com', '$2b$12$hashedPassword'),
(71, 'Vikram Reddy', 'Male', '1974-08-23', 'Post Graduate', 88000, 14, '71@panchayat.com', '$2b$12$hashedPassword'),
(72, 'Anjali Reddy', 'Female', '1981-11-11', 'Post Graduate', 81000, 14, '72@panchayat.com', '$2b$12$hashedPassword'),
-- More Parents
(73, 'Rajeev Sharma', 'Male', '1976-04-05', 'Graduate', 64000, 15, '73@panchayat.com', '$2b$12$hashedPassword'),
(74, 'Sangeeta Sharma', 'Female', '1977-09-29', 'Secondary', 41000, 15, '74@panchayat.com', '$2b$12$hashedPassword'),
-- Children (Age: 1-17, Only Primary or Secondary, Income = 0)
(75, 'Nikhil Iyer', 'Male', '2011-08-03', 'Secondary', 0, 13, '75@panchayat.com', '$2b$12$hashedPassword'),
(76, 'Riya Iyer', 'Female', '2014-12-12', 'Primary', 0, 13, '76@panchayat.com', '$2b$12$hashedPassword'),
(77, 'Arjun Reddy', 'Male', '2013-06-18', 'Secondary', 0, 14, '77@panchayat.com', '$2b$12$hashedPassword'),
(78, 'Pooja Reddy', 'Female', '2016-10-05', 'Primary', 0, 14, '78@panchayat.com', '$2b$12$hashedPassword'),
(79, 'Varun Sharma', 'Male', '2012-03-15', 'Secondary', 0, 15, '79@panchayat.com', '$2b$12$hashedPassword'),
(80, 'Kavya Sharma', 'Female', '2015-07-27', 'Primary', 0, 15, '80@panchayat.com', '$2b$12$hashedPassword')
-- Grandparents (Age: 60-80, Mostly Illiterate or Primary, Some Secondary)
(81, 'Surya Nair', 'Male', '1950-03-15', 'Illiterate', 25000, 17, '81@panchayat.com', '$2b$12$hashedPassword'),
(82, 'Lakshmi Nair', 'Female', '1955-08-10', 'Illiterate', 0, 17, '82@panchayat.com', '$2b$12$hashedPassword'),
(83, 'Dinesh Verma', 'Male', '1952-11-23', 'Primary', 28000, 18, '83@panchayat.com', '$2b$12$hashedPassword'),
(84, 'Meenakshi Verma', 'Female', '1953-06-05', 'Primary', 0, 18, '84@panchayat.com', '$2b$12$hashedPassword'),
(85, 'Rajinder Chauhan', 'Male', '1949-09-17', 'Secondary', 32000, 19, '85@panchayat.com', '$2b$12$hashedPassword'),
(86, 'Sunita Chauhan', 'Female', '1957-10-21', 'Primary', 0, 19, '86@panchayat.com', '$2b$12$hashedPassword'),
-- More Grandparents
(87, 'Keshav Menon', 'Male', '1951-04-29', 'Illiterate', 21000, 20, '87@panchayat.com', '$2b$12$hashedPassword'),
(88, 'Nalini Menon', 'Female', '1956-12-14', 'Primary', 0, 20, '88@panchayat.com', '$2b$12$hashedPassword'),
-- Parents (Age: 30-59, Mostly Secondary, Graduate, or Post Graduate)
(89, 'Arvind Nair', 'Male', '1980-07-02', 'Graduate', 74000, 17, '89@panchayat.com', '$2b$12$hashedPassword'),
(90, 'Priya Nair', 'Female', '1983-09-25', 'Graduate', 69000, 17, '90@panchayat.com', '$2b$12$hashedPassword'),
(91, 'Sandeep Verma', 'Male', '1975-05-14', 'Post Graduate', 86000, 18, '91@panchayat.com', '$2b$12$hashedPassword'),
(92, 'Divya Verma', 'Female', '1980-08-30', 'Post Graduate', 82000, 18, '92@panchayat.com', '$2b$12$hashedPassword'),
-- More Parents
(93, 'Neeraj Chauhan', 'Male', '1977-01-19', 'Graduate', 65000, 19, '93@panchayat.com', '$2b$12$hashedPassword'),
(94, 'Anita Chauhan', 'Female', '1978-05-23', 'Secondary', 42000, 19, '94@panchayat.com', '$2b$12$hashedPassword'),
-- Children (Age: 1-17, Only Primary or Secondary, Income = 0)
(95, 'Aarav Nair', 'Male', '2010-09-09', 'Secondary', 0, 17, '95@panchayat.com', '$2b$12$hashedPassword'),
(96, 'Ishita Nair', 'Female', '2013-11-11', 'Primary', 0, 17, '96@panchayat.com', '$2b$12$hashedPassword'),
(97, 'Harsh Verma', 'Male', '2012-04-28', 'Secondary', 0, 18, '97@panchayat.com', '$2b$12$hashedPassword'),
(98, 'Sneha Verma', 'Female', '2015-06-17', 'Primary', 0, 18, '98@panchayat.com', '$2b$12$hashedPassword'),
(99, 'Rohan Chauhan', 'Male', '2011-02-14', 'Secondary', 0, 19, '99@panchayat.com', '$2b$12$hashedPassword'),
(100, 'Tanvi Chauhan', 'Female', '2014-07-22', 'Primary', 0, 19, '100@panchayat.com', '$2b$12$hashedPassword');


INSERT INTO births (child_id, mother_id, father_id, date) VALUES
(95, 90, 89, '2010-09-09'),  -- Aarav Nair (Parents: Priya & Arvind)
(96, 90, 89, '2013-11-11'),  -- Ishita Nair

(97, 92, 91, '2012-04-28'), -- Harsh Verma (Parents: Divya & Sandeep)
(98, 92, 91, '2015-06-17'), -- Sneha Verma

(99, 94, 93, '2011-02-14'), -- Rohan Chauhan (Parents: Anita & Neeraj)
(100, 94, 93, '2014-07-22'), -- Tanvi Chauhan

-- Parents Entries (Assign Grandparents)
(89, 82, 81, '1980-07-02'),  -- Arvind Nair (Parents: Lakshmi & Surya)
(91, 84, 83, '1975-05-14'), -- Sandeep Verma (Parents: Meenakshi & Dinesh)
(93, 86, 85, '1977-01-19'), -- Neeraj Chauhan (Parents: Sunita & Rajinder)

(69, 62, 61, '1979-06-14'),
(71, 64, 63, '1974-08-23'),
(73, 66, 65, '1976-04-05'),

(75, 70, 69, '2011-08-03'),
(76, 70, 69, '2014-12-12'),

(77, 72, 71, '2013-06-18'),
(78, 72, 71, '2016-10-05'),

(79, 74, 73, '2012-03-15'),
(80, 74, 73, '2015-07-27'),

(49, 42, 41, '1978-02-05'),
(51, 44, 43, '1975-09-15'),
(53, 46, 45, '1977-03-12'),

(55, 50, 49, '2010-05-10'),
(56, 50, 49, '2013-09-28'),

(57, 52, 51, '2012-07-22'),
(58, 52, 51, '2015-11-15'),

(59, 54, 53, '2011-02-18'),
(60, 54, 53, '2014-06-30'),

(29, 22, 21, '1979-01-18'),
(31, 24, 23, '1977-08-05'),
(33, 26, 25, '1976-02-22'),

(35, 30, 29, '2011-06-08'),
(36, 30, 29, '2014-07-25'),

(37, 32, 31, '2013-05-18'),
(38, 32, 31, '2016-08-30'),

(39, 34, 33, '2012-02-10'),
(40, 34, 33, '2015-04-22'),

(9, 2, 1, '1980-02-25'),
(11, 4, 3, '1978-09-10'),
(13, 6, 5, '1975-03-30'),

(15, 10, 9, '2010-05-12'),
(16, 10, 9, '2015-08-18'),

(17, 12, 11, '2012-04-25'),
(18, 12, 11, '2017-09-11'),

(19, 14, 13, '2011-01-05'),
(20, 14, 13, '2016-03-30');


-- Death Records
INSERT INTO deaths (citizen_id, date, cause) VALUES
(7, '2015-06-12', 'Heart attack'),
(12, '2018-09-24', 'Stroke'),
(25, '2017-12-05', 'Heart attack'),
(32, '2019-08-30', 'Stroke'),
(42, '2022-07-30', 'Covid-19'),
(43, '2018-06-22', 'Stroke'),
(46, '2023-01-10', 'Covid-19'),
(47, '2021-02-14', 'Malaria'),
(63, '2022-04-18', 'Accident'),
(78, '2021-11-27', 'Covid-19'),
(91, '2016-05-09', 'Accident'),
(52, '2021-02-14', 'Malaria'),
(69, '2022-04-18', 'Accident'),
(88, '2021-11-27', 'Covid-19'),
(94, '2016-05-09', 'Malaria');



INSERT INTO marriage_records (husband_id, wife_id, marriage_date) VALUES
(1, 2, '1975-06-20'),
(3, 4, '1978-09-15'),
(5, 6, '1980-12-10'),
(7, 8, '1982-04-05'),

(9, 10, '1977-07-18'),
(11, 12, '1979-11-30'),
(13, 14, '1983-08-22'),


(21, 22, '1969-07-08'),
(23, 24, '1972-01-20'),
(25, 26, '1974-06-28'),
(27, 28, '1976-08-12'),

(29, 30, '1978-12-05'),
(31, 32, '1965-06-18'),
(33, 34, '1968-09-22'),


(41, 42, '1963-06-10'),
(43, 44, '1966-08-25'),
(45, 46, '1968-10-17'),
(47, 48, '1971-05-30'),

(49, 50, '1974-12-02'),
(51, 52, '1975-06-18'),
(53, 54, '1966-09-22'),

(61, 62, '1964-06-10'),
(63, 64, '1962-08-25'),
(65, 66, '1967-10-17'),
(67, 68, '1972-05-30'),

(69, 70, '1976-12-02'),
(71, 72, '1977-06-18'),
(73, 74, '1960-09-22'),


(81, 82, '1962-06-10'),
(83, 84, '1969-08-25'),
(85, 86, '1970-10-17'),
(87, 88, '1974-05-30'),

(89, 90, '1977-12-02'),
(91, 92, '1979-06-18'),
(93, 94, '1961-09-22');


INSERT INTO medical_records (citizen_id, record_date, health_status, medical_condition) VALUES
-- Grandparents (1-8): Critical, Poor, Fair
(1, '2022-03-10', 'Critical', 'Kidney Disease'),
(1, '2023-07-15', 'Poor', 'Diabetes'),
(2, '2021-06-22', 'Fair', 'Hypertension'),
(2, '2024-02-05', 'Critical', 'Liver Disease'),
(3, '2020-11-18', 'Poor', 'Arthritis'),
(3, '2023-09-09', 'Fair', 'Low Blood Pressure'),
(4, '2019-08-14', 'Critical', 'Kidney Disease'),
(4, '2022-05-30', 'Poor', 'Diabetes'),
(5, '2021-12-20', 'Fair', 'Hypertension'),
(5, '2023-03-05', 'Critical', 'Liver Disease'),
(6, '2022-01-10', 'Poor', 'Arthritis'),
(6, '2023-06-18', 'Critical', 'Kidney Disease'),
(7, '2020-09-25', 'Fair', 'Low Blood Pressure'),
(7, '2024-01-12', 'Poor', 'Diabetes'),
(8, '2018-07-30', 'Critical', 'Liver Disease'),
(8, '2023-08-15', 'Fair', 'Hypertension'),

-- Parents (9-14): Poor, Fair, Good
(9, '2019-04-10', 'Fair', 'Low Blood Pressure'),
(9, '2021-10-20', 'Poor', 'Arthritis'),
(9, '2023-03-18', 'Good', 'Asthma'),
(10, '2022-02-15', 'Good', 'Allergies'),
(10, '2023-09-05', 'Fair', 'Hypertension'),
(10, '2024-02-25', 'Poor', 'Diabetes'),
(11, '2020-11-11', 'Fair', 'Low Blood Pressure'),
(11, '2023-07-07', 'Poor', 'Arthritis'),
(11, '2024-01-15', 'Good', 'Asthma'),
(12, '2019-05-18', 'Poor', 'Diabetes'),
(12, '2022-06-25', 'Fair', 'Hypertension'),
(12, '2023-11-09', 'Good', 'Allergies'),
(13, '2021-03-22', 'Good', 'Asthma'),
(13, '2023-11-09', 'Fair', 'Low Blood Pressure'),
(13, '2024-02-10', 'Poor', 'Arthritis'),
(14, '2020-08-30', 'Poor', 'Diabetes'),
(14, '2022-09-14', 'Fair', 'Hypertension'),
(14, '2024-01-28', 'Good', 'Allergies'),

-- Children (15-20): Fair, Good, Excellent
(15, '2023-05-20', 'Excellent', 'Healthy'),
(15, '2024-02-28', 'Fair', 'Hypertension'),
(15, '2022-11-12', 'Good', 'Asthma'),
(16, '2018-12-10', 'Fair', 'Low Blood Pressure'),
(16, '2021-07-18', 'Excellent', 'Healthy'),
(16, '2023-09-15', 'Good', 'Allergies'),
(17, '2019-10-30', 'Good', 'Asthma'),
(17, '2022-03-15', 'Fair', 'Low Blood Pressure'),
(17, '2023-08-20', 'Excellent', 'Healthy'),
(18, '2020-05-25', 'Fair', 'Hypertension'),
(18, '2023-04-05', 'Good', 'Allergies'),
(18, '2024-01-12', 'Excellent', 'Healthy'),
(19, '2021-08-10', 'Excellent', 'Healthy'),
(19, '2023-12-22', 'Fair', 'Low Blood Pressure'),
(19, '2022-05-15', 'Good', 'Asthma'),
(20, '2019-11-05', 'Good', 'Allergies'),
(20, '2022-10-30', 'Fair', 'Hypertension'),
(20, '2023-07-07', 'Excellent', 'Healthy'),

-- Grandparents (21-28): Critical, Poor, Fair
(21, '2021-05-12', 'Critical', 'Liver Disease'),
(21, '2023-08-07', 'Poor', 'Diabetes'),
(22, '2020-10-14', 'Fair', 'Hypertension'),
(22, '2022-12-20', 'Critical', 'Kidney Disease'),
(23, '2019-06-25', 'Poor', 'Arthritis'),
(23, '2023-07-30', 'Fair', 'Low Blood Pressure'),
(24, '2021-09-18', 'Critical', 'Liver Disease'),
(24, '2023-04-10', 'Poor', 'Diabetes'),
(25, '2022-07-12', 'Fair', 'Hypertension'),
(25, '2024-01-08', 'Critical', 'Kidney Disease'),
(26, '2021-02-15', 'Poor', 'Arthritis'),
(26, '2023-09-22', 'Critical', 'Liver Disease'),
(27, '2020-05-10', 'Fair', 'Low Blood Pressure'),
(27, '2022-11-15', 'Poor', 'Diabetes'),
(28, '2019-08-30', 'Critical', 'Kidney Disease'),
(28, '2023-06-18', 'Fair', 'Hypertension'),

-- Parents (29-34): Poor, Fair, Good
(29, '2019-12-20', 'Fair', 'Low Blood Pressure'),
(29, '2021-06-25', 'Poor', 'Arthritis'),
(29, '2023-09-15', 'Good', 'Asthma'),
(30, '2022-03-10', 'Good', 'Allergies'),
(30, '2023-10-05', 'Fair', 'Hypertension'),
(30, '2024-02-12', 'Poor', 'Diabetes'),
(31, '2020-11-22', 'Fair', 'Low Blood Pressure'),
(31, '2023-07-05', 'Poor', 'Arthritis'),
(31, '2024-01-30', 'Good', 'Asthma'),
(32, '2019-04-18', 'Poor', 'Diabetes'),
(32, '2022-05-22', 'Fair', 'Hypertension'),
(32, '2023-10-08', 'Good', 'Allergies'),
(33, '2021-02-14', 'Good', 'Asthma'),
(33, '2023-08-12', 'Fair', 'Low Blood Pressure'),
(33, '2024-01-20', 'Poor', 'Arthritis'),
(34, '2020-09-28', 'Poor', 'Diabetes'),
(34, '2022-07-19', 'Fair', 'Hypertension'),
(34, '2024-02-05', 'Good', 'Allergies'),

-- Children (35-40): Fair, Good, Excellent
(35, '2023-04-18', 'Excellent', 'Healthy'),
(35, '2024-02-01', 'Fair', 'Hypertension'),
(35, '2022-10-05', 'Good', 'Asthma'),
(36, '2018-11-14', 'Fair', 'Low Blood Pressure'),
(36, '2021-08-25', 'Excellent', 'Healthy'),
(36, '2023-06-15', 'Good', 'Allergies'),
(37, '2019-12-30', 'Good', 'Asthma'),
(37, '2022-03-22', 'Fair', 'Low Blood Pressure'),
(37, '2023-07-30', 'Excellent', 'Healthy'),
(38, '2020-06-05', 'Fair', 'Hypertension'),
(38, '2023-05-08', 'Good', 'Allergies'),
(38, '2024-01-20', 'Excellent', 'Healthy'),
(39, '2021-07-14', 'Excellent', 'Healthy'),
(39, '2023-11-30', 'Fair', 'Low Blood Pressure'),
(39, '2022-04-25', 'Good', 'Asthma'),
(40, '2019-09-12', 'Good', 'Allergies'),
(40, '2022-12-10', 'Fair', 'Hypertension'),
(40, '2023-06-22', 'Excellent', 'Healthy'),

-- Grandparents (41-48): Critical, Poor, Fair
(41, '2021-06-15', 'Critical', 'Kidney Disease'),
(41, '2023-09-10', 'Poor', 'Diabetes'),
(42, '2020-12-22', 'Fair', 'Hypertension'),
(42, '2022-11-08', 'Critical', 'Liver Disease'),
(43, '2019-07-10', 'Poor', 'Arthritis'),
(43, '2023-05-17', 'Fair', 'Low Blood Pressure'),
(44, '2021-03-27', 'Critical', 'Kidney Disease'),
(44, '2023-08-12', 'Poor', 'Diabetes'),
(45, '2022-04-30', 'Fair', 'Hypertension'),
(45, '2024-01-11', 'Critical', 'Liver Disease'),
(46, '2021-01-20', 'Poor', 'Arthritis'),
(46, '2023-10-28', 'Critical', 'Kidney Disease'),
(47, '2020-09-05', 'Fair', 'Low Blood Pressure'),
(47, '2022-10-15', 'Poor', 'Diabetes'),
(48, '2019-11-18', 'Critical', 'Liver Disease'),
(48, '2023-07-23', 'Fair', 'Hypertension'),

-- Parents (49-54): Poor, Fair, Good
(49, '2019-08-14', 'Fair', 'Low Blood Pressure'),
(49, '2021-09-28', 'Poor', 'Arthritis'),
(49, '2023-11-10', 'Good', 'Asthma'),
(50, '2022-01-19', 'Good', 'Allergies'),
(50, '2023-12-08', 'Fair', 'Hypertension'),
(50, '2024-02-17', 'Poor', 'Diabetes'),
(51, '2020-05-24', 'Fair', 'Low Blood Pressure'),
(51, '2023-06-12', 'Poor', 'Arthritis'),
(51, '2024-01-15', 'Good', 'Asthma'),
(52, '2019-03-08', 'Poor', 'Diabetes'),
(52, '2022-07-05', 'Fair', 'Hypertension'),
(52, '2023-09-25', 'Good', 'Allergies'),
(53, '2021-04-22', 'Good', 'Asthma'),
(53, '2023-10-19', 'Fair', 'Low Blood Pressure'),
(53, '2024-01-05', 'Poor', 'Arthritis'),
(54, '2020-08-29', 'Poor', 'Diabetes'),
(54, '2022-11-14', 'Fair', 'Hypertension'),
(54, '2024-02-21', 'Good', 'Allergies'),

-- Children (55-60): Fair, Good, Excellent
(55, '2023-06-30', 'Excellent', 'Healthy'),
(55, '2024-01-05', 'Fair', 'Hypertension'),
(55, '2022-09-12', 'Good', 'Asthma'),
(56, '2018-10-11', 'Fair', 'Low Blood Pressure'),
(56, '2021-07-14', 'Excellent', 'Healthy'),
(56, '2023-05-21', 'Good', 'Allergies'),
(57, '2019-11-28', 'Good', 'Asthma'),
(57, '2022-02-10', 'Fair', 'Low Blood Pressure'),
(57, '2023-08-19', 'Excellent', 'Healthy'),
(58, '2020-05-22', 'Fair', 'Hypertension'),
(58, '2023-04-07', 'Good', 'Allergies'),
(58, '2024-01-10', 'Excellent', 'Healthy'),
(59, '2021-08-25', 'Excellent', 'Healthy'),
(59, '2023-12-01', 'Fair', 'Low Blood Pressure'),
(59, '2022-03-30', 'Good', 'Asthma'),
(60, '2019-09-20', 'Good', 'Allergies'),
(60, '2022-11-18', 'Fair', 'Hypertension'),
(60, '2023-07-05', 'Excellent', 'Healthy'),

-- Grandparents (61-68): Critical, Poor, Fair
(61, '2018-06-12', 'Critical', 'Kidney Disease'),
(61, '2021-08-25', 'Poor', 'Diabetes'),
(62, '2020-09-10', 'Fair', 'Hypertension'),
(62, '2022-12-05', 'Critical', 'Liver Disease'),
(63, '2019-05-18', 'Poor', 'Arthritis'),
(63, '2023-04-11', 'Fair', 'Low Blood Pressure'),
(64, '2021-02-22', 'Critical', 'Kidney Disease'),
(64, '2023-09-07', 'Poor', 'Diabetes'),
(65, '2022-06-15', 'Fair', 'Hypertension'),
(65, '2024-01-10', 'Critical', 'Liver Disease'),
(66, '2021-03-09', 'Poor', 'Arthritis'),
(66, '2023-08-28', 'Critical', 'Kidney Disease'),
(67, '2020-11-06', 'Fair', 'Low Blood Pressure'),
(67, '2022-10-12', 'Poor', 'Diabetes'),
(68, '2019-12-19', 'Critical', 'Liver Disease'),
(68, '2023-06-21', 'Fair', 'Hypertension'),

-- Parents (69-74): Poor, Fair, Good
(69, '2019-07-10', 'Fair', 'Low Blood Pressure'),
(69, '2021-10-05', 'Poor', 'Arthritis'),
(69, '2023-12-18', 'Good', 'Asthma'),
(70, '2022-02-14', 'Good', 'Allergies'),
(70, '2023-11-10', 'Fair', 'Hypertension'),
(70, '2024-01-20', 'Poor', 'Diabetes'),
(71, '2020-06-19', 'Fair', 'Low Blood Pressure'),
(71, '2023-07-15', 'Poor', 'Arthritis'),
(71, '2024-02-08', 'Good', 'Asthma'),
(72, '2019-04-12', 'Poor', 'Diabetes'),
(72, '2022-08-21', 'Fair', 'Hypertension'),
(72, '2023-10-30', 'Good', 'Allergies'),
(73, '2021-05-27', 'Good', 'Asthma'),
(73, '2023-09-17', 'Fair', 'Low Blood Pressure'),
(73, '2024-01-03', 'Poor', 'Arthritis'),
(74, '2020-10-02', 'Poor', 'Diabetes'),
(74, '2022-12-19', 'Fair', 'Hypertension'),
(74, '2024-02-15', 'Good', 'Allergies'),

-- Children (75-80): Fair, Good, Excellent
(75, '2023-05-12', 'Excellent', 'Healthy'),
(75, '2024-01-22', 'Fair', 'Hypertension'),
(75, '2022-07-10', 'Good', 'Asthma'),
(76, '2018-11-08', 'Fair', 'Low Blood Pressure'),
(76, '2021-06-25', 'Excellent', 'Healthy'),
(76, '2023-04-19', 'Good', 'Allergies'),
(77, '2019-10-30', 'Good', 'Asthma'),
(77, '2022-03-14', 'Fair', 'Low Blood Pressure'),
(77, '2023-09-25', 'Excellent', 'Healthy'),
(78, '2020-07-05', 'Fair', 'Hypertension'),
(78, '2023-05-12', 'Good', 'Allergies'),
(78, '2024-02-14', 'Excellent', 'Healthy'),
(79, '2021-09-20', 'Excellent', 'Healthy'),
(79, '2023-11-07', 'Fair', 'Low Blood Pressure'),
(79, '2022-04-22', 'Good', 'Asthma'),
(80, '2019-08-15', 'Good', 'Allergies'),
(80, '2022-10-21', 'Fair', 'Hypertension'),
(80, '2023-06-30', 'Excellent', 'Healthy'),

-- Grandparents (81-88): Critical, Poor, Fair
(81, '2019-06-10', 'Critical', 'Kidney Disease'),
(81, '2021-09-15', 'Poor', 'Diabetes'),
(82, '2020-11-08', 'Fair', 'Hypertension'),
(82, '2023-01-22', 'Critical', 'Liver Disease'),
(83, '2019-07-18', 'Poor', 'Arthritis'),
(83, '2023-05-11', 'Fair', 'Low Blood Pressure'),
(84, '2021-03-20', 'Critical', 'Kidney Disease'),
(84, '2023-09-10', 'Poor', 'Diabetes'),
(85, '2022-07-16', 'Fair', 'Hypertension'),
(85, '2024-02-01', 'Critical', 'Liver Disease'),
(86, '2021-02-07', 'Poor', 'Arthritis'),
(86, '2023-10-20', 'Critical', 'Kidney Disease'),
(87, '2020-12-05', 'Fair', 'Low Blood Pressure'),
(87, '2022-11-14', 'Poor', 'Diabetes'),
(88, '2019-08-25', 'Critical', 'Liver Disease'),
(88, '2023-07-22', 'Fair', 'Hypertension'),

-- Parents (89-94): Poor, Fair, Good
(89, '2019-09-10', 'Fair', 'Low Blood Pressure'),
(89, '2021-11-12', 'Poor', 'Arthritis'),
(89, '2023-12-28', 'Good', 'Asthma'),
(90, '2022-04-18', 'Good', 'Allergies'),
(90, '2023-11-15', 'Fair', 'Hypertension'),
(90, '2024-01-28', 'Poor', 'Diabetes'),
(91, '2020-07-24', 'Fair', 'Low Blood Pressure'),
(91, '2023-09-11', 'Poor', 'Arthritis'),
(91, '2024-02-15', 'Good', 'Asthma'),
(92, '2019-06-20', 'Poor', 'Diabetes'),
(92, '2022-10-18', 'Fair', 'Hypertension'),
(92, '2023-12-10', 'Good', 'Allergies'),
(93, '2021-05-12', 'Good', 'Asthma'),
(93, '2023-08-14', 'Fair', 'Low Blood Pressure'),
(93, '2024-01-08', 'Poor', 'Arthritis'),
(94, '2020-12-10', 'Poor', 'Diabetes'),
(94, '2022-11-22', 'Fair', 'Hypertension'),
(94, '2024-02-10', 'Good', 'Allergies'),

-- Children (95-100): Fair, Good, Excellent
(95, '2023-06-14', 'Excellent', 'Healthy'),
(95, '2024-01-30', 'Fair', 'Hypertension'),
(95, '2022-08-12', 'Good', 'Asthma'),
(96, '2019-12-05', 'Fair', 'Low Blood Pressure'),
(96, '2021-08-15', 'Excellent', 'Healthy'),
(96, '2023-06-10', 'Good', 'Allergies'),
(97, '2020-11-18', 'Good', 'Asthma'),
(97, '2022-05-09', 'Fair', 'Low Blood Pressure'),
(97, '2023-12-18', 'Excellent', 'Healthy'),
(98, '2021-09-10', 'Fair', 'Hypertension'),
(98, '2023-07-15', 'Good', 'Allergies'),
(98, '2024-02-28', 'Excellent', 'Healthy'),
(99, '2022-02-25', 'Excellent', 'Healthy'),
(99, '2023-11-20', 'Fair', 'Low Blood Pressure'),
(99, '2022-07-08', 'Good', 'Asthma'),
(100, '2020-10-14', 'Good', 'Allergies'),
(100, '2022-12-28', 'Fair', 'Hypertension'),
(100, '2023-08-10', 'Excellent', 'Healthy');



-- Rajesh Sharma (Income: 20000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(1, 2024, 'Income Tax', 80000, 'Paid'),
(1, 2023, 'Property Tax', 75000, 'Pending'),
(1, 2022, 'Water Tax', 82000, 'Paid'),
(1, 2021, 'Utility Tax', 78000, 'Paid'),
(1, 2020, 'Road Tax', 77000, 'Pending');

-- Harish Patel (Income: 25000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(3, 2024, 'Income Tax', 100000, 'Paid'),
(3, 2023, 'Property Tax', 95000, 'Pending'),
(3, 2022, 'Water Tax', 102000, 'Paid'),
(3, 2021, 'Utility Tax', 98000, 'Pending'),
(3, 2020, 'Road Tax', 97000, 'Paid');

-- Surendra Iyer (Income: 30000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(5, 2024, 'Income Tax', 120000, 'Paid'),
(5, 2023, 'Property Tax', 115000, 'Pending'),
(5, 2022, 'Water Tax', 122000, 'Paid'),
(5, 2021, 'Utility Tax', 118000, 'Pending'),
(5, 2020, 'Road Tax', 117000, 'Paid');

-- Gopal Verma (Income: 18000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(7, 2024, 'Income Tax', 72000, 'Paid'),
(7, 2023, 'Property Tax', 67000, 'Pending'),
(7, 2022, 'Water Tax', 74000, 'Paid'),
(7, 2021, 'Utility Tax', 68000, 'Pending'),
(7, 2020, 'Road Tax', 69000, 'Paid');

-- Amit Sharma (Income: 70000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(9, 2024, 'Income Tax', 280000, 'Paid'),
(9, 2023, 'Property Tax', 275000, 'Pending'),
(9, 2022, 'Water Tax', 282000, 'Paid'),
(9, 2021, 'Utility Tax', 278000, 'Paid'),
(9, 2020, 'Road Tax', 277000, 'Pending');

-- Pooja Sharma (Income: 65000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(10, 2024, 'Income Tax', 260000, 'Paid'),
(10, 2023, 'Property Tax', 255000, 'Pending'),
(10, 2022, 'Water Tax', 262000, 'Paid'),
(10, 2021, 'Utility Tax', 258000, 'Pending'),
(10, 2020, 'Road Tax', 257000, 'Paid');

-- Vikram Patel (Income: 85000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(11, 2024, 'Income Tax', 340000, 'Paid'),
(11, 2023, 'Property Tax', 335000, 'Pending'),
(11, 2022, 'Water Tax', 342000, 'Paid'),
(11, 2021, 'Utility Tax', 338000, 'Paid'),
(11, 2020, 'Road Tax', 337000, 'Pending');

-- Anjali Patel (Income: 80000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(12, 2024, 'Income Tax', 320000, 'Paid'),
(12, 2023, 'Property Tax', 315000, 'Pending'),
(12, 2022, 'Water Tax', 322000, 'Paid'),
(12, 2021, 'Utility Tax', 318000, 'Pending'),
(12, 2020, 'Road Tax', 317000, 'Paid');

-- Ravi Iyer (Income: 60000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(13, 2024, 'Income Tax', 240000, 'Paid'),
(13, 2023, 'Property Tax', 235000, 'Pending'),
(13, 2022, 'Water Tax', 242000, 'Paid'),
(13, 2021, 'Utility Tax', 238000, 'Pending'),
(13, 2020, 'Road Tax', 237000, 'Paid');

-- Sunita Iyer (Income: 40000)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(14, 2024, 'Income Tax', 160000, 'Paid'),
(14, 2023, 'Property Tax', 155000, 'Pending'),
(14, 2022, 'Water Tax', 162000, 'Paid'),
(14, 2021, 'Utility Tax', 158000, 'Pending'),
(14, 2020, 'Road Tax', 157000, 'Paid');

-- Taxes for Citizens (21-40)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(21, 2024, 'Income Tax', 88000, 'Paid'),
(21, 2023, 'Property Tax', 87000, 'Pending'),
(21, 2022, 'Road Tax', 86000, 'Paid'),
(21, 2021, 'Water Tax', 85500, 'Pending'),
(21, 2020, 'Utility Tax', 85000, 'Paid'),

(23, 2024, 'Income Tax', 108000, 'Paid'),
(23, 2023, 'Property Tax', 107000, 'Pending'),
(23, 2022, 'Road Tax', 106500, 'Paid'),
(23, 2021, 'Water Tax', 105500, 'Pending'),
(23, 2020, 'Utility Tax', 104000, 'Paid'),

(25, 2024, 'Income Tax', 116000, 'Paid'),
(25, 2023, 'Property Tax', 115000, 'Pending'),
(25, 2022, 'Road Tax', 114500, 'Paid'),
(25, 2021, 'Water Tax', 113500, 'Pending'),
(25, 2020, 'Utility Tax', 112000, 'Paid'),

(27, 2024, 'Income Tax', 76000, 'Paid'),
(27, 2023, 'Property Tax', 75000, 'Pending'),
(27, 2022, 'Road Tax', 74000, 'Paid'),
(27, 2021, 'Water Tax', 73500, 'Pending'),
(27, 2020, 'Utility Tax', 73000, 'Paid'),

(29, 2024, 'Income Tax', 288000, 'Paid'),
(29, 2023, 'Property Tax', 287000, 'Pending'),
(29, 2022, 'Road Tax', 285000, 'Paid'),
(29, 2021, 'Water Tax', 283500, 'Pending'),
(29, 2020, 'Utility Tax', 280000, 'Paid'),

(30, 2024, 'Income Tax', 272000, 'Paid'),
(30, 2023, 'Property Tax', 271000, 'Pending'),
(30, 2022, 'Road Tax', 269000, 'Paid'),
(30, 2021, 'Water Tax', 267500, 'Pending'),
(30, 2020, 'Utility Tax', 264000, 'Paid'),

(31, 2024, 'Income Tax', 344000, 'Paid'),
(31, 2023, 'Property Tax', 343000, 'Pending'),
(31, 2022, 'Road Tax', 341000, 'Paid'),
(31, 2021, 'Water Tax', 339500, 'Pending'),
(31, 2020, 'Utility Tax', 336000, 'Paid'),

(32, 2024, 'Income Tax', 328000, 'Paid'),
(32, 2023, 'Property Tax', 327000, 'Pending'),
(32, 2022, 'Road Tax', 325000, 'Paid'),
(32, 2021, 'Water Tax', 323500, 'Pending'),
(32, 2020, 'Utility Tax', 320000, 'Paid'),

(33, 2024, 'Income Tax', 248000, 'Paid'),
(33, 2023, 'Property Tax', 247000, 'Pending'),
(33, 2022, 'Road Tax', 245000, 'Paid'),
(33, 2021, 'Water Tax', 243500, 'Pending'),
(33, 2020, 'Utility Tax', 240000, 'Paid'),

(34, 2024, 'Income Tax', 164000, 'Paid'),
(34, 2023, 'Property Tax', 163000, 'Pending'),
(34, 2022, 'Road Tax', 161000, 'Paid'),
(34, 2021, 'Water Tax', 159500, 'Pending'),
(34, 2020, 'Utility Tax', 156000, 'Paid');

-- Taxes for Citizens (41-60)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(41, 2024, 'Income Tax', 100000, 'Paid'),
(41, 2023, 'Property Tax', 99000, 'Pending'),
(41, 2022, 'Road Tax', 98000, 'Paid'),
(41, 2021, 'Water Tax', 97000, 'Pending'),
(41, 2020, 'Utility Tax', 96000, 'Paid'),

(43, 2024, 'Income Tax', 112000, 'Paid'),
(43, 2023, 'Property Tax', 111000, 'Pending'),
(43, 2022, 'Road Tax', 110000, 'Paid'),
(43, 2021, 'Water Tax', 109000, 'Pending'),
(43, 2020, 'Utility Tax', 108000, 'Paid'),

(45, 2024, 'Income Tax', 120000, 'Paid'),
(45, 2023, 'Property Tax', 119000, 'Pending'),
(45, 2022, 'Road Tax', 118000, 'Paid'),
(45, 2021, 'Water Tax', 117000, 'Pending'),
(45, 2020, 'Utility Tax', 116000, 'Paid'),

(47, 2024, 'Income Tax', 80000, 'Paid'),
(47, 2023, 'Property Tax', 79000, 'Pending'),
(47, 2022, 'Road Tax', 78000, 'Paid'),
(47, 2021, 'Water Tax', 77000, 'Pending'),
(47, 2020, 'Utility Tax', 76000, 'Paid'),

(49, 2024, 'Income Tax', 280000, 'Paid'),
(49, 2023, 'Property Tax', 278000, 'Pending'),
(49, 2022, 'Road Tax', 276000, 'Paid'),
(49, 2021, 'Water Tax', 274000, 'Pending'),
(49, 2020, 'Utility Tax', 272000, 'Paid'),

(50, 2024, 'Income Tax', 260000, 'Paid'),
(50, 2023, 'Property Tax', 258000, 'Pending'),
(50, 2022, 'Road Tax', 256000, 'Paid'),
(50, 2021, 'Water Tax', 254000, 'Pending'),
(50, 2020, 'Utility Tax', 252000, 'Paid'),

(51, 2024, 'Income Tax', 340000, 'Paid'),
(51, 2023, 'Property Tax', 338000, 'Pending'),
(51, 2022, 'Road Tax', 336000, 'Paid'),
(51, 2021, 'Water Tax', 334000, 'Pending'),
(51, 2020, 'Utility Tax', 332000, 'Paid'),

(52, 2024, 'Income Tax', 320000, 'Paid'),
(52, 2023, 'Property Tax', 318000, 'Pending'),
(52, 2022, 'Road Tax', 316000, 'Paid'),
(52, 2021, 'Water Tax', 314000, 'Pending'),
(52, 2020, 'Utility Tax', 312000, 'Paid'),

(53, 2024, 'Income Tax', 252000, 'Paid'),
(53, 2023, 'Property Tax', 250000, 'Pending'),
(53, 2022, 'Road Tax', 248000, 'Paid'),
(53, 2021, 'Water Tax', 246000, 'Pending'),
(53, 2020, 'Utility Tax', 244000, 'Paid'),

(54, 2024, 'Income Tax', 168000, 'Paid'),
(54, 2023, 'Property Tax', 166000, 'Pending'),
(54, 2022, 'Road Tax', 164000, 'Paid'),
(54, 2021, 'Water Tax', 162000, 'Pending'),
(54, 2020, 'Utility Tax', 160000, 'Paid');

-- Taxes for Citizens (61-80)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(61, 2024, 'Income Tax', 108000, 'Paid'),
(61, 2023, 'Property Tax', 107000, 'Pending'),
(61, 2022, 'Road Tax', 106000, 'Paid'),
(61, 2021, 'Water Tax', 105000, 'Pending'),
(61, 2020, 'Utility Tax', 104000, 'Paid'),

(63, 2024, 'Income Tax', 104000, 'Paid'),
(63, 2023, 'Property Tax', 103000, 'Pending'),
(63, 2022, 'Road Tax', 102000, 'Paid'),
(63, 2021, 'Water Tax', 101000, 'Pending'),
(63, 2020, 'Utility Tax', 100000, 'Paid'),

(65, 2024, 'Income Tax', 124000, 'Paid'),
(65, 2023, 'Property Tax', 123000, 'Pending'),
(65, 2022, 'Road Tax', 122000, 'Paid'),
(65, 2021, 'Water Tax', 121000, 'Pending'),
(65, 2020, 'Utility Tax', 120000, 'Paid'),

(67, 2024, 'Income Tax', 76000, 'Paid'),
(67, 2023, 'Property Tax', 75000, 'Pending'),
(67, 2022, 'Road Tax', 74000, 'Paid'),
(67, 2021, 'Water Tax', 73500, 'Pending'),
(67, 2020, 'Utility Tax', 73000, 'Paid'),

(69, 2024, 'Income Tax', 288000, 'Paid'),
(69, 2023, 'Property Tax', 287000, 'Pending'),
(69, 2022, 'Road Tax', 285000, 'Paid'),
(69, 2021, 'Water Tax', 283500, 'Pending'),
(69, 2020, 'Utility Tax', 280000, 'Paid'),

(70, 2024, 'Income Tax', 268000, 'Paid'),
(70, 2023, 'Property Tax', 267000, 'Pending'),
(70, 2022, 'Road Tax', 265000, 'Paid'),
(70, 2021, 'Water Tax', 263500, 'Pending'),
(70, 2020, 'Utility Tax', 260000, 'Paid'),

(71, 2024, 'Income Tax', 352000, 'Paid'),
(71, 2023, 'Property Tax', 351000, 'Pending'),
(71, 2022, 'Road Tax', 349000, 'Paid'),
(71, 2021, 'Water Tax', 347500, 'Pending'),
(71, 2020, 'Utility Tax', 344000, 'Paid'),

(72, 2024, 'Income Tax', 324000, 'Paid'),
(72, 2023, 'Property Tax', 323000, 'Pending'),
(72, 2022, 'Road Tax', 321000, 'Paid'),
(72, 2021, 'Water Tax', 319500, 'Pending'),
(72, 2020, 'Utility Tax', 316000, 'Paid'),

(73, 2024, 'Income Tax', 256000, 'Paid'),
(73, 2023, 'Property Tax', 255000, 'Pending'),
(73, 2022, 'Road Tax', 253000, 'Paid'),
(73, 2021, 'Water Tax', 251500, 'Pending'),
(73, 2020, 'Utility Tax', 248000, 'Paid'),

(74, 2024, 'Income Tax', 164000, 'Paid'),
(74, 2023, 'Property Tax', 163000, 'Pending'),
(74, 2022, 'Road Tax', 161000, 'Paid'),
(74, 2021, 'Water Tax', 159500, 'Pending'),
(74, 2020, 'Utility Tax', 156000, 'Paid');


-- Taxes for Citizens (81-100)
INSERT INTO taxes (citizen_id, tax_year, tax_type, amount, payment_status) VALUES
(81, 2024, 'Income Tax', 100000, 'Paid'),
(81, 2023, 'Property Tax', 99000, 'Pending'),
(81, 2022, 'Road Tax', 98000, 'Paid'),
(81, 2021, 'Water Tax', 97000, 'Pending'),
(81, 2020, 'Utility Tax', 96000, 'Paid'),

(83, 2024, 'Income Tax', 112000, 'Paid'),
(83, 2023, 'Property Tax', 111000, 'Pending'),
(83, 2022, 'Road Tax', 110000, 'Paid'),
(83, 2021, 'Water Tax', 109000, 'Pending'),
(83, 2020, 'Utility Tax', 108000, 'Paid'),

(85, 2024, 'Income Tax', 128000, 'Paid'),
(85, 2023, 'Property Tax', 127000, 'Pending'),
(85, 2022, 'Road Tax', 126000, 'Paid'),
(85, 2021, 'Water Tax', 125000, 'Pending'),
(85, 2020, 'Utility Tax', 124000, 'Paid'),

(87, 2024, 'Income Tax', 84000, 'Paid'),
(87, 2023, 'Property Tax', 83000, 'Pending'),
(87, 2022, 'Road Tax', 82000, 'Paid'),
(87, 2021, 'Water Tax', 81000, 'Pending'),
(87, 2020, 'Utility Tax', 80000, 'Paid'),

(89, 2024, 'Income Tax', 296000, 'Paid'),
(89, 2023, 'Property Tax', 295000, 'Pending'),
(89, 2022, 'Road Tax', 293000, 'Paid'),
(89, 2021, 'Water Tax', 291500, 'Pending'),
(89, 2020, 'Utility Tax', 288000, 'Paid'),

(90, 2024, 'Income Tax', 276000, 'Paid'),
(90, 2023, 'Property Tax', 275000, 'Pending'),
(90, 2022, 'Road Tax', 273000, 'Paid'),
(90, 2021, 'Water Tax', 271500, 'Pending'),
(90, 2020, 'Utility Tax', 268000, 'Paid'),

(91, 2024, 'Income Tax', 344000, 'Paid'),
(91, 2023, 'Property Tax', 343000, 'Pending'),
(91, 2022, 'Road Tax', 341000, 'Paid'),
(91, 2021, 'Water Tax', 339500, 'Pending'),
(91, 2020, 'Utility Tax', 336000, 'Paid'),

(92, 2024, 'Income Tax', 328000, 'Paid'),
(92, 2023, 'Property Tax', 327000, 'Pending'),
(92, 2022, 'Road Tax', 325000, 'Paid'),
(92, 2021, 'Water Tax', 323500, 'Pending'),
(92, 2020, 'Utility Tax', 320000, 'Paid'),

(93, 2024, 'Income Tax', 260000, 'Paid'),
(93, 2023, 'Property Tax', 259000, 'Pending'),
(93, 2022, 'Road Tax', 257000, 'Paid'),
(93, 2021, 'Water Tax', 255500, 'Pending'),
(93, 2020, 'Utility Tax', 252000, 'Paid'),

(94, 2024, 'Income Tax', 168000, 'Paid'),
(94, 2023, 'Property Tax', 167000, 'Pending'),
(94, 2022, 'Road Tax', 165000, 'Paid'),
(94, 2021, 'Water Tax', 163500, 'Pending'),
(94, 2020, 'Utility Tax', 160000, 'Paid');


-- Panchayat Employees (Random Selection)
INSERT INTO panchayat_employees (citizen_id, role) VALUES
(5, 'Secretary'),
(12, 'Engineer'),
(9, 'Treasurer');
-- Panchayat Employees (Random Selection)

-- From 21-40
INSERT INTO panchayat_employees (citizen_id, role) VALUES
(25, 'Accountant'),
(33, 'Clerk'),
(27, 'Member');

-- From 41-60
INSERT INTO panchayat_employees (citizen_id, role) VALUES
(45, 'Engineer'),
(52, 'Secretary'),
(50, 'Treasurer');

-- From 61-80
INSERT INTO panchayat_employees (citizen_id, role) VALUES
(65, 'Clerk'),
(71, 'Member'),
(69, 'Accountant');

-- From 81-100
INSERT INTO panchayat_employees (citizen_id, role) VALUES
(85, 'Secretary'),
(92, 'Engineer'),
(89, 'Treasurer');


-- Vaccination Records

INSERT INTO vaccination (citizen_id, type, date_administered) VALUES
(1, 'Covid-19', '2021-06-15'),
(2, 'Polio', '2020-12-03'),
(3, 'HepatitisA', '2019-09-22'),
(4, 'Flu', '2023-02-14'),
(5, 'Mumps', '2022-08-30'),
(6, 'Covid-19', '2021-04-25'),
(7, 'Small Pox', '2019-11-10'),
(8, 'HepatitisB', '2022-06-18'),
(9, 'Rubella', '2020-07-05'),
(10, 'Flu', '2023-01-12'),
(11, 'Covid-19', '2021-05-20'),
(12, 'Mumps', '2023-03-08'),
(13, 'HepatitisA', '2020-09-29'),
(14, 'Polio', '2021-11-04'),
(15, 'HepatitisB', '2022-12-15'),
(16, 'Rubella', '2023-06-01'),
(17, 'Small Pox', '2019-10-25'),
(18, 'Flu', '2021-02-17'),
(19, 'Covid-19', '2020-05-11'),
(20, 'Mumps', '2023-07-09');

-- Vaccination Records for Citizens 21-100

INSERT INTO vaccination (citizen_id, type, date_administered) VALUES
(21, 'HepatitisA', '2021-07-15'),
(22, 'Flu', '2020-10-10'),
(23, 'Covid-19', '2021-05-23'),
(24, 'Mumps', '2022-09-19'),
(25, 'Small Pox', '2019-12-05'),
(26, 'Rubella', '2023-01-30'),
(27, 'HepatitisB', '2020-08-25'),
(28, 'Polio', '2022-04-12'),
(29, 'Flu', '2023-02-11'),
(30, 'Covid-19', '2021-03-14'),
(31, 'HepatitisA', '2019-06-27'),
(32, 'Mumps', '2020-11-18'),
(33, 'Small Pox', '2021-09-07'),
(34, 'Covid-19', '2021-12-09'),
(35, 'Polio', '2019-10-21'),
(36, 'Flu', '2023-05-26'),
(37, 'HepatitisB', '2020-07-13'),
(38, 'Rubella', '2022-08-02'),
(39, 'Mumps', '2021-06-04'),
(40, 'Small Pox', '2019-09-15'),
(41, 'Flu', '2023-02-28'),
(42, 'Covid-19', '2021-05-18'),
(43, 'Polio', '2020-10-20'),
(44, 'HepatitisA', '2019-07-12'),
(45, 'Rubella', '2022-12-31'),
(46, 'HepatitisB', '2020-11-14'),
(47, 'Small Pox', '2019-05-20'),
(48, 'Mumps', '2023-06-09'),
(49, 'Flu', '2021-04-25'),
(50, 'Covid-19', '2020-06-30'),
(51, 'Rubella', '2023-07-01'),
(52, 'HepatitisA', '2022-05-21'),
(53, 'Polio', '2019-11-27'),
(54, 'Flu', '2020-08-15'),
(55, 'Small Pox', '2021-09-29'),
(56, 'HepatitisB', '2022-07-12'),
(57, 'Mumps', '2020-12-03'),
(58, 'Covid-19', '2021-03-08'),
(59, 'HepatitisA', '2023-06-14'),
(60, 'Polio', '2019-05-23'),
(61, 'Rubella', '2022-09-25'),
(62, 'Small Pox', '2021-10-31'),
(63, 'HepatitisB', '2020-07-16'),
(64, 'Flu', '2023-04-02'),
(65, 'Covid-19', '2021-08-19'),
(66, 'Mumps', '2019-11-30'),
(67, 'Polio', '2020-06-15'),
(68, 'Rubella', '2022-05-12'),
(69, 'Small Pox', '2023-07-05'),
(70, 'Flu', '2021-04-11'),
(71, 'Covid-19', '2020-09-22'),
(72, 'HepatitisB', '2019-08-29'),
(73, 'Polio', '2022-11-20'),
(74, 'Rubella', '2020-12-08'),
(75, 'Small Pox', '2021-07-27'),
(76, 'HepatitisA', '2023-06-06'),
(77, 'Flu', '2020-05-17'),
(78, 'Covid-19', '2021-03-29'),
(79, 'Mumps', '2019-10-09'),
(80, 'Polio', '2022-08-16'),
(81, 'Rubella', '2023-05-31'),
(82, 'Small Pox', '2019-06-04'),
(83, 'HepatitisB', '2022-10-22'),
(84, 'Flu', '2021-12-18'),
(85, 'Covid-19', '2020-07-25'),
(86, 'Mumps', '2023-01-14'),
(87, 'HepatitisA', '2019-09-30'),
(88, 'Polio', '2022-07-09'),
(89, 'Rubella', '2021-11-01'),
(90, 'Small Pox', '2023-04-08'),
(91, 'HepatitisB', '2020-08-19'),
(92, 'Flu', '2019-10-28'),
(93, 'Covid-19', '2021-06-11'),
(94, 'Mumps', '2022-09-15'),
(95, 'HepatitisA', '2020-05-10'),
(96, 'Polio', '2023-03-27'),
(97, 'Rubella', '2019-11-17'),
(98, 'Small Pox', '2022-12-14'),
(99, 'Flu', '2021-09-05'),
(100, 'Covid-19', '2020-06-22');

-- Additional Vaccination Records for Citizens 1-100 (No Type Repetition)

INSERT INTO vaccination (citizen_id, type, date_administered) VALUES
(1, 'Polio', '2023-05-20'),
(2, 'Mumps', '2020-09-14'),
(3, 'HepatitisA', '2019-07-11'),
(4, 'Small Pox', '2022-12-22'),
(5, 'Rubella', '2021-04-07'),
(6, 'HepatitisB', '2023-06-10'),
(7, 'Covid-19', '2020-10-05'),
(8, 'Flu', '2021-08-18'),
(9, 'Polio', '2019-05-30'),
(10, 'HepatitisA', '2022-07-12'),
(11, 'Small Pox', '2023-04-25'),
(12, 'Mumps', '2020-06-09'),
(13, 'Flu', '2021-10-14'),
(14, 'Covid-19', '2019-12-29'),
(15, 'Rubella', '2022-03-15'),
(16, 'HepatitisB', '2023-07-02'),
(17, 'Polio', '2020-09-17'),
(18, 'Small Pox', '2019-11-05'),
(19, 'Flu', '2021-06-11'),
(20, 'HepatitisA', '2022-08-20'),
(21, 'Mumps', '2023-07-25'),
(22, 'Rubella', '2019-10-28'),
(23, 'HepatitisB', '2021-11-17'),
(24, 'Flu', '2020-07-08'),
(25, 'Covid-19', '2022-04-30'),
(26, 'Polio', '2021-05-15'),
(27, 'Small Pox', '2023-02-21'),
(28, 'Mumps', '2020-06-19'),
(29, 'HepatitisA', '2022-12-10'),
(30, 'Rubella', '2021-03-04'),
(31, 'Flu', '2020-11-09'),
(32, 'Covid-19', '2019-09-14'),
(33, 'HepatitisB', '2023-05-07'),
(34, 'Polio', '2021-08-30'),
(35, 'Mumps', '2022-07-06'),
(36, 'Small Pox', '2020-10-27'),
(37, 'Covid-19', '2019-06-22'),
(38, 'Rubella', '2023-04-09'),
(39, 'Flu', '2021-07-19'),
(40, 'HepatitisA', '2020-05-11'),
(41, 'Small Pox', '2022-06-15'),
(42, 'Mumps', '2023-03-12'),
(43, 'Polio', '2019-08-25'),
(44, 'HepatitisB', '2021-12-28'),
(45, 'Covid-19', '2020-11-21'),
(46, 'Flu', '2022-10-19'),
(47, 'HepatitisA', '2023-05-30'),
(48, 'Rubella', '2021-07-14'),
(49, 'Small Pox', '2020-06-03'),
(50, 'Mumps', '2019-11-07'),
(51, 'HepatitisB', '2022-09-21'),
(52, 'Covid-19', '2021-04-12'),
(53, 'Polio', '2023-07-10'),
(54, 'Flu', '2019-12-17'),
(55, 'Small Pox', '2020-10-14'),
(56, 'Mumps', '2022-08-22'),
(57, 'Covid-19', '2021-05-06'),
(58, 'HepatitisA', '2023-06-29'),
(59, 'Rubella', '2019-09-05'),
(60, 'Polio', '2020-12-31'),
(61, 'Flu', '2023-01-28'),
(62, 'HepatitisB', '2021-07-23'),
(63, 'Covid-19', '2020-09-16'),
(64, 'Small Pox', '2019-05-20'),
(65, 'Mumps', '2022-04-14'),
(66, 'Polio', '2023-07-01'),
(67, 'Rubella', '2021-08-18'),
(68, 'HepatitisA', '2020-11-09'),
(69, 'Flu', '2019-06-27'),
(70, 'Small Pox', '2022-10-23'),
(71, 'Covid-19', '2023-05-15'),
(72, 'HepatitisB', '2021-09-11'),
(73, 'Polio', '2020-07-30'),
(74, 'Mumps', '2022-12-25'),
(75, 'Rubella', '2019-08-09'),
(76, 'Flu', '2021-05-27'),
(77, 'Covid-19', '2020-10-14'),
(78, 'HepatitisA', '2023-07-21'),
(79, 'Small Pox', '2022-03-31'),
(80, 'Mumps', '2019-09-24'),
(81, 'Rubella', '2021-06-17'),
(82, 'HepatitisB', '2020-07-04'),
(83, 'Covid-19', '2023-05-09'),
(84, 'Flu', '2022-11-22'),
(85, 'Polio', '2019-10-01'),
(86, 'Mumps', '2021-09-14'),
(87, 'HepatitisA', '2020-08-16'),
(88, 'Rubella', '2023-06-30'),
(89, 'Small Pox', '2022-12-18'),
(90, 'Flu', '2019-07-21'),
(91, 'Covid-19', '2021-08-05'),
(92, 'HepatitisB', '2020-10-09'),
(93, 'Polio', '2023-04-07'),
(94, 'Mumps', '2022-11-01'),
(95, 'Rubella', '2021-06-12'),
(96, 'Flu', '2019-09-14'),
(97, 'Covid-19', '2023-05-01'),
(98, 'HepatitisA', '2020-08-29'),
(99, 'Small Pox', '2021-12-25'),
(100, 'Mumps', '2022-10-31');


INSERT INTO households (household_id, address) VALUES
(1, 'Building 12, Main Bazaar, Phulera'),
(2, 'Building 24, Gandhi Chowk, Phulera'),
(3, 'Building 35, Subhash Marg, Phulera'),
(4, 'Building 18, Rajput Mohalla, Phulera'),
(5, 'Building 27, Station Road, Phulera'),
(6, 'Building 9, Main Bazaar, Phulera'),
(7, 'Building 31, Gandhi Chowk, Phulera'),
(8, 'Building 42, Subhash Marg, Phulera'),
(9, 'Building 16, Rajput Mohalla, Phulera'),
(10, 'Building 21, Station Road, Phulera'),
(11, 'Building 8, Main Bazaar, Phulera'),
(12, 'Building 37, Gandhi Chowk, Phulera'),
(13, 'Building 14, Subhash Marg, Phulera'),
(14, 'Building 29, Rajput Mohalla, Phulera'),
(15, 'Building 45, Station Road, Phulera'),
(16, 'Building 5, Main Bazaar, Phulera'),
(17, 'Building 33, Gandhi Chowk, Phulera'),
(18, 'Building 26, Subhash Marg, Phulera'),
(19, 'Building 11, Rajput Mohalla, Phulera'),
(20, 'Building 39, Station Road, Phulera');


INSERT INTO land_records (area_acres, crop_type, weight, year_recorded, citizen_id) VALUES
(5, 'Wheat', 4, 2020, 1),
(4, 'Rice', 3, 2021, 1),
(6, 'Maize', 5, 2022, 3),
(5, 'Cotton', 4, 2023, 3),
(7, 'Sugarcane', 6, 2024, 5),
(5, 'Barley', 4, 2020, 5),
(4, 'Coffee', 3, 2021, 7),
(6, 'Wheat', 5, 2022, 7),
(5, 'Rice', 4, 2023, 9),
(4, 'Maize', 3, 2024, 10),
(8, 'Cotton', 7, 2020, 11),
(9, 'Sugarcane', 8, 2021, 12),
(5, 'Barley', 4, 2022, 13),
(6, 'Coffee', 5, 2023, 14),
(10, 'Wheat', 9, 2024, 9),
(5, 'Rice', 4, 2020, 10),
(6, 'Maize', 5, 2021, 11),
(5, 'Cotton', 4, 2022, 12),
(4, 'Sugarcane', 3, 2023, 13),
(7, 'Barley', 6, 2024, 14),
(11, 'Coffee', 9, 2020, 21),
(5, 'Wheat', 4, 2021, 21),
(6, 'Rice', 5, 2022, 23),
(5, 'Maize', 4, 2023, 23),
(4, 'Cotton', 3, 2024, 25),
(8, 'Sugarcane', 7, 2020, 25),
(5, 'Barley', 4, 2021, 27),
(6, 'Coffee', 5, 2022, 27),
(5, 'Wheat', 4, 2023, 29),
(4, 'Rice', 3, 2024, 30),
(9, 'Maize', 8, 2020, 31),
(5, 'Cotton', 4, 2021, 32),
(6, 'Sugarcane', 5, 2022, 33),
(5, 'Barley', 4, 2023, 34),
(4, 'Coffee', 3, 2024, 29),
(12, 'Wheat', 10, 2020, 30),
(5, 'Rice', 4, 2021, 31),
(6, 'Maize', 5, 2022, 32),
(5, 'Cotton', 4, 2023, 33),
(4, 'Sugarcane', 3, 2024, 34),
(7, 'Barley', 6, 2020, 41),
(5, 'Coffee', 4, 2021, 41),
(6, 'Wheat', 5, 2022, 43),
(5, 'Rice', 4, 2023, 43),
(4, 'Maize', 3, 2024, 45),
(10, 'Cotton', 9, 2020, 45),
(5, 'Sugarcane', 4, 2021, 47),
(6, 'Barley', 5, 2022, 47),
(5, 'Coffee', 4, 2023, 49),
(4, 'Wheat', 3, 2024, 50),
(11, 'Rice', 9, 2020, 51),
(5, 'Maize', 4, 2021, 52),
(6, 'Cotton', 5, 2022, 53),
(5, 'Sugarcane', 4, 2023, 54),
(4, 'Barley', 3, 2024, 49),
(9, 'Coffee', 8, 2020, 50),
(5, 'Wheat', 4, 2021, 51),
(6, 'Rice', 5, 2022, 52),
(5, 'Maize', 4, 2023, 53),
(4, 'Cotton', 3, 2024, 54),
(7, 'Sugarcane', 6, 2020, 61),
(5, 'Barley', 4, 2021, 61),
(6, 'Coffee', 5, 2022, 63),
(5, 'Wheat', 4, 2023, 63),
(4, 'Rice', 3, 2024, 65),
(10, 'Maize', 9, 2020, 65),
(5, 'Cotton', 4, 2021, 67),
(6, 'Sugarcane', 5, 2022, 67),
(5, 'Barley', 4, 2023, 69),
(4, 'Coffee', 3, 2024, 70),
(11, 'Wheat', 9, 2020, 71),
(5, 'Rice', 4, 2021, 72),
(6, 'Maize', 5, 2022, 73),
(5, 'Cotton', 4, 2023, 74),
(4, 'Sugarcane', 3, 2024, 69),
(7, 'Barley', 6, 2020, 70),
(5, 'Coffee', 4, 2021, 71),
(6, 'Wheat', 5, 2022, 72),
(5, 'Rice', 4, 2023, 73),
(4, 'Maize', 3, 2024, 84),
(9, 'Cotton', 8, 2020, 81),
(5, 'Sugarcane', 4, 2021, 81),
(6, 'Barley', 5, 2022, 83),
(5, 'Coffee', 4, 2023, 83),
(4, 'Wheat', 3, 2024, 85),
(10, 'Rice', 9, 2020, 85),
(5, 'Maize', 4, 2021, 87),
(6, 'Cotton', 5, 2022, 87),
(5, 'Sugarcane', 4, 2023, 89),
(4, 'Barley', 3, 2024, 90),
(7, 'Coffee', 6, 2020, 91),
(5, 'Wheat', 4, 2021, 92),
(6, 'Rice', 5, 2022, 93),
(5, 'Maize', 4, 2023, 94),
(4, 'Cotton', 3, 2024, 89),
(8, 'Sugarcane', 7, 2020, 90),
(5, 'Barley', 4, 2021, 91),
(6, 'Coffee', 5, 2022, 92),
(5, 'Wheat', 4, 2023, 93),
(4, 'Rice', 3, 2024, 94);



