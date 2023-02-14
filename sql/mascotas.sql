-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2023 a las 01:38:50
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mascotas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `slug`, `imagen`, `created_at`, `updated_at`) VALUES
(1, 'Perros', 'perros', 'images/categorias/60945b3ee50cb662612e43e4c1fe8082.png', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(2, 'Gatos', 'gatos', 'images/categorias/2d1e164d3db0c5549be4fd6a219403f9.png', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(3, 'Otras especies', 'otros', 'images/categorias/197e9c375859dbee6940fdb70dff8e94.png', '2022-12-02 02:07:20', '2022-12-02 02:07:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id`, `nombre`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Bucaramanga', 'bucaramanga', '2022-12-02 02:07:20', '2022-12-15 01:19:36'),
(2, 'Floridablanca', 'floridablanca', '2022-12-02 02:07:20', '2022-12-15 01:19:56'),
(3, 'Girón', 'giron', '2022-12-02 02:07:20', '2022-12-15 01:20:07'),
(4, 'Piedecuesta', 'piedecuesta', '2022-12-15 01:00:53', '2022-12-15 01:20:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edades`
--

CREATE TABLE `edades` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `edades`
--

INSERT INTO `edades` (`id`, `nombre`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'cachorro', 'cachorro', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(2, 'joven', 'joven', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(3, 'adulto', 'adulto', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(4, 'senior', 'senior', '2022-12-02 02:07:20', '2022-12-02 02:07:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `nombre`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'adopta', 'adopta', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(2, 'perdidos', 'perdidos', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(3, 'encontrados', 'encontrados', '2022-12-02 02:07:20', '2022-12-02 02:07:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fundaciones`
--

CREATE TABLE `fundaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) NOT NULL,
  `estado` enum('1','2','3') NOT NULL DEFAULT '1',
  `comentario` text DEFAULT NULL,
  `revision` tinyint(1) DEFAULT 0,
  `email` varchar(191) NOT NULL,
  `facebook` varchar(191) DEFAULT NULL,
  `whatsapp` varchar(191) DEFAULT NULL,
  `instagram` varchar(191) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `ciudad_id` smallint(5) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fundaciones`
--

INSERT INTO `fundaciones` (`id`, `nombre`, `slug`, `descripcion`, `logo`, `direccion`, `telefono`, `estado`, `comentario`, `revision`, `email`, `facebook`, `whatsapp`, `instagram`, `user_id`, `ciudad_id`, `created_at`, `updated_at`) VALUES
(1, 'Fundación prueba', 'fundacion-prueba', '', 'public/logos-fundaciones/621fcf8f8d5e27b2b649a8e74345ab90.jpg', 'Calle 12 # 30 - 260 ', '1234567890', '2', NULL, 0, 'fundacion@gmail.com', 'fundacion', '1234567890', 'fundacion', 1, 2, '2022-12-15 19:04:20', '2023-02-13 21:05:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_mascotas`
--

CREATE TABLE `imagen_mascotas` (
  `id` bigint(20) NOT NULL,
  `url` varchar(191) NOT NULL,
  `prioridad` tinyint(3) NOT NULL,
  `mascota_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagen_mascotas`
--

INSERT INTO `imagen_mascotas` (`id`, `url`, `prioridad`, `mascota_id`, `created_at`, `updated_at`) VALUES
(84, 'public/imagenes-mascotas/70a4eb755bed9116f36d0b4fa78f6e6c.jpg', 1, 67, '2023-02-13 21:07:36', '2023-02-13 21:07:47'),
(85, 'public/imagenes-mascotas/93a65d6ec0f4dc2ea1f2ddaf5eef2e28.jpg', 2, 67, '2023-02-13 21:07:47', '2023-02-13 21:07:47'),
(86, 'public/imagenes-mascotas/55dc28e1645b717bf320717158a93252.jpg', 1, 31, '2023-02-13 21:09:05', '2023-02-13 21:09:05'),
(87, 'public/imagenes-mascotas/332ef1ec2988e8b6914369edc5643bbd.jpg', 2, 31, '2023-02-13 21:09:05', '2023-02-13 21:09:05'),
(88, 'public/imagenes-mascotas/b9d6656b6ae5b5e6980969f6952eb98f.jpg', 1, 66, '2023-02-13 21:09:39', '2023-02-13 21:09:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `sexo` enum('H','M') NOT NULL,
  `descripcion` text DEFAULT NULL,
  `esterilizacion` tinyint(1) NOT NULL,
  `categoria_id` tinyint(3) UNSIGNED NOT NULL,
  `size_id` tinyint(3) UNSIGNED NOT NULL,
  `edad_id` tinyint(3) UNSIGNED NOT NULL,
  `ciudad_id` smallint(5) UNSIGNED NOT NULL,
  `fundacion_id` bigint(20) UNSIGNED NOT NULL,
  `estado_id` tinyint(3) UNSIGNED NOT NULL,
  `publicacion` enum('1','2','3') NOT NULL DEFAULT '1',
  `revision` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `slug`, `sexo`, `descripcion`, `esterilizacion`, `categoria_id`, `size_id`, `edad_id`, `ciudad_id`, `fundacion_id`, `estado_id`, `publicacion`, `revision`, `created_at`, `updated_at`) VALUES
(31, 'simon', 'simon', 'M', '', 1, 1, 3, 2, 2, 1, 3, '1', 0, '2022-12-31 19:13:45', '2023-02-13 21:09:05'),
(65, 'prueba4', 'prueba4', 'H', '', 2, 3, 2, 4, 5, 1, 1, '1', 0, '2023-01-06 21:33:47', '2023-02-01 22:04:49'),
(66, 'pimienta', 'pimienta', 'H', '', 2, 2, 1, 1, 3, 1, 1, '1', 0, '2023-02-02 14:59:51', '2023-02-13 21:09:39'),
(67, 'canelita', 'canelita', 'H', '', 1, 1, 2, 2, 4, 1, 1, '1', 0, '2023-02-02 15:02:54', '2023-02-13 21:07:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sizes`
--

INSERT INTO `sizes` (`id`, `nombre`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'pequeño', 'pequeño', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(2, 'mediano', 'mediano', '2022-12-02 02:07:20', '2022-12-02 02:07:20'),
(3, 'grande', 'grande', '2022-12-02 02:07:20', '2022-12-02 02:07:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `rol` enum('1','2') NOT NULL DEFAULT '2',
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `rol`, `token`, `created_at`, `updated_at`) VALUES
(1, 'jennysantamaria06@gmail.com', '$2b$10$73MAK3PmQaufNc2t4YYGX.6m3DLJFNPwxl5Qf7Z5ojvqPNc8gIQcy', '2', '', '2022-12-15 19:02:16', '2022-12-15 19:02:16'),
(15, 'alexis123@gmail.com', '$2b$10$W9VJCqmGk0epZo3i0/bgauWWKjGJG2rPT3PzqkC7tAAOUL8snu23i', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiYWxleGlzMTIzQGdtYWlsLmNvbSIsImlhdCI6MTY3NjMzMDkyNn0.xwaZmmW1Jl5696oEoQrnc0Q-GN5ypyQkEsS8KWXnqes', '2023-02-13 23:28:46', '2023-02-13 23:28:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `edades`
--
ALTER TABLE `edades`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `fundaciones`
--
ALTER TABLE `fundaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ciudad_id` (`ciudad_id`);

--
-- Indices de la tabla `imagen_mascotas`
--
ALTER TABLE `imagen_mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mascota_id` (`mascota_id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `edad_id` (`edad_id`),
  ADD KEY `ciudad_id` (`ciudad_id`),
  ADD KEY `fundacion_id` (`fundacion_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `edades`
--
ALTER TABLE `edades`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `fundaciones`
--
ALTER TABLE `fundaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `imagen_mascotas`
--
ALTER TABLE `imagen_mascotas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fundaciones`
--
ALTER TABLE `fundaciones`
  ADD CONSTRAINT `fundaciones_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fundaciones_ibfk_2` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades` (`id`);

--
-- Filtros para la tabla `imagen_mascotas`
--
ALTER TABLE `imagen_mascotas`
  ADD CONSTRAINT `imagen_mascotas_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`edad_id`) REFERENCES `edades` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_4` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_5` FOREIGN KEY (`fundacion_id`) REFERENCES `fundaciones` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_6` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
