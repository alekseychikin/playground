const container = document.querySelector('.slider')
const car = document.querySelector('.items')
const items = Array.from(document.querySelectorAll('.item'))
const itemWidth = items[0].offsetWidth
let startAnimationOffset = 0

items.forEach((item, index) => {
	item.setAttribute('data-index', index)
})

car.addEventListener('click', (event) => {
	const index = Number(event.target.dataset.index)
	const containerHalfWidth = container.offsetWidth / 2
	const finishAnimationOffset = getItemOffset(index) - containerHalfWidth
	const distance = finishAnimationOffset - startAnimationOffset
	const duration = getRatioDistance(distance / itemWidth) * 750

	startAnimation(duration, (progress) => {
		const offsetLeft = easeInOut(progress) * distance + startAnimationOffset

		moveCar(offsetLeft)

		items.forEach((item, index) => {
			const itemShift = (offsetLeft + containerHalfWidth - getItemOffset(index)) / itemWidth
			const itemProgress = Math.max(
				-itemShift * itemShift + 1,
				0
			)

			animateItem(item, itemProgress)
		})
	}, () => {
		startAnimationOffset = finishAnimationOffset
	})
})

function getItemOffset(index) {
	return index * itemWidth + itemWidth / 2
}

function moveCar(offset) {
	car.style.transform = `translateX(${-offset}px)`
}

function startAnimation(duration, tick, finish) {
	let startAnimationTime

	requestAnimationFrame(function measure(currentTime) {
		if (!startAnimationTime) {
			startAnimationTime = currentTime
		}

		const progress = (currentTime - startAnimationTime) / duration

		tick(progress)

		if (progress < 1) {
			requestAnimationFrame(measure)
		} else {
			finish()
		}
	})
}

function easeInOut(time) {
	return 0.5 * (1 - Math.cos(Math.PI * time))
}

function getRatioDistance(value) {
	return Math.min(
		Math.log10(Math.abs(value) * 10 + 1) / 2,
		1
	)
}

function animateItem(item, progress) {
	item.style.transform = `scale(${0.8 + progress * 0.2})`
	item.style.opacity = 0.5 + progress * 0.5
}
