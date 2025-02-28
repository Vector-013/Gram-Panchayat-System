-- Insert data into households (All in Phulera)
-- INSERT INTO households (address) VALUES 
-- ('12, Main Bazaar, Phulera'), 
-- ('34, Station Road, Phulera'), 
-- ('56, Gandhi Chowk, Phulera'), 
-- ('78, Rajput Mohalla, Phulera'), 
-- ('90, Shastri Nagar, Phulera'), 
-- ('23, Ambedkar Colony, Phulera'), 
-- ('45, Ramganj, Phulera'), 
-- ('67, Shivaji Nagar, Phulera'), 
-- ('89, Patel Nagar, Phulera'), 
-- ('101, Subhash Marg, Phulera');

-- Insert data into citizens
-- INSERT INTO citizens (name, gender, dob, educational_qualification, income, household_id) VALUES
-- ('Noni Sharma', 'Female', '1995-06-15', 'Graduate', 70000, 1);
-- ('Kash Sharma', 'Male', '1992-08-23', 'Secondary', 80000, 1);
-- ('Vikram Rao', 'Male', '1987-09-25', 'Secondary', 35000, 5),
-- ('Meena Nair', 'Female', '1998-02-20', 'Graduate', 45000, 6),
-- ('Rohan Mehta', 'Male', '1992-07-18', 'Post-Graduate', 70000, 7),
-- ('Ananya Ghosh', 'Female', '1989-05-10', 'Illiterate', 25000, 8),
-- ('Suresh Patil', 'Male', '1983-03-30', 'Primary', 32000, 9),
-- ('Neha Kapoor', 'Female', '1996-12-05', 'Graduate', 48000, 10),
-- ('Aryan Sharma', 'Male', '2011-07-10', 'None', 0, 1),
-- ('Diya Kumar', 'Female', '2013-09-20', 'None', 0, 3),
-- ('Kabir Rao', 'Male', '2016-12-25', 'None', 0, 5),
-- ('Ishita Mehta', 'Female', '2019-05-30', 'None', 0, 7),
-- ('Vivaan Kapoor', 'Male', '2021-11-15', 'None', 0, 9);

-- Insert data into land_records
-- INSERT INTO land_records (area_acres, crop_type, citizen_id) VALUES
-- (2.5, 'Wheat', 21);
-- (3.0, 'Rice', 2),
-- (1.5, 'Maize', 4),
-- (2.0, 'Barley', 4),
-- (2.5, 'Sugarcane', 10);


-- -- Insert data into panchayat_employees
-- INSERT INTO panchayat_employees (role, citizen_id) VALUES
-- ('Sarpanch', 2),
-- ('Secretary', 4),
-- ('Member', 6),
-- ('Clerk', 8),
-- ('Treasurer', 10);

-- -- Insert data into assets
-- INSERT INTO assets (type, location, installation_date) VALUES
-- ('Street Light', 'Main Bazaar, Phulera', '2023-01-15'),
-- ('Water Pump', 'Station Road, Phulera', '2022-05-10'),
-- ('Road', 'Gandhi Chowk, Phulera', '2021-09-30'),
-- ('Public Toilet', 'Rajput Mohalla, Phulera', '2023-06-20'),
-- ('Library', 'Subhash Marg, Phulera', '2020-11-05');

-- -- Insert data into welfare_schemes
-- INSERT INTO welfare_schemes (name, description) VALUES
-- ('Ayushman Bharat', 'Health insurance for poor families'),
-- ('Sarva Shiksha Abhiyan', 'Scholarships for students from low-income backgrounds'),
-- ('MGNREGA', '100-day employment for rural workers'),
-- ('Indira Gandhi Pension Yojana', 'Financial support for senior citizens'),
-- ('Mahila Samridhi Yojana', 'Self-help groups and financial aid for women');

-- -- Insert data into scheme_enrollments
-- INSERT INTO scheme_enrollments (citizen_id, scheme_id, enrollment_date) VALUES
-- (1, 1, '2023-01-10'),
-- (2, 2, '2022-07-15'),
-- (3, 3, '2021-12-05'),
-- (4, 4, '2023-06-22'),
-- (5, 5, '2023-03-18');

-- -- Insert data into vaccinations
-- INSERT INTO vaccinations (citizen_id, vaccination_type, date_administered) VALUES
-- (1, 'Covid-19', '2021-05-10'),
-- (2, 'Polio', '2020-08-15'),
-- (3, 'Hepatitis B', '2022-11-30'),
-- (4, 'Typhoid', '2023-02-14'),
-- (5, 'Tetanus', '2023-04-28');

-- -- Insert data into medical_data
-- INSERT INTO medical_data (citizen_id, health_status, medical_condition) VALUES
-- (11, 'Good', 'None');
-- (2, 'Fair', 'Diabetes'),
-- (3, 'Poor', 'Hypertension'),
-- (4, 'Good', 'None'),
-- (5, 'Fair', 'Asthma');

-- -- Insert data into taxes
-- INSERT INTO taxes (type, amount, payment_status, citizen_id) VALUES
-- ('Property Tax', 5000, 'Paid', 1),
-- ('Income Tax', 10000, 'Pending', 2),
-- ('Property Tax', 3000, 'Paid', 3),
-- ('Road Tax', 2000, 'Pending', 4),
-- ('Water Tax', 1500, 'Paid', 5);

-- -- Insert data into environmental_data
-- INSERT INTO environmental_data (aqi, temperature, humidity, rainfall, date_recorded) VALUES
-- (85, 30, 60, 12, '2025-03-01');
-- (92, 32, 55, 8, '2023-02-10'),
-- (78, 28, 65, 15, '2023-03-15'),
-- (110, 35, 50, 5, '2023-04-20'),
-- (95, 29, 70, 20, '2023-05-05');

-- -- Insert data into geo_features
-- INSERT INTO geo_features (feature_type, name, area) VALUES
-- ('River', 'Banganga', 5000),
-- ('Forest', 'Aravalli Hills', 12000),
-- ('Mountain', 'Nahargarh', 30000),
-- ('Lake', 'Sambhar Lake', 1500),
-- ('Desert', 'Thar Desert', 20000);

-- -- Insert data into marriage
-- INSERT INTO marriage (husband_id, wife_id, marriage_date) VALUES
-- (1, 2, '2010-06-15'),
-- (3, 4, '2012-08-22'),
-- (5, 6, '2015-11-03'),
-- (7, 8, '2018-04-12'),
-- (9, 10, '2020-09-25');

-- -- Insert data into births
-- INSERT INTO births (child_id, father_id, mother_id, birth_date) VALUES
-- (11, 1, 2, '2011-07-10'),
-- (12, 3, 4, '2013-09-20'),
-- (13, 5, 6, '2016-12-25'),
-- (14, 7, 8, '2019-05-30'),
-- (15, 9, 10, '2021-11-15');

-- -- Insert data into deaths
-- INSERT INTO deaths (citizen_id, date, cause) VALUES
-- (3, '2022-10-05', 'Heart Attack'),
-- (6, '2021-12-20', 'Covid-19'),
-- (9, '2023-01-15', 'Accident');

-- -- Insert data into flora_fauna
-- INSERT INTO flora_fauna (type, name, habitat) VALUES
-- ('Tree', 'Neem', 'Rajasthan'),
-- ('Animal', 'Camel', 'Desert'),
-- ('Bird', 'Peacock', 'Grasslands'),
-- ('Flower', 'Marigold', 'Gardens'),
-- ('Fish', 'Rohu', 'Rivers');
