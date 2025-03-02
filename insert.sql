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

-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (1, '2025-03-01', 'Income Tax', 0, 'Paid');

-- ALTER TABLE citizens
-- ALTER COLUMN email DROP NOT NULL;



-- -- Insert data into panchayat_employees
-- INSERT INTO panchayat_employees (role, citizen_id) VALUES
-- ('Pradhan', 1);
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
-- (11, 'Covid-19', '2021-05-10');
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
-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (1, '2024-03-01', 'Road Tax', 80000, 'Pending'),
-- (1, '2023-03-01', 'Income Tax', 75000, 'Paid'),
-- (1, '2022-03-01', 'Utility Tax', 82000, 'Pending'),
-- (1, '2021-03-01', 'Property Tax', 78000, 'Paid'),
-- (1, '2020-03-01', 'Water Tax', 77000, 'Paid'),
-- (3, '2024-03-01', 'Property Tax', 100000, 'Paid'),
-- (3, '2023-03-01', 'Water Tax', 95000, 'Pending'),
-- (3, '2022-03-01', 'Road Tax', 102000, 'Paid'),
-- (3, '2021-03-01', 'Income Tax', 98000, 'Pending'),
-- (3, '2020-03-01', 'Utility Tax', 97000, 'Paid'),
-- (5, '2024-03-01', 'Utility Tax', 120000, 'Pending'),
-- (5, '2023-03-01', 'Income Tax', 115000, 'Paid'),
-- (5, '2022-03-01', 'Property Tax', 122000, 'Pending'),
-- (5, '2021-03-01', 'Water Tax', 118000, 'Paid'),
-- (5, '2020-03-01', 'Road Tax', 117000, 'Paid'),
-- (7, '2024-03-01', 'Income Tax', 72000, 'Paid'),
-- (7, '2023-03-01', 'Road Tax', 67000, 'Pending'),
-- (7, '2022-03-01', 'Utility Tax', 74000, 'Paid'),
-- (7, '2021-03-01', 'Water Tax', 68000, 'Pending'),
-- (7, '2020-03-01', 'Property Tax', 69000, 'Paid'),
-- (9, '2024-03-01', 'Water Tax', 280000, 'Pending'),
-- (9, '2023-03-01', 'Utility Tax', 275000, 'Paid'),
-- (9, '2022-03-01', 'Income Tax', 282000, 'Pending'),
-- (9, '2021-03-01', 'Road Tax', 278000, 'Paid'),
-- (9, '2020-03-01', 'Property Tax', 277000, 'Paid'),
-- (10, '2024-03-01', 'Road Tax', 260000, 'Paid'),
-- (10, '2023-03-01', 'Property Tax', 255000, 'Pending'),
-- (10, '2022-03-01', 'Water Tax', 262000, 'Paid'),
-- (10, '2021-03-01', 'Income Tax', 258000, 'Pending'),
-- (10, '2020-03-01', 'Utility Tax', 257000, 'Paid'),
-- (11, '2024-03-01', 'Property Tax', 340000, 'Pending'),
-- (11, '2023-03-01', 'Income Tax', 335000, 'Paid'),
-- (11, '2022-03-01', 'Road Tax', 342000, 'Pending'),
-- (11, '2021-03-01', 'Utility Tax', 338000, 'Paid'),
-- (11, '2020-03-01', 'Water Tax', 337000, 'Paid'),
-- (12, '2024-03-01', 'Utility Tax', 320000, 'Paid'),
-- (12, '2023-03-01', 'Water Tax', 315000, 'Pending'),
-- (12, '2022-03-01', 'Property Tax', 322000, 'Paid'),
-- (12, '2021-03-01', 'Income Tax', 318000, 'Pending'),
-- (12, '2020-03-01', 'Road Tax', 317000, 'Paid'),
-- (13, '2024-03-01', 'Income Tax', 240000, 'Pending'),
-- (13, '2023-03-01', 'Utility Tax', 235000, 'Paid'),
-- (13, '2022-03-01', 'Water Tax', 242000, 'Pending'),
-- (13, '2021-03-01', 'Road Tax', 238000, 'Paid'),
-- (13, '2020-03-01', 'Property Tax', 237000, 'Paid'),
-- (14, '2024-03-01', 'Water Tax', 160000, 'Paid'),
-- (14, '2023-03-01', 'Road Tax', 155000, 'Pending'),
-- (14, '2022-03-01', 'Income Tax', 162000, 'Paid'),
-- (14, '2021-03-01', 'Utility Tax', 158000, 'Pending'),
-- (14, '2020-03-01', 'Property Tax', 157000, 'Paid');


