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
(19, '2020-02-15', 'Accident'),
(25, '2017-12-05', 'Heart attack'),
(32, '2019-08-30', 'Stroke'),
(41, '2020-11-15', 'Heart attack'),
(42, '2022-07-30', 'Covid-19'),
(43, '2018-06-22', 'Stroke'),
(44, '2021-03-25', 'Heart attack'),
(45, '2019-09-10', 'Accident'),
(46, '2023-01-10', 'Covid-19'),
(47, '2021-02-14', 'Malaria'),
(48, '2020-08-05', 'Stroke'),
(63, '2022-04-18', 'Accident'),
(78, '2021-11-27', 'Covid-19'),
(91, '2016-05-09', 'Malaria');

