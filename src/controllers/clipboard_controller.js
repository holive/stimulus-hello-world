import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
	// For each target name in the array, Stimulus adds three new properties to your controller:
	// this.sourceTarget, this.sourceTargets, this.hasSourceTarget
	static targets = ["source"]
	static classes = ["supported"]
	
	connect() {
		if ("clipboard" in navigator) {
			this.element.classList.add(this.supportedClass);
		}
	}
	
	copy(event) {
		event.preventDefault()
		navigator.clipboard.writeText(this.sourceTarget.value)
	}
}