-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (21, '2024-03-01', 'Road Tax', 88000, 'Paid'),
-- (21, '2023-03-01', 'Utility Tax', 87000, 'Pending'),
-- (21, '2022-03-01', 'Income Tax', 86000, 'Paid'),
-- (21, '2021-03-01', 'Property Tax', 85500, 'Pending'),
-- (21, '2020-03-01', 'Water Tax', 85000, 'Paid'),

-- (23, '2024-03-01', 'Property Tax', 108000, 'Pending'),
-- (23, '2023-03-01', 'Road Tax', 107000, 'Paid'),
-- (23, '2022-03-01', 'Utility Tax', 106500, 'Pending'),
-- (23, '2021-03-01', 'Income Tax', 105500, 'Paid'),
-- (23, '2020-03-01', 'Water Tax', 104000, 'Paid'),

-- (25, '2024-03-01', 'Income Tax', 116000, 'Pending'),
-- (25, '2023-03-01', 'Water Tax', 115000, 'Paid'),
-- (25, '2022-03-01', 'Road Tax', 114500, 'Pending'),
-- (25, '2021-03-01', 'Property Tax', 113500, 'Paid'),
-- (25, '2020-03-01', 'Utility Tax', 112000, 'Paid'),

-- (27, '2024-03-01', 'Utility Tax', 76000, 'Paid'),
-- (27, '2023-03-01', 'Property Tax', 75000, 'Pending'),
-- (27, '2022-03-01', 'Water Tax', 74000, 'Paid'),
-- (27, '2021-03-01', 'Income Tax', 73500, 'Pending'),
-- (27, '2020-03-01', 'Road Tax', 73000, 'Paid'),

-- (29, '2024-03-01', 'Water Tax', 288000, 'Pending'),
-- (29, '2023-03-01', 'Utility Tax', 287000, 'Paid'),
-- (29, '2022-03-01', 'Property Tax', 285000, 'Pending'),
-- (29, '2021-03-01', 'Road Tax', 283500, 'Paid'),
-- (29, '2020-03-01', 'Income Tax', 280000, 'Paid'),

-- (30, '2024-03-01', 'Road Tax', 272000, 'Paid'),
-- (30, '2023-03-01', 'Property Tax', 271000, 'Pending'),
-- (30, '2022-03-01', 'Water Tax', 269000, 'Paid'),
-- (30, '2021-03-01', 'Income Tax', 267500, 'Pending'),
-- (30, '2020-03-01', 'Utility Tax', 264000, 'Paid'),

-- (31, '2024-03-01', 'Income Tax', 344000, 'Pending'),
-- (31, '2023-03-01', 'Road Tax', 343000, 'Paid'),
-- (31, '2022-03-01', 'Utility Tax', 341000, 'Pending'),
-- (31, '2021-03-01', 'Property Tax', 339500, 'Paid'),
-- (31, '2020-03-01', 'Water Tax', 336000, 'Paid'),

-- (32, '2024-03-01', 'Utility Tax', 328000, 'Paid'),
-- (32, '2023-03-01', 'Property Tax', 327000, 'Pending'),
-- (32, '2022-03-01', 'Road Tax', 325000, 'Paid'),
-- (32, '2021-03-01', 'Water Tax', 323500, 'Pending'),
-- (32, '2020-03-01', 'Income Tax', 320000, 'Paid'),

-- (33, '2024-03-01', 'Property Tax', 248000, 'Pending'),
-- (33, '2023-03-01', 'Water Tax', 247000, 'Paid'),
-- (33, '2022-03-01', 'Income Tax', 245000, 'Pending'),
-- (33, '2021-03-01', 'Utility Tax', 243500, 'Paid'),
-- (33, '2020-03-01', 'Road Tax', 240000, 'Paid'),

-- (34, '2024-03-01', 'Road Tax', 164000, 'Paid'),
-- (34, '2023-03-01', 'Income Tax', 163000, 'Pending'),
-- (34, '2022-03-01', 'Utility Tax', 161000, 'Paid'),
-- (34, '2021-03-01', 'Property Tax', 159500, 'Pending'),
-- (34, '2020-03-01', 'Water Tax', 156000, 'Paid');


