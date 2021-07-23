<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       johnsanders.tv
 * @since      1.0.0
 *
 * @package    Cnn_Academy_Mods
 * @subpackage Cnn_Academy_Mods/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Cnn_Academy_Mods
 * @subpackage Cnn_Academy_Mods/public
 * @author     John Sanders <jwsanders@gmail.com>
 */
class Cnn_Academy_Mods_Public
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
		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/style.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'js/addons-form/dist/main.css', array(), $this->version, 'all');
	}
	public function enqueue_scripts()
	{
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/addons-form/dist/index.js', [], $this->version, false);
	}
	public function inject_addons_form()
	{
		echo '<div id="addonsForm"></div>';
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
	public function get_item_data($itemData, $cartItem)
	{
		$attendees = json_decode($cartItem["wcpa_data"][0]['value']);
		$attendeesString = "<table class='addonsMulti'><tbody>";
		foreach ($attendees as $attendee) {
			$firstName = $attendee->firstName;
			$surname = $attendee->surname;
			$email = $attendee->email;
			$attendeesString .= "<tr><td>$firstName $surname</td><td>$email</td></tr>";
		}
		$attendeesString .= "</tbody></table>";
		array_push($itemData, ["key" => "Attendees", "value" => $attendeesString]);
		return $itemData;
	}
	public function currency_symbols($symbols)
	{
		$symbols["USD"] = "US&#36;";
		return $symbols;
	}
	public function add_share_buttons()
	{
		// https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.heateor.com%2Fsassy-social-share-demo%2F
		// https://twitter.com/intent/tweet?text=Check%20out%20this%20course%20from%20CNN%20Academy:%20&url=https://cnn.com
		// https://www.linkedin.com/sharing/share-offsite/?url=https://cnn.com
		// https://web.whatsapp.com/send?text=Sassy%20Social%20Share%20Demo%20https%3A%2F%2Fwww.heateor.com%2Fsassy-social-share-demo%2F
	}
	public function order_item_meta_end($item_id, $item)
	{
		$metaData = $item->get_data()['meta_data'];
		foreach ($metaData as $metaDatum) {
			if ($metaDatum->key === '_Seats Data') {
				$seats = json_decode($metaDatum->value);
				echo '<table class="addonsMulti">';
				foreach ($seats as $seat) {
					$name = $seat->firstName . ' ' . $seat->surname;
					$email = $seat->email;
					echo "<tr><td>$name</td><td>$email</td></tr>";
				}
				echo '</table>';
			}
		}
	}
	public function thankyou_order_received_text()
	{
		return '
			<p>
				Thank you. Your order has been received and is being processed.
				The attendee(s) you registered will receive an email with instructions for logging onto the CNN Academy Hub.
				Usually this happens within a few minutes, but can take up to 24 hours in some cases.
			</p>
			<p>
				You will shortly receive a email with this information.
				Then when your order is fully completed, we will send a final confirmation along with a PDF invoice.
			</p>
			<p>If you have any problems, please email <a href="mailto:cnnacademy@turner.com">cnnacademy@turner.com</a></p>
		';
	}
}
