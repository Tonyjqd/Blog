-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2023 a las 17:10:49
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id_publicacion` bigint(20) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `fecha_publicacion` date NOT NULL DEFAULT current_timestamp(),
  `contenido` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_publicacion`, `imagen`, `titulo`, `fecha_publicacion`, `contenido`) VALUES
(69, '/imagenes/imagen-1688315726433.jpg', 'Playa de San Lorenzo', '2023-07-01', 'Paseando tranquilamente por la playa para disfrutar de un día completamente relajado y con buen clima.'),
(75, '/imagenes/imagen-1688316821918.jpg', 'Desconectando en la ciudad.', '2023-07-02', 'He visitado el parque de los pericones con el fin de desconectar estando dentro de la ciudad.'),
(146, '/imagenes/imagen-1688372375994.jpg', 'Primera visita a la laboral', '2023-07-03', 'Fue la primera vez que entré en este edificio tan bonito. Tuve oportunidad de acudir a un mercadillo habilitado en este espacio y conocer personas muy agradables. Fue un bonito día.'),
(166, '/imagenes/imagen-1688394532721.jpg', 'Paseando por el centro', '2023-07-03', 'Esta foto he intentado hacerla en múltiples ocasiones pero siempre las hojas verdes se ven un poco mal... Habrá que seguir intentándolo o directamente cambiar de móvil, jajaja.'),
(167, '/imagenes/imagen-1688394561363.jpg', 'Qué lindo el mar', '2023-07-03', 'No sabía lo que había más allá de la escalera 15 y resulta que hay infinitas escaleras más, y más costa y más paisaje y más cuestas...');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id_publicacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id_publicacion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