-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (41, '2024-03-01', 'Water Tax', 100000, 'Pending'),
-- (41, '2023-03-01', 'Road Tax', 99000, 'Paid'),
-- (41, '2022-03-01', 'Property Tax', 98000, 'Pending'),
-- (41, '2021-03-01', 'Income Tax', 97000, 'Paid'),
-- (41, '2020-03-01', 'Utility Tax', 96000, 'Paid'),

-- (43, '2024-03-01', 'Utility Tax', 112000, 'Paid'),
-- (43, '2023-03-01', 'Income Tax', 111000, 'Pending'),
-- (43, '2022-03-01', 'Road Tax', 110000, 'Paid'),
-- (43, '2021-03-01', 'Property Tax', 109000, 'Pending'),
-- (43, '2020-03-01', 'Water Tax', 108000, 'Paid'),

-- (45, '2024-03-01', 'Road Tax', 120000, 'Paid'),
-- (45, '2023-03-01', 'Water Tax', 119000, 'Pending'),
-- (45, '2022-03-01', 'Income Tax', 118000, 'Paid'),
-- (45, '2021-03-01', 'Utility Tax', 117000, 'Pending'),
-- (45, '2020-03-01', 'Property Tax', 116000, 'Paid'),

-- (47, '2024-03-01', 'Property Tax', 80000, 'Paid'),
-- (47, '2023-03-01', 'Utility Tax', 79000, 'Pending'),
-- (47, '2022-03-01', 'Water Tax', 78000, 'Paid'),
-- (47, '2021-03-01', 'Income Tax', 77000, 'Pending'),
-- (47, '2020-03-01', 'Road Tax', 76000, 'Paid'),

-- (49, '2024-03-01', 'Income Tax', 280000, 'Paid'),
-- (49, '2023-03-01', 'Road Tax', 278000, 'Pending'),
-- (49, '2022-03-01', 'Utility Tax', 276000, 'Paid'),
-- (49, '2021-03-01', 'Water Tax', 274000, 'Pending'),
-- (49, '2020-03-01', 'Property Tax', 272000, 'Paid'),

-- (50, '2024-03-01', 'Utility Tax', 260000, 'Paid'),
-- (50, '2023-03-01', 'Income Tax', 258000, 'Pending'),
-- (50, '2022-03-01', 'Property Tax', 256000, 'Paid'),
-- (50, '2021-03-01', 'Road Tax', 254000, 'Pending'),
-- (50, '2020-03-01', 'Water Tax', 252000, 'Paid'),

-- (51, '2024-03-01', 'Road Tax', 340000, 'Paid'),
-- (51, '2023-03-01', 'Water Tax', 338000, 'Pending'),
-- (51, '2022-03-01', 'Income Tax', 336000, 'Paid'),
-- (51, '2021-03-01', 'Utility Tax', 334000, 'Pending'),
-- (51, '2020-03-01', 'Property Tax', 332000, 'Paid'),

-- (52, '2024-03-01', 'Property Tax', 320000, 'Paid'),
-- (52, '2023-03-01', 'Road Tax', 318000, 'Pending'),
-- (52, '2022-03-01', 'Water Tax', 316000, 'Paid'),
-- (52, '2021-03-01', 'Income Tax', 314000, 'Pending'),
-- (52, '2020-03-01', 'Utility Tax', 312000, 'Paid'),

-- (53, '2024-03-01', 'Utility Tax', 252000, 'Paid'),
-- (53, '2023-03-01', 'Income Tax', 250000, 'Pending'),
-- (53, '2022-03-01', 'Property Tax', 248000, 'Paid'),
-- (53, '2021-03-01', 'Road Tax', 246000, 'Pending'),
-- (53, '2020-03-01', 'Water Tax', 244000, 'Paid'),

-- (54, '2024-03-01', 'Income Tax', 168000, 'Paid'),
-- (54, '2023-03-01', 'Utility Tax', 166000, 'Pending'),
-- (54, '2022-03-01', 'Road Tax', 164000, 'Paid'),
-- (54, '2021-03-01', 'Property Tax', 162000, 'Pending'),
-- (54, '2020-03-01', 'Water Tax', 160000, 'Paid');



