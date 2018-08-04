class CancelError extends Error {
	constructor() {
		super('Promise was cancelled')
		Error.captureStackTrace(this, CancelError)
	}
}

const cancellable = promise => {
	let rejectRes
	const res = new Promise((resolve, reject) => {
		promise.then(resolve).catch(reject)
		rejectRes = reject
	})
	res.cancel = () => rejectRes(new CancelError())
	return res
}

export default cancellable
export { CancelError }
