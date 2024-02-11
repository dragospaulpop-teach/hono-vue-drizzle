CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP,
	`name` text NOT NULL,
	`completed` integer DEFAULT false
);