-- -- -- Taxes for Citizens (61-80)
-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (61, '2024-03-01', 'Water Tax', 108000, 'Paid'),
-- (61, '2023-03-01', 'Road Tax', 107000, 'Pending'),
-- (61, '2022-03-01', 'Property Tax', 106000, 'Paid'),
-- (61, '2021-03-01', 'Income Tax', 105000, 'Pending'),
-- (61, '2020-03-01', 'Utility Tax', 104000, 'Paid'),

-- (63, '2024-03-01', 'Property Tax', 104000, 'Pending'),
-- (63, '2023-03-01', 'Income Tax', 103000, 'Paid'),
-- (63, '2022-03-01', 'Utility Tax', 102000, 'Pending'),
-- (63, '2021-03-01', 'Road Tax', 101000, 'Paid'),
-- (63, '2020-03-01', 'Water Tax', 100000, 'Pending'),

-- (65, '2024-03-01', 'Utility Tax', 124000, 'Paid'),
-- (65, '2023-03-01', 'Water Tax', 123000, 'Pending'),
-- (65, '2022-03-01', 'Income Tax', 122000, 'Paid'),
-- (65, '2021-03-01', 'Road Tax', 121000, 'Pending'),
-- (65, '2020-03-01', 'Property Tax', 120000, 'Paid'),

-- (67, '2024-03-01', 'Road Tax', 76000, 'Pending'),
-- (67, '2023-03-01', 'Property Tax', 75000, 'Paid'),
-- (67, '2022-03-01', 'Water Tax', 74000, 'Pending'),
-- (67, '2021-03-01', 'Utility Tax', 73500, 'Paid'),
-- (67, '2020-03-01', 'Income Tax', 73000, 'Pending'),

-- (69, '2024-03-01', 'Income Tax', 288000, 'Paid'),
-- (69, '2023-03-01', 'Utility Tax', 287000, 'Pending'),
-- (69, '2022-03-01', 'Road Tax', 285000, 'Paid'),
-- (69, '2021-03-01', 'Property Tax', 283500, 'Pending'),
-- (69, '2020-03-01', 'Water Tax', 280000, 'Paid'),

-- (70, '2024-03-01', 'Water Tax', 268000, 'Pending'),
-- (70, '2023-03-01', 'Road Tax', 267000, 'Paid'),
-- (70, '2022-03-01', 'Utility Tax', 265000, 'Pending'),
-- (70, '2021-03-01', 'Income Tax', 263500, 'Paid'),
-- (70, '2020-03-01', 'Property Tax', 260000, 'Pending'),

-- (71, '2024-03-01', 'Property Tax', 352000, 'Paid'),
-- (71, '2023-03-01', 'Income Tax', 351000, 'Pending'),
-- (71, '2022-03-01', 'Road Tax', 349000, 'Paid'),
-- (71, '2021-03-01', 'Utility Tax', 347500, 'Pending'),
-- (71, '2020-03-01', 'Water Tax', 344000, 'Paid'),

-- (72, '2024-03-01', 'Utility Tax', 324000, 'Pending'),
-- (72, '2023-03-01', 'Water Tax', 323000, 'Paid'),
-- (72, '2022-03-01', 'Income Tax', 321000, 'Pending'),
-- (72, '2021-03-01', 'Road Tax', 319500, 'Paid'),
-- (72, '2020-03-01', 'Property Tax', 316000, 'Pending'),

-- (73, '2024-03-01', 'Road Tax', 256000, 'Paid'),
-- (73, '2023-03-01', 'Property Tax', 255000, 'Pending'),
-- (73, '2022-03-01', 'Utility Tax', 253000, 'Paid'),
-- (73, '2021-03-01', 'Income Tax', 251500, 'Pending'),
-- (73, '2020-03-01', 'Water Tax', 248000, 'Paid'),

-- (74, '2024-03-01', 'Income Tax', 164000, 'Pending'),
-- (74, '2023-03-01', 'Road Tax', 163000, 'Paid'),
-- (74, '2022-03-01', 'Water Tax', 161000, 'Pending'),
-- (74, '2021-03-01', 'Property Tax', 159500, 'Paid'),
-- (74, '2020-03-01', 'Utility Tax', 156000, 'Pending');


