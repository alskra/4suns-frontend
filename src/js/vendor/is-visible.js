export default function (elt) {
	return !!(elt.offsetWidth || elt.offsetHeight || elt.getClientRects().length);
}
