-- Creating households table
CREATE TABLE households (
    household_id SERIAL PRIMARY KEY,
    address TEXT NOT NULL
);

-- Creating citizens table with email and hashed_password
CREATE TABLE citizens (
    citizen_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    dob DATE NOT NULL,
    educational_qualification TEXT,
    income DECIMAL,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    household_id INT REFERENCES households(household_id)
);



-- Creating land_records table with weight and year_recorded
CREATE TABLE land_records (
    land_id SERIAL PRIMARY KEY,
    area_acres DECIMAL NOT NULL,
    crop_type TEXT NOT NULL,
    weight DECIMAL NOT NULL,
    year_recorded INT NOT NULL,
    citizen_id INT REFERENCES citizens(citizen_id)
);

-- Creating panchayat_employees table
CREATE TABLE panchayat_employees (
    employee_id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    citizen_id INT REFERENCES citizens(citizen_id)
);

-- Creating assets table with value column
CREATE TABLE assets (
    asset_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    value NUMERIC NOT NULL,
    installation_date DATE NOT NULL
);

-- Creating welfare_schemes table
CREATE TABLE welfare_schemes (
    scheme_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Creating scheme_enrollments table
CREATE TABLE scheme_enrollments (
    citizen_id INT REFERENCES citizens(citizen_id),
    scheme_id INT REFERENCES welfare_schemes(scheme_id),
    enrollment_date DATE NOT NULL,
    PRIMARY KEY (citizen_id, scheme_id)
);

-- Creating vaccinations table
CREATE TABLE vaccinations (
    vaccination_id SERIAL PRIMARY KEY,
    citizen_id INT REFERENCES citizens(citizen_id),
    vaccination_type TEXT NOT NULL,
    date_administered DATE NOT NULL
);

-- Creating medical_data table with date_recorded column
CREATE TABLE medical_data (
    medical_id SERIAL PRIMARY KEY,
    citizen_id INT REFERENCES citizens(citizen_id),
    health_status TEXT NOT NULL,
    medical_condition TEXT NOT NULL,
    date_recorded DATE NOT NULL
);

-- Creating taxes table with date column
CREATE TABLE taxes (
    tax_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    payment_status TEXT NOT NULL,
    date DATE NOT NULL,
    citizen_id INT REFERENCES citizens(citizen_id)
);

-- Creating environmental_data table
CREATE TABLE environmental_data (
    env_id SERIAL PRIMARY KEY,
    aqi DECIMAL NOT NULL,
    temperature DECIMAL NOT NULL,
    humidity DECIMAL NOT NULL,
    rainfall DECIMAL NOT NULL,
    date_recorded DATE NOT NULL
);

-- Creating geo_features table
CREATE TABLE geo_features (
    feature_id SERIAL PRIMARY KEY,
    feature_type TEXT NOT NULL,
    name TEXT NOT NULL,
    area DECIMAL NOT NULL
);

-- Creating marriage table
CREATE TABLE marriage (
    husband_id INT REFERENCES citizens(citizen_id),
    wife_id INT REFERENCES citizens(citizen_id),
    marriage_date DATE NOT NULL,
    PRIMARY KEY (husband_id, wife_id)
);

-- Creating births table
CREATE TABLE births (
    child_id INT PRIMARY KEY REFERENCES citizens(citizen_id),
    father_id INT REFERENCES citizens(citizen_id),
    mother_id INT REFERENCES citizens(citizen_id),
    birth_date DATE NOT NULL
);

-- Creating deaths table
CREATE TABLE deaths (
    citizen_id INT PRIMARY KEY REFERENCES citizens(citizen_id),
    date DATE NOT NULL,
    cause TEXT NOT NULL
);

-- Creating flora_fauna table with count column
CREATE TABLE flora_fauna (
    f_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    habitat TEXT NOT NULL,
    count INT NOT NULL
);

-- Creating budget table
CREATE TABLE budget (
    budget_id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    spent NUMERIC NOT NULL,
    created_at DATE NOT NULL
);