-- -- Taxes for Citizens (81-100) with tax_date column
-- INSERT INTO taxes (citizen_id, date, type, amount, payment_status) VALUES
-- (81, '2024-03-01', 'Road Tax', 100000, 'Pending'),
-- (81, '2023-03-01', 'Water Tax', 99000, 'Paid'),
-- (81, '2022-03-01', 'Utility Tax', 98000, 'Pending'),
-- (81, '2021-03-01', 'Property Tax', 97000, 'Paid'),
-- (81, '2020-03-01', 'Income Tax', 96000, 'Pending'),

-- (83, '2024-03-01', 'Income Tax', 112000, 'Pending'),
-- (83, '2023-03-01', 'Utility Tax', 111000, 'Paid'),
-- (83, '2022-03-01', 'Property Tax', 110000, 'Pending'),
-- (83, '2021-03-01', 'Road Tax', 109000, 'Paid'),
-- (83, '2020-03-01', 'Water Tax', 108000, 'Pending'),

-- (85, '2024-03-01', 'Property Tax', 128000, 'Paid'),
-- (85, '2023-03-01', 'Road Tax', 127000, 'Pending'),
-- (85, '2022-03-01', 'Income Tax', 126000, 'Paid'),
-- (85, '2021-03-01', 'Utility Tax', 125000, 'Pending'),
-- (85, '2020-03-01', 'Water Tax', 124000, 'Paid'),

-- (87, '2024-03-01', 'Road Tax', 84000, 'Pending'),
-- (87, '2023-03-01', 'Water Tax', 83000, 'Paid'),
-- (87, '2022-03-01', 'Utility Tax', 82000, 'Pending'),
-- (87, '2021-03-01', 'Property Tax', 81000, 'Paid'),
-- (87, '2020-03-01', 'Income Tax', 80000, 'Pending'),

-- (89, '2024-03-01', 'Utility Tax', 296000, 'Paid'),
-- (89, '2023-03-01', 'Income Tax', 295000, 'Pending'),
-- (89, '2022-03-01', 'Water Tax', 293000, 'Paid'),
-- (89, '2021-03-01', 'Road Tax', 291500, 'Pending'),
-- (89, '2020-03-01', 'Property Tax', 288000, 'Paid'),

-- (90, '2024-03-01', 'Road Tax', 276000, 'Pending'),
-- (90, '2023-03-01', 'Water Tax', 275000, 'Paid'),
-- (90, '2022-03-01', 'Income Tax', 273000, 'Pending'),
-- (90, '2021-03-01', 'Utility Tax', 271500, 'Paid'),
-- (90, '2020-03-01', 'Property Tax', 268000, 'Pending'),

-- (91, '2024-03-01', 'Property Tax', 344000, 'Pending'),
-- (91, '2023-03-01', 'Utility Tax', 343000, 'Paid'),
-- (91, '2022-03-01', 'Road Tax', 341000, 'Pending'),
-- (91, '2021-03-01', 'Water Tax', 339500, 'Paid'),
-- (91, '2020-03-01', 'Income Tax', 336000, 'Pending'),

-- (92, '2024-03-01', 'Income Tax', 328000, 'Paid'),
-- (92, '2023-03-01', 'Road Tax', 327000, 'Pending'),
-- (92, '2022-03-01', 'Utility Tax', 325000, 'Paid'),
-- (92, '2021-03-01', 'Property Tax', 323500, 'Pending'),
-- (92, '2020-03-01', 'Water Tax', 320000, 'Paid'),

-- (93, '2024-03-01', 'Water Tax', 260000, 'Pending'),
-- (93, '2023-03-01', 'Income Tax', 259000, 'Paid'),
-- (93, '2022-03-01', 'Property Tax', 257000, 'Pending'),
-- (93, '2021-03-01', 'Road Tax', 255500, 'Paid'),
-- (93, '2020-03-01', 'Utility Tax', 252000, 'Pending'),

-- (94, '2024-03-01', 'Utility Tax', 168000, 'Paid'),
-- (94, '2023-03-01', 'Water Tax', 167000, 'Pending'),
-- (94, '2022-03-01', 'Road Tax', 165000, 'Paid'),
-- (94, '2021-03-01', 'Property Tax', 163500, 'Pending'),
-- (94, '2020-03-01', 'Income Tax', 160000, 'Paid');
