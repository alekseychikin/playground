const element = document.querySelector('#element')
const duration = 3000
const distance = 500
let requestId = null

function startAmination(duration, callback) {
	let startAmination = null

	requestId = requestAnimationFrame(function measure(time) {
		if (!startAmination) {
			startAmination = time
		}

		const progress = (time - startAmination) / duration

		callback(progress)

		if (progress < 1) {
			requestId = requestAnimationFrame(measure)
		}
	})
}

function easeInOut(time) {
	return 0.5 * (1 - Math.cos(Math.PI * time))
}

const buttonStart = document.querySelector('[data-start]')
const buttonAbort = document.querySelector('[data-abort]')

buttonStart.addEventListener('click', () => {
	startAmination(duration, (progress) => {
		const translate = easeInOut(progress) * distance

		element.style.transform = `translateX(${translate}px)`
	})
})

buttonAbort.addEventListener('click', () => {
	cancelAnimationFrame(requestId)
})
