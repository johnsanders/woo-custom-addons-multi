<?php

/**
 *
 * @link              johnsanders.tv
 * @since             1.0.0
 * @package           Cnn_Academy_Mods
 *
 * @wordpress-plugin
 * Plugin Name:       CNN Academy Mods
 * Plugin URI:        https://academy.cnn.com
 * Description:       CNN Academy Customizations
 * Version:           1.0.0
 * Author:            John Sanders
 * Author URI:        johnsanders.tv
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cnn-academy-mods
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('CNN_ACADEMY_MODS_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cnn-academy-mods-activator.php
 */
function activate_cnn_academy_mods()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-cnn-academy-mods-activator.php';
	Cnn_Academy_Mods_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cnn-academy-mods-deactivator.php
 */
function deactivate_cnn_academy_mods()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-cnn-academy-mods-deactivator.php';
	Cnn_Academy_Mods_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_cnn_academy_mods');
register_deactivation_hook(__FILE__, 'deactivate_cnn_academy_mods');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-cnn-academy-mods.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_cnn_academy_mods()
{
	$plugin = new Cnn_Academy_Mods();
	$plugin->run();
}
run_cnn_academy_mods();
