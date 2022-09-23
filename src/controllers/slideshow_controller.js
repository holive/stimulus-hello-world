import { Controller } from "@hotwired/stimulus";


export default class extends Controller {
	// Stimulus controllers support typed value properties which automatically map to data attributes.
	// Stimulus will create a this.indexValue controller property associated
	// with a data-slideshow-index-value attribute, and handle the numeric conversion for us.
	// https://stimulus.hotwired.dev/reference/values
	static values = { index: Number }
	
	static targets = ["slide"]
	
	// https://stimulus.hotwired.dev/reference/lifecycle-callbacks
	initialize() {
		this.showCurrentSlide()
	}
	
	next() {
		this.indexValue++
		this.showCurrentSlide()
	}
	
	previous() {
		this.indexValue--
		this.showCurrentSlide()
	}
	
	showCurrentSlide() {
		this.slideTargets.forEach((element, index) => {
			element.hidden = index != this.indexValue
		})
	}
}
