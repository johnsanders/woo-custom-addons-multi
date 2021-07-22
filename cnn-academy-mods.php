<?php

/**
 *
 * @link              johnsanders.tv
 * @since             1.0.0
 * @package           Cnn_Academy_Mods
 *
 * @wordpress-plugin
 * Plugin Name:       Woo Custom Addons Multi
 * Plugin URI:        https://academy.cnn.com
 * Description:       Allow multiple custom addons on single product page
 * Version:           1.0.0
 * Author:            John Sanders
 * Author URI:        johnsanders.tv
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       woo-custom-addons-multi
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
 * This action is documented in includes/class-woo-custom-addons-multi-activator.php
 */
function activate_CNN_ACADEMY_MODS()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-woo-custom-addons-multi-activator.php';
	Cnn_Academy_Mods_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-woo-custom-addons-multi-deactivator.php
 */
function deactivate_CNN_ACADEMY_MODS()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-woo-custom-addons-multi-deactivator.php';
	Cnn_Academy_Mods_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_CNN_ACADEMY_MODS');
register_deactivation_hook(__FILE__, 'deactivate_CNN_ACADEMY_MODS');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-woo-custom-addons-multi.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_CNN_ACADEMY_MODS()
{
	$plugin = new Cnn_Academy_Mods();
	$plugin->run();
}
run_CNN_ACADEMY_MODS();
