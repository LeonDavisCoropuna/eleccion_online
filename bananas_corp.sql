-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2023 a las 20:08:01
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bananas_corp`
--
CREATE DATABASE IF NOT EXISTS `bananas_corp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bananas_corp`;

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `obtener_candidatos_por_partido`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_candidatos_por_partido` ()   BEGIN
    SELECT partido_politico.partido AS nombre_partido,
           candidato.cargo,
           persona.name,
           persona.lastName,
           persona.id,
           persona.username
    FROM partido_politico
    LEFT JOIN candidato ON partido_politico.id = candidato.id_partido
    LEFT JOIN electores ON candidato.id = electores.id
    LEFT JOIN persona ON electores.id = persona.id;
END$$

DROP PROCEDURE IF EXISTS `sp_obtener_datos_partido_candidatos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_datos_partido_candidatos` ()   BEGIN
    SELECT pp.id AS id_partido, pp.partido AS nombre_partido, r.nro_votos, c.id AS id_candidato, c.cargo, pe.name, pe.lastName
    FROM partido_politico pp
    LEFT JOIN resultado r ON pp.id = r.id_partido
    LEFT JOIN candidato c ON pp.id = c.id_partido and c.cargo = "Presidente"
    LEFT JOIN electores e ON c.id = e.id
    LEFT JOIN persona pe ON e.id = pe.id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `cargo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `cargo`) VALUES
(3, 'Gerente de Sistemas ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `candidato`
--

DROP TABLE IF EXISTS `candidato`;
CREATE TABLE `candidato` (
  `id` int(11) NOT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `id_partido` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `candidato`
--

INSERT INTO `candidato` (`id`, `cargo`, `id_partido`) VALUES
(1, 'Presidente', 1),
(4, 'Presidente', 2),
(5, 'vicePresidente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `electores`
--

DROP TABLE IF EXISTS `electores`;
CREATE TABLE `electores` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `electores`
--

INSERT INTO `electores` (`id`, `email`) VALUES
(1, 'aldomasna@unsa.edu.pe'),
(2, 'ldavis@unsa.edu.pe'),
(4, 'alupo@unsa.edu.pe'),
(5, 'randuChm@unsa.edu.pe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido_politico`
--

DROP TABLE IF EXISTS `partido_politico`;
CREATE TABLE `partido_politico` (
  `id` int(11) NOT NULL,
  `partido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partido_politico`
--

INSERT INTO `partido_politico` (`id`, `partido`) VALUES
(1, 'FreeFap'),
(2, 'Peru libre'),
(3, 'Nulo');

--
-- Disparadores `partido_politico`
--
DROP TRIGGER IF EXISTS `after_insert_partido_politico`;
DELIMITER $$
CREATE TRIGGER `after_insert_partido_politico` AFTER INSERT ON `partido_politico` FOR EACH ROW BEGIN
    -- Insertar el id_partido con valor cero en la tabla resultado
    INSERT INTO resultado (id_partido, nro_votos)
    VALUES (NEW.id, 0);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `name`, `lastName`, `username`, `password`) VALUES
(1, 'Aldo', 'Martinez', 'aldechi_11', '123'),
(2, 'Leon', 'davis', 'ldavis', '123'),
(3, 'Gustavo', 'Ccama', 'gusti_12', '123'),
(4, 'Avelino', 'Lupo', 'alupoc_35', '123'),
(5, 'Randu', 'Cerpa', 'randu56', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado`
--

DROP TABLE IF EXISTS `resultado`;
CREATE TABLE `resultado` (
  `id_partido` int(11) NOT NULL,
  `nro_votos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultado`
--

INSERT INTO `resultado` (`id_partido`, `nro_votos`) VALUES
(1, 10),
(2, 5),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

DROP TABLE IF EXISTS `votos`;
CREATE TABLE `votos` (
  `id_elector` int(11) NOT NULL,
  `id_partido` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`id_elector`, `id_partido`, `fecha`) VALUES
(1, 1, '2023-07-07 00:00:00'),
(2, 1, '2023-08-04 06:23:35'),
(4, 2, '2023-07-07 00:00:00'),
(5, 2, '2023-07-07 00:00:00');

--
-- Disparadores `votos`
--
DROP TRIGGER IF EXISTS `after_insert_votos`;
DELIMITER $$
CREATE TRIGGER `after_insert_votos` AFTER INSERT ON `votos` FOR EACH ROW BEGIN
    -- Aumentar en uno el nro_votos en la tabla resultado
    UPDATE resultado
    SET nro_votos = nro_votos + 1
    WHERE id_partido = NEW.id_partido;
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_partido` (`id_partido`);

--
-- Indices de la tabla `electores`
--
ALTER TABLE `electores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partido_politico`
--
ALTER TABLE `partido_politico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`,`username`);

--
-- Indices de la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`id_partido`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id_elector`),
  ADD KEY `id_partido` (`id_partido`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `partido_politico`
--
ALTER TABLE `partido_politico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`);

--
-- Filtros para la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD CONSTRAINT `candidato_ibfk_1` FOREIGN KEY (`id`) REFERENCES `electores` (`id`),
  ADD CONSTRAINT `candidato_ibfk_2` FOREIGN KEY (`id_partido`) REFERENCES `partido_politico` (`id`);

--
-- Filtros para la tabla `electores`
--
ALTER TABLE `electores`
  ADD CONSTRAINT `electores_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`);

--
-- Filtros para la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`id_partido`) REFERENCES `partido_politico` (`id`);

--
-- Filtros para la tabla `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `votos_ibfk_1` FOREIGN KEY (`id_elector`) REFERENCES `electores` (`id`),
  ADD CONSTRAINT `votos_ibfk_2` FOREIGN KEY (`id_partido`) REFERENCES `partido_politico` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
