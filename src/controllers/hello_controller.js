import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
	// controller methods which handle events are called action methods
	
	// controller’s list of target definitions
	static targets = ["name"]
	
	// Stimulus will automatically create a this.nameTarget property
	// which returns the first matching target element.
	get name() {
		return this.nameTarget.value
	}
	
	greet() {
		console.log(`Hello, ${this.name}!`)
	}
}
