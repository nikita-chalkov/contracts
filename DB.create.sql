CREATE TABLE `clients` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`first_name` CHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`last_name` CHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`third_name` CHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`birth_date` DATE NULL DEFAULT NULL,
	`pasport_number` INT(6) NULL DEFAULT NULL,
	`pasport_series` INT(4) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COMMENT='created by nikita chalkov'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
CREATE TABLE `building_type` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` CHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COMMENT='created by nikita chalkov'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
CREATE TABLE `contracts` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`insurance_sum` INT(11) NULL DEFAULT NULL,
	`date_start` DATE NULL DEFAULT NULL,
	`date_end` DATE NULL DEFAULT NULL,
	`building_type` INT(11) NULL DEFAULT NULL,
	`year_build` INT(4) NULL DEFAULT NULL,
	`area` DOUBLE(22,1) NULL DEFAULT NULL,
	`date_calc` DATE NULL DEFAULT NULL,
	`bonus` DOUBLE(22,2) NULL DEFAULT NULL,
	`contract_number` INT(6) NULL DEFAULT NULL,
	`date_conclusion` DATE NULL DEFAULT NULL,
	`insurant` INT(11) NULL DEFAULT NULL,
	`country` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`index` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`region` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`district` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`city` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`street` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`house` INT(11) NULL DEFAULT NULL,
	`housing` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`structure` CHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`apartment` INT(11) NULL DEFAULT NULL,
	`contract_comment` VARCHAR(1000) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `contract_number` (`contract_number`) USING BTREE
)
COMMENT='created by nikita chalkov'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
