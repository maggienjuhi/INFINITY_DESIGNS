
DROP DATABASE IF EXISTS infinity_designs;
CREATE DATABASE infinity_designs;
USE  infinity_designs;

CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) UNIQUE,password VARCHAR(255));
INSERT INTO `users` (`id`, `username`, `password`) VALUES (NULL, 'joan', MD5('joan')), (NULL, 'maggie', MD5('maggie')),(NULL, 'rachel', MD5('rachel'));


CREATE TABLE applist(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,applist VARCHAR(255),app_description VARCHAR(255), apptype VARCHAR(255),icon_name VARCHAR(255),app_url VARCHAR(255),position INT NOT NULL,owner_id INT NOT NULL,INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `applist` (`id`, `applist`,`app_description`,`apptype`,`icon_name`,`app_url`,`position`, `owner_id`) VALUES (NULL, 'Flyers','Create Flyers','has-sub','fa fa-flag-checkered','flyers',2, '1'), (NULL, 'Business cards','Print business cards','has-sub','fa fa-pencil-square-o','registration', 4,'1'), (NULL, 'Brochures','Print Brochures','has-sub','fa  fa-gears','brochures',3, '1'),(NULL, 'Comments','Print Comments','has-sub','fa  fa-gears','comments',3, '1'),(NULL, 'Others','Others','active','icon-minus','others',29, '1');
SELECT applist FROM applist ;


CREATE TABLE modelslist(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,modelslist VARCHAR(255),icon_name VARCHAR(255),model_url VARCHAR(255),position INT NOT NULL,owner_id INT NOT NULL,INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `modelslist` (`id`, `modelslist`,`icon_name`,`model_url`,`position`, `owner_id`) VALUES (NULL, 'Flyers','','flyers', 1,'1'),(NULL, 'Business cards','','business_cards',1, '1'),(NULL, 'Brochures','','brochures',1, '1'),(NULL, 'Comments','','comments',1, '1'),(NULL,'others','','others',1,'1');
SELECT modelslist FROM modelslist ;




CREATE TABLE appmodels(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,applist_id INT NOT NULL,modelslist_id INT,owner_id INT NOT NULL,INDEX applist_index (applist_id),FOREIGN KEY(applist_id) REFERENCES applist(id),INDEX modelslist_index (modelslist_id),FOREIGN KEY(modelslist_id) REFERENCES modelslist(id),INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `appmodels` (`id`, `applist_id`, `modelslist_id`, `owner_id`) VALUES (NULL, '1', '1', '1'), (NULL, '2', '2', '1'), (NULL, '3', '3', '1'), (NULL, '4', '4', '1'), (NULL, '5', '5', '1');
SELECT al.applist,al.apptype,al.icon_name,al.app_url,ml.modelslist,ml.icon_name AS model_icon,ml.model_url FROM appmodels am,applist al,modelslist ml WHERE am.applist_id = al.id AND am.modelslist_id = ml.id ORDER BY al.position ASC;


CREATE TABLE business_profiles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),motto VARCHAR(255),slogan VARCHAR(255),mission TEXT,vision TEXT,owner_id INT NOT NULL,INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `business_profiles` (`id`, `name`, `motto`, `slogan`, `mission`, `vision`, `owner_id`) VALUES (NULL, 'Elimu Bora Academy', 'Education for the future', 'For best education', 'Create professionals out of youth', 'Be the best performer in the country', '1');



CREATE TABLE business_owners(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name_id INT NOT NULL,owner_id INT NOT NULL,INDEX name_index (name_id),FOREIGN KEY(name_id) REFERENCES business_profiles(id),INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `business_owners` (`id`, `name_id`,`owner_id`) VALUES (NULL, '1', '1'), (NULL, '1', '2');
SELECT bp.name,u.username FROM business_owners bo,business_profiles bp,users u WHERE bo.name_id = bp.id AND bp.owner_id = u.id;

SELECT name,motto,slogan,mission,vision FROM business_profiles bp,business_owners bo WHERE bp.id = bo.name_id AND bo.owner_id = 1;


CREATE TABLE business_applist(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,applist_id INT NOT NULL,name_id INT NOT NULL,owner_id INT NOT NULL,INDEX name_index (name_id),FOREIGN KEY(name_id) REFERENCES business_profiles(id),INDEX applist_index (applist_id),FOREIGN KEY(applist_id) REFERENCES applist(id),INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id));
INSERT INTO `business_applist` (`id`, `applist_id`, `name_id`,`owner_id`) VALUES (NULL, '1', '1',1), (NULL, '2', '1',1), (NULL, '3', '1',1), (NULL, '4', '1',1), (NULL, '5', '1',1);
SELECT al.applist,al.apptype,al.icon_name,al.app_url FROM applist al,business_applist bal WHERE al.id = bal.applist_id;


CREATE TABLE `staff_staffprofiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name_id` int(11) NOT NULL,
  `username_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nationalid` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `secondname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `specialcases` longtext NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `group_id` int(11) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `reg_date` varchar(100) NOT NULL,
  `owner_id` int(11) NOT NULL,
	INDEX username_index (username_id),FOREIGN KEY(username_id) REFERENCES users(id),INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id),INDEX name_index (name_id),FOREIGN KEY(name_id) REFERENCES business_profiles(id)
);

--
-- Dumping data for table `staff_staffprofiles`
--

INSERT INTO `staff_staffprofiles` (`id`, `name_id`,`username_id`,`email`, `nationalid`, `firstname`, `secondname`, `lastname`, `gender`, `specialcases`, `isactive`, `group_id`, `photo`, `reg_date`, `owner_id`) VALUES
(1, 1, 2,'', '22253133', 'Joan', 'Mungai', 'Maggie', 'Female', '', 1, 1, 'photo.jpg',DATE(NOW()) ,1),
(2, 1, 1,'', '22214545', 'Maggie', 'Maggie', 'Maggie', 'Female', '', 1, 1, 'photo.jpg',DATE(NOW()) ,1),
(3, 1, 1,'', '7520797', 'Rachel', 'Rachel', 'Rachel', 'Female', '', 1, 1, 'photo.jpg',DATE(NOW()) ,1),
(4, 1, 1,'', '22024770', 'Mary', 'Mary', 'Mary', 'Female', '', 1, 1, 'photo.jpg',DATE(NOW()),1);

SELECT sp.nationalid,u.username,sp.email,sp.firstname,sp.secondname,sp.lastname,sp.gender,sp.specialcases,sp.isactive,group_id,sp.photo FROM staff_staffprofiles sp,users u WHERE sp.username_id = u.id;


CREATE TABLE `cards_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name_id` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneno` varchar(255) NOT NULL,
  `slogan` varchar(255) NOT NULL,
  `fullnames` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `owner_id` int(11) NOT NULL,
	INDEX owner_index (owner_id),FOREIGN KEY(owner_id) REFERENCES users(id),INDEX name_index (name_id),FOREIGN KEY(name_id) REFERENCES business_profiles(id)
);
INSERT INTO `infinity_designs`.`cards_cards` (`id`, `name_id`, `domain`, `email`, `phoneno`, `slogan`, `fullnames`, `position`, `company`, `owner_id`) VALUES (NULL, '1', 'joankimani.com', 'joankimani@infinitydesigns.com', '0720545454', 'For the best designs', 'Joan Kimani Jambi', 'Business Developer', 'Infinity Designs LTD', '1');


CREATE TABLE `cards_contactform` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `yourname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `messagebody` varchar(255) NOT NULL
);
