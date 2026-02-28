-- Создаём базу
CREATE DATABASE IF NOT EXISTS auto_salon;
USE auto_salon;

-- Таблица брендов
CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100),
    logo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица категорий (классы авто)
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Таблица автомобилей
CREATE TABLE IF NOT EXISTS cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    year INT,
    mileage INT,
    engine_type VARCHAR(50),
    engine_capacity DECIMAL(3,1),
    power INT,
    transmission VARCHAR(50),
    drive_type VARCHAR(50),
    color VARCHAR(50),
    image VARCHAR(500),
    brand_id INT,
    category_id INT,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Таблица товаров в заказе
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    car_id INT NOT NULL,
    car_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Добавляем бренды
INSERT INTO brands (name, country) VALUES
('BMW', 'Германия'),
('Mercedes-Benz', 'Германия'),
('Audi', 'Германия'),
('Porsche', 'Германия'),
('Toyota', 'Япония'),
('Honda', 'Япония'),
('Ford', 'США'),
('Volvo', 'Швеция');

-- Добавляем категории
INSERT INTO categories (name) VALUES
('Седан'),
('Купе'),
('Хэтчбек'),
('Универсал'),
('Внедорожник'),
('Кроссовер'),
('Спорткар'),
('Электромобиль');

-- Добавляем тестовые авто
INSERT INTO cars (name, description, price, year, mileage, engine_type, engine_capacity, power, transmission, drive_type, color, image, brand_id, category_id) VALUES
('BMW X5', 'Премиальный внедорожник с отличной динамикой', 8500000, 2022, 15000, 'бензин', 3.0, 340, 'автомат', 'полный', 'черный', '/images/cars/bmw-x5.webp', 1, 5),
('Mercedes-Benz C63 AMG', 'Заряженный седан от Mercedes', 9500000, 2023, 5000, 'бензин', 4.0, 510, 'автомат', 'задний', 'серебристый', '/images/cars/mercedes-c63.webp', 2, 1),
('Audi RS6 Avant', 'Самый быстрый универсал в мире', 11000000, 2022, 12000, 'бензин', 4.0, 600, 'робот', 'полный', 'синий', '/images/cars/audi-rs6.webp', 3, 4),
('Porsche 911', 'Легендарный спорткар', 15000000, 2023, 3000, 'бензин', 3.0, 450, 'робот', 'задний', 'белый', '/images/cars/porsche-911.webp', 4, 7),
('Toyota Camry', 'Надёжный седан для всей семьи', 3500000, 2023, 10000, 'бензин', 2.5, 200, 'автомат', 'передний', 'белый', '/images/cars/toyota-camry.webp', 5, 1),
('Honda CR-V', 'Практичный кроссовер', 4200000, 2022, 18000, 'бензин', 1.5, 180, 'автомат', 'передний', 'серый', '/images/cars/honda-crv.webp', 6, 6),
('Ford Mustang', 'Американская классика', 6500000, 2021, 25000, 'бензин', 5.0, 450, 'автомат', 'задний', 'красный', '/images/cars/ford-mustang.webp', 7, 2),
('Volvo XC90', 'Безопасный шведский внедорожник', 7800000, 2022, 14000, 'гибрид', 2.0, 400, 'автомат', 'полный', 'синий', '/images/cars/volvo-xc90.webp', 8, 5);

-- Добавляем тестового админа
INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES
('admin@autosalon.ru', '$2a$10$X9Jq8L9Y8K9X9Jq8L9Y8K9X9Jq8L9Y8K9X9Jq8L9Y8', 'Admin', 'Auto', TRUE);
-- пароль: admin123