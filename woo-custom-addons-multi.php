<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              johnsanders.tv
 * @since             1.0.0
 * @package           Woo_Custom_Addons_Multi
 *
 * @wordpress-plugin
 * Plugin Name:       Woo Custom Addons Multi
 * Plugin URI:        https://academy.cnn.com
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
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
define('WOO_CUSTOM_ADDONS_MULTI_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-woo-custom-addons-multi-activator.php
 */
function activate_woo_custom_addons_multi()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-woo-custom-addons-multi-activator.php';
	Woo_Custom_Addons_Multi_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-woo-custom-addons-multi-deactivator.php
 */
function deactivate_woo_custom_addons_multi()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-woo-custom-addons-multi-deactivator.php';
	Woo_Custom_Addons_Multi_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_woo_custom_addons_multi');
register_deactivation_hook(__FILE__, 'deactivate_woo_custom_addons_multi');

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
function run_woo_custom_addons_multi()
{

	$plugin = new Woo_Custom_Addons_Multi();
	$plugin->run();
}
run_woo_custom_addons_multi();
