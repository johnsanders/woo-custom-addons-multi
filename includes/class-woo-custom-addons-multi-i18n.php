<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       johnsanders.tv
 * @since      1.0.0
 *
 * @package    Woo_Custom_Addons_Multi
 * @subpackage Woo_Custom_Addons_Multi/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Woo_Custom_Addons_Multi
 * @subpackage Woo_Custom_Addons_Multi/includes
 * @author     John Sanders <jwsanders@gmail.com>
 */
class Woo_Custom_Addons_Multi_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'woo-custom-addons-multi',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
