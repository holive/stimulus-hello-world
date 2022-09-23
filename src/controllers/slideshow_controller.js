import { Controller } from "@hotwired/stimulus";


export default class extends Controller {
	// Stimulus controllers support typed value properties which automatically map to data attributes.
	// Stimulus will create a this.indexValue controller property associated
	// with a data-slideshow-index-value attribute, and handle the numeric conversion for us.
	// https://stimulus.hotwired.dev/reference/values
	// static values = { index: Number }
	static values = { index: { type: Number, default: 2 } } // That would start the index at 2, if no data-slideshow-index-value attribute was defined on the controller element.
	
	static targets = ["slide"]
	
	// Stimulus calls the indexValueChanged() method at initialization and in response to any change to the data-slideshow-index-value
	indexValueChanged() {
		this.showCurrentSlide()
	}
	
	next() {
		this.indexValue++
	}
	
	previous() {
		this.indexValue--
	}
	
	showCurrentSlide() {
		this.slideTargets.forEach((element, index) => {
			element.hidden = index != this.indexValue
		})
	}
}
