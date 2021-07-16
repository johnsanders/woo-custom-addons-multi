<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       johnsanders.tv
 * @since      1.0.0
 *
 * @package    Woo_Custom_Addons_Multi
 * @subpackage Woo_Custom_Addons_Multi/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Woo_Custom_Addons_Multi
 * @subpackage Woo_Custom_Addons_Multi/public
 * @author     John Sanders <jwsanders@gmail.com>
 */
class Woo_Custom_Addons_Multi_Public
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}
	public function enqueue_styles()
	{
		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'js/addons-form/dist/main.css', array(), $this->version, 'all');
	}
	public function enqueue_scripts()
	{
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/addons-form/dist/index.js', [], $this->version, false);
	}
	public function inject_seats_form()
	{
		echo '<div id="addonsForm"></div>';
	}
	public function add_to_cart()
	{
		$cart = WC()->cart->get_cart();
		echo json_encode($cart);
	}
	public function cart_item_quantity($product_quantity)
	{
		$pattern = '/value="(.+?)"/';
		preg_match($pattern, $product_quantity, $matches);
		if ($matches[1]) return $matches[1];
		return $product_quantity;
	}
	public function get_price_html($price)
	{
		return $price . "<span id='priceSuffix'></span>";
	}
}
